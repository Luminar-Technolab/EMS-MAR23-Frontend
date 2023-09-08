import React, { createContext, useState } from 'react'
export const registerContext = createContext()
export const deleteContext = createContext()
export const updateContext = createContext()

function ContextShare({children}) {
    const [registerData,setRegisterData] = useState("")
    const [deleteData,setDeleteData] = useState("")
    const [updateData,setUpdateData] = useState("")

  return (
    <>

    <registerContext.Provider value={{registerData,setRegisterData}}> 
       <deleteContext.Provider value={{deleteData,setDeleteData}}> 
       <updateContext.Provider value={{updateData,setUpdateData}}> 
       {children}
       </updateContext.Provider>
      </deleteContext.Provider>
    </registerContext.Provider>

    </>
  )
}

export default ContextShare