import { useState } from 'react'
import NoteState from './context/notes/NoteState';
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Alert from "./components/Alert"
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {
  const [count, setCount] = useState(0)
  const [alert, setalert] = useState(null);

  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }

  return (
    <NoteState >
      <>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home alertshow={showAlert} />}></Route>
              <Route exact path='/About' element={<About />}></Route>
              <Route exact path='/login' element={<Login alertshow={showAlert} />}></Route>
              <Route exact path='/signUp' element={<SignUp alertshow={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </>
    </NoteState>
  )
}

export default App
