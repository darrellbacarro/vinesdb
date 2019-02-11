import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';

class TabularSection extends Component {
  state = {
    data: []
  }
  addRow = () => {
    const { data } = this.state;
    data.push({
      title: "",
      description: ""
    });

    this.setState({ data });
  }
  removeRow = (index) => {
    const { data } = this.state;
    data.splice(index, 1);

    this.setState({ data });
  }
  handleChange = (index, key, value) => {
    const { data } = this.state;
    data[index][key] = value;

    this.setState({ data });
  }
  render() {
    const { data } = this.state;
    const columns = [
      {
        title: '#',
        key: 'no',
        render: (t, r, i) => <span>{ (i + 1) }</span>
      },
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
        render: (t, r, i) => <Input onChange={({ target }) => this.handleChange(i, 'title', target.value)} />
      },
      {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        render: (t, r, i) => <Input onChange={({ target }) => this.handleChange(i, 'description', target.value)} />
      },
      {
        title: ' ',
        key: 'delete',
        render: (t, r, i) => <Icon type="delete" onClick={() => this.removeRow(i)} />
      }
    ];
    return (
      <div style={{ position: 'relative' }}>
        <Button
          onClick={this.addRow}
          icon="plus"
          shape="circle"
          style={{
            position: 'absolute',
            right: 8,
            top: 4,
            zIndex: 9999
          }}
        />
        <Table pagination={false} columns={columns} dataSource={data} size="small" />
      </div>
    );
  }
}

export default TabularSection;