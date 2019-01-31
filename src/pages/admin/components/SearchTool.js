import React, { Component } from 'react';
import { Input, Checkbox, Divider, Button } from 'antd';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const filters = ["Family", "Genus", "Species"];
const sort = [...filters, "Author", "Date Added", "Date Modified"];

class SearchTool extends Component {
  render() {
    return (
      <div className="search-container">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="primary">Search Database</label>
          <Search
            placeholder="Search"
            autoFocus={true}
            onSearch={value => console.log(value)}
          />
        </div>
        <Divider orientation="left">
          <label className="title">Filter</label>
        </Divider>
        <CheckboxGroup className="list" options={filters} />
        <Divider orientation="left">
          <label className="title">Sort by</label>
        </Divider>
        <CheckboxGroup className="list" options={sort} />
        <br />
        <Button type="primary">Search</Button>
      </div>
    );
  }
}

const styles = {}

export default SearchTool;