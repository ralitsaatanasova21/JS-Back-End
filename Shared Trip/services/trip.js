const Trip = require("../models/Trip");

async function createTrip(trip) {
  const result = new Trip(trip);
  await result.save();

  return result;
}

async function getTripById(id) {
  return Trip.findById(id).lean();
}

async function getTripAndUsers(id) {
  return Trip.findById(id).populate("owner").populate("buddies").lean();
}

async function getAllTrips() {
  return Trip.find({}).lean();
}

// async function getPostsByAuthor(userId) {
//   return Post.find({author: userId}).populate("author", "firstName lastName");
// }

async function editTrip(id, trip) {
  const existing = await Trip.findById(id);

  existing.startPath = trip.startPath;
  existing.endPath = trip.endPath;
  existing.date = trip.date;
  existing.time = trip.time;
  existing.carImg = trip.carImg;
  existing.carBrand = trip.carBrand;
  existing.seats = trip.seats;
  existing.price = trip.price;
  existing.description = trip.description;

  await existing.save();
}

async function deleteById(id) {
  return Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
  const trip = await Trip.findById(tripId);

  if (trip.buddies.includes(userId)) {
    throw new Error("User is already part of the trip");
  }

  trip.buddies.push(userId);
  await trip.save();
}

// async function vote(postId, userId, value) {
//   const post = await Post.findById(postId);

//   if (post.votes.includes(userId)) {
//     throw new Error("User has already voted");
//   }

//   post.votes.push(userId);
//   post.rating += value;

//   await post.save();
// }

module.exports = {
  createTrip,
  getTripById,
  getAllTrips,
  getTripAndUsers,
  editTrip,
  deleteById,
  joinTrip,
};
