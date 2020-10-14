import React,{useEffect} from 'react'

export default function Logout() {
    useEffect(() => {
        localStorage.removeItem('token');
        window.location="/register"
         
    })
    return (
        <div>
           logging out.. 
        </div>
    )
}
