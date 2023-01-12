import { Link, Outlet, useNavigate } from "react-router-dom";
import "./css_reset.css";
import './App.css'
import {sha256} from 'crypto-hash';
import { Buffer } from 'buffer';
import CryptoJS from "crypto-js";

export default function App(){

    let navigate = useNavigate();

    const BASE_AUTH_URL = 'https://accounts.spotify.com/authorize';
    const TOKEN_URL = 'https://accounts.spotify.com/api/token';
    const CLIENT_ID = '9e015ecfbd974c18a74316be13330671';
    const RESPONSE_TYPE = 'code';
    const REDIRECT_URL = 'http://localhost:5173/afterLogin'
    const CODE_CHALLENGE_METHOD = 'S256'
    let code_verifier = 'xkvkgvfrdxjbfijlsibyjfvxonetbnwztticxjtyrbqgmaxehr';
    let code_challenge;
    let encoded_code_challenge;
    let openWindow;
    let access_token;

    const generateURL = async () => {

        encoded_code_challenge = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");


        let url = `${BASE_AUTH_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URL}&code_challenge_method=${CODE_CHALLENGE_METHOD}&code_challenge=${encoded_code_challenge}`
        console.log('code:'+code_challenge);
        sessionStorage.setItem('code_challenge',code_challenge);
        console.log('URL: '+url);
        openPopup(url)
    }


    const handleWindowMessage = async (message) => {
        if(message.data.type === 'callbackmessage'){
            closePopup();
            console.log(message.data.payload);
            getAuthToken(message.data.payload.code);
            navigate('/arrived');
            
        }
 
    }

    const getAuthToken = async (code) => {

        let body = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URL,
            client_id: CLIENT_ID,
            code_verifier: code_verifier
        }
        let response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(body)   
    })
        let data = await response.json();
        sessionStorage.setItem('access_token',data.access_token)
        console.log(access_token);
    }


    const openPopup = (url) => {

        openWindow = window.open(
            url,
            'OAuth2 Popup',
            `height=400,width=700,top=200,left=300`
        );

        window.addEventListener('message', handleWindowMessage)
    }


    const closePopup = () => {
        openWindow.close();
    }

    const request = async () => {
        console.log(sessionStorage.getItem('access_token'))

        const response = await fetch('https://api.spotify.com/v1/audio-features/2czpGtNhPPVEh6hfedLpyT', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            }
        })
        const data = await response.json();
        console.log(data);
    }


    return (
        <>
            <div className="app">
                <h1>Welcome to mySpotify</h1>
                <p>Klicke auf den Link um dich einzuloggen</p>
                <button onClick={generateURL}>Login</button>
                <button onClick={closePopup}>Schliessen</button>
                <button onClick={request}>Request</button>

                {/* <Link className='button button-child' to={'/child'}>Login</Link>
                <Link className='button' to={'/afterLogin'}>Nach dem Login</Link> */}
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}