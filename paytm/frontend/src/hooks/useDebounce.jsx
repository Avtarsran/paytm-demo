import React, { useEffect, useState } from 'react'

function useDebounce(inputValue, milliSeconds) {
    const [debounceValue , setDebounceValue] = useState()
    useEffect(()=>{
      const time = setInterval(()=>{
          setDebounceValue(inputValue)
      },milliSeconds)
      return ()=>{
          clearInterval(time)
      }
    },[inputValue])
    return debounceValue
}

export default useDebounce
