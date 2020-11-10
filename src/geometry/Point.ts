import Ajv from "ajv";
import pointSchema from "./Point.schema";
import Decimal from "decimal.js";

export interface PointOptions {
  x: Decimal,
  y: Decimal,
};

export interface PointJSON {
  className: "Point",
  data: {
    x: string,
    y: string,
  },
};

/**
 * Immutable Point
 */
export default class Point {
  /**
   * The x coordinate of the Point.
   */
  protected _x: Decimal = new Decimal(0);

  /**
   * The y coordinate of the Point.
   */
  protected _y: Decimal = new Decimal(0);


  /**
   * Instantiates a Point.
   * @param options - a configuration Object with 'x' and 'y' as Decimals.
   */
  public constructor(options?: Point | PointOptions) {
    if (arguments.length <= 0) return;
    if (typeof options !== "object") throw new TypeError();
    let x: Decimal;
    let y: Decimal;
    if (options instanceof Point)
      ({ _x: x, _y: y } = options as Point);
    else
      ({ x, y } = options as PointOptions);
    if (!(x instanceof Decimal)) throw new TypeError();
    this._x = x;
    if (!(y instanceof Decimal)) throw new TypeError();
    this._y = y;
  }


  /**
   * Gets the x coordinate of the Point.
   * @returns the x coordinate
   */
  public getX(): Decimal {
    const { _x } = this;
    return _x;
  }


  /**
   * Gets the y coordinate of the Point.
   * @returns the y coordinate
   */
  public getY(): Decimal {
    const { _y } = this;
    return _y;
  }


  /**
   * Determines whether invoking Point is equivalent to the passed Point.
   * @param point - the Point to compare against
   * @returns whether the Points are equal representations
   */
  public equals(point: Point): boolean {
    const { _x, _y } = this;
    return _x.equals(point._x) && _y.equals(point._y);
  }


  /**
   * Creates a Point from a JSON object. The JSON must match Point schema
   * for the method to succeed.
   * @param pointJSON - the Point formatted JSON
   * @returns the Point represented by the JSON
   */
  public static fromJSON(pointJSON: PointJSON): Point {
    const ajv = new Ajv();
    if (!ajv.validate(pointSchema, pointJSON)) throw new TypeError();
    const { x: xJSON, y: yJSON } = pointJSON.data;
    const x = new Decimal(xJSON);
    const y = new Decimal(yJSON);
    return new Point({ x, y });
  }


  /**
   * Creates a JSON object from invoking Point.
   * @returns the JSON representation of the Point
   */
  public toJSON(): PointJSON {
    const { _x, _y } = this;
    // maintain precision with strings
    return {
      className: "Point",
      data: {
        x: _x.toString(),
        y: _y.toString(),
      },
    };
  }
};