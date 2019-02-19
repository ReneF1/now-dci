import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function Pagination(props) {
    const {classes, previous, next} = props;

    return (
        <div className={classes.root}>
            <Link prefetch passHref href={{pathname: '/post', query: {slug: previous ? previous.slug : null}}}>
                <Button variant="contained" color="primary" disabled={!previous} className={classes.button}>
                    Previous Project
                </Button>
            </Link>
            <Link prefetch href={{pathname: '/post', query: {slug: next ? next.slug : null}}}>
                <Button variant="contained" color="primary" disabled={!next} className={classes.button}>
                    Next Project
                </Button>
            </Link>
        </div>
    );
}

Pagination.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pagination);
