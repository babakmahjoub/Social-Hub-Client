import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';

//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ChatIcon from '@material-ui/icons/Chat';
// import CardActions from '@material-ui/core/CardActions';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

//Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectfit: 'cover'
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, user: { authenticated, credentials: { handle } } } = this.props;
        const deleteButton = authenticated && userHandle === handle ? (<DeleteScream screamId={screamId} />) : null;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia className={classes.image} image={userImage} title="profile Image" />
                    <CardContent className={classes.content}>
                        <Typography variant='h5' component={Link} to={`/user/${userHandle}`} color='primary' >{userHandle}</Typography>
                        {deleteButton}
                        <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                        <Typography variant='body1'>{body}</Typography>
                        <LikeButton screamId={screamId} />
                        <span>{likeCount} Likes</span>
                        <MyButton tip="comments"><ChatIcon color="primary" /></MyButton>
                        <span>{commentCount} comments</span>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));