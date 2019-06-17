import React, {useContext} from 'react'
import AuthContext from '../auth-context'
const Auth = props => {
    const auth = useContext(AuthContext)
    return (
    <>
    <h1> Auth Component</h1>

    <button onClick = {auth.login}>Log in!</button>
    </>)
}

export default Auth