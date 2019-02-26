import React, { Component, Fragment } from 'react';
import { Input, Button, Checkbox } from 'antd';
import Grow from '@material-ui/core/Grow';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchVines } from '../../redux/reducers/vines';

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

class Home extends Component {
  state = {
    showTools: false,
    filters: [],
    sort: []
  }
  toggleTools = () => {
    this.setState(state => ({ showTools: !state.showTools }))
  }
  render() {
    const { searchVines, history } = this.props;
    return (
      <Fragment>
        <div className="welcome flex">
          <h1>
            Philippine Commercial and <br />Potentially Commercial<br />Forest Vines
          </h1>
        </div>
        <div className="search flex col">
          <Input.Search
            autoFocus
            size="large"
            placeholder="Search"
            onSearch={value => {
              const { filters, sort } = this.state;
              searchVines(value, { filters, sort });
              history.push(`/search/${value}`);
            }} />
          {
            this.state.showTools &&
            <Grow in>
              <div className="options" style={{ padding: '16px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div className="flex col">
                  <label className="title">Filter</label>
                  <CheckboxGroup defaultValue={["species"]} onChange={(filters) => this.setState({ filters })} className="list" options={filters} />
                </div>
                <div className="flex col">
                  <label className="title">Sort</label>
                  <CheckboxGroup defaultValue={["species"]} onChange={(sort) => this.setState({ sort })} className="list" options={sort} />
                </div>
              </div>
            </Grow>
          }
          <div className="flex row" style={{ padding: 8, justifyContent: 'center' }}>
            <Button
              style={{ marginRight: 8 }}
              type="primary"
              size="large"
              shape="round">Search Vine</Button>
            <Button size="large" shape="round" onClick={this.toggleTools}>Options</Button>
          </div>
        </div>
        <div className="footer">
          <span>Forest Products Research and Development Institute &copy; 2019</span>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ searchVines }, dispatch)
);

export default connect(null, mapDispatchToProps)(Home);