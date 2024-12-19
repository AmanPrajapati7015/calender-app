import {useAuth0} from '@auth0/auth0-react'
import { useNavigate } from "react-router-dom";
import './navbar.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function NavBar() {
    const {loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const navigator = useNavigate();
    function handleLogout() {
        logout();
        navigator('/dashboard');
    }

    return (
        <>
        <div className='navbar'>
            <div className="left">
                <h2 onClick={()=>navigator('/')} >Calender</h2>
            </div>
            {isAuthenticated ?
                <Stack spacing={2} direction="row" alignItems={'center'}>
                    <h3>Hi, {user.name}</h3>
                    <Button onClick={handleLogout} variant="outlined">Log out</Button>
                    <Button onClick={()=>navigator('/addnewform')} variant="contained">Add Event</Button>
                </Stack>
            :
                <Stack spacing={2} direction="row" alignItems={'center'}>
                    <Button onClick={loginWithRedirect} variant="contained">Login</Button>
                    <Button onClick={loginWithRedirect} variant="outlined">Sign up</Button>
                </Stack>
            }

        </div>
        </>
    )

}


export default NavBar;