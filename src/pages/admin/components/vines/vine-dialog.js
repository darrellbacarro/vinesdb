import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import VineForm from './vine-form';

class VineDialog extends Component {
  state = {
    visible: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible)
      this.setState({ visible: nextProps.visible });
  }
  handleClose = () => {
    this.props.history.goBack();
  }
  render() {
    const { visible } = this.state;
    const { location } = this.props;
    
    const isNewVine = location.pathname.indexOf("new") !== -1;
    return (
      <Modal
        visible={visible}
        onCancel={this.handleClose}
        title={ isNewVine ? "Add New Vine" : "Edit Vine" }
      >
        <VineForm />
      </Modal>
    );
  }
}

export default withRouter(VineDialog);