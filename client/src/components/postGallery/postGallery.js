import React from 'react';
import { useSelector } from 'react-redux';

// SPINNER
// <div className='spinner-container'>
//                     <div className="spinner-border text-primary" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                 </div> 

import './postGallery.css';

import Post from './post/post';

const PostGallery = ({ setCurrentId }) => {

    const posts = useSelector((state) => state.posts);

    return (
        <div>
            {!posts.length ?
                <h1 className='text-center no-posts'>No posts</h1>
                :
                <div className='d-flex justify-content-around flex-wrap'>
                    {posts.map((post) => <Post key={post._id} post={post} setCurrentId={setCurrentId} />)}
                </div>
            }
        </div >
    )
};

export default PostGallery;