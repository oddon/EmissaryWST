/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
import throttle from 'lodash/throttle';

const DEFAULT_ROW_HEIGHT = 50;
const DEFAULT_HEADER_HEIGHT = 50;
const DEFAULT_COLUMN_WIDTH = 1000;
const DEFAULT_HEIGHT = 400;
const DEFAULT_WIDTH = 400;


const TextCell = ({ rowIndex, data, col, ...props }) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
)

const containerId = 'ResponsiveTableContainer';

class ResponsiveTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    }
  }

  componentDidMount() {
    const container = document.getElementById(containerId);
    this.state.width = container.offsetWidth || DEFAULT_WIDTH;
    this.state.height = container.offsetHeight || DEFAULT_HEIGHT;
    this.forceUpdate();
    this.oldWindowOnResize = window.onresize;
    window.onresize = () => {
      if (!!this.oldWindowOnResize) {
        this.oldWindowOnResize();
      }
      const ONE_TENTH_SECOND = 100;
      (throttle(() => {
        this.state.width = container.offsetWidth || DEFAULT_WIDTH;
        this.state.height = container.offsetHeight || DEFAULT_HEIGHT;
        this.forceUpdate();
      }, ONE_TENTH_SECOND))();
    }
  }

  componentWillUnmount() {
    if (!!this.oldWindowOnResize) {
      window.onresize = this.oldWindowOnResize;
    }
  }


  render() {
    const {
      containerClassName,
      rows = [],
      headers = [],
      rowHeight = DEFAULT_ROW_HEIGHT,
      headerHeight = DEFAULT_HEADER_HEIGHT,
      columnWidth = DEFAULT_COLUMN_WIDTH,
    } = this.props;


    return (
      <div
        className={`${containerClassName || ''} relative`}
        id={containerId}
      >
        {rows.length === 0
          ? (
            <p
              style={{
                top: 62,
                right: '40%',
                left: '40%',
                position: 'absolute',
                fontSize: 32,
                color: 'rgba(0,0,0,0.2)',
              }}
            >
              No Data Yet
            </p>
          )
          : null
        }
        <Table
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          rowsCount={rows.length}
          width={this.state.width || DEFAULT_WIDTH}
          height={this.state.height || DEFAULT_HEIGHT}
        >
          {headers.map((h) => (
            <Column
              key={`Column-${h.display}`}
              header={<Cell>{h.display}</Cell>}
              cell={<TextCell data={rows} col={h.key} />}
              width={!!this.state.width
                ? (this.state.width / headers.length)
                : DEFAULT_COLUMN_WIDTH
              }
            />
          ))}
        </Table>

      </div>
    );
  }
}

export default ResponsiveTable;
 