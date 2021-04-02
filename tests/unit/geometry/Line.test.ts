import { Line, LineJSON, Point } from "../../../src/geometry";
import Decimal from "decimal.js";

test('constructor', () => {
  expect(() => {
    const line = new Line();
  }).not.toThrow();
  expect(() => {
    const line = new Line({});
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      start: new Point(),
    });
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      end: new Point(),
    });
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      start: new Point(),
      end: new Point(),
    });
  }).not.toThrow();
  expect(() => {
    const line = new Line(undefined);
  }).toThrow(TypeError);
});


test('get start', () => {
  expect(() => {
    const line = new Line();
    expect(line.start.equals(new Point({
      x: new Decimal(0),
      y: new Decimal(0),
    }))).toBe(true);
  }).not.toThrow();
  expect(() => {
    const line = new Line({});
    expect(line.start.equals(new Point({
      x: new Decimal(0),
      y: new Decimal(0),
    }))).toBe(true);
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    expect(line.start.equals(new Point({
      x: new Decimal(7),
      y: new Decimal(7),
    }))).toBe(true);
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    expect(line.start.equals(new Point({
      x: new Decimal(0),
      y: new Decimal(0),
    }))).toBe(true);
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    expect(line.start.equals(new Point({
      x: new Decimal(7),
      y: new Decimal(7),
    }))).toBe(true);
  }).not.toThrow();
});


test('get end', () => {
  expect(() => {
    const line = new Line();
    expect(line.end.equals(new Point({
      x: new Decimal(0),
      y: new Decimal(0),
    }))).toBe(true);
  }).not.toThrow();
  expect(() => {
    const line = new Line({});
    expect(line.end.equals(new Point({
      x: new Decimal(0),
      y: new Decimal(0),
    }))).toBe(true);
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    expect(line.end.equals(new Point({
      x: new Decimal(0),
      y: new Decimal(0),
    }))).toBe(true);
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    expect(line.end.equals(new Point({
      x: new Decimal(7),
      y: new Decimal(7),
    }))).toBe(true);
  }).not.toThrow();
  expect(() => {
    const line = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    expect(line.end.equals(new Point({
      x: new Decimal(7),
      y: new Decimal(7),
    }))).toBe(true);
  }).not.toThrow();
});


test('equals', () => {
  expect(() => {
    const l1 = new Line();
    const l2 = new Line({});
    const l3 = new Line({
      start: new Point({
        x: new Decimal(0),
        y: new Decimal(0),
      }),
      end: new Point({
        x: new Decimal(0),
        y: new Decimal(0),
      }),
    });
    expect(l1.equals(l2)).toBe(true);
    expect(l1.equals(l2)).toBe(true);
    expect(l2.equals(l3)).toBe(true);
  }).not.toThrow();
  expect(() => {
    const l1 = new Line();
    const l2 = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    const l3 = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    expect(l1.equals(l2)).toBe(false);
    expect(l1.equals(l3)).toBe(false);
    expect(l2.equals(l3)).toBe(false);
  }).not.toThrow();
  expect(() => {
    const l1 = new Line();
    const l2 = new Line({
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    const l3 = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    expect(l1.equals(l2)).toBe(false);
    expect(l1.equals(l3)).toBe(false);
    expect(l2.equals(l3)).toBe(false);
  }).not.toThrow();
  // special case, reversed start and ends
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: new Decimal(0),
        y: new Decimal(0),
      }),
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    const l2 = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
      end: new Point({
        x: new Decimal(0),
        y: new Decimal(0),
      }),
    });
    expect(l1.equals(l2)).toBe(true);
  }).not.toThrow();
});


test('intersection', () => {
  // initial, overlapping
  expect(() => {
    const l1 = new Line();
    const l2 = new Line();
    expect(l1.intersection(l2)).toBe(null);
  }).not.toThrow();
  // overlapping, parallel
  expect(() => {
    const l1 = new Line();
    const l2 = l1;
    expect(l1.intersection(l2)).toBe(null);
  }).not.toThrow();
  // only parallel
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: new Decimal(0),
        y: new Decimal(0),
      }),
      end: new Point({
        x: new Decimal(0),
        y: new Decimal(7),
      }),
    });
    const l2 = new Line({
      start: new Point({
        x: new Decimal(1),
        y: new Decimal(0),
      }),
      end: new Point({
        x: new Decimal(1),
        y: new Decimal(7),
      }),
    });
    expect(l1.intersection(l2)).toBe(null);
  }).not.toThrow();
  // actually intersecting at origin
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: new Decimal(-7),
        y: new Decimal(0),
      }),
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(0),
      }),
    });
    const l2 = new Line({
      start: new Point({
        x: new Decimal(0),
        y: new Decimal(-7),
      }),
      end: new Point({
        x: new Decimal(0),
        y: new Decimal(7),
      }),
    });
    expect(l1.intersection(l2)).toEqual(new Point());
  }).not.toThrow();
});


test('intersects', () => {
  // initial, overlapping
  expect(() => {
    const l1 = new Line();
    const l2 = new Line();
    expect(l1.intersects(l2)).toBe(false);
  }).not.toThrow();
  // overlapping, parallel
  expect(() => {
    const l1 = new Line();
    const l2 = l1;
    expect(l1.intersection(l2)).toBe(null);
  }).not.toThrow();
  // only parallel
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: new Decimal(0),
        y: new Decimal(0),
      }),
      end: new Point({
        x: new Decimal(0),
        y: new Decimal(7),
      }),
    });
    const l2 = new Line({
      start: new Point({
        x: new Decimal(1),
        y: new Decimal(0),
      }),
      end: new Point({
        x: new Decimal(1),
        y: new Decimal(7),
      }),
    });
    expect(l1.intersects(l2)).toBe(false);
  }).not.toThrow();
  // actually intersecting at origin
  expect(() => {
    const l1 = new Line({
      start: new Point({
        x: new Decimal(-7),
        y: new Decimal(0),
      }),
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(0),
      }),
    });
    const l2 = new Line({
      start: new Point({
        x: new Decimal(0),
        y: new Decimal(-7),
      }),
      end: new Point({
        x: new Decimal(0),
        y: new Decimal(7),
      }),
    });
    expect(l1.intersects(l2)).toBe(true);
  }).not.toThrow();
});


test('fromJSON', () => {
  // correct
  expect(() => {
    const lineJSON = {
      className: "Line",
      data: {
        start: {
          className: "Point",
          data: {
            x: "7",
            y: "7",
          },
        },
        end: {
          className: "Point",
          data: {
            x: "7",
            y: "7",
          },
        },
      },
    };
    const line = Line.fromJSON(<LineJSON>lineJSON);
  }).not.toThrow();
  // wrong className
  expect(() => {
    const lineJSON = {
      className: "",
      data: {
        start: {
          className: "Point",
          data: {
            x: "7",
            y: "7",
          },
        },
        end: {
          className: "Point",
          data: {
            x: "7",
            y: "7",
          },
        },
      },
    };
    const line = Line.fromJSON(<LineJSON>lineJSON);
  }).toThrow(TypeError);
  // missing end
  expect(() => {
    const lineJSON = {
      className: "Line",
      data: {
        end: {
          className: "Point",
          data: {
            x: "7",
            y: "7",
          },
        },
      },
    };
    const line = Line.fromJSON(<LineJSON> lineJSON);
  }).toThrow(TypeError);
  // missing start
  expect(() => {
    const lineJSON = {
      className: "Line",
      data: {
        start: {
          className: "Point",
          data: {
            x: "7",
            y: "7",
          },
        },
      },
    };
    const line = Line.fromJSON(<LineJSON> lineJSON);
  }).toThrow(TypeError);
});


test('toJSON', () => {
  expect(() => {
    const line = new Line({
      start: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
      end: new Point({
        x: new Decimal(7),
        y: new Decimal(7),
      }),
    });
    const lineJSON = line.toJSON();
    expect(lineJSON).toHaveProperty("className", "Line");
    expect(lineJSON).toHaveProperty("data");
    expect(lineJSON.data).toHaveProperty("start", {
      className: "Point",
      data: {
        x: "7",
        y: "7",
      },
    });
    expect(lineJSON.data).toHaveProperty("end", {
      className: "Point",
      data: {
        x: "7",
        y: "7",
      },
    });
  }).not.toThrow();
});