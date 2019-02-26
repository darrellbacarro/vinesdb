import React, { Component } from 'react';
import { Table, Input, Button, Icon, Upload, message } from 'antd';

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('Image must smaller than 10MB!');
  }
  return isJPG && isLt2M;
}

class TabularSection extends Component {
  state = {
    data: []
  }
  static getDerivedStateFromProps(props) {
    if (!!props.value) {
      return { data: props.value };
    }
    return null;
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleImageChange = (info, index) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.handleChange(index, 'image', info.file.name);
    }
  }
  addRow = () => {
    const { data } = this.state;
    data.push({
      id: data.length,
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

    this.setState({ data }, () => this.props.onChange(data));
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
        render: (t, r, i) => <Input value={t} onChange={({ target }) => this.handleChange(i, 'title', target.value)} />
      },
      {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        render: (t, r, i) => <Input value={t} onChange={({ target }) => this.handleChange(i, 'description', target.value)} />
      },
      {
        title: 'Image',
        key: 'image',
        dataIndex: 'image',
        render: (t, r, i) => 
            <Upload
              action="http://localhost/vinesdb/upload.php"
              beforeUpload={beforeUpload}
              showUploadList={false}
              onChange={(info) => this.handleImageChange(info, i)}
            >
              {
                Boolean(t) ?
                <img src={`http://localhost/vinesdb/uploads/${t}`} style={{ width: 24, height: 24, borderRadius: 2 }} /> :
                <Button icon="upload" />
              }
            </Upload>
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
        <Table pagination={false} rowKey={'id'} columns={columns} dataSource={data} size="small" />
      </div>
    );
  }
}

export default TabularSection;