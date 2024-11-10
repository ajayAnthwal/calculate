const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    }
  },
  { timestamps: true }
);


// CONVERTING PASSWORD HASH
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return;

//   const hashedPassword = await hashPassword(this.password);

//   this.password = hashedPassword;

//   next();
// });

// Create the User model if it doesn't already exist
export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
