import express from 'express';

import { getAllPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/postControllers.js';
import validateToken from '../middleware/jwt.js'


const router = express.Router();

router.route('/')
    .get(getAllPosts)
    .post(validateToken, createPost);

router.route('/:id')
    .get(validateToken, getPost)
    .put(validateToken, updatePost)
    .delete(validateToken, deletePost);

router.put(':/id/like', validateToken, likePost);

export default router;