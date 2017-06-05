/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import SectionHeader from '../SectionHeader';
import ResponsiveTable from '../ResponsiveTable';

const headers = [
  {
    display: 'First name',
    key: 'firstName'
  },
  {
    display: 'Last name',
    key: 'lastName'
  },
  {
    display: 'Phone number',
    key: 'phoneNumber'
  },
  {
    display: 'Email',
    key: 'email'
  },
]


class Employees extends Component {
  render() {
    return (
      <div className="stage">
        <SectionHeader text="Employees"/>
        <div id="tableContainer">
          <ResponsiveTable
            headers={headers}
            containerClassName="tableContainer"
          />
        </div>
      </div>
    );
  }
}

const stateToProps = (s) => ({});

const dispatchToProps = (d) => ({});

Employees = connect(stateToProps, dispatchToProps)(Employees);
export default Employees;
 