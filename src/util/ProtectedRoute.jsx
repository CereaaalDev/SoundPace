import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, Outlet} from "react-router-dom"
import styled from 'styled-components';


const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
`


const ProtectedRoute = ({element}) => {
    const { loggedIn, loading } = useSelector((state) => state.auth);
    console.log('loading: ' + loading);

    if(loading) {
        return <LoadingContainer>
                <p>loading...</p>
        </LoadingContainer>
    }

    console.log(<Outlet/>)
 return (loggedIn ? element : <Navigate to={'/'} />)

};

export default ProtectedRoute;