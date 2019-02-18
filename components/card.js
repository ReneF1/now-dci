import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        const {classes, title, description, cover, author, date} = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            <img src={`https://media.graphcms.com/resize=width:60/${author.image.handle}`}/>
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={title}
                    subheader={date}
                />
                <CardMedia
                    className={classes.media}
                    image={`https://media.graphcms.com/resize=width:400/${cover}`}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography component="p">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

PortfolioCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PortfolioCard);
