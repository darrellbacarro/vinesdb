import React, { Component } from 'react';
import './App.css';
import CloseIcon from '@material-ui/icons/CancelRounded';

import { Select } from 'antd';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Tags Mode"
          onChange={() => {}}
          open={false}
          tokenSeparators={[',',';']}
          removeIcon={<CloseIcon fontSize="small" />}
        ></Select>
      </div>
    );
  }
}

export default App;
