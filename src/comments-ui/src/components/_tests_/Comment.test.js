import { render } from '@testing-library/react';
import Comment from '../Comment';
import 'core-js';

jest.mock("../Comment", () => {
    return jest.fn().mockImplementation(() => {
      return null
    })
  })

test('renders comment component', async () => {
  render(<Comment />);

});

