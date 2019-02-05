import React, { Component } from 'react';
import VineCard from './vines/vine-card';

class Results extends Component {
  render() {
    const data = [1,2,3,4,5,6,7,8,9,0,1,2,2,2,2,2,2,2,2];
    return (
      <div className="results-container">
        <div className="grid-container">
          <div className="grid">
            {
              data.map((d, i) => (
                <VineCard key={i} timeout={(i + 1) * 100}/>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Results;