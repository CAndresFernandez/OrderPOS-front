import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Tables from './components/Tables/Tables';
import CurrentOrder from './components/CurrentOrder/CurrentOrder';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="/current-order" element={<CurrentOrder />} />

      </Routes>
      <Navbar />
    </>
  )
}

export default App;
