/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import PortfolioCard from "../components/card";
import formatDistance from 'date-fns/formatDistance'
import Grid from '@material-ui/core/Grid';
import SimpleAppBar from "../components/menuBar";

const styles = theme => ({
    root: {
        textAlign: 'center',
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
            slug
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

        return (
            <div className={classes.root}>
                <SimpleAppBar title={"Rene's Blog"}/>
                <Query query={allPostsQuery}>
                    {({loading, error, data: {projects}}) => {
                        if (loading) return <div>Loading</div>
                        return (
                            <Grid container spacing={24} justify='space-evenly' className={classes.contentContainer}>
                                {projects.map((project, index) => (
                                    <Grid item xs={4} key={index}>
                                            <PortfolioCard
                                                slug={project.slug}
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
