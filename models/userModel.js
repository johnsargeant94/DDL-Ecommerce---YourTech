const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const user = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: false, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
}, {
    toObject: {
        virtuals: true
        }
}

);

user.statics.checkExists = async function (email, phoneNumber) {
    const exists = await this.exists({$or: [{email}, {phoneNumber}]});

    return exists;
}

user.statics.hashPassword = async function (password) {
    let hash = await bcrypt.hash(password, 12);

    return hash;
}

user.statics.comparePassword = async function (email, attemptedPassword) {
    let user = await this.findOne({email});

    if (!user) {
        return false;
    }

    let result = await bcrypt.compare(attemptedPassword, user.password);

    return result;
}

module.exports = model('users', user)


/*
Signup
Password123 -> weufb237rgf2uifb34f2hiu3874 -> store in DB
Password123 -> akjghnry5hr8ewfiubweyqwbuig
md5
password123 -> weufb237rgf2uifb34f2hiu3874
password123 -> weufb237rgf2uifb34f2hiu3874
Login
attempted password -> hash input == weufb237rgf2uifb34f2hiu3874
*/