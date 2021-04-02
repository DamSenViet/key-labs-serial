import pointSchema from "./Point.schema";

export default {
  type: "object",
  required: ["className", "data",],
  properties: {
    className: { const: "Line" },
    data: {
      type: "object",
      required: ["start", "end"],
      properties: {
        start: pointSchema,
        end: pointSchema,
      },
    },
  },
  additionalProperties: false,
};