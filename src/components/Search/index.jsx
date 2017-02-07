import React from 'react';

require('./index.scss');

const Search = (props) => {
  return (
    <div className="search">
      <input
        type="text"
        name="search"
        placeholder="search by date or description"
        className="search__input"
        value={props.value}
        onChange={props.handleSearch}
      />
    </div>
  )
};

export default Search;