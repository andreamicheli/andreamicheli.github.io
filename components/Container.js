import React from 'react'

function Container({children}) {
  return (
    <div className="w-screen h-screen p-10">
        {children}
    </div>
  )
}

export default Container