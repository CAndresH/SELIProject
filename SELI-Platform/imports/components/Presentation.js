import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
/* Theme */
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="presentation-container">
          <div className="presentation-image"></div>
          <div className="center-container">
            <div className="presentation-logo-container"></div>
            <div className="presentation-text-container">System content management</div>
            <div className="presentation-buttons-container">
              <MuiThemeProvider theme={theme}>
                <Button className="main-button" id="log-in-button" variant="contained" color="primary">
                  Log in
                </Button>
                <Button className="main-button" id="sign-up-button" variant="contained" color="primary">
                  Sign up
                </Button>
              </MuiThemeProvider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
