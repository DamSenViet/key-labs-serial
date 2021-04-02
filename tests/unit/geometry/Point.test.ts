import { Point, PointJSON } from "../../../src/geometry";
import Decimal from "decimal.js";

test('constructor', () => {
  expect(() => {
    const point = new Point();
  }).not.toThrow();
  expect(() => {
    const point = new Point({});
  }).not.toThrow();
  expect(() => {
    const point = new Point({ x: new Decimal(7) });
  }).not.toThrow();
  expect(() => {
    const point = new Point({ y: new Decimal(7) });
  }).not.toThrow();
  expect(() => {
    const point = new Point({ x: new Decimal(7), y: new Decimal(7) });
  }).not.toThrow();
  expect(() => {
    const point = new Point(undefined);
  }).toThrow(TypeError);
  expect(() => {
    const point = new Point({ x: new Decimal(0), y: new Decimal(0) });
  }).not.toThrow(TypeError);
});


test('get x', () => {
  expect(() => {
    const point = new Point();
    expect(point.x.toNumber()).toBe(0);
  }).not.toThrow();
  expect(() => {
    const point = new Point({});
    expect(point.x.toNumber()).toBe(0);
  }).not.toThrow();
  expect(() => {
    const point = new Point({ x: new Decimal(7) });
    expect(point.x.toNumber()).toBe(7);
  }).not.toThrow();
  expect(() => {
    const point = new Point({ y: new Decimal(7) });
    expect(point.x.toNumber()).toBe(0);
  }).not.toThrow();
  expect(() => {
    const point = new Point({ x: new Decimal(7), y: new Decimal(7) });
    expect(point.x.toNumber()).toBe(7);
  }).not.toThrow();
});


test('get y', () => {
  expect(() => {
    const point = new Point();
    expect(point.y.toNumber()).toBe(0);
  }).not.toThrow();
  expect(() => {
    const point = new Point({});
    expect(point.y.toNumber()).toBe(0);
  }).not.toThrow();
  expect(() => {
    const point = new Point({ x: new Decimal(7) });
    expect(point.y.toNumber()).toBe(0);
  }).not.toThrow();
  expect(() => {
    const point = new Point({ y: new Decimal(7) });
    expect(point.y.toNumber()).toBe(7);
  }).not.toThrow();
  expect(() => {
    const point = new Point({ x: new Decimal(7), y: new Decimal(7) });
    expect(point.y.toNumber()).toBe(7);
  }).not.toThrow();
});


test('equals', () => {
  expect(() => {
    const p1 = new Point();
    const p2 = new Point({});
    const p3 = new Point({ x: new Decimal(0), y: new Decimal(0) });
    expect(p1.equals(p2)).toBe(true);
    expect(p1.equals(p3)).toBe(true);
    expect(p2.equals(p3)).toBe(true);
  }).not.toThrow();
  expect(() => {
    const p1 = new Point();
    const p2 = new Point({ x: new Decimal(7) });
    const p3 = new Point({ x: new Decimal(7), y: new Decimal(0) });
    expect(p1.equals(p2)).toBe(false);
    expect(p1.equals(p3)).toBe(false);
    expect(p2.equals(p3)).toBe(true);
  }).not.toThrow();
  expect(() => {
    const p1 = new Point();
    const p2 = new Point({ y: new Decimal(7) });
    const p3 = new Point({ y: new Decimal(7), x: new Decimal(0) });
    expect(p1.equals(p2)).toBe(false);
    expect(p1.equals(p3)).toBe(false);
    expect(p2.equals(p3)).toBe(true);
  }).not.toThrow();
});


test('fromJSON', () => {
  expect(() => {
    const pointJSON = {
      className: "Point",
      data: {
        x: "7",
        y: "7",
      },
    };
    const point = Point.fromJSON(<PointJSON> pointJSON);
  }).not.toThrow();
  expect(() => {
    // wrong className
    const pointJSON = {
      className: "",
      data: {
        x: "7",
        y: "7",
      },
    }
    const point = Point.fromJSON(<PointJSON>  pointJSON);
  }).toThrow(TypeError);
  expect(() => {
    // missing y
    const pointJSON = {
      className: "Point",
      data: {
        x: "7",
      },
    };
    const point = Point.fromJSON(<PointJSON>  pointJSON);
  }).toThrow(TypeError);
  expect(() => {
    // missing x
    const pointJSON = {
      className: "Point",
      data: {
        y: "7",
      },
    };
    const point = Point.fromJSON(<PointJSON> pointJSON);
  }).toThrow(TypeError);
});


test('toJSON', () => {
  expect(() => {
    const point = new Point({ x: new Decimal(7), y: new Decimal(7) })
    const pointJSON = point.toJSON();
    expect(pointJSON).toHaveProperty("className", "Point");
    expect(pointJSON).toHaveProperty("data");
    expect(pointJSON.data).toHaveProperty("x");
    expect(pointJSON.data).toHaveProperty("y");
  }).not.toThrow();
});