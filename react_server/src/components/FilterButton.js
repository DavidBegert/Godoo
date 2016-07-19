import React, { Component } from 'react';
import classnames from 'classnames';

export default class FilterButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  handleClick(category_id) {
    this.props.onFilterClick(this.props.category_id);
    this.state.active = !this.state.active;
  }

  render() {
    return (
        <a className= {classnames("button is-primary", {'is-inverted': this.state.active})} onClick={() => {this.handleClick()}}>{this.props.category_name}</a>
    );
  }
}