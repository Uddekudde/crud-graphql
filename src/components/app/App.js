import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './App.css';

const BASE_URL = "http://localhost:3000/posts";

function App() {

  const [posts, setPost] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  useEffect(() =>{
    axios.get(BASE_URL)
    .then(response => {
      setPost(response.data);
    })
  }, []);

  function handleSubmit() {
    console.log("subitted");
    axios.post(BASE_URL, {
      id: Date.now(),
      title: username,
      author: email
    })
    .then(response => {
    })
  }

  return (
    <div className="flex-container">
      <form className="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField 
          name="username" 
          fullWidth 
          label="Name" 
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField 
          name="email" 
          fullWidth 
          label="Email" 
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="form-buttons">
          <div className="button-margin">
            <Button className="button-submit" variant="contained" type="submit">
              Submit
            </Button>
          </div>
          <div className="button-margin">
            <Button className="button-clear" variant="contained">
              Clear
            </Button>
          </div>
        </div>
      </form>
      { posts ?
        posts.map(post => (
          <Card key = {post.id}>
            <CardContent>
              <Typography variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1">
                {post.author}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">EDIT</Button>
              <Button size="small">DELETE</Button>
            </CardActions>
          </Card>
          )
        ) : (
          <div>yeet</div>
        )
      }
    </div>
  );
}

export default App;
