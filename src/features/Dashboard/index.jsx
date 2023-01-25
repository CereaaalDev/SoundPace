import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Dashboard (){
    const { userInfo } = useSelector(state => state.auth)


    return (
        <>
            <h1>Profile Name: {userInfo.name}</h1>
            <Link to={'/'}>Home</Link>
        </>
    )
}