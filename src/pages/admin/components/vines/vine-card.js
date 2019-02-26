import React, { Component } from 'react';
import { Card, Icon, Popconfirm } from 'antd';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import $ from 'jquery';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadVines } from '../../../../redux/reducers/vines';

import { withRouter } from 'react-router-dom';

const { Meta } = Card;

class VineCard extends Component {
  deleteVine = (id) => {
    const { loadVines } = this.props;
    $.ajax({
      type: 'post',
      url: 'http://localhost/vinesdb/vines.php',
      data: { action: 'delete', id },
      dataType: 'json',
      success: (res) => {
        if (res.status) loadVines();
      }
    });
  }
  render() {
    const { timeout, data, location } = this.props;
    const d = JSON.parse(data.species_data);
    
    const isAdmin = location.pathname.indexOf("admin") !== -1;
    
    let desc = "This is a description placeholder.";
    d.vine_content.forEach((content) => {
      if (content.type === "par") {
        desc = content.info || "";
        return false;
      }
    });
    return (
      <Fade in timeout={timeout}>
        <Card
          size="small"
          cover={<img alt="" src={`${d.vine_image[0].thumbUrl}`} />}
          actions={isAdmin ? [<Link to={`/admin/edit/${data.id}`}><Icon type="edit" theme="filled" /></Link>, 
            <Popconfirm
              title="Delete this vine?"
              placement="right"
              onConfirm={() => this.deleteVine(data.id)}
              okText="Yes"
              cancelText="No">  
              <Icon type="delete" theme="filled" />
            </Popconfirm>
          ]:[]}
          hoverable
        >
          <Meta
            title={
              <Link className="species_name" to={ isAdmin ? `/admin/vines/${data.id}` : `/vine/${data.id}`}>{d.vine_name}</Link>
            }
            description={
              <LinesEllipsis
                text={desc}
                maxLine="2"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            }
          />
        </Card>
      </Fade>
    );
  }
}

VineCard.defaultProps = {
  timeout: 100
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ loadVines }, dispatch)
);

export default connect(null, mapDispatchToProps)(withRouter(VineCard));