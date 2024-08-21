import React from 'react'
import { Link } from 'react-router-dom'

function BottomWarning({label ,buttonText ,to}) {
  return (
    <div className='py-2 flext justify-center text-sm'>
        <div>
            {label}
        </div>
        <Link to={to} className='pointer underline cursor-pointer'>
        {buttonText}
        </Link>
    </div>
  )
}

export default BottomWarning
