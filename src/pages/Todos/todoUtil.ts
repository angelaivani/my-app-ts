import axios from 'axios'

export const getTodos = () => {
  return axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
        })  
    
}
