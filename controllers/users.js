const User = require('../models/user');

const index = async (req, res) => {
    const allUsers = await User.find({});
    res.render('users/index.ejs', { users: allUsers });
};

module.exports = {
  index,
};
