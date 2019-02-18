/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import PortfolioCard from "../components/card";
import formatDistance from 'date-fns/formatDistance'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    contentContainer: {
        maxWidth: '1200px',
        margin: 'auto'
    }
});

export const allPostsQuery = gql`
    query{
        projects{
            id
            title
            description
            createdAt
            cover{
                id
                handle
            }
            authors{
                id
                name
                image{
                    id
                    handle
                }
            }
        }
    }
`
export const allPostsQueryVars = {
    skip: 0,
    first: 5
}

class Index extends React.Component {
    static getInitialProps() {
        const isServer = typeof window === "undefined";
        return {isServer};
    }

    state = {
        open: false,
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    render() {
        const {classes} = this.props;
        const {open} = this.state;

        return (
            <div className={classes.root}>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle>Super Secret Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>1-2-3-4-5</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography variant="h4" gutterBottom>
                    Material-UI
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    example project
                </Typography>
                <Typography gutterBottom>
                    <Link href="/about">
                        <a>Go to the about page</a>
                    </Link>
                </Typography>
                <Query query={allPostsQuery}>
                    {({loading, error, data: {projects}}) => {
                        if (loading) return <div>Loading</div>
                        return (
                            <Grid container spacing={24} className={classes.contentContainer}>
                                {projects.map((project, index) => (
                                    <Grid item xs={4} key={index}>
                                        <PortfolioCard
                                            title={project.title}
                                            description={project.description}
                                            cover={project.cover.handle}
                                            author={project.authors[0]}
                                            date={formatDistance(new Date(project.createdAt), new Date(), {addSuffix: true})}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
