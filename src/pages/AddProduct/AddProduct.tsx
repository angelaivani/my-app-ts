import { useState } from 'react' 
import { FormGroup, FormControlLabel, Checkbox, CheckboxProps } from '@mui/material' 

const AddProduct = () => {
  const [listCars, setListCars] = useState([
    {
      name: 'Avanza',
      isSelected: false
    },
    {
      name: 'Toyota',
      isSelected: false
    }
  ])
  
  const handleChangeCheckbox: CheckboxProps['onChange'] = (e) => {
    const { name, checked } = e.target
    const index = listCars.findIndex(item => item.name === name)

    const newList = listCars.map(item => ({...item}))
    newList[index].isSelected = checked
    setListCars(newList)    
  }

  return (
    <div>
      <h1>Add Product Page</h1>    
    <FormGroup>
      {listCars.map(carItem => (
        <FormControlLabel key={carItem.name} control={<Checkbox name={carItem.name} checked={carItem.isSelected} onChange={handleChangeCheckbox} /> } label={carItem.name} />
      ))}        
    </FormGroup>        
    </div>
  )
}
export default AddProduct