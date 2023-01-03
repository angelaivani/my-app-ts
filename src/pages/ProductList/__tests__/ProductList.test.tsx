import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import ProductList from '../ProductList'
import AddProduct from '../../AddProduct'


jest.mock('axios')
const axiosMock = axios as jest.Mocked<typeof axios>

const renderProductListComponent = () => (
  render(
    <MemoryRouter >
      <ProductList />
    </MemoryRouter>
  )
)

test('should render all users', async() => {  
  renderProductListComponent()
  axiosMock.get.mockResolvedValueOnce({
    data: [
      {
        id: '1',
        name: 'angel'
      },
      {
        id: '2',
        name: 'nora'
      }
    ]
  })

  const btnElement = screen.getByRole('button', { name: 'FETCH DATA'})  
  fireEvent.click(btnElement)

  await waitFor(() => {
    const userList = screen.getAllByRole('listitem')
    expect(userList).toHaveLength(2)
    expect(userList[0]).toHaveTextContent('angel')            
  });
})

test('when klik add button should redirect to add product page', async() => {
  render(
    <MemoryRouter initialEntries={['/product/list']}>
      <ProductList />
      <AddProduct />    
    </MemoryRouter>
  )
  const addBtnElement = screen.getByRole('button', { name: 'Add Product'})
  console.log('ADD element', addBtnElement)
  fireEvent.click(addBtnElement)

  await waitFor(() => {
    const titleAddProduct = screen.getByText(/add Product page/i)
    console.log('title add product', titleAddProduct)
    expect(titleAddProduct).toBeInTheDocument()
  })
})


