import React, { Component } from 'react';
import { Select } from 'antd';
import $ from 'jquery';

class SelectDropdown extends Component {
  state = {
    options: []
  }
  componentDidMount() {
    this.loadOptions();
  }
  loadOptions = () => {
    const { source } = this.props;

    $.ajax({
      type: 'post',
      url: `http://localhost/vinesdb/${source}.php`,
      dataType: 'json',
      success: (res) => {
        const options = JSON.parse(res.data);
        this.setState({ options });
      }
    });
  }
  handleSearch = (e) => {
    if (e.which === 13) {
      const { source } = this.props;
      const value = e.target.value;

      const data = {
        name: value
      };
      
      if (value.length > 0) {

        $.ajax({
          type: 'post',
          url: `http://localhost/vinesdb/${source}.php`,
          data: { action: "save", data },
          dataType: 'json',
          success: (res) => {
            if (res.status) {
              this.loadOptions();
            }
          }
        });
      }
    }
  }
  handleChange = (value) => {
    this.props.onChange(value);
  }
  render() {
    return (
      <Select
        value={this.props.value}
        showSearch
        showArrow={false}
        onChange={this.handleChange}
        onInputKeyDown={this.handleSearch}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        style={{ width: '100%' }}>
        {
          this.state.options.map((option, i) => (
            <Select.Option key={i} value={option.id + ""}>{ option.name }</Select.Option>
          ))
        }
      </Select>
    );
  }
}

export default SelectDropdown;