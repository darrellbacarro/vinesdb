import React, { Component } from 'react';
import SearchTool from './components/SearchTool';
import Divider from './components/Divider';

class Home extends Component {
  render() {
    return (
      <div className="db-container">
        <SearchTool />
        <Divider />
        <div style={{ flex: 1 }}></div>
      </div>
    );
  }
}

export default Home;