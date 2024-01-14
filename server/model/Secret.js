import { Schema,model } from "mongoose";

const secretSchema = new Schema({
  content: { type: String, required: true },
  userId: { type:Schema.Types.ObjectId, ref: "User", required: true },
});

const Secret = model("Secret", secretSchema);

export default Secret;
