import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config();

const url = process.env.BACKEND_URI || 'http://localhost:5000/api';

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
    const userProfile = JSON.parse(localStorage.getItem('login'));

    if (userProfile) {
        req.headers.authorization = `Bearer: ${userProfile.token}`;
    }

    return req;
});

// POST ROUTES
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => {
    console.log(`like towards the post with id=${id}`)
    return API.put(`/posts/${id}/like`)
};


// AUTHENTICATION ROUTES
export const signUp = (authFormDate) => API.post('/users/signup', authFormDate);
export const signIn = (authFormDate) => API.post('/users/signin', authFormDate);