import { render, screen, fireEvent } from '@testing-library/react';
import 'core-js';
import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';
import Header from '../Header';

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

jest.mock('socket.io-client');
jest.mock("../Header", () => {
    return jest.fn().mockImplementation(() => {
      return null
    })
  })
  let socket;
  
  beforeEach(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderHeader = (selectedUserId) =>
  render(
    <Header socket={socket} selectedUserId={selectedUserId}/>
  );

test('renders Header component', async () => {
  renderHeader("Nikki");
  socket.socketClient.emit('new-comment', [2]);
  socket.on('new-comment', (data)=>{
    expect(data).toEqual([2]);
    const btnClearNotification = screen.getByTestId("iconNotifications");
    expect(btnClearNotification).toBeInTheDocument();
    fireEvent(
      btnClearNotification,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    ); 
    expect(btnClearNotification).toBeNotInTheDocument();
    });
});

