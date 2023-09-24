import { render } from '@testing-library/react';
import Header from '../Header';
import 'core-js';

// jest.mock("../Header", () => {
//     return jest.fn().mockImplementation(() => {
//       return null
//     })
//   })

test('renders comment component', async () => {
  render(<Header />);

});

