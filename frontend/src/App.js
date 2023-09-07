import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from "./Pages/Homepage";
import Chat from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ='/' element={<Homepage />} />
        <Route path ='/chats' element={<Chat />} /> {/* Specify the element or component */}
      </Routes>
    </div>
  );
}

export default App;
