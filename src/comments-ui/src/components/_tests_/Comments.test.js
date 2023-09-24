import { render, screen, fireEvent } from '@testing-library/react';
import Comments from '../Comments';
import 'core-js';

import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

jest.mock('socket.io-client');
let socket;

beforeEach(() => {
  socket = new MockedSocket();
  socketIOClient.mockReturnValue(socket);
});

afterEach(() => {
  jest.restoreAllMocks();
});
const renderComments = (selectedUserId) =>
render(
  <Comments socket={socket} selectedUserId={selectedUserId}/>
);

test('renders Comments component', async () => {
    renderComments("Nikki");
    socket.on('message:new', (data)=>{
      expect(data).toEqual(['message1', 'message2']);
      socket.socketClient.emit('message:new', ['message1', 'message2']);

  });
});


test('renders text area to submit a comment', async () => {
  renderComments("Nikki");
  const inputText = screen.getByTestId("commentInput");
  expect(inputText).toHaveTextContent("");
  fireEvent.change(inputText, {
    target: {value: 'Test Some Random Comment. '},
  });
  const btnSubmit = screen.getByTestId("submitComment");
  fireEvent(
    btnSubmit,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  ); 
});

