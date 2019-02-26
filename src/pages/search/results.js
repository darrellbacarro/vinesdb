import React, { Component } from 'react';
import ResultsList from '../admin/components/Results';

class Results extends Component {
  render() {
    return (
      <div className="flex row" style={{ width: '100vw', height: '100vh' }}>
        <div>
          
        </div>
        <div className="flex" style={{ flex: 1, position: 'relative' }}>
          <ResultsList />
        </div>
      </div>
    );
  }
}

export default Results;