const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://bindrakartik64:kartikbindra64@web3app.mcioofd.mongodb.net/',
  {useNewUrlParser: true, useUnifiedTopology: true},
);

const paymentSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  paid: Boolean
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  Payment
};