import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Button from '../../../../components/Button';
import Brand from '../../../../components/Brand';
import SearchField from './components/SearchField';
import UserMenu from './components/UserMenu';
import TakeATour from '../TakeATour';
import './style.scss';

class Header extends Component {
  static propTypes = {
    i18n: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchAsDropdown: false,
    };
    this.handleClickToggleSearchAsDropdown = this.handleClickToggleSearchAsDropdown.bind(this);
  }

  handleClickToggleSearchAsDropdown() {
    this.setState({
      searchAsDropdown: !this.state.searchAsDropdown,
    });
  }
  render() {
    const { i18n } = this.props;

    const searchClassName = classnames(
      'l-header__search',
      { 'l-header__search--as-dropdown': this.state.searchAsDropdown }
    );

    return (
      <div className="l-header">
        <div className="l-header__wrapper">
          <div className="l-header__brand">
            <span className="hide-for-medium">
              <button
                aria-label={i18n._('header.menu.toggle-navigation', { defaults: 'Toggle navigation' })}
                data-toggle="left_off_canvas"
                type="button"
                className="l-header__menu-icon menu-icon"
              />
            </span>
            <Link to="/">
              <Brand className="l-header__brand-icon" />
            </Link>
          </div>
          <div className="l-header__search-toggler hide-for-medium">
            <Button
              aria-label={i18n._('header.menu.toggle-search-form', { defaults: 'Toggle search form' })}
              onClick={this.handleClickToggleSearchAsDropdown}
              icon="search"
            />
          </div>
          <div className={searchClassName}>
            <div className="l-header__m-search-field">
              <SearchField />
            </div>
          </div>
          <div className="l-header__take-a-tour"><TakeATour /></div>
          <div className="l-header__user"><UserMenu /></div>
        </div>
      </div>
    );
  }
}

export default Header;
