import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import VineForm from './vine-form';

class VineDialog extends Component {
  form = null;
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
  formRef = (form) => {
    this.form = form;
  }
  handleSubmit = () => {
    if (!!this.form) {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    }
  }
  render() {
    const { visible } = this.state;
    const { location } = this.props;
    
    const isNewVine = location.pathname.indexOf("new") !== -1;
    return (
      <Modal
        destroyOnClose
        visible={visible}
        onCancel={this.handleClose}
        onOk={this.handleSubmit}
        okButtonProps={{ shape: 'round' }}
        cancelButtonProps={{ shape: 'round' }}
        title={ isNewVine ? "Add New Vine" : "Edit Vine" }
        className="long-modal"
      >
        <VineForm passFormRef={this.formRef} />
      </Modal>
    );
  }
}

export default withRouter(VineDialog);