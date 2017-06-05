/**
 * @author Anthony Altieri on 6/4/17.
 */
import React from 'react';

const Overlay = ({
  isVisible,
  children,
  ...props
}) => !!isVisible
  ? (
    <div className="absoluteMiddle c center">
      {children}
      <div className="overlay" {...props}></div>
    </div>
  )
  : null;

export default Overlay;
