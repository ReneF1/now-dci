import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Link from 'next/link';


const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class PortfolioCard extends React.Component {
    state = {expanded: false};

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        const {classes, title, description, cover, author, date, slug} = this.props;
        return (
            <Link prefetch href={{pathname: '/post', query: {slug: slug}}}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                <img src={`https://media.graphcms.com/resize=width:60/${author.image.handle}`}/>
                            </Avatar>
                        }
                        title={author.name}
                        subheader={date}
                    />
                    <CardMedia
                        className={classes.media}
                        image={`https://media.graphcms.com/resize=width:400/${cover}`}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography component="p" variant='h6'>
                            {title}
                        </Typography>
                        <Typography component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        );
    }
}

PortfolioCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PortfolioCard);
