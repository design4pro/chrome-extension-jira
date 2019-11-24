import PropTypes from 'prop-types';
import React from 'react';

export const Layout = ({ name }) => {
    return <React.Fragment>{name}</React.Fragment>;
};

Layout.propTypes = {
    name: PropTypes.string,
};

export default Layout;
