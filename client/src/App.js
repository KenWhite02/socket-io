import './App.css';
import { posts } from './data';

import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('http://localhost:4000'));
  }, []);

  useEffect(() => {
    socket?.emit('newUser', user);
  }, [socket, user]);

  return (
    <div className="container">
      {!user ? (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      ) : (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      )}
    </div>
  );
};

export default App;
