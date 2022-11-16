import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react"
import Callback from './pages/Callback';
import Protected from './pages/Protected';
import Profile from './pages/Profile';
import Navbar from './component/Navbar';
import Recommendations from './pages/Recommendations';




function App() {
  const { isLoading } = useAuth0()
  if(isLoading){
    return (
      <div>
        <h1>loading...</h1>
      </div>
    )
  }
  

  return (
    <BrowserRouter className="App">
      <Navbar/>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/callback' element={<Callback />} />
        <Route path='/protected' element={<Protected />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/recommendations' element={<Recommendations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;