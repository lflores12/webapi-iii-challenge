const express = 'express';

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = `${req.params.id}`;
    if(!id){
        res.status(400).json({
            message: 'indalid user id'
        })
    } else {
        req.user = id
    }
};

function validateUser(req, res, next) {
    if(!req.body){
        res.status(400).json({
            message: "missing user data"
        });
    } else if(!req.body.name){
        res.status(400).json({
            message: "missing required name field"
        });
    } next();
};

function validatePost(req, res, next) {
    if(!req.body){
        res.status(400).json({
            message: "missing post data"
        });
    } else if (!req.body.text){
        res.status(400).json({
            message: "missing required name field"
        });
    } next();
};

module.exports = router;
