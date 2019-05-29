const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
   try {
       const newAccount = await Users.insert(req.body);
       res.status(201).json(newAccount);
   } catch (error){
    console.log(error);
    res.status(500).json({
        message: "Error adding the user"
    });
   }
});

router.post('/:id/posts', validatePost, async (req, res) => {
    const postInfo = { ...req.body, user_id: req.params.id };
    try {
        const post = await Posts.insert(postInfo);
        res.status(201).json(post);
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error adding post"
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const accounts = await Users.get(req.query);
        res.status(200).json(accounts);
    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Error retrieving accounts"
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const account = await Users.getById(req.params.id);
        
        if(account){
            res.status(200).json(account);
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Error retrieving user"
        });
    }
});

router.get('/:id/posts', async (req, res) => {
    try {
    const posts = await Posts.getById(req.params.id)
    res.status(200).json(posts);
    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Error retrieving posts"
        });
    }
});

router.delete('/:id',validateUserId, async (req, res) => {
    try {
        res.status(200).json(await Users.remove(req.params.id));
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error removing user"
        })
    }
});

router.put('/:id', validateUserId, async (req, res) => {
    try {
        res.status(200).json( await Users.update(req.params.id, req.body));
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "error updating user"
        });
    }
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
    } next();
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
