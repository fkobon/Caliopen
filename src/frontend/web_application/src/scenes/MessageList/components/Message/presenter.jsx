import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { v1 as uuidV1 } from 'uuid';
import VisibilitySensor from 'react-visibility-sensor';
import Moment from 'react-moment';
import { Trans } from 'lingui-react';
import ContactAvatarLetter from '../../../../components/ContactAvatarLetter';
import { Button, Icon, TextBlock, Dropdown, withDropdownControl } from '../../../../components';
import MultidimensionalPi from '../../../../components/MultidimensionalPi';
import MessageActionsContainer from '../MessageActionsContainer';
import { getAuthor } from '../../../../services/message';

import './style.scss';

const DropdownControl = withDropdownControl(Button);

const FOLD_HEIGHT = 80; // = .m-message__content--fold height

class Message extends Component {
  static propTypes = {
    message: PropTypes.shape({}).isRequired,
    onMessageRead: PropTypes.func.isRequired,
    onMessageUnread: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    onCopyTo: PropTypes.func.isRequired,
    settings: PropTypes.shape({}).isRequired,
    isMessageFromUser: PropTypes.bool,
    i18n: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    isMessageFromUser: false,
  }

  state = {
    isFold: true,
    isTooLong: false,
    isOnTop: undefined,
  }

  componentWillMount() {
    this.dropdownId = uuidV1();
  }

  componentDidMount() {
    setTimeout(this.setContentHeight(), 1);
  }

  onChange = (isVisible) => {
    const { message, onMessageRead } = this.props;
    if (isVisible && message.is_unread) { onMessageRead({ message }); }
  }

  setContentHeight = () => {
    const { message } = this.props;
    const isTooLong = this.bodyEl.clientHeight > FOLD_HEIGHT;

    this.setState(prevState => ({
      ...prevState,
      isTooLong,
      isFold: isTooLong && !message.is_unread,
    }));
  }

  handleExpandClick = () => {
    this.setState(prevState => ({
      ...prevState,
      isFold: !prevState.isFold,
    }));
  }

  renderDate = () => {
    const { message, settings: { default_locale: locale }, isMessageFromUser } = this.props;
    const hasDate = (isMessageFromUser && message.date)
      || (!isMessageFromUser && message.date_insert);

    return (
      <div className="m-message__date">
        {hasDate &&
          <Moment format="LT" locale={locale}>
            {isMessageFromUser ? message.date : message.date_insert}
          </Moment>
        }
      </div>

    );
  }

  renderMessageContent = () => {
    const { message } = this.props;

    const contentProps = {
      className: classnames(
        'm-message__content',
        { 'm-message__content--fold': this.state.isFold },
      ),
      style: {
        height: this.state.isFold ? FOLD_HEIGHT : 'auto',
      },
    };

    const bodyProps = {
      className: classnames(
        'm-message__body',
        { 'm-message__body--rich-text': !message.body_is_plain },
      ),
      ref: (el) => { this.bodyEl = el; },
    };

    return (
      <div {...contentProps}>
        {!message.body_is_plain ? (
          <div {...bodyProps} dangerouslySetInnerHTML={{ __html: message.body }} />
        ) : (
          <pre {...bodyProps}>{message.body}</pre>
        )
        }
      </div>
    );
  }

  render() {
    const {
      message, onDelete, onMessageUnread, onMessageRead,
      onReply, onCopyTo, i18n,
    } = this.props;
    const author = getAuthor(message);
    const typeTranslations = {
      email: i18n._('message-list.message.protocol.email', { defaults: 'email' }),
    };

    const topBarClassName = classnames(
      'm-message__top-bar',
      { 'm-message__top-bar--is-unread': message.is_unread },
    );

    const subjectClassName = classnames(
      'm-message__subject',
      { 'm-message__subject--is-unread': message.is_unread },
    );

    const messageType = typeTranslations[message.type];

    return (
      <div id={message.message_id} className="m-message">
        <div className="m-message__avatar-col">
          <ContactAvatarLetter
            contact={author}
            className="m-message__avatar"
            contactDisplayFormat="address"
          />
        </div>
        <div className="m-message__container">
          <div className={topBarClassName}>
            {message.pi && <MultidimensionalPi pi={message.pi} className="m-message__pi" mini />}
            {author.address && <TextBlock className="m-message__author">{author.address}</TextBlock>}
            {message.type &&
              (<div className="m-message__type">
                <span className="m-message__type-label">
                  <Trans id="message-list.message.by">by {messageType}</Trans>
                </span>
                {' '}
                <Icon type={message.type} className="m-message__type-icon" spaced />
              </div>
            )}
            {this.renderDate()}

            <DropdownControl toggleId={this.dropdownId} className="m-message__actions-switcher" icon="ellipsis-v" />

            <Dropdown
              id={this.dropdownId}
              alignRight
              isMenu
              closeOnClick
              closeOnScroll
            >
              <MessageActionsContainer
                message={message}
                onDelete={onDelete}
                onMessageRead={onMessageRead}
                onMessageUnread={onMessageUnread}
                onReply={onReply}
                onCopyTo={onCopyTo}
              />
            </Dropdown>

          </div>

          {message.subject &&
            <TextBlock className={subjectClassName}>
              {message.subject}
            </TextBlock>
          }

          {this.renderMessageContent()}
          <VisibilitySensor onChange={this.onChange} scrollCheck scrollThrottle={100} />

          <div className="m-message__footer">
            {this.state.isTooLong &&
              <Button
                onClick={this.handleExpandClick}
                display="expanded"
                className="m-message__footer-button"
              >
                {this.state.isFold ?
                  (<Trans id="message-list.message.action.expand">Expand</Trans>) :
                  (<Trans id="message-list.message.action.collapse">Collapse</Trans>)
                }
              </Button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
