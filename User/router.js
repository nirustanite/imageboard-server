const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('./model');
const {toJWT} = require('../auth/jwt');
const auth = require('../auth/router');

const router = new Router();

router.post('/signup', (req,res) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10)
    }
    User.create(user)
        .then(user => {
            if(!user){
                return res.statsus(404).end();
            }
            return res.json(user)
        })
})


router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password
    
    if(!email || !password){
        res.status(400).send({
            message: 'Please supply a vaid email and password'
        })
    }
    else{
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(user => {
            if(!user){
                res.status(400).send({
                    message: 'User with that email dosenot exist'
                })
            }
            else if(bcrypt.compareSync(password, user.password)){
                res.send({
                    jwt: toJWT({userId: user.id})
                })
            }
            else{
                res.statsu(400).send({
                    message: 'Password was incorrect'
                })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).send({
                message: 'Something went wrong'
            })
        })
    }
})

router.get('/secret-endpoint', auth, (req,res) => {
    res.send({
        message: `Thanks for visiting the secret endpoint ${req.user.email}`
    })
})

module.exports = router;