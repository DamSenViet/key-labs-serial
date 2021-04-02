export default {
  type: "object",
  required: ["className", "data",],
  properties: {
    className: { const: "Point" },
    data: {
      type: "object",
      required: ["x", "y"],
      properties: {
        x: { type: "string" },
        y: { type: "string" },
      },
    },
  },
  additionalProperties: false,
};