const models = require('../models');

const SharedSong = models.SharedSong;

const sharePage = (req, res) => {
  res.render('shared');
};

// delete a song based on song name
const deleteSong = (req, res) => {
  SharedSong.SharedSongModel.deleteOne({ name: req.query.name }, (err) => {
    if (err) console.log(err);
  });
  res.render('shared');
};

// Get all the songs from the shared model
const getSongs = (req, res) => SharedSong.SharedSongModel.findByOwner((err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred' });
  }

  return res.json({ songs: docs });
});

// add search result to song list
const addToList = (req, res) => {
  const songData = {
    name: req.query.name[0],
    artist: req.query.artist,
    album: req.query.album,
    preview: req.query.preview,
    art: req.query.art,
  };

  const newSong = new SharedSong.SharedSongModel(songData);
  newSong.save();

  // return songPromise;
  return res.redirect('/');
};

module.exports.deleteSharedSong = deleteSong;
module.exports.getSharedSongs = getSongs;
module.exports.sharePage = sharePage;
module.exports.addToSharedList = addToList;
