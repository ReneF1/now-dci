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
import Pagination from "../components/pagination";

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
            id
            title
            text
        }
    }
`

export const PaginationQuery = gql`
    query($postId: String){
        previousProject: projects(last:1, before: $postId ){
            title
            slug
            id
        }
        nextProject: projects(first:1, after: $postId){
            title
            slug
            id
        }
    }
`

class Post extends React.Component {
    static getInitialProps({query}) {
        const isServer = typeof window === "undefined";
        return {isServer, query};
    }

    render() {
        const {classes, query} = this.props;
        return (
            <div className={classes.root}>
                <SimpleAppBar title={"Rene's Blog"}/>
                <Query query={allPostsQuery} variables={{slug: query.slug}}>
                    {({loading, error, data: {projects}}) => {
                        if (loading) return <div>Loading</div>
                        return (
                            <Grid container spacing={24} justify='space-evenly' className={classes.contentContainer}>
                                <Grid item xs={12}>
                                    <Typography component="p" variant='h1'>
                                        {projects[0].title}
                                    </Typography>
                                    <ReactMarkdown source={projects[0].text}/>
                                </Grid>
                                <Query query={PaginationQuery} variables={{postId: projects[0].id}}>
                                    {({loading, data: {previousProject, nextProject}}) => {
                                        if (loading) return <div>Loading</div>
                                        return (
                                            <Grid item xs={12}>

                                                <Pagination previous={previousProject[0]} next={nextProject[0]}/>
                                            </Grid>
                                        )
                                    }}
                                </Query>
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

