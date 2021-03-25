import mongoose from 'mongoose' //vår ODM

const { Schema, model } = mongoose

const userSchema = Schema({ //strukturera upp hur metadatan ska se ut som ska till databasen
  email: { //här kan vi lägga till flera regler
    type: String,
    unique: true, //mongooses egen funktion, kollar att alla användarnamn är unika
    allowNull: false,
    required: true //anropet går inte igenom om vi inte skickar med ett användarnamn
  },
  firstname: {
    type: String,
    allowNull: false,
    required: true
  },
  lastname: {
    type: String,
    allowNull: false,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  /*   age: {
      type: Number,
      min: [18, 'You need to be above 18'],
      max: [123, 'You have the world record in age, please leave this site and go celebrate instead!'],
      required: true
    } */
}, { timestamps: true }) //får reda på när data sparades och uppdaterades

const UserModel = model('user', userSchema)
export default UserModel