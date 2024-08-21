import React, { useEffect, useState } from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Appbar() {
  const [user,setUser] = useState({});
  const navigate = useNavigate()
  // const user = useRecoilValue(userAtom)
  
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/users/me",{
      headers: {
        "authorization":localStorage.getItem("authorization")
      }
    })
    .then(response=>setUser(response.data))
    console.log(user)
  }, []);

  return (
    <div className='h-12 flex justify-between shadow'>
      <div className='flex justify-center h-full flex-col ml-4'>
        PayTM App
      </div>
      <div className="flex">
        <div className='flex flex-col h-full justify-center mr-2'>
            Hello
        </div>
        <div className='flex flex-col h-full justify-center'>
        <div className='bg-slate-200 h-10 w-10 rounded-full flex justify-center mr-3 '>
            <div className='flex flex-col justify-center h-full text-center text-xl'>
                {!user.user ? 'U':user.user.firstName[0].toUpperCase()}
            </div>
        </div>
        
        </div>
        <div className='flex justify-center h-full mr-3 -mt-2'>
          <Button onClick={()=>{
            localStorage.removeItem("authorization")
            navigate("/signup")
          }} label={'Log out'}></Button>
        </div>
        
      </div>
      
    </div>
  )
}

export default Appbar
