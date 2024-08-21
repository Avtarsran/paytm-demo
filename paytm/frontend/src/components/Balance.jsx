import React from 'react'

function Balance({value}) {
  return (
    <div className='flex mt-5'>
      <div className='font-semibold text-xl ml-5'>
        Your Balance
      </div>
      <div className='ml-5 text-xl'>
        Rs. {value}
      </div>
    </div>
  )
}

export default Balance
