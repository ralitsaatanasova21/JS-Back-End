function mapErrors(err) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name == "ValidationError") {
    return Object.values(err.errors).map((e) => ({ msg: e.message }));
  } else if (typeof err.message == "string") {
    return [{ msg: err.message }];
  } else {
    return [{ msg: "Request error" }];
  }
}

// function voterViewModel(user) {
//   return {
//     _id: user._id,
//     email: user.email,
//   };
// }

module.exports = {
  mapErrors,
};
