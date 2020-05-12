import Point from "~/Geometry/Point";

class StrictPoint extends Point {
  constructor(...params) {
    super(...params);
  }

  validate = () => {
    for (let val of [x, y]) {
      if (val % 0.25 !== 0) throw RangeError();
    }
  }
}


export default StrictPoint;