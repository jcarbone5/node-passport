const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: { type: String, trim: true, unique: true },
    name: { type: String, trim: true },
    lastname: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String }
}, {
    timestamps: true
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.decryptPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model("User", userSchema);