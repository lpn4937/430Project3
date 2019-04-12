const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/changePassword', mid.requiresSecure, mid.requiresLogin,
     controllers.Account.changePasswordPage);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogin,
     controllers.Account.changePassword);
  app.get('/deleteAccount', mid.requiresSecure, mid.requiresLogin,
     controllers.Account.deleteAccount);
  app.get('/deleteSong', mid.requiresSecure, mid.requiresLogin, controllers.Song.deleteSong);
  app.get('/searchTunes', mid.requiresLogin, controllers.Song.search);
  app.get('/maker', mid.requiresLogin, controllers.Song.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Song.make);
  app.get('/addNew', mid.requiresLogin, controllers.Song.addNewPage);
  app.get('/share', mid.requiresLogin, mid.requiresSecure, controllers.Song.sharePage);
  app.get('/addToList', mid.requiresLogin, mid.requiresSecure, controllers.Song.addToList);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('*', controllers.Account.notFound, mid.requiresSecure);
};

module.exports = router;
