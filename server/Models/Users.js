const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    tokens: [{
        token:  {
            type: String,
        }
    }],
})

UserSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id.toString()}, process.env.secret);
    this.tokens = this.tokens.concat({token})
    await this.save();
    return token;
}

UserSchema.pre("save", async function(next) {
    console.log(`Current password: ${this.password}`)
    this.password = await bcrypt.hash(this.password, 10)
    console.log(`Current password: ${this.password}`)
    next()
})

module.exports = UserInfo = mongoose.model("users", UserSchema)