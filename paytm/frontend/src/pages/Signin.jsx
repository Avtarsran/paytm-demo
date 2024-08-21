import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Signin() {
  const [userName,setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  return (
    <div className='flex justify-center rounded bg-slate-300 h-screen'>
      <div className='flex flex-col justify-center'>
        <div className='bg-white w-80 h-max rounded-lg text-center py-2 px-3'>
            <Heading label={"Sign In"}></Heading>
            <SubHeading label={'Enter your credentials to access your account'}></SubHeading>
            <Inputbox onChange={(e)=>{
              setUserName(e.target.value)
            }} label={"User Name:"} placeholder={"john_Dee"}></Inputbox>
            <Inputbox onChange={(e)=>{
              setPassword(e.target.value)
            }} label={"Password:"} placeholder={""}></Inputbox>
            <Button onClick={async()=>{
              const response = await axios.post("http://localhost:3000/api/v1/users/signin",{
                userName:userName,
                password:password
              });
              localStorage.setItem("authorization",`Bearer ${response.data.token}`)
              navigate("/dashboard")
            }} label={"SignIn"}></Button>
            <BottomWarning label={"already have an account? "} to={"/signup"} buttonText={"sigup here"}></BottomWarning>
        </div>
      </div>
    </div>
  )
}

export default Signin
