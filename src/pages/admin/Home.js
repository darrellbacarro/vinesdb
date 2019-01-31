import React, { Component } from 'react';
import SearchTool from './components/SearchTool';
import Divider from './components/Divider';
import Results from './components/Results';

class Home extends Component {
  render() {
    return (
      <div className="db-container">
        <SearchTool />
        <Divider />
        <Results />
      </div>
    );
  }
}

export default Home;