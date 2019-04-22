const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let SharedSongModel = {};
const setName = (name) => _.escape(name).trim();

const SharedSongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  artist: {
    type: String,
    required: false,
    trim: true,
  },

  album: {
    type: String,
    required: false,
    trim: true,
  },

  // album art displayed with song
  art: {
    type: String,
    required: false,
    trim: true,
  },

  // audio preview displayed with song
  preview: {
    type: String,
    required: false,
    trim: true,
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

SharedSongSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  artist: doc.artist,
  album: doc.album,
});

SharedSongSchema.statics.findByOwner = (callback) => {
  // const search = {
  //   owner: convertId(ownerId),
  // };

  return SharedSongModel.find().select('name artist album art preview').exec(callback);
};

SharedSongModel = mongoose.model('SharedSong', SharedSongSchema);

module.exports.SharedSongModel = SharedSongModel;
module.exports.SharedSongSchema = SharedSongSchema;
