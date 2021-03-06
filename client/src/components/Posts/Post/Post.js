import React, {useState, forwardRef, useEffect} from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Dialog, Slide, Toolbar, AppBar} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import makeStyles from './styles';
import {useDispatch} from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Post = ({ post, setCurrentId }) => {
    
    const[open, setOpen] = useState(false);
    const classes = makeStyles();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePost(post._id));
    }

    const handleLike = () => {
        dispatch(likePost(post._id));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        window.setTimeout(() =>{
            setOpen(!open);
        }
        , 100)
    };

    return(
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} onClick={handleClickOpen} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.creator}</Typography>
                <Typography variant="body2"> {moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick = {() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            </CardContent>
            <CardContent>
                <Typography className={classes.title} variant="subtitle2" gutterBottom>{post.message}</Typography>
            </CardContent>
            
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={handleLike} > 
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={handleDelete} > 
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
            <Dialog fullWidth={true} maxWidth = {'xl'} open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Card className={classes.card} onClick={handleClose}>
                    <CardMedia className={classes.mediaDialog} image={post.selectedFile} title={post.title}/>
                </Card>
            </Dialog>         
        </Card>
    )
}

export default Post;