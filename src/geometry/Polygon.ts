import Ajv from "ajv";
import polygonSchema from "./Polygon.schema";
import Decimal from "decimal.js";
import Point, { PointOptions, PointJSON } from "./Point";
import Line from "./Line";

export interface PolygonOptions {
  points?: Array<Point>
};

export interface PolygonJSON {
  points: Array<PointJSON>
};

/**
 * Immutable Simple Polygon
 */
export default class Polygon {
  protected _points: Array<Point> = new Array<Point>(
    new Point({ x: new Decimal(0), y: new Decimal(0) }),
    new Point({ x: new Decimal(0), y: new Decimal(1) }),
    new Point({ x: new Decimal(1), y: new Decimal(1) }),
    new Point({ x: new Decimal(1), y: new Decimal(0) }),
  );

  /**
   * Instantiates a Polygon.
   * @param options - A configuration Object with 'points' as an Array of
   *  Points
   */
  constructor(options?: Polygon | PolygonOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    let { points } = options;
    if (points != null) {
      if (!(points instanceof Array)) throw new TypeError();
      for (const point of points) {
        if (!(point instanceof Point)) throw new TypeError();
      }
      // ordered points cannot construct intersecting lines
      const lines: Array<Line> = new Array<Line>();
      for (let i = 0; i < points.length; ++i) {
        const start = points[i];
        const end = points[(i + 1) % points.length]
        lines.push(new Line({ start, end }));
      }
      for (const lineA of lines) {
        for (const lineB of lines) {
          if (lineA === lineB) continue;
          if (lineA.intersects(lineB)) throw new TypeError();
        }
      }
      this._points = <Array<Point>>points;
    }
    Object.freeze(this);
    Object.freeze(this._points);
  }

  // property getters/setters
  /**
   * Gets the ordered Points that make up the Polygon.
   */
  public get points(): Array<Point> {
    return this._points;
  }

  // computed properties
  /**
   * Gets the computed width of the Polygon.
   */
  public get width(): Decimal {
    const { points } = this;
    let lowest: Decimal = new Decimal(Infinity);
    let highest: Decimal = new Decimal(-Infinity);
    for (const point of points) {
      if (point.x.lt(lowest)) lowest = point.x;
      if (point.x.gt(highest)) highest = point.x;
    }
    return highest.sub(lowest).abs();
  }

  /**
   * Gets the computed height of the Polygon.
   */
  public get height(): Decimal {
    const { points } = this;
    let lowest: Decimal = new Decimal(Infinity);
    let highest: Decimal = new Decimal(-Infinity);
    for (const point of points) {
      if (point.y.lt(lowest)) lowest = point.y;
      if (point.y.gt(highest)) highest = point.y;
    }
    return highest.sub(lowest).abs();
  }

  /**
   * Gets all equivalent Polygon representations of the Polygon.
   */
  public get representations(): Array<Polygon> {
    const { points } = this;
    const representations: Array<Polygon> = new Array<Polygon>();
    for (let i = 0; i < points.length - 1; ++i) {
      // rotate based on i, take from start, add to end
      const copy = points.slice();
      const rotating = copy.splice(0, i);
      copy.push(...rotating);
      // register as new representation
      representations.push(new Polygon({
        points: copy
      }));
    }
    return representations;
  }

  // methods
  /**
   * Determines whether invoking Polygon is equivalent to passed Polygon.
   * @param polygon - The Polygon to compare against
   * @returns Whether the Polygons are equal representations
   */
  public equals(polygon: Polygon): boolean {
    const { representations } = this;
    const representationsStrings = new Set(representations
      .map(polygon => JSON.stringify(polygon)));
    // compare string versions
    return representationsStrings.has(JSON.stringify(polygon));
  }

  /**
   * Creates a Polygon from a JSON object. The JSON must match the Polygon
   * schema for the method to succeed.
   * @param polygonJSON - The polygon formatted JSON
   * @returns The Polygon represented by the JSON
   */
  public static fromJSON(polygonJSON: PolygonJSON): Polygon {
    const ajv = new Ajv();
    if (!ajv.validate(polygonSchema, polygonJSON)) throw new TypeError();
    const { points: pointsJSON } = polygonJSON;
    const points = pointsJSON.map((pointJSON) => Point.fromJSON(pointJSON));
    return new Polygon({ points });
  }

  /**
   * Creates a JSON object from invoking Polygon.
   * @returns The JSON representation of the Polygon
   */
  public toJSON(): PolygonJSON {
    const { points } = this;
    return {
      points: points.map(point => point.toJSON()),
    };
  }
};