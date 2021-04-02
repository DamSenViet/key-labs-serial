import pointSchema from "./Point.schema";

export default {
  type: "object",
  required: ["points"],
  properties: {
    points: {
      type: "array",
      items: pointSchema,
    }
  }
};