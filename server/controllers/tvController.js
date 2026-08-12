const getPopular = async (req, res) => {
  res.send('getting popular tv');
};

const getTopRated = async (req, res) => {
  res.send('getting top rated tv');
};

module.exports = {
  getPopular,
  getTopRated
};