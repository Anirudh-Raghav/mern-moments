import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import './postForm.css';

import { createPost, updatePost } from '../../actions/posts';

const PostForm = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', image: '', });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('login'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', image: '' });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0) dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
        else dispatch(createPost({ ...postData, author: user?.result?._id }))

        clear();
    };

    if (!user?.result?.name) {
        return (
            <h6 className='post-form mt-5 position-fixed mx-auto'>Please Sign In to create your own memories and like other's memories.</h6>
        );
    }

    return (
        <div className='post-form mt-4'>
            <h4>{currentId ? 'Edit Post' : 'Create Post'}</h4>
            <form method="post" noValidate onSubmit={onSubmit} encType='multipart/form-data'>
                <div className='mb-2'>
                    <label className='form-label' htmlFor="title">Title</label>
                    <br />
                    <input
                        className='form-control'
                        type="text"
                        name="title"
                        id="title"
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    />
                </div>

                <div className='mb-2'>
                    <label className='form-label' htmlFor="message">Message</label>
                    <br />
                    <input
                        className='form-control'
                        type="text"
                        name="message"
                        id="message"
                        value={postData.message}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    />
                </div>

                <div className='mb-2'>
                    <label className='form-label' htmlFor="tags">Tags</label>
                    <br />
                    <input
                        className='form-control'
                        type="text"
                        name="tags"
                        id="tags"
                        value={postData.tags}
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                    />
                </div>

                <div className='mb-2'>
                    <label className='form-label' htmlFor="image">Image</label>
                    <br />
                    {/* <FileBase
                        className='form-control'
                        type='file'
                        multiple={false}
                        onDone={(base64) => setPostData({ ...postData, image: base64 })} /> */}
                    <input
                        className='form-control'
                        type="file"
                        name="image"
                        id="image" onChange={(e) => setPostData({ ...postData, image: e.target.value })} />
                </div>

                <div className='d-flex justify-content-around mt-3 mb-2'>
                    <button className='btn btn-success' type="submit">Submit</button>
                    <button className='btn btn-danger' onClick={clear}>Clear</button>
                </div>
            </form>
        </div>
    )
}

export default PostForm;