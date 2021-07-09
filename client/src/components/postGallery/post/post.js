import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';

import './post.css'

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('login'));

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === user?.result?._id) ?
                <span><i></i> &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</span>
                :
                <span><i></i> &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</span>
        }

        return <span><i></i> &nbsp;{'Like'}</span>
    }

    const checkEmptyObject = (obj) => (obj && Object.keys(obj).length === 0 && obj.constructor === Object);

    return (
        <Card className='card'>
            <img className='card-img-top' src={'post.image.url' || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} alt="" />
            <Card.Subtitle className='card-img-text'>{post?.author.name}</Card.Subtitle>
            <Card.Subtitle className='card-date'>{moment(post.createdAt).fromNow()}</Card.Subtitle>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted card-tags">{post.tags.map((tag) => `#${tag} `)}</Card.Subtitle>
                <Card.Title className='card-title'>{post.title}</Card.Title>
                <Card.Text>{post.message}</Card.Text>
                {(!checkEmptyObject(user) && user?.result?._id === post?.author?._id) && (
                    <div className='d-flex justify-content-evenly mb-3'>
                        <Button variant="outline-warning btn-sm" onClick={() => setCurrentId(post._id)}>Edit</Button>
                        <Button variant="outline-danger btn-sm" onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
                    </div>
                )}
                <div disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </div>
            </Card.Body>
        </Card>
    )
}

export default Post