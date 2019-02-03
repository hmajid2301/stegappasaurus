import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import App from './views/Routes';


class MainApp extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  }

  render() {
    return (
      <App screenProps={{ theme: this.props.theme }}/>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.ToggleDarkTheme.theme,
});

export default connect(mapStateToProps, null)(MainApp);
