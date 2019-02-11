import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import CloseIcon from '@material-ui/icons/CancelRounded';
import VineTabs from './vine-tabs';

class VineForm extends Component {
  componentDidMount() {
    this.props.passFormRef(this.props.form);
  }
  checkName = (rule, value, callback) => {
    if (!value.getCurrentContent().hasText()) {
      callback("Name of vine is required.");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="form-item">
          <label htmlFor="vine_name">Name of species</label>
          <Form.Item>
            {
              getFieldDecorator('vine_name', {
                validateTrigger: false,
                rules: [
                  { required: true },
                  { validator: this.checkName }
                ]
              })(
                <Input autoFocus />
              )
            }
          </Form.Item>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 10 }}>
          <div className="form-item">
            <label htmlFor="vine_family">Family</label>
            <Form.Item>
              {
                getFieldDecorator('vine_family', {
                  rules: [
                    { required: true }
                  ]
                })(
                  <Input />
                )
              }
            </Form.Item>
          </div>
          <div className="form-item">
            <label htmlFor="vine_author">Author</label>
            <Form.Item>
              {
                getFieldDecorator('vine_author', {
                  rules: [
                    { required: true }
                  ]
                })(
                  <Input />
                )
              }
            </Form.Item>
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="vine_refs">References</label>
          <Form.Item>
            {
              getFieldDecorator('vine_refs')(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  open={false}
                  tokenSeparators={[',',';']}
                  removeIcon={<CloseIcon fontSize="small" />}
                ></Select>
              )
            }
          </Form.Item>
        </div>
        <div className="form-item">
          <label htmlFor="vine_syn">Synonyms</label>
          <Form.Item>
            {
              getFieldDecorator('vine_syn')(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  open={false}
                  tokenSeparators={[',',';']}
                  removeIcon={<CloseIcon fontSize="small" />}
                ></Select>
              )
            }
          </Form.Item>
        </div>
        <div className="form-item">
          <label htmlFor="vine_local">Local names</label>
          <Form.Item>
            {
              getFieldDecorator('vine_local')(
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  open={false}
                  tokenSeparators={[',',';']}
                  removeIcon={<CloseIcon fontSize="small" />}
                ></Select>
              )
            }
          </Form.Item>
        </div>
        <div className="form-item">
          <label htmlFor="vine_content">Content</label>
          <Form.Item>
            {
              getFieldDecorator('vine_content')(
                <VineTabs />
              )
            }
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default Form.create()(VineForm);