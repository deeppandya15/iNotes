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


function App() {
  const [count, setCount] = useState(0)

  return (
    <NoteState >
      <>
        <Router>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/About' element={<About />}></Route>
            </Routes>
          </div>
        </Router>
      </>
    </NoteState>
  )
}

export default App
