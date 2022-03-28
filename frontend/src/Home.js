import { useMutation, useQuery } from "@apollo/client";
import "./App.css";
import { useState, useEffect } from "react";
import { getAll } from "./Graphql/query";
import { CREATE_BLOG, DELETE_BLOG, UPDATE_BLOG } from "./Graphql/mutation";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";


const styles = muiBaseTheme => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
});

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Home({classes}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [blogs, setBlogs] = useState([]);
  

  const { loading, err, data, refetch } = useQuery(getAll);

  useEffect(()=>{
    setBlogs(data?.getAll)
  },[data]);

  const [createBlog, { error }] = useMutation(CREATE_BLOG,
    {
      onCompleted: (data) => {
        const newData = [...blogs, data.createBlog]
       setBlogs(newData)
       setTitle('')
       setDescription('')
      },
      onError: (error) => {
        console.log(error); 
      },
    }
  );

  const [deleteBlog] = useMutation(DELETE_BLOG,
    {
      onCompleted: (data) => {
        if(data.deleteBlog === 'Deleted'){
          setBlogs(blogs)
        }
      },
      onError: (error) => {
        console.log(error); 
      },
    }
  );

  const [updateBlog] = useMutation(UPDATE_BLOG,
    {
      onCompleted: (data) => {
       const newData = blogs.map((blog)=>{
         if(blog.id === data.updateBlog.id){
           return data.updateBlog 
         }else{
           return blog
         }
       })
       setBlogs(newData)
       setUpdateId('')
       setTitle('')
       setDescription('')
      },
      onError: (error) => {
        console.log(error); 
      },
    }
  );


  if (loading) return "Loading...";

  const addBlog = () => {
    createBlog({
      variables: {
        title,
        description,
      },
    });
  };

  const reemoveBlog = (id) => {
    deleteBlog({
      variables: {
        id,
      },
    });
    refetch()
  };

  const update = (id) => {
    setUpdateId(id);
  };

  const save = (id, dataTitle, dataDescription) => {
    updateBlog({
      variables: {
        id,
        title: editTitle ? editTitle : dataTitle,
        description: editDescription ? editDescription: dataDescription,
      },
    });
  };

  return (
    <div className="App">
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br></br>
      <TextareaAutosize
        id="standard-basic"
        label="Description"
        variant="standard"
        placeholder="Description"
        minRows={3}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br></br>
      <Button
        variant="contained"
        style={{ margin: 20 }}
        onClick={() => addBlog()}
      >
        Create Blog
      </Button>
      <Box style={{display: 'flex', flexWrap: 'wrap'}}>
        {blogs?.map((data, i) => (
          <>
            {updateId === data.id ? (
              <Card className={classes.card} variant="outlined" sx={{ maxWidth: 345 }} key={i}>
                <CardContent className={classes.content}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {`Blog-${i + 1}`}
                  </Typography>
                  <TextField
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    
                    defaultValue={data.title}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                  <TextareaAutosize
                    id="standard-basic"
                    label="Description"
                    variant="standard"
                    multiline
                    rows={3}
                    defaultValue={data.description}
                    onChange={(e) => {
                      setEditDescription(e.target.value);
                    }}
                  />
                </CardContent>
                <Divider className={classes.divider} light />
                <CardActions>
                  <Button size="small" onClick={() => setUpdateId('')}>
                    Cancel
                  </Button>
                </CardActions>
                <CardActions>
                  <Button size="small" onClick={() => save(data?.id, data.title, data.description)}>
                    Save
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <Card variant="outlined" className={classes.card} sx={{ maxWidth: 345 }} key={i}>
                <CardContent className={classes.content}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {`Blog-${i + 1}`}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <Typography variant="body2">{data.description}</Typography>
                </CardContent>
                <Divider className={classes.divider} light />
                <CardActions>
                  <Button size="small" onClick={() => reemoveBlog(data?.id)}>
                    Delete
                  </Button>
                </CardActions>
                <CardActions>
                  <Button size="small" onClick={() => update(data?.id)}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            )}
          </>
        ))}
      </Box>
    </div>
  );
}

export default withStyles(styles)(Home);
