const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // account
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/makePremium', mid.requiresLogin, controllers.Account.makePremium);
  app.get('/changePassword', mid.requiresSecure, mid.requiresLogin,
     controllers.Account.changePasswordPage);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogin,
     controllers.Account.changePassword);
  app.get('/deleteAccount', mid.requiresSecure, mid.requiresLogin,
     controllers.Account.deleteAccount);
  

  // songs
  app.get('/maker', mid.requiresLogin, controllers.Song.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Song.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getSongs', mid.requiresLogin, controllers.Song.getSongs);
  app.get('/deleteSong', mid.requiresSecure, mid.requiresLogin, controllers.Song.deleteSong);

  // itunes
  app.get('/searchTunes', mid.requiresLogin, controllers.Song.search);
  app.get('/addNew', mid.requiresLogin, controllers.Song.addNewPage);
  app.get('/addToList', mid.requiresLogin, mid.requiresSecure, controllers.Song.addToList);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  
  //shared
  app.get('/getSharedSongs', mid.requiresLogin, mid.requiresSecure,
   mid.requiresPremium, controllers.SharedSong.getSharedSongs);

  // 404
  app.get('*', controllers.Account.notFound, mid.requiresSecure);
};

module.exports = router;
