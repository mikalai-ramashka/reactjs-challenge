import React, { Component } from 'react';
import './Toolbar.css';

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.onToggleCollapse = this.onToggleCollapse.bind(this);
  }

  onToggleCollapse(e) {
    e.preventDefault();
    this.props.onToggle();
  }

  render() {
    let children;

    if (!this.props.collapsed) { 
      children = this.props.children;
    }

    return (
      <div className="Toolbar">
        <div className="Toolbar-header">
          <h3><a href="#collapse" onClick={this.onToggleCollapse}>{this.props.title}</a></h3>
        </div>
        <div className={'Toolbar-content ' + (this.props.collapsed ? 'collapsed' : '')}>
          {children}
        </div>
      </div>
    );
  }
}

export default Toolbar;
