import { Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import DisplayPage from "./components/DisplayPage";


function App() {
  return (
    <Routes >
      <Route path="/" element={<HomePage />}/>
      <Route path="/countries/:id" element={<DisplayPage />}/>
    </Routes>
  )
}

export default App;
