const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "name already in use"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already in use"],
    trim: true,
    lowercase: true,
    validate(val){
        if(!validator.isEmail(val))
          throw new Error({error: "invalid email format"})
    }
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
