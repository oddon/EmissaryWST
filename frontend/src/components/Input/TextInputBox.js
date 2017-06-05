/**
 * @author Anthony Altieri on 6/4/17.
 */

import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import colors from '../../colors';

class TextInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocussed: false,
    }
  }

  onFocus(e) {
    this.state.isFocussed = true;
    this.forceUpdate();
  }
  onBlur(e) {
    this.state.isFocussed = false;
    this.forceUpdate();
  }


  render() {
    const {
      type,
      placeholder,
      defaultValue,
      containerStyle,
      isError,
      errorMessage,
      onChange,
      inputRef,
      style,
      containerClassName,
    } = this.props;
    const {
      isFocussed
    } = this.state;

    let inputType = type;
    let icon = null;
    switch (type) {
      case 'email':
        icon = <FontIcon className="fa fa-envelope-o icon"/>;
        break;

      case 'password':
        icon = <FontIcon className="material-icons icon">lock_outline</FontIcon>;
        break;

      case 'name':
      case 'account':
        icon = <FontIcon className="fa fa-user-o icon" />;
        inputType = 'text';
        break;
    }

    let outsideContainerNode;


    return (
      <div
        className={`c left ${!!containerClassName ? containerClassName : ''}`}
        style={containerStyle}

      >
        <div
          className={`textInputBoxOutsideContainer ${!!isError ? 'error' : ''}`}
          ref={(n) => { outsideContainerNode = n }}
          style={{
            ...style,
            boxShadow: isFocussed ? `0 0 10px ${colors.secondary}` : 'none',
          }}
        >
          {icon}
          <div className={`textInputBoxContainer ${!!icon ? '' : 'noIcon'}`}>
            <input
              onChange={onChange}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              ref={(n) => {
                if (!n) return;
                n.value = !!defaultValue ? defaultValue : '';
                if (!!inputRef) {
                  inputRef(n)
                }
            }}
              type={inputType}
              placeholder={placeholder}
              className="textInputBox"
            />
          </div>
        </div>
        {!!isError && !!errorMessage
          ? <p className="textInputBoxErrorMessage">{errorMessage}</p>
          : null
        }
      </div>
    )
  }

}

export default TextInputBox;
