import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const filters = ["Family", "Genus", "Species"];

class SearchTool extends Component {
  render() {
    return (
      <div className="search-container">
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
          <label className="primary">Search Database</label>
          <Search
            placeholder="Search"
            autoFocus={true}
            onSearch={value => console.log(value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Filter</label>
          <CheckboxGroup className="list" options={filters} />
        </div>
      </div>
    );
  }
}

const styles = {}

export default SearchTool;