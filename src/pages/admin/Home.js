import React, { Component } from 'react';
import SearchTool from './components/SearchTool';
import Divider from './components/Divider';
import Results from './components/Results';
import VineDialog from './components/vines/vine-dialog';

class Home extends Component {
  state = {
    vineDialogOpen: false
  }
  
  static getDerivedStateFromProps(nextProps) {
    const { match, location } = nextProps;
    const { params } = match;

    const open = !!params.id || location.pathname.indexOf("new") !== -1;

    return { vineDialogOpen: open };
  }

  render() {
    const { vineDialogOpen } = this.state;
    return (
      <div className="db-container">
        <VineDialog visible={vineDialogOpen} />
        <SearchTool />
        <Divider />
        <Results />
      </div>
    );
  }
}

export default Home;