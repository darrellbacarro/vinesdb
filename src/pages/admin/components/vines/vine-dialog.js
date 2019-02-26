import React, { Component } from 'react';
import { Modal, message } from 'antd';
import { withRouter } from 'react-router-dom';
import VineForm from './vine-form';
import $ from 'jquery';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadVines } from '../../../../redux/reducers/vines';

class VineDialog extends Component {
  form = null;
  state = {
    visible: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible }, () => {
        if (nextProps.visible) {
          const { location } = nextProps;
          const isNewVine = location.pathname.indexOf("new") !== -1;

          const id = nextProps.match.params.id;
          if (!isNewVine) {
            $.ajax({
              type: 'post',
              url: 'http://localhost/vinesdb/vines.php',
              data: { action: "select", id },
              dataType: 'json',
              success: (res) => {
                const data = JSON.parse(res.data);
                const species = JSON.parse(data.species_data);
                if (this.form) {
                  this.form.setFieldsValue({ ...species });
                }
              }
            });
          }
        }
      });
    }
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
          const data = {
            species_data: JSON.stringify(values),
            species: values.vine_name,
            genus_id: values.vine_genus,
            family_id: values.vine_family,
            author_id: values.author
          };
          
          const { location } = this.props;
          const isNewVine = location.pathname.indexOf("new") !== -1;

          let payload = { action: "save", data };
          
          if (!isNewVine) {
            const id = this.props.match.params.id;
            payload = { action: "update", id, data };
          }

          $.ajax({
            type: 'post',
            url: `http://localhost/vinesdb/vines.php`,
            data: payload,
            dataType: 'json',
            success: (res) => {
              if (res.status) {
                if (isNewVine) {
                  message.success("Vine successfully saved.");
                } else {
                  message.success("Vine successfully updated.");
                }
                this.props.loadVines();
                this.handleClose();
              }
            }
          });
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
        style={{ top: 10 }}
        width={600}
      >
        <VineForm passFormRef={this.formRef} />
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ loadVines }, dispatch)
);

export default connect(null, mapDispatchToProps)(withRouter(VineDialog));