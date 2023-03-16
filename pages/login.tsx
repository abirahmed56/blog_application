import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

function login() {
    const {data: session} = useSession()

    if(session){
        console.log(session)
        return (
            <div>
                <p>Welcome, {session.user?.email}</p>
                <button onClick={()=> signOut()}>signOut</button>
            </div>
            
        )
    }else{
        return(
            <div>
                <p>You are not signIn</p>
                <button onClick={()=> signIn()}>signIn</button>
            </div>
        )
    }
}

export default login