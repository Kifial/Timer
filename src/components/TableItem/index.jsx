import React from 'react';

require('./index.scss');

const TableItem = (props) => {
  return (
    <div className={'table-item ' + (props.odd ? 'table-item--odd' : '')}>
      <div className="table-item__date">{props.date}</div>
      <div className="table-item__time">{props.time.join(':')}</div>
      <div className="table-item__description">{props.description}</div>
    </div>
  )
};

export default TableItem;