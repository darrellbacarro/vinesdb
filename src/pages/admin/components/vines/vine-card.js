import React, { Component } from 'react';
import { Card, Icon, Popconfirm } from 'antd';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

const { Meta } = Card;

class VineCard extends Component {
  render() {
    const { timeout } = this.props;
    return (
      <Fade in timeout={timeout}>
        <Card
          size="small"
          cover={<img alt="" src="http://localhost/fprdi/uploads/img3.jpg" />}
          actions={[<Link to="/admin/edit/1"><Icon type="edit" theme="filled" /></Link>, 
            <Popconfirm
              title="Delete this vine?"
              placement="right"
              okText="Yes"
              cancelText="No">  
              <Icon type="delete" theme="filled" />
            </Popconfirm>
          ]}
          hoverable
        >
          <Meta
            title={
              <Link to="/admin/vines/1">Vine</Link>
            }
            description={
              <LinesEllipsis
                text="This is the description of the vine being displayed. This is the vine."
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

export default VineCard;