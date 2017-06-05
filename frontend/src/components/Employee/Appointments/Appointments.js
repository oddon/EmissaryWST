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
    display: 'Provider Name',
    key: 'providerName'
  },
  {
    display: 'Phone number',
    key: 'phoneNumber'
  },
  {
    display: 'Date',
    key: 'date'
  },
  {
    display: 'Time',
    key: 'time'
  },
]


class Appointments extends Component {
  render() {
    return (
      <div className="stage">
        <SectionHeader text="Appointments"/>
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

Appointments = connect(stateToProps, dispatchToProps)(Appointments);
export default Appointments;
 