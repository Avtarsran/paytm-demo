import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios';

function Dashboard() {
  const [balance,setBalance] = useState(0);  
  
  if(localStorage.getItem('authorization')){
    useEffect(()=>{
      try {
        axios.get("http://localhost:3000/api/v1/account/balance",{
          headers:{
            "authorization":localStorage.getItem("authorization")
          }
        })
        .then(response=>
          setBalance(response.data)
        )
        
      } catch (error) {
        console.log('')
      }
      
    },[])
  }
  
  return (
    <div>
      <Appbar></Appbar>
      <Balance value={balance}></Balance>
      <Users></Users>
    </div>
  )
}

export default Dashboard
