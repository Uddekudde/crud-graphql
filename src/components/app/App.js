import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './App.css';

function App() {

  const [posts, setPost] = useState(false);

  useEffect(() =>{
    axios.get('http://localhost:3000/posts')
    .then(response => {
      setPost(response.data);
    })
  }, []);

  return (
    <div className="flex-container">
      <form className="form" noValidate autoComplete="off">
        <TextField 
          name="username" 
          fullWidth 
          label="Name" 
        />
        <TextField 
          name="email" 
          fullWidth 
          label="Email" 
        />
        <div class="form-buttons">
          <Button className="button-submit" type="submit">
            Submit
          </Button>
          <Button className="button-clear" type="button">
            Clear
          </Button>
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
