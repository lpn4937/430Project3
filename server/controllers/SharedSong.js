const models = require('../models');
const request = require('request');

const SharedSong = models.SharedSong;

// delete a song based on song name
const deleteSong = (req, res) => {
  SharedSong.SharedSongModel.deleteOne({ name: req.query.name }, (err) => {
    if (err) console.log(err);
  });
  res.redirect('/');
};

const getSongs = (req, res) => SharedSong.SharedSongModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred' });
  }

  return res.render('/shared', { songs: docs });
});

module.exports.deleteSharedSong = deleteSong;
module.exports.getSharedSongs = getSongs;
