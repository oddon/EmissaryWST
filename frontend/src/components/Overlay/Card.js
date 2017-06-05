/**
 * @author Anthony Altieri on 6/4/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overlay from './Overlay';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Card as MaterialCard } from 'material-ui/Card';
import iconStyles from '../../iconStyles';

class Card extends Component {
  render() {
    const { isVisible, hideOverlay, children } = this.props;
    return (
      <Overlay isVisible={isVisible} onTouchTap={() => hideOverlay()}>
        <div className="r center" style={{ zIndex: 10 }}>
          <MaterialCard
            className="overlayCard"
            containerStyle={{
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <IconButton
              onTouchTap={() => hideOverlay()}
              style={{
                ...iconStyles.small,
                position: 'relative',
                right: 25,
              }}
            >
              <FontIcon
                id="x"
                className="material-icons"
              >
                close
              </FontIcon>
            </IconButton>
            {children}
          </MaterialCard>
        </div>
      </Overlay>
    );
  }
}
export default Card;
