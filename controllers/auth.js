const SessionModel = require('../models/sessionModel');

exports.checkSignedIn = async (req, res, next) => {

    if (await SessionModel.checkSession(req.session.userID)) {
        next();
        return;
    }

    res.render('login',{err:'you must be logged in to access this page'});
}

exports.checkAdminLoggedIn = async (req, res, next) => {
   
        if (req.session.admin) {
            next();
            return;
        }
    
        res.render('login',{err:'you must be logged in to access this page'});
    }