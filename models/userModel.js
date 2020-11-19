const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const user = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: false }
}, {
    toObject: {
        virtuals: true
    }
}

);

user.statics.checkExists = async function (email, phoneNumber) {
    const exists = await this.exists({ $or: [{ email }, { phoneNumber }] });

    return exists;
}

user.statics.hashPassword = async function (password) {
    let hash = await bcrypt.hash(password, 12);

    return hash;
}

user.statics.comparePassword = async function (email, attemptedPassword) {
    let user = await this.findOne({ email });

    if (!user) {
        return false;
    }

    let result = await bcrypt.compare(attemptedPassword, user.password);

    return result;
}

user.statics.checkIfAdmin = async function (email) {
    let user = await this.findOne({ email });

    if (user.role == 'Admin') {
        return true;
    }
    return false;
}


module.exports = model('users', user)

