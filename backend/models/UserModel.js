const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
              },
              quantity: {
                type: Number,
                default: 1,
                min: 1
              }
        }
    ],
    userType: {
        type: String,
        required: true,
        enum: ['User', 'Admin']
    }
},{timestamps: true})

userSchema.statics.signup = async function(username, email, password, userType)
{
    // const {username, email, password, userType} = req.body;
    
        if(!username || !email || !password || !userType)
        {
            throw Error("All fields must be filled")
        }

        if(!validator.isEmail(email))
        {
            throw Error('Email is not valid')
        }

        if(!validator.isStrongPassword(password))
        {
            throw Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        }

        const userExists = await this.findOne({email});
        if(userExists)
        {
            throw Error("Email already in use") 
        }   

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({
            username,
            email,
            password: hash,
            userType
        })

        return user;
}

userSchema.statics.login = async function(email, password)
{
    if(!email || !password)
        {
            throw Error("All fields must be filled")
        }
    
        const user = await this.findOne({email})
    
        if(!user){
            throw Error("Incorrect email")
        }
    
        const match = await bcrypt.compare(password, user.password)
        
        if(!match){
            throw Error('Incorrect password')
        }
    
        return user;
}

module.exports = mongoose.model('User', userSchema)