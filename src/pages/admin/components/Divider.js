import React, { Component } from 'react';

class Divider extends Component {
  render() {
    const { orientation } = this.props;
    return (
      <div className={`separator ${orientation}`}></div>
    );
  }
}

Divider.defaultProps = {
  orientation: "vertical"
}

export default Divider;