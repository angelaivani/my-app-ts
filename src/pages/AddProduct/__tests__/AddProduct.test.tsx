import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AddProduct from '../AddProduct'

test('should render all checkbox component in non selected state', () => {
  render(<AddProduct />)
  const listCheckboxElement = screen.getAllByRole('checkbox')
  listCheckboxElement.forEach(cbElm => {
    expect(cbElm).not.toBeChecked()    
  })
})

test('should display checked, when selected checkbox is pressed', () => {
  render(<AddProduct />)
  const cbElement = screen.getByRole('checkbox', { name: 'Toyota'})
  userEvent.click(cbElement)
  expect(cbElement).toBeChecked()  
})