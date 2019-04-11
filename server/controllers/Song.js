const models = require('../models');
const request = require('request');

const Song = models.Song;

const makerPage = (req, res) => {
  Song.SongModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), songs: docs });
  });
};

const addNewPage = (req, res) => {
  Song.SongModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('addNew', { csrfToken: req.csrfToken(), songs: docs });
  });
};

const deleteSong = (request, response) => {
  Song.SongModel.remove({name: request.query.name}, (err) => {
    if(err) console.log(err);
  });
  response.redirect('/');
};

const makeSong = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Song name is required' });
  }

  let url = req.body.artist? `https://itunes.apple.com/search?term=${req.body.artist}+${req.body.name}&limit=1` : `https://itunes.apple.com/search?term=${req.body.name}&limit=1`

  getTunes(url).then(result => {
    result = JSON.parse(result).results[0];
    
    let songData;
    if(result){
      let artist = req.body.artist? req.body.artist : result.artistName;
      let album = req.body.album? req.body.album : result.collectionName;

      songData = {
        name: req.body.name,
        artist: artist,
        album: album,
        preview: result.previewUrl,
        art: result.artworkUrl100,
        owner: req.session.account._id,
      };
    }else{
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
  
    songPromise.then(() => res.json({ redirect: '/maker' }));
  
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
};

const getTunes = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if(err) reject(err);
      if(response.statusCode != 200){
        reject('Invalid status code <' + response.statusCode + '>');
      }
      resolve(body);
    });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeSong;
module.exports.addNewPage = addNewPage;
module.exports.deleteSong = deleteSong;
