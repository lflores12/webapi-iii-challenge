const express = require('express');

const Posts = require('./postDb');


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving posts"
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);
        
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Post not found"
            })
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error retrieving Post"
        });
    }
});

router.delete('/:id', validatePostId, async (req, res) => {
    try {
        res.status(200).json( await Posts.remove(req.params.id));
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error removing that post"
        })
    }
});

router.put('/:id', validatePostId, async (req, res) => {
    try {
        res.status(200).json( await Posts.update(req.params.id, req.body));
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "error updating user"
        })
    }
});

// custom middleware

function validatePostId(req, res, next) {
    const id = `${req.params.id}`;
    if(!id){
        res.status(400).json({
            message: "invalid post id" 
        })
    } else {
        req.post = id;
    } next();
};

module.exports = router;