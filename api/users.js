/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { getUserByUsername, createUser, getUser } = require(`../db/users`);
const { getAllRoutinesByUser } = require(`../db/routines`);
const { requireUser } = require('./util.js');
const jwt = require('jsonwebtoken');

// POST /api/users/register
router.post('/register', async (req, res, next) => {

    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            res.send({ error: 'error', name: 'UserExistsError', message: `User ${_user.username} is already taken.` });
        } else if (password.length < 8) {
            res.send({ error: 'error', message: "Password Too Short!", name: 'PasswordTooShort' })
        } else {
            const user = await createUser({ username, password });

            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1w' });
            res.send({ message: "thank you for signing up", token: `${token}`, user: user });
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
});
// POST /api/users/login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    
    // request must have both
    // console.log("username and password: ", username, password)
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });

        res.send({error: "Please supply both a username and password"})
    }

    try {
        const user = await getUser({username, password});
        if(!user){
            res.send({error: 'Username or password is incorrect'})
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });

        } else {
            // create token & return to user
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
            res.send({ message: "you're logged in!", user, token, success: true });
        } 
    } catch (error) {
        console.log(error);
        next(error);
    }
});
// GET /api/users/me
router.get('/me', requireUser, async (req, res, next) => {
    
    res.send(req.user);

});
// GET /api/users/:username/routines
router.get('/:username/routines', requireUser, async (req, res, next) => {
    
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);
        if (!user) {
            next()
        } 
        // else if (req.user && user.id === req.user.id){
        //     const routines = await getAllRoutinesByUser({ username: username });
        //     res.send(routines);

        // } //made to pass boiler tests but not necessary to make front end function - can be removed
        else {
            const routines = await getAllRoutinesByUser({ username: username });
            res.send(routines);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }


});


module.exports = router;
