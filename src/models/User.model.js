const mongoose = require('mongoose'); //vår ODM
const { Schema } = mongoose;

//*************************************
//Schema for user from google
//*************************************
const authUserSchema = new Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
  email: String,
});

module.exports = mongoose.model('authuser', authUserSchema); //This creates our model class
//const UserModel = mongoose.model('users', userSchema) //This creates our model class

//*************************************
//Schema för my own not so secure logged in user
//*************************************
const userSchema2 = Schema(
  {
    //strukturera upp hur metadatan ska se ut som ska till databasen
    email: {
      //här kan vi lägga till flera regler
      type: String,
      unique: true, //mongooses egen funktion, kollar att alla användarnamn är unika
      allowNull: false,
      required: true, //anropet går inte igenom om vi inte skickar med ett användarnamn
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
); //får reda på när data sparades och uppdaterades

const UserModel2 = mongoose.model('user', userSchema2); //This creates our model class
module.exports = UserModel2;
