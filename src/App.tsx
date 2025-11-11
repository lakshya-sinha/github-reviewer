import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './page/Landing'
import Profile from './page/Profile'
import Nprofile from './page/Nprofile'

function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>

            <Route path='/' element={< Landing />}></Route>
            <Route path='/profile/:username' element={< Profile />}></Route>
            <Route path='/profile' element={< Nprofile />}></Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
