const getMyEntries = async (req, res) => {
  res.send('getting my entries');
};

const getMovieEntries = async (req, res) => {
  res.send('getting movie entries');
};

const createOrUpdateEntry = async (req, res) => {
  res.send('creating/updating entry');
};

const deleteEntry = async (req, res) => {
  res.send('deleting entry');
};

module.exports = {
  getMyEntries,
  getMovieEntries,
  createOrUpdateEntry,
  deleteEntry
};