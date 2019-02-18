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

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});

export const allPostsQuery = gql`
    query allPosts($first: Int!, $skip: Int!) {
        allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
            id
            title
            votes
            url
            createdAt
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
                <Query query={allPostsQuery} variables={allPostsQueryVars}>
                    {({loading, error, data: {allPosts}}) => {
                        if (error) return <ErrorMessage message='Error loading posts.'/>
                        if (loading) return <div>Loading</div>

                        return (
                            <section>
                                <ul>
                                    {allPosts.map((post, index) => (
                                        <li key={post.id}>
                                            <div>
                                                <span>{index + 1}. </span>
                                                <a href={post.url}>{post.title}</a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )
                    }}
                </Query>
                <Button variant="contained" color="secondary" onClick={this.handleClick}>
                    Super Secret Password
                </Button>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
