
import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  //  In react we can use it like this 
  // console.log(process.env.REACT_APP_APPWRITE_URL);
  
  // but in vite it allow us to use it like this 
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
        authService.getCurrentUser()
        .then((userData)=>{
          if (userData) {
            dispatch(login({userData}))
          } else {
            dispatch(logout)
          }
        })
        .finally(()=>setLoading(false))
  }, [])
  

 return !loading ? (
  <div className=' min-h-screen flex flex-wrap bg-gray-400 content-between'>
    <div className='w-full block'>
      <Header/>
      <main>
      TODO:  <Outlet />
      </main>
      <Footer/>
    </div>
  </div>
 ) : null
}

export default App
