import { render } from '@testing-library/react';
import Comments from '../Comments';
import 'core-js';
import {socket} from 'socket.io-client';

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

jest.mock('socket.io-client');

jest.mock("../Comment", () => {
    return jest.fn().mockImplementation(() => {
      return null
    })
  })

  const renderComments = (selectedUserId) =>
  render(
    <Comments 
    socket={socket}
    selectedUserId={selectedUserId}
    />
  );

test('renders comment component', async () => {
    renderComments("Nikki");
});

