import express from 'express';
import mongoose from 'mongoose';

import PostModel from '../models/postModel.js';


export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('author');

        return res.status(200).json({ success: true, data: posts });
    }
    catch (err) {
        return res.status(404).json({ success: false, message: err.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostModel.findById(id);
        return res.status(200).json({ success: true, data: post });
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ success: false, message: err.message });
    }
};

export const createPost = async (req, res) => {
    const { title, message, author, tags } = req.body;

    const { path: url, filename } = req.files;
    console.log();

    const newPost = new PostModel({ title, message, image: { url, filename }, author, tags })

    try {
        await newPost.save();

        return res.status(201).json({ success: true, data: newPost });
    }
    catch (err) {
        console.log(err);
        return res.status(409).json({ success: false, message: err.message });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, author, image, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ success: false, message: `No post with id: ${id}` });

    const updatedPost = { title, message, author, tags, image, _id: id };

    try {
        await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });
        return res.json({ success: true, data: updatedPost });
    }
    catch (err) {
        console.log(err);
        return res.status(409).json({ success: false, message: err.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ success: false, message: `No post with id: ${id}` });

    await PostModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const router = express.Router();