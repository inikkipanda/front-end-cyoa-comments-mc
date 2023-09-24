import { useState } from "react";
import "./App.css";
import Comments from "./components/Comments";
import Header from "./components/Header";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [selectedUserId] = useState("Nikki");

  return (
    <div className="App">
      <Header socket={socket} selectedUserId={selectedUserId}/>
      <Comments socket={socket} selectedUserId={selectedUserId}/>
    </div>
  );
}

export default App;