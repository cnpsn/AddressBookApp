import React from 'react'
const GlobalContext = React.createContext();

function GlobalProvider(props) {
    return (
        <GlobalContext.Provider value={{
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider
export {GlobalContext}