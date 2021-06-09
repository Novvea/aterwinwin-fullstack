const mongoose = require('mongoose');
const { Schema } = mongoose;

//*************************************
//Schema for user from google oauth
//*************************************
const authUserSchema = new Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
  email: String,
});

module.exports = mongoose.model('authuser', authUserSchema);

//*************************************
//Schema for my own not so secure logged in user
//*************************************
const userSchema2 = Schema(
  {
    email: {
      type: String,
      unique: true,
      allowNull: false,
      required: true,
    },
    firstname: {
      type: String,
      allowNull: false,
      required: true,
    },
    lastname: {
      type: String,
      allowNull: false,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel2 = mongoose.model('user', userSchema2);
module.exports = UserModel2;
