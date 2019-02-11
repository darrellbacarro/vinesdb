import React, { Component, Fragment } from 'react';
import { Input, Button, Select, Card, Popconfirm, Icon } from 'antd';
import TabularSection from './tabular-section';
import Grow from '@material-ui/core/Grow';

const Option = Select.Option;

class VineTabs extends Component {
  state = {
    tabs: []
  }
  addTab = () => {
    const { tabs } = this.state;
    tabs.push({
      title: "",
      type: "par",
      info: null,
      images: [],
      maps: []
    });
    
    this.setState({ tabs }, () => {
      document.getElementById(`card${tabs.length - 1}`).scrollIntoView();
    });
  }
  removeTab = (index) => {
    const { tabs } = this.state;
    tabs.splice(index, 1);
    this.setState({ tabs });
  }
  handleChange = (index, key, value) => {
    const { tabs } = this.state;
    tabs[index][key] = value;
    this.setState({ tabs });
  }
  render() {
    const { tabs } = this.state;
    return (
      <Fragment>
        <Button onClick={this.addTab} shape="round" size="small">Add</Button>
        {
          tabs.map((tab, i) => (
            <Grow in key={i + ""}>
              <Card
                actions={ tabs.length > 1 ? [
                  <Popconfirm title="Remove this section?" onConfirm={() => this.removeTab(i)}>
                    <span><Icon type="delete" /> Remove Section</span>
                  </Popconfirm>
                ] : []}
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
                      onChange={(value) => this.handleChange(i, 'type', value)}
                      style={{ width: '30%' }}
                      placeholder="Section Type">
                      <Option value="par">Paragraph</Option>
                      <Option value="tab">Tabular</Option>
                    </Select>
                  </Input.Group>
                  {
                    tab.type === "par" ?
                    <Input.TextArea placeholder="Description" rows={4} /> :
                    <TabularSection />
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