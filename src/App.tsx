import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Tables from './components/Tables/Tables';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Tables />} />

      </Routes>
      <Navbar />
    </>
  )
}

export default App;
