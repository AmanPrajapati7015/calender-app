import { useState } from 'react'
import './App.css'
import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

function App() {
  const {loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently} = useAuth0();
  console.log(user);

  async function callApi(){
    try{

      let res =  await axios.get('http://localhost:3000/');
      console.log(res.data);
    }
    catch(err){
      console.log(err.message);
      
    }
  }

  async function callProtectedApi(){
    try{
      const token = await getAccessTokenSilently();
      console.log(token);
      let res =  await axios.get('http://localhost:3000/protected', {
        headers: {
          Authorization : `Bearer ${token}`
        }
      });
      console.log(res.data);
    }
    catch(err){
      console.log(err.message);
    }
  }
  

  return (
    <>
      <button onClick={loginWithRedirect}>login in with google</button><br />
      <button onClick={logout}>Logout</button><br />
      <button onClick={callApi}>call Api</button><br />
      <button onClick={callProtectedApi}>call Protected Api</button><br />

      {isAuthenticated &&
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      }
    </>
  )
}



export default App
