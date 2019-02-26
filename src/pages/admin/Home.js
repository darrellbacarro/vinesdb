import React, { Component } from 'react';
import SearchTool from './components/SearchTool';
import Divider from './components/Divider';
import Results from './components/Results';
import VineDialog from './components/vines/vine-dialog';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadVines } from '../../redux/reducers/vines';

import { Link } from 'react-router-dom';

import { Button } from 'antd';

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

  componentDidMount() {
    this.props.loadVines();
  }

  render() {
    const { vineDialogOpen } = this.state;
    return (
      <div className="db-container">
        <VineDialog visible={vineDialogOpen} />
        <div>
          <div style={{ padding: 16 }}>
            <Link to={`/admin/new`}>
              <Button icon="plus" block shape="round" type="primary">New Vine</Button>
            </Link>
          </div>
          <SearchTool />
        </div>
        <Divider />
        <Results />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ loadVines }, dispatch)
);

export default connect(null, mapDispatchToProps)(Home);