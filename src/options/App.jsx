import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container fixed maxWidth='md'>
                    <div>options</div>
                </Container>
            </React.Fragment>
        );
    }
}
