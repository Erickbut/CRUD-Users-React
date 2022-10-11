import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers.jsx'
import UserCard from './components/UserCard.jsx'

const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  const [users, setUsers] = useState()

  //para pasar info desde userCard hasta formuser
  const[updateInfo,setUpdateInfo]=useState()

  const [formIsClose, setFormIsClose] = useState(true)
  //Para hacer el get de todos los users
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }


  useEffect(() => {
    getAllUsers()
  }, [])

  //para crear un nuevo usuario
  const createNewUser = data => {
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
      .then(res => {console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  //para eliminar un usuario especifico

  const deleteUserById=id=>{
    const URL=`${baseURL}/users/${id}/`
    axios.delete(URL)
    .then(res=>{
      console.log(res.data)
      getAllUsers()
    })
    .catch(err=>console.log(err))
  }
//Para actualizar un usuario especifico
const updateUserById= (id,data)=>{
  const URL=`${baseURL}/users/${id}/`
  axios.patch(URL, data)
  .then(res => {
    console.log(res.data)
    getAllUsers()
  })
  .catch(err => console.log(err))
}

  const handleOpenForm=()=>{
    setFormIsClose(false)
  }

  return (
    <div className="App">
      <div className="App_container-title">
      <h1 className='App_title'>Users CRUD</h1>
      <button onClick={handleOpenForm} className='App_btn-create'>Create a new user</button> 
      </div>
      <div className={`form-container ${formIsClose && 'disable_form'}`}>
      <FormUsers
        createNewUser={createNewUser} 
        updateInfo={updateInfo}
        updateUserById={updateUserById}
        setUpdateInfo={setUpdateInfo}
        setFormIsClose={setFormIsClose}
      />
      </div>
      <div className='users-container'>
      {
        users?.map(user=>(
            <UserCard
            key={user.id}
            user={user}
            deleteUserById={deleteUserById}
            setUpdateInfo={setUpdateInfo}
            setFormIsClose={setFormIsClose}
            />
        ))
      }
      </div>
      
    </div>
  )
}
export default App
