import PropTypes from 'prop-types';
import React from 'react';

export const Layout = ({ name }): JSX.Element => {
    return <React.Fragment>{name}t</React.Fragment>;
};

Layout.propTypes = {
    name: PropTypes.string,
};

export default Layout;
