const {Schema, model} = require('mongoose');

const session = new Schema({
    session: {type: String},
    expires: {type: Date}
});

session.statics.checkSession = async function(userID) {
    let sessions = await this.find({});

    for (const session of sessions) {
        if (JSON.parse(session.session).userID == userID) {
            return true;
        }
    }

    return false;
}

module.exports = model('session', session);