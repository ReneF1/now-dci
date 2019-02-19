/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import SimpleAppBar from "../components/menuBar";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown'

const styles = theme => ({
    root: {
        textAlign: 'center',
    },
    contentContainer: {
        margin: 'auto'
    }
});

export const allPostsQuery = gql`
    query($slug: String){
        projects(where: {slug: $slug}){
            title
            text
        }
    }
`
export const allPostsQueryVars = (slug) => {
    return {slug: slug}
}

class Post extends React.Component {
    static getInitialProps({query}) {
        const isServer = typeof window === "undefined";
        return {isServer, query};
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <SimpleAppBar title={"Rene's Blog"}/>
                <Query query={allPostsQuery} variables={allPostsQueryVars(this.props.query.slug)}>
                    {({loading, error, data: {projects}}) => {
                        if (loading) return <div>Loading</div>
                        return (
                            <Grid container spacing={24} justify='space-evenly' className={classes.contentContainer}>
                                {projects.map((project, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Typography component="p" variant='h1'>
                                            {project.title}
                                        </Typography>
                                        <ReactMarkdown source={project.text} />
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

Post.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);

