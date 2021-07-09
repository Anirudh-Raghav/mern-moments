import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

import { getAllPosts } from '../../actions/posts';
import PostGallery from '../../components/postGallery/postGallery';
import PostForm from '../../components/postForm/postForm'

const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [currentId, dispatch]);

    return (
        <Container >
            <div className='row'>
                <div className='col-sm-3 d-flex justify-content-center'>
                    <PostForm setCurrentId={setCurrentId} />
                </div>
                <div className='col-sm-9'>
                    <PostGallery setCurrentId={setCurrentId} />
                </div>
            </div>
        </Container>
    )
}

export default Home