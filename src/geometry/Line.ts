import Ajv from "ajv";
import lineSchema from "./Line.schema";
import Decimal from "decimal.js";
import Point, { PointOptions, PointJSON } from "./Point";

export interface LineOptions {
  start?: PointOptions,
  end?: PointOptions,
};

export interface LineJSON {
  className: "Line",
  data: {
    start: PointJSON,
    end: PointJSON,
  },
};

/**
 * Immutable Line
 */
export default class Line {
  protected _start: Point = new Point({
    x: new Decimal(0),
    y: new Decimal(0),
  });
  protected _end: Point = new Point({
    x: new Decimal(0),
    y: new Decimal(0),
  });

  /**
   * Instantiates a Line.
   * @param options - A configuration Object with 'start' and 'end' as Points.
   */
  public constructor(options?: Line | LineOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    const { start, end } = options;
    if (start != null) {
      if (!(start instanceof Point)) throw new TypeError();
      this._start = start;
    }
    if (end != null) {
      if (!(end instanceof Point)) throw new TypeError();
      this._end = end;
    }
    Object.freeze(this);
  }

  // property getters
  /**
   * Gets the starting Point of the Line.
   */
  public get start(): Point {
    const { _start } = this;
    return _start;
  }

  /**
   * Gets the ending Point of the Line.
   */
  public get end(): Point {
    const { _end } = this;
    return _end;
  }

  // methods
  /**
   * Determines whether invoking Line is equivalent to passed Line.
   * @param line - The Line to compare against
   * @returns Whether the Lines are equal representations
   */
  public equals(line: Line): boolean {
    const { start, end } = this;
    return (start.equals(line.start) && end.equals(line.end)) ||
      (start.equals(line.end) && end.equals(line.start));
  }

  /**
   * Calculates the intersection between invoking Line and passed Line.
   * @remarks
   * line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
   * https://stackoverflow.com/a/60368757/8625882
   * @param line - The Line to check for intersection against
   * @returns The Point at which the lines intersect and null if they don't
   */
  public intersection(line: Line): null | Point {
    const { start, end } = this;
    // lines cannot be of length 0
    if (start.equals(end) || line.start.equals(line.end)) {
      return null;
    }

    const denominator = Decimal.sub(
      line.end.y.sub(line.start.y)
        .mul(end.x.sub(start.x)),
      line.end.x.sub(line.start.x)
        .mul(end.y.sub(start.y))
    );

    if (denominator.isZero()) return null;

    const ua = Decimal.sub(
      line.end.x.sub(line.start.x)
        .mul(start.y.sub(line.start.y)),
      line.end.y.sub(line.start.y)
        .mul(start.x.sub(line.start.x))
    ).div(denominator);
    const ub = Decimal.sub(
      end.x.sub(start.x)
        .mul(start.y.sub(line.start.y)),
      end.y.sub(start.y)
        .mul(start.x.sub(line.start.x))
    ).div(denominator)

    // is the intersection along the segments
    const isAlongSegment = (ua.gte(0) && ua.lte(1) && ub.gte(0) && ub.lte(1));
    if (!isAlongSegment) return null;

    const x = start.x.add(ua.mul(end.x.sub(start.x)));
    const y = start.y.add(ua.mul(end.y.sub(start.y)));
    return new Point({ x, y });
  }

  /**
   * Determines whether invoking Line has an intersection with passed Line.
   * @param line - The Line to check against
   * @returns Whether there is an intersection
   */
  public intersects(line): boolean {
    return Boolean(this.intersection(line));
  }

  /**
   * Creates a Line from a JSON object. The JSON must match Line schema
   * for the method to succeed.
   * @param lineJSON - The Line formatted JSON
   * @returns The Line represented by the JSON
   */
  public static fromJSON(lineJSON: LineJSON): Line {
    // verify with ajv
    const ajv = new Ajv();
    if (!ajv.validate(lineSchema, lineJSON)) throw new TypeError();
    const { start: startJSON, end: endJSON } = lineJSON.data;
    const start = Point.fromJSON(startJSON);
    const end = Point.fromJSON(endJSON);
    return new Line({ start, end });
  }

  /**
   * Creates a JSON object from invoking  Line.
   * @returns the JSON representation of the Line.
   */
  public toJSON(): LineJSON {
    const { _start, _end } = this;
    return {
      className: "Line",
      data: {
        start: _start.toJSON(),
        end: _end.toJSON(),
      },
    };
  }
};