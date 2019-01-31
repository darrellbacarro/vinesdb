import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div className="container">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{ background: '#fff', boxShadow: '5px 0 5px -5px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="logo" />
            <Menu mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="database" theme="filled" />
                <span>Database</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="setting" theme="filled" />
                <span>Settings</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 0, background: '#fff', minHeight: 280,
            }}
            >
              <Switch>
                <Route path="/" component={Home} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Admin;