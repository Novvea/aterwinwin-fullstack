const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    position: {
      type: String,
    },
    url: {
      type: String,
    },
    _user: {
      type: String,
      /*       type: Schema.Types.ObjectId,
      ref: 'AuthUser', //connects to the User Schema */
    },
    interestedUsers: {
      type: Array,
    },
    uninterestedUsers: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ItemModel = mongoose.model('item', itemSchema);
module.exports = ItemModel;
