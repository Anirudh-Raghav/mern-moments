import express from 'express';
import multer from 'multer';

import { getAllPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/postControllers.js';
import validateToken from '../middleware/jwt.js'
import { storage } from '../cloudinary';

const upload = multer({ storage });

const router = express.Router();

router.route('/')
    .get(getAllPosts)
    .post(validateToken, upload.single('image'), createPost);

router.route('/:id')
    .get(validateToken, getPost)
    .put(validateToken, updatePost)
    .delete(validateToken, deletePost);

router.put(':/id/like', validateToken, likePost);

export default router;