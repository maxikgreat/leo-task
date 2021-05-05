import { render } from '@testing-library/react';

import User from '.';
import { UserType } from '../../App';

describe('User component', () => {
  const user: UserType = {
    id: 1,
    name: 'Maksym Vasylenko',
    username: 'maxikgreat'
  };

  it('should render component correctly and match snapshot', () => {
    const elem = render(<User user={user}/>);

    expect(elem.getByText(user.name)).toBeTruthy();

    expect(elem.getByRole('listitem')).toMatchSnapshot();
  });
});
