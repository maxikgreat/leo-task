import React, { Dispatch, SetStateAction, VFC } from 'react';

interface SearchProps {
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

const Search: VFC<SearchProps> = ({ value, setValue }) => (
  <input
    placeholder="Search by user name..."
    value={value}
    onChange={({ target: { value } }) => setValue(value)}
  />
);

export default Search;
