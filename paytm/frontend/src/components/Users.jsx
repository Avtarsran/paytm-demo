import React, { useEffect, useState } from 'react'
import Button from './Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'

function Users() {
  const [users,setUsers] = useState([])
  const [filter, setFilter] = useState("")
  const debouncedValue = useDebounce(filter,500)

  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/users/bulk?filter=" + debouncedValue,{
      headers:{
        "authorization": localStorage.getItem("authorization")
      }
    })
    .then(response => setUsers(response.data.users))
  },[debouncedValue])

  return (
    <div className='flex flex-col mt-5'>
      <div className="flex flex-col font-semibold text-lg ml-5">
        Users
      </div>
      <div className='flex flex-col mt-2 mx-5'>
      <input onChange={(e)=>{
        setFilter(e.target.value)
      }} type="text" id="first_name" className="shadow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block p-2" placeholder='Search users...' />
      </div>
      <div className='mx-5 mt-3'>
            {users.map(user => <User key={user.id} user={user}/>)}
        </div>
    </div>
  )
}
function User({user}){
    const navigate = useNavigate()
    return <div className="flex justify-between">
    <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
                {user.firstName[0].toUpperCase()}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <div>
                {user.firstName} {user.lastName}
            </div>
        </div>
    </div>

    <div className="flex flex-col justify-center h-ful">
        <Button onClick={()=>{
          navigate("/send?id=" + user.id + "&name=" + user.firstName)
        }} label={"Send Money"} />
    </div>
</div>
}


export default Users
