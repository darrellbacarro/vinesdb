import React, { Component } from 'react';
import { Input, Checkbox, Divider } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchVines } from '../../../redux/reducers/vines';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const filters = [
  { label: "Species", value: "species" },
  { label: "Family", value: "family" },
  { label: "Genus", value: "genus" }
];
const sort = [...filters,
  { label: "Author", value: "author"},
  { label: "Date Added", value: "date_added"},
  { label: "Date Modified", value: "date_modified"},
];

class SearchTool extends Component {
  state = {
    filters: [],
    sort: []
  }
  render() {
    const { searchVines } = this.props;
    return (
      <div className="search-container">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="primary">Search Database</label>
          <Search
            placeholder="Search"
            autoFocus={true}
            onSearch={value => {
              searchVines(value, this.state);
            }}
          />
        </div>
        <Divider orientation="left">
          <label className="title">Filter</label>
        </Divider>
        <CheckboxGroup defaultValue={["species"]} onChange={(filters) => this.setState({ filters })} className="list" options={filters} />
        <Divider orientation="left">
          <label className="title">Sort by</label>
        </Divider>
        <CheckboxGroup defaultValue={["species"]} onChange={(sort) => this.setState({ sort })} className="list" options={sort} />
      </div>
    );
  }
}

const styles = {}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ searchVines }, dispatch)
);

export default connect(null, mapDispatchToProps)(SearchTool);