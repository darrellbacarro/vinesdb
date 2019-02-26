import React, { Component } from 'react';
import { Form, Input, Select, Upload, Icon, message } from 'antd';
import CloseIcon from '@material-ui/icons/CancelRounded';
import VineTabs from './vine-tabs';
import SelectDropdown from './select-dropdown';

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

class VineForm extends Component {
  componentDidMount() {
    this.props.passFormRef(this.props.form);
  }
  normFile = (e) => {
    if (Array.isArray(e))
      return e;
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="form-item">
          <label htmlFor="vine_name">Name of species</label>
          <Form.Item>
            {
              getFieldDecorator('vine_name', {
                rules: [
                  { required: true }
                ]
              })(
                <Input autoFocus />
              )
            }
          </Form.Item>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 10 }}>
          <div className="form-item">
            <label htmlFor="vine_genus">Genus</label>
            <Form.Item>
              {
                getFieldDecorator('vine_genus', {
                  rules: [
                    { required: true }
                  ]
                })(
                  <SelectDropdown source={"genus"} />
                )
              }
            </Form.Item>
          </div>
          <div className="form-item">
            <label htmlFor="vine_family">Family</label>
            <Form.Item>
              {
                getFieldDecorator('vine_family', {
                  rules: [
                    { required: true }
                  ]
                })(
                  <SelectDropdown source={"families"} />
                )
              }
            </Form.Item>
          </div>
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
                <SelectDropdown source={"authors"} />
              )
            }
          </Form.Item>
        </div>
        <div className="form-item">
          <label htmlFor="vine_image">Images</label>
          <Form.Item>
            { getFieldDecorator('vine_image', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile
            })(
              <Upload
                listType="picture-card"
                showUploadList={{ showPreviewIcon: false }}
                action="http://localhost/vinesdb/upload.php"
                beforeUpload={beforeUpload}
              >
                <Icon type="plus" style={{ fontSize: 32 }} />
              </Upload>
            ) }
          </Form.Item>
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
                  tokenSeparators={[';']}
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
                  tokenSeparators={[';']}
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
                  tokenSeparators={[';']}
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