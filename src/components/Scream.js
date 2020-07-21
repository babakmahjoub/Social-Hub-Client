import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectfit: 'cover'
    }
}

export class Scream extends Component {
    render() {
        const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCound, commentCount } } = this.props
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia className={classes.image} image={userImage} title="profile Image" />
                    <CardContent className={classes.content}>
                        <Typography variant='h5' component={Link} to={`/user/${userHandle}`} color='primary' >{userHandle}</Typography>
                        <Typography variant='body2' color='textSecondary'>{createdAt}</Typography>
                        <Typography variant='body1'>{body}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Scream)
