const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: { type: Array },
});
tripSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("tripData", tripSchema);
