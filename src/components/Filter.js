import React, { Component } from 'react';
import DropdownItem from './DropdownItem';
import {Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';
import ClickOutside from 'react-click-outside'

export class Filter extends Component {

  state = {
    activeFilter: this.props.activeFilter,
    showDropdown: false,
  };

  toggle() {
    const { showDropdown } = this.state
    this.setState({ showDropdown: !showDropdown })
  }

  hide() {
    const { showDropdown } = this.state
    this.setState({ showDropdown: !showDropdown })
  }
  renderListItems(filters, activeFilter){
    return filters.map((item,i) => (
      <DropdownItem
        key={i}
        activeFilter={this.state.activeFilter}
        filterType={item.text}
        hasPadding={item.hasPadding}
        onFilterClick={() => this.setState({activeFilter: item.text, showDropdown: false})}
      />
    ))
  }

  render() {
    const {activeFilter, showDropdown} = this.state;
    const {filters} = this.props;

    return (
      <ClickOutside onClickOutside={()=> this.hide()}>
        <Dropdown className="ml-3">
          <DropdownToggle caret color="primary ml-0" onClick={()=> this.toggle()}>
            {activeFilter}
          </DropdownToggle>
          {showDropdown && <DropdownMenu style={{display: 'block'}} >
            {this.renderListItems(filters)}
          </DropdownMenu>}
        </Dropdown>
      </ClickOutside>
    );
  }
}