const Crypto = require("../models/Crypto");

async function createCrypto(crypto) {
  const result = new Crypto(crypto);
  await result.save();

  return result;
}

async function getCryptoById(id) {
  return Crypto.findById(id).lean();
}

async function getCryptoAndUsers(id) {
  return Crypto.findById(id).populate("owner").populate("buyCrypto").lean();
}

async function getAllCryptos() {
  return Crypto.find({}).lean();
}

async function editCrypto(id, crypto) {
  const existing = await Crypto.findById(id);

  existing.name = crypto.name;
  existing.image = crypto.image;
  existing.price = crypto.price;
  existing.description = crypto.description;
  existing.paymentMethod = crypto.paymentMethod;

  await existing.save();
}

async function deleteById(id) {
  return Crypto.findByIdAndDelete(id);
}

async function bye(cryptoId, userId) {
  const crypto = await Crypto.findById(cryptoId);

  if (crypto.buyCrypto.includes(userId)) {
    throw new Error("User has already bye");
  }

  crypto.buyCrypto.push(userId);

  await crypto.save();
}

module.exports = {
  getAllCryptos,
  getCryptoAndUsers,
  getCryptoById,
  createCrypto,
  editCrypto,
  deleteById,
  bye
};
