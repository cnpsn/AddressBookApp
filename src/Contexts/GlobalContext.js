import React,{useState} from 'react'
const GlobalContext = React.createContext();

function GlobalProvider(props) {
    const [UserList, setUserList] = useState([])
    return (
        <GlobalContext.Provider value={{
            UserList:UserList,
            setUserList:v => setUserList(v)
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider
export {GlobalContext}