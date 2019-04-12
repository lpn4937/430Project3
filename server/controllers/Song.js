const models = require('../models');
const request = require('request');

const Song = models.Song;

// render the makerpage (the view songs page)
const makerPage = (req, res) => {
  Song.SongModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), songs: docs });
  });
};

// render share page - profitable method; user must use credit card to use share
const sharePage = (req, res) => {
  res.render('share', { csrfToken: req.csrfToken() });
};

// render page to add new songs to user list
const addNewPage = (req, res) => {
  Song.SongModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('addNew', { csrfToken: req.csrfToken(), songs: docs });
  });
};

// delete a song based on song name
const deleteSong = (req, res) => {
  Song.SongModel.deleteOne({ name: req.query.name }, (err) => {
    if (err) console.log(err);
  });
  res.redirect('/');
};

// helper promise function for itunes requests
const getTunes = (url) => new Promise((resolve, reject) => {
  request(url, (err, response, body) => {
    if (err) reject(err);
    if (response.statusCode !== 200) {
      reject(`Invalid status code <${response.statusCode}>`);
    }
    resolve(body);
  });
  return;
});

// make a new song to add to user list
const makeSong = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Song name is required' });
  }

  const url = req.body.artist ? `https://itunes.apple.com/search?term=${req.body.artist}+${req.body.name}&limit=1` : `https://itunes.apple.com/search?term=${req.body.name}&limit=1`;

  getTunes(url).then(result => {
    const results = JSON.parse(result).results[0];

    // create data based on itunes results
    let songData;
    if (results) {
      // if the user entered values, use those
      const artist = req.body.artist ? req.body.artist : results.artistName;
      const album = req.body.album ? req.body.album : results.collectionName;

      songData = {
        name: req.body.name,
        artist,
        album,
        preview: results.previewUrl,
        art: results.artworkUrl100.replace('100x100', '600x600'),
        owner: req.session.account._id,
      };
    } else {
      songData = {
        name: req.body.name,
        artist: req.body.artist,
        album: req.body.album,
        art: 'assets/img/domoface.jpeg',
        owner: req.session.account._id,
      };
    }

    const newSong = new Song.SongModel(songData);

    const songPromise = newSong.save();

    songPromise.then(() => res.redirect('/'));

    songPromise.catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Song already exists' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });

    return songPromise;
  }).catch(err => {
    console.log(err);
  });
  return res.redirect('/');
};

// add search result to song list
const addToList = (req, res) => {
  const url = `https://itunes.apple.com/lookup?id=${req.query.name}`;

  getTunes(url).then(result => {
    const results = JSON.parse(result).results[0];

    const songData = {
      name: results.trackName,
      artist: results.artistName,
      album: results.artistName,
      preview: results.previewUrl,
      art: results.artworkUrl100.replace('100x100', '600x600'),
      owner: req.session.account._id,
    };

    const newSong = new Song.SongModel(songData);
    newSong.save();

    res.status(200);
    // return songPromise;
    return res.redirect('/');
  }).catch(err => {
    console.log(err);
  });
  return res.redirect('/');
};

// search itunes from search bar
const search = (req, res) => {
  const url = `https://itunes.apple.com/search?term=${req.query.searchBar}`;

  getTunes(url).then(result => {
    const results = JSON.parse(result).results;
    for (let i = 0; i < results.length - 1; i++) {
      if (results[i].artworkUrl100) {
        results[i].artworkUrl100 = results[i].artworkUrl100.replace('100x100', '600x600');
      }
    }

    res.render('search', { csrfToken: req.csrfToken(), songs: results });
  }).catch(err => {
    console.log(err);
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeSong;
module.exports.addNewPage = addNewPage;
module.exports.deleteSong = deleteSong;
module.exports.search = search;
module.exports.sharePage = sharePage;
module.exports.addToList = addToList;
