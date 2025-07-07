import React, { useEffect, useState } from "react";
import axios from "axios";

interface Profile {
  email: string;
  role: string;
}

function App(){
  const [mode, setMode]= useState<'login'|'register'>('login');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [message, setMessage]= useState('');
  const [profile, setProfile]= useState<Profile | null>(null);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchProfile= async (token: string): Promise<void> => { 
    try {
    const res = await axios.get<Profile>('http://localhost:5000/profile', {
      headers: {
        'Authorization': 'Bearer ${token}',
      },
    });
    setProfile(res.data);
  } catch (error) {
    console.error('Profile fetch error:', error);
    setMessage('Failed to fetch profile.');
  }
};
useEffect(() =>{
  const token = localStorage.getItem('token');
  if (token) {
    fetchProfile(token);
  }
}, []);
  const handleSubmit= async(e: React.FormEvent)=>{
    e.preventDefault();
      const endpoint= 'http://localhost:5000/${mode}';
      try{
        const res = await axios.post<{ token: string; message: string }>(endpoint, { email, password});
        localStorage.setItem('token', res.data.token);
        setMessage(res.data.message);
        await
        fetchProfile(res.data.token);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Profile fetch error', error.message);
        } else {
          console.error('profile fetch error', error);
        }
      }
    }
      if (profile) {
        return (
          <div>
            <h1>Welcome!</h1>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>
            <button onClick={() => {
              localStorage.removeItem('token');
              setProfile(null);
            }}>Logout</button>
          </div>
        );
      }
      return (
        <div>
          <h1>{mode === 'login'? 'Login': 'Register'}</h1>
          <form onSubmit= {handleSubmit}>
            <input
            type="email"
            onChange={(e) => 
              setEmail(e.target.value)}
              placeholder="Email"required/><br></br>
              <input
              type="password"
              onChange={(e) =>
                setPassword(e.target.value)}
                placeholder="Password"required/><br/>
                <button type="submit">{mode === 'login'? 'Login': 'Register'}</button>
                </form>
                {message && <p>{message}</p>}
                <button onClick={() =>
                  setMode(mode === 'login'? 'register': 'login')}>
                    Switch to {mode === 'login'? 'Register': 'Login'}
                  </button>
                </div>
              )
            }

export default App;