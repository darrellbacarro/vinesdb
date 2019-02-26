import React, { Component } from 'react';
import VineCard from './vines/vine-card';

import { connect } from 'react-redux';

class Results extends Component {
  render() {
    const { vines } = this.props; 
    return (
      <div className="results-container">
        <div className="grid-container">
          <div className="grid">
            {
              vines.map((vine, i) => (
                <VineCard data={vine} key={i} timeout={(i + 1) * 100}/>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.vines
});

export default connect(mapStateToProps)(Results);