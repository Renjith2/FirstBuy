const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const db = require('../DBCOnfig'); // Import database configuration
const router = require('express').Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        // Check if email already exists
        const emailExists = await new Promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS cnt FROM user WHERE email = ?", req.body.email, (err, data) => {
                if (err) {
                    console.error(err);
                    return reject('Internal Server Error');
                }
                resolve(data[0].cnt > 0);
            });
        });
  
        if (emailExists) {
            console.log("Email Exists!!!");
            return res.status(409).send('Email already exists');
        }
  
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
        // Insert user data
        db.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [req.body.name, req.body.email, hashedPassword], (err, insert) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.status(200).json({ message: 'Registration successful' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });


  router.post('/login', async (req, res) => {
    try {
        // Check if email exists
        const emailExists = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE email = ?", req.body.email, (err, data) => {
                if (err) {
                    console.error(err);
                    return reject('Internal Server Error');
                }
                resolve(data.length > 0 ? data[0] : null);
            });
        });
  
        // If email doesn't exist, return error
        if (!emailExists) {
            console.log("Email not found!!!");
            return res.status(401).send('Email not found');
        }
  
        // Extract hashed password from user data
        const hashedPassword = emailExists.password;
  
        // Check if password matches
        const passwordMatches = await bcrypt.compare(req.body.password, hashedPassword);
  
        // If password doesn't match, return error
        if (!passwordMatches) {
            console.log("Password incorrect!!!");
            return res.status(401).send('Password incorrect');
        }
  
        // If email and password both match, login successful
        console.log("Login successful!!!");
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports=router


  