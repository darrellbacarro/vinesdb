import React, { Component } from 'react';
import { Card, Tabs, Table, Popover } from 'antd';
import $ from 'jquery';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadGlossary } from '../../redux/reducers/vines';

import _ from 'lodash';

const TabPane = Tabs.TabPane;

class VineDetails extends Component {
  state = {
    data: null
  }
  componentDidMount() {
    this.props.loadGlossary();
    const { id } = this.props.match.params;
    $.ajax({
      type: 'post',
      url: 'http://localhost/vinesdb/vines.php',
      data: { action: "select", id },
      dataType: 'json',
      success: (res) => {
        const data = JSON.parse(res.data);
        const species = JSON.parse(data.species_data);
        
        delete data.species_data; 
        this.setState({ data: { data, species } });
      }
    });
  }
  tokenize = (content) => {
    const { glossary } = this.props;
    const contentArray = content.split(" ");
    return contentArray.map((str, i) => {
      const lower = str.toLowerCase();
      const match = _.find(glossary, { term: lower });
      if (match) {
        return <Popover title={lower} content={match.definition}>
          <span className="term">{str} </span>
        </Popover>
      } else {
        return <span key={i + ""}>{str} </span>
      }
    });
  }
  render() {
    const { data } = this.state;
    const columns = [
      {
        title: 'Property',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (t) => <div>{ this.tokenize(t) }</div>
      },
      {
        title: ' ',
        dataIndex: 'image',
        key: 'image',
        render: (t) => <img src={`http://localhost/vinesdb/uploads/${t}`} style={{ width: 50 }} />
      }
    ];
    return (
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', backgroundColor: '#F0F3F6', overflowY: 'auto' }}>
        {
          data &&
          <Card
            hoverable
            className="article"
          >
            <div
              className="article-header"
              style={{ backgroundImage: `url(${data.species.vine_image[0].thumbUrl})`}}>
              <div className="content">
                <h1 style={{ marginBottom: 0, fontFamily: 'serif', fontStyle: 'italic', fontSize: 36 }}>{data.species.vine_name}</h1>
                <h3>{data.data.author}</h3>
              </div>
            </div>
            <div className="article-sub-data">
              <div>
                <label>Family</label>
                <p>{ data.data.family }</p>
              </div>
              <div>
                <label>Genus</label>
                <p>{ data.data.genus }</p>
              </div>
              <div>
                <label>References</label>
                <p>{ data.species.vine_refs.join("; ") }</p>
              </div>
              <div>
                <label>Synonyms</label>
                <p>{ data.species.vine_syn.join("; ") }</p>
              </div>
              <div>
                <label>Local Names</label>
                <p>{ data.species.vine_local.join("; ") }</p>
              </div>
            </div>
            <Tabs onChange={() => {}}>
              {
                data.species.vine_content.map((content, i) => (
                  <TabPane tab={content.title} key={i + ""}>
                      {
                        content.type === "par" ?
                          <div style={{ padding: "16px 10%", display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: 16, minHeight: 250 }}>
                            <div>
                              <p>{ this.tokenize(content.info) }</p>
                            </div>
                            <div>
                              <img style={{ width: '20vw' }} src={`http://localhost/vinesdb/uploads/${content.images}`} />
                            </div>
                          </div>:
                          <div style={{ padding: "16px 10%", minHeight: 250 }}>
                            <Table
                              bordered
                              size="small"
                              columns={columns}
                              pagination={false}
                              dataSource={content.info} />
                          </div>
                      }
                  </TabPane>
                ))
              }
            </Tabs>
          </Card>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.vines
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ loadGlossary }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(VineDetails);