const express = require("express");

const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

//To access the data easily, we need the help of the express json-parser that we can use with the command app.use(express.json()).

//Let's activate the json-parser and implement an initial handler for dealing with the HTTP POST requests:
app.use(express.json());

app.get("/", (req, res) => {
  res.json(notes);
});

// GET
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if(note)
  {
    res.json(note);
  }else{
    res.status(404).end();
  }
});

// DELETE
// app.delete('/api/notes/delete/:id' , (req, res)=>{
//     const id = Number(req.params.id);
//     notes = notes.filter(note => note.id !== id);
//     console.log(notes);

//     res.send("Deleted");
// });

// POST

// app.post('/api/notes/update', (req, res) =>{
//     const note = req.body;
//     console.log(note);
//     res.json(req.body);
// })

const generateId = ()=>{
    const maxId =notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
    return maxId + 1;
}

app.post('/api/notes/update', (req, res)=>{

    const body = req.body;
    
    if(!body.content)
    {
        return res.status(400).json({
            'error' : "Content missing",
        })
    }

    const note = {
        id: generateId(),
        content : body.content,
        important : Boolean(body.important) || false,
    }

    notes = notes.concat(note);
    console.log(notes);

    res.json(notes);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
