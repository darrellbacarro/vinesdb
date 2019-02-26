import React, { Component, Fragment } from 'react';
import { Input, Button, Select, Card, Popconfirm, Icon, Upload, message, Mention } from 'antd';
import TabularSection from './tabular-section';
import Grow from '@material-ui/core/Grow';

const { toString } = Mention;
const Option = Select.Option;

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

class VineTabs extends Component {
  state = {
    tabs: []
  }
  static getDerivedStateFromProps(props) {
    if (!!props.value)
      return { tabs: props.value };
    return null;
  }
  addTab = () => {
    const { tabs } = this.state;
    tabs.push({
      title: "",
      type: "par",
      info: null,
      images: "",
      maps: []
    });
    
    this.setState({ tabs }, () => {
      // this.props.onChange('tabs');
      document.getElementById(`card${tabs.length - 1}`).scrollIntoView();
    });
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
      this.handleChange(index, 'images', info.file.name);
    }
  }
  removeTab = (index) => {
    const { tabs } = this.state;
    tabs.splice(index, 1);
    this.setState({ tabs });
  }
  handleChange = (index, key, value) => {
    const { tabs } = this.state;
    tabs[index][key] = value;
    this.setState({ tabs }, () => this.props.onChange(tabs));
  }
  render() {
    const { tabs } = this.state;
    const cardActions = (i, tab) => [
      <Upload
        action="http://localhost/vinesdb/upload.php"
        beforeUpload={beforeUpload}
        showUploadList={false}
        onChange={(info) => this.handleImageChange(info, i)}
      >
        {
          Boolean(tab.images) ?
          <img src={`http://localhost/vinesdb/uploads/${tab.images}`} style={{ width: 24, height: 24, borderRadius: 2 }} /> :
          <span><Icon type="upload" /> Upload Image</span>
        }
      </Upload>
    ];
    return (
      <Fragment>
        <Button onClick={this.addTab} shape="round" size="small">Add</Button>
        {
          tabs.map((tab, i) => (
            <Grow in key={i + ""}>
              <Card
                actions={ tabs.length > 1 ? [
                  ...cardActions(i, tab),
                  <Popconfirm title="Remove this section?" onConfirm={() => this.removeTab(i)}>
                    <span><Icon type="delete" /> Remove Section</span>
                  </Popconfirm>
                ] : cardActions(i, tab)}
                hoverable
                className="tab-group"
                size="small"
                style={{ marginBottom: 6 }}
              >
                <div id={`card${i}`}>
                  <Input.Group compact style={{ marginBottom: 6 }}>
                    <Input
                      value={tab.title}
                      onChange={({ target }) => this.handleChange(i, 'title', target.value)}
                      style={{ width: '70%' }}
                      placeholder="Section Title"
                    />
                    <Select
                      value={tab.type}
                      onChange={(value) => {
                        this.handleChange(i, 'type', value);
                        if (value === "par")
                          this.handleChange(i, 'info', "");
                        else
                          this.handleChange(i, 'info', []);
                      }}
                      style={{ width: '30%' }}
                      placeholder="Section Type">
                      <Option value="par">Paragraph</Option>
                      <Option value="tab">Tabular</Option>
                    </Select>
                  </Input.Group>
                  {
                    tab.type === "par" ?
                    // <Mention
                    //   style={{ width: '100%', height: 100 }}
                    //   onChange={(value) => {
                    //     this.handleChange(i, 'info', toString(value));
                    //   }}
                    //   prefix={[' ']}
                    //   defaultSuggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
                    //   multiLines
                    // />:
                    <Input.TextArea
                      value={tab.info}
                      placeholder="Description"
                      onChange={({ target }) => this.handleChange(i, 'info', target.value)} rows={4} /> :
                    <TabularSection value={tab.info} onChange={(info) => this.handleChange(i, 'info', info)} />
                  }
                </div>
              </Card>
            </Grow>            
          ))
        }
      </Fragment>
    );
  }
}

export default VineTabs;