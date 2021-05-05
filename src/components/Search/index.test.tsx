import { render, fireEvent } from '@testing-library/react';

import Search from '.';
import { useState, VFC } from 'react';

describe('Search component', () => {
  const placeholder = 'Search by user name...';
  it('should render correctly and match snapshot', () => {
    const value = 'Example value';

    const elem = render(<Search
      value={value}
      setValue={jest.fn()}
    />);

    expect((elem.getByPlaceholderText(placeholder) as HTMLInputElement).value)
      .toBe(value);
    expect(elem.getByPlaceholderText(placeholder)).toMatchSnapshot();
  });

  it('should change value correctly', () => {
    const newValue = 'New value';
    const StateWrapper: VFC = () => {
      const [search, setSearch] = useState('');

      return (
        <Search value={search} setValue={setSearch} />
      );
    };

    const elem = render(<StateWrapper />);

    const search = elem.getByPlaceholderText(placeholder);

    fireEvent.change(search, { target: { value: newValue } });

    expect((search as HTMLInputElement).value).toBe(newValue);
  });
});
