import React, { useEffect, useState } from 'react';
import logo from './../../resources/logo.svg';
import axios from 'axios';
import './App.css';

function App() {

  const [posts, setPost] = useState(null);

  useEffect(() =>{
    axios.get('http://localhost:3000/posts')
    .then(response => {
      setPost(response.data);
    })
  }, []);

  return (
    <div>
      { posts ?
        posts.map(post => (
          <div key = {post.id}>
            {post.title}
          </div>)
        ) : (
          <div>yeet</div>
        )
      }
    </div>
  );
}

export default App;
