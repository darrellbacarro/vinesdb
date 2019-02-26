import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';

import { Layout, Menu, Icon } from 'antd';
import VineDetails from './VineDetails';
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
              <Menu.Item key="3">
                <Icon type="info-circle" theme="filled" />
                <span>About</span>
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
              margin: '24px 16px', padding: 0, display: 'flex', background: '#fff', minHeight: 280,
            }}
            >
              <Switch>
                <Route exact path="/admin" render={() => <Redirect to="/admin/vines" />} />
                <Route exact path="/admin/vines" component={Home} />
                <Route path="/admin/vines/:id" component={VineDetails} />
                <Route path="/admin/edit/:id" component={Home} />
                <Route path="/admin/new" component={Home} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Admin;