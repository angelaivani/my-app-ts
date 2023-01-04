import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, FormControl, InputLabel, Select, SelectProps, MenuItem } from '@mui/material'
import { datadogRum } from '@datadog/browser-rum'
import axios, { AxiosError } from 'axios'

type UserStateType = {
  id: string
  name: string
}

type FilterFormStateType = {
  warehouseId: number
  productSku: string
}

const warehouseList = [
  {
    id: 1,
    name: 'Kosambi'
  },
  {
    id: 2,
    name: 'Pegangsaan'
  },
  {
    id: 3,
    name: 'Jatim'
  }
]
const ProductList = () => {
  const navigate = useNavigate()
  const [filterForm, setFilterForm] = useState<FilterFormStateType>({
    warehouseId: 0,
    productSku: ''
  })

  const [users, setUsers] = useState<UserStateType[]>([])    

  const getData = async() => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    let responseUsers: UserStateType[] = response.data.map((responseUser: any) => {
      return {
        id: responseUser.id,
        name: responseUser.name
      }
    })    
    setUsers(responseUsers)
  }

  const handleRedirectToAddProduct = () => {
    navigate('/product/add')
  }

  const handleChangeWarehouse: SelectProps['onChange'] = (event) => {    
    console.log('SELECTED', event.target)
  }

  const fetchFakeError = async() => {
    try {
      const response = await axios.get('https://mock.codes/400')
      console.log('RESPONSE', response)
    }
    catch(err) {
      const errResponse = err as AxiosError
      datadogRum.addError(err, { errorSource: 'API CALL ERROR', url: errResponse?.config?.url, method: errResponse?.config?.method })
    }
  }

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
      <Button onClick={handleRedirectToAddProduct}>Add Product</Button>
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'center', width: '20%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gudang</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="warehouseId"
          value={filterForm.warehouseId}
          label="Gudang"
          onChange={handleChangeWarehouse}
        > 
        {warehouseList.map((item) => (
          <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
        ))}                       
        </Select>
      </FormControl>
      
    </Box>

    <button onClick={() => getData()}>FETCH DATA</button>
    <button onClick={() => fetchFakeError()}>Simulate fake error</button>
    <ul >
      {users.map(item => (
        <li key={item.id} data-testid="results">{item.id} - {item.name}</li>
      ))}
    </ul>
    </>        
  )
}
export default ProductList