// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxLength: 320,
  },
  password: {
    type: String,
    required: true,
  },
  conversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
});

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  }
});

usuarioSchema.methods.comparePasswords = async function (formPassword) {
  return await bcrypt.compare(formPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
