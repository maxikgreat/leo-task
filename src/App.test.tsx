import { render, screen, act } from '@testing-library/react';
import App from './App';
import axios from 'axios';

describe('App component', () => {
  const resolvedResponse = {
    data: [{
      id: 1,
      name: 'John Doe',
      username: 'best_programmer'
    }, {
      id: 2,
      name: 'Max Lavrov',
      username: 'maxikgreat'
    }]
  };

  const emptyResolvedResponse = {
    data: []
  };

  it('should render without errors', async () => {
    await act(async () => {
      render(<App/>);
    });
    expect(screen).toBeTruthy();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render users list', async () => {
    const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue(resolvedResponse);

    await act(async () => {
      render(<App/>);
    });

    expect(axiosSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list').childElementCount)
      .toBe(resolvedResponse.data.length);
  });

  it('should render loader', async () => {
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() =>
      new Promise(resolve => {
        setTimeout(() => resolve(resolvedResponse), 3000);
      })
    );

    await act(async () => {
      render(<App/>);
    });

    expect(axiosSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle empty users list', async () => {
    const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue(emptyResolvedResponse);

    await act(async () => {
      render(<App/>);
    });

    expect(axiosSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(screen.getByText('No users found!')).toBeInTheDocument();
  });

  it('should handle error and show it', async () => {
    const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValue(new Error('Ooops! Something went wrong'));

    await act(async () => {
      render(<App/>);
    });

    expect(axiosSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(screen.getByLabelText('error')).toBeInTheDocument();
  });
});
