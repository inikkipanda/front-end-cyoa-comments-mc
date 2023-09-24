import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import 'core-js';

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

test('renders comment ui with Welcome Banner', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, Nikki !!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders text area to submit a comment', async () => {
  render(<App />);
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

test('renders error text while submitting empty text', async () => {
  render(<App />);
  expect(screen.getByTestId("commentInput")).toHaveTextContent("");
  const btnSubmit = screen.getByTestId("submitComment");   
  //await userEvent.click(btnSubmit);
  fireEvent(
    btnSubmit,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );  
  expect(screen.getByTestId("commentSubmitError")).toHaveTextContent(/Please input valid text to send./i);

});

test('renders all comments', async () => {
  render(<App />);
  expect(screen.getByTestId("commentsHeader")).toHaveTextContent(/comments/i);
});

