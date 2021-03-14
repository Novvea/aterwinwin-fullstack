//kommer kommunicera med mongoose
//strukturerar upp vilka fält som blir nåbara för usern
import mongoose from 'mongoose' //vår ODM
const { Schema } = mongoose //vi använder schema som kommer från mongoose, här destructurar vi ut det värdet

//här skapar vi ett schema, vi strukturerar upp hur metadatan som sparas i databasen ser ut och vilken data som är tillåten
const itemSchema = Schema({
  name: {
    type: String,
    allowNull: false, //säger att det måste vara en sträng
    required: true
  },
  category: {
    type: String,
    allowNull: false,
    required: true
  },
  url: {
    type: String
  }
}, { timestamps: true }) // funktion i mongoose, ger timestamps när dokyument sparas och uppdateras

const ItemModel = mongoose.model('item', itemSchema) //'item' sparas så i databasen med strukturen itemSchema
export default ItemModel //exporterar för att ska användas i controller