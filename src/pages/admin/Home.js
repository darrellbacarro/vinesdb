import React, { Component } from 'react';
import SearchTool from './components/SearchTool';
import Divider from './components/Divider';
import Results from './components/Results';
import VineDialog from './components/vines/vine-dialog';

class Home extends Component {
  render() {
    const { match, location } = this.props;
    const { params } = match;
    return (
      <div className="db-container">
        <VineDialog visible={!!params.id || location.pathname.indexOf("new") !== -1} />
        <SearchTool />
        <Divider />
        <Results />
      </div>
    );
  }
}

export default Home;