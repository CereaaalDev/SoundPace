import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, Outlet} from "react-router-dom"


const ProtectedRoute = ({element}) => {
    const { loggedIn, loading } = useSelector((state) => state.auth);
    console.log('loading: ' + loading);

    if(loading) {
        return <>Loading...</>
    }

    console.log(<Outlet/>)
 return (loggedIn ? element : <Navigate to={'/'} />)

};

export default ProtectedRoute;