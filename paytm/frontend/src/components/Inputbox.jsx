import React from 'react'

function Inputbox({label, placeholder, onChange}) {
  return (
    <div className='-my-0'>
      <div className='text-sm text-left font-medium py-2'>
        {label}
      </div>
      <input onChange={onChange} type="text" id="first_name" className="shadow bg-gray-50  text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder={placeholder} required />
    </div>
  )
}

export default Inputbox
