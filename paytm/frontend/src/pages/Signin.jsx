import React, { useEffect, useRef, useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { classAtom } from '../store/atoms/classAtom'
function Signin() {
  const userName = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate()
  const [classHeight, setClassHeight] = useRecoilState(classAtom)
 
  useEffect(()=>{
    const updateHeight = () => {
      if (document.documentElement.scrollHeight >= 557) {
        setClassHeight('h-screen')
      }
      else{
        setClassHeight('h-full')
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  },[])
  return (
    <div className={`flex justify-center rounded bg-slate-300 ${classHeight}`}>
      <div className='flex flex-col justify-center'>
        <div className='bg-white w-80 h-max rounded-lg text-center py-2 px-3'>
            <Heading label={"Sign In"}></Heading>
            <SubHeading label={'Enter your credentials to access your account'}></SubHeading>
            <Inputbox ref={userName} label={"User Name:"} placeholder={"john_Dee"}></Inputbox>
            <Inputbox ref={password} label={"Password:"} placeholder={""}></Inputbox>
            <Button onClick={async()=>{
              const response = await axios.post("http://localhost:3000/api/v1/users/signin",{
                userName:userName.current.value,
                password:password.current.value
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
