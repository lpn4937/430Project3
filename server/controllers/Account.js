const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const notFound = (req, res) => {
  res.render('404');
};

// render the password change page
const changePasswordPage = (req, res) => {
  res.render('changePassword', { csrfToken: req.csrfToken() });
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return (res.status(400).json({ error: 'All fields are required' }));
  }
  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return (res.status(400).json({ error: 'Wrong username or password' }));
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

    // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return (res.status(400).json({ error: 'RAWR! All fields are required' }));
  }
  if (req.body.pass !== req.body.pass2) {
    return (res.status(400).json({ error: 'RAWR! Passwords do not match' }));
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
      premium: false,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return (res.status(400).json({ error: 'Username already in use.' }));
      }
      return (res.status(400).json({ error: 'An error occurred' }));
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

// make the account premium when the user "submits cc info"
const makePremium = (request, res) => Account.AccountModel.findOne(
    { username: request.session.account.username }, (err, account) => {
      const req = request;
      if (account) {
        const newAccount = account;
        newAccount.premium = true;
        newAccount.save((error) => {
          if (error) console.log(error);
        });
        req.session.account = Account.AccountModel.toAPI(newAccount);
      }

      return res.redirect('/sharePage');
    });


// delete the user account and redirect them to root
const deleteAccount = (request, response) => {
  Account.AccountModel.remove({ username: request.session.account.username }, (err) => {
    if (err) console.log(err);
  });

  request.session.destroy();
  response.redirect('/');
};

// allow user to change the account password
const changePassword = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.currentPass = `${req.body.currentPass}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  // check if input is valid
  if (!req.body.currentPass || !req.body.pass || !req.body.pass2) {
    return (res.status(400).json({ error: 'All fields are required' }));
  }
  if (req.body.pass !== req.body.pass2) {
    return (res.status(400).json({ error: 'Passwords do not match' }));
  }

  // check if user password is correct
  // if correct change password
  return Account.AccountModel.authenticate(
      req.session.account.username,
      req.body.currentPass,
      (err, account) => {
        if (err || !account) {
          return res.status(401).json({ error: 'Incorrect password' });
        }

        const newAccount = account;

        // similar to how password was created in the first place
        return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
          newAccount.password = hash;
          newAccount.salt = salt;

          newAccount.save();
          // const savePromise = newAccount.save();

          // savePromise.then(() => res.json({
          //   password: newAccount.password,
          // }));
          // savePromise.then(() => res.json({
          //   redirect: '/maker',
          // }));

          // savePromise.catch((saveErr) => {
          //   res.json(saveErr);
          // });

          return res.json({ redirect: '/maker' });
        });
      });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;

module.exports.notFound = notFound;

module.exports.changePassword = changePassword;
module.exports.changePasswordPage = changePasswordPage;
module.exports.deleteAccount = deleteAccount;
module.exports.makePremium = makePremium;
