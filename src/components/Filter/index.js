import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import { Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';
import { DropdownItem } from '../index';

class Filter extends PureComponent {
  constructor(...args) {
    super(...args);
    const { activeFilter } = this.props;
    this.state = {
      activeFilter,
      showDropdown: false,
    };
  }

  onFilterClick = (item) => {
    const { onFilterItemValue } = this.props;
    this.setState({ activeFilter: item.label, showDropdown: false });
    onFilterItemValue(item);
  };

  hide = () => {
    this.setState({ showDropdown: false });
  };

  toggle = () => {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  };

  renderListItems = (filters) => {
    const { activeFilter } = this.state;
    return filters.map(item => (
      <DropdownItem
        key={item.label}
        activeFilter={activeFilter}
        filterType={item.label}
        hasPadding={item.hasPadding}
        onFilterClick={() => this.onFilterClick(item)}
      />
    ));
  };

  render() {
    const { activeFilter, showDropdown } = this.state;
    const { filters, buttonColor } = this.props;

    return (
      <ClickOutside className="clickOutSide" onClickOutside={this.hide}>
        <Dropdown className="ml-3">
          <DropdownToggle caret className="filter__toggler" color={`${buttonColor} ml-0`} onClick={this.toggle}>
            {activeFilter}
          </DropdownToggle>
          {showDropdown && (
          <DropdownMenu className="filter-dropDownMenu" style={{ display: 'block' }}>
            {this.renderListItems(filters)}
          </DropdownMenu>
          )}
        </Dropdown>
      </ClickOutside>
    );
  }
}


Filter.propTypes = {
  activeFilter: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.object),
  buttonColor: PropTypes.string,
  onFilterItemValue: PropTypes.func,
};
Filter.defaultProps = {
  activeFilter: '',
  buttonColor: 'primary',
  filters: [],
  onFilterItemValue: () => {},
};
export default Filter;
