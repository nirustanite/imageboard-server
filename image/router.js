const { Router } = require('express');
const Image = require('./model');

const router = new Router();

router.post('/image', (req,res,next) => {
    Image.create(req.body)
         .then(image => {
             if(!image){
                 return res.status(404).end()
             }
             return res.json(image)
         })
         .catch(next)
});

router.get('/image', (req,res,next) => {
    Image.findAll()
         .then(images => {
             if(!images){
                 return res.status(404).end();
             }
             return res.json(images);
         })
         .catch(next)
});

module.exports = router;