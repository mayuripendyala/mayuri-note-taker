const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


notes.get('/',(req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


notes.post('/',(req,res) => {
    console.info(`${req.method} request received to add a topic`);
    console.log(req.body);

    const { title, text } =req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
    readAndAppend(newNote,'./db/db.json');
    res.json('Note added successfully');
    }
    else {
        res.error('Error in adding Note');
    }
});

notes.delete('/:id',(req,res) => {
    const noteId = req.params.id;
    console.log(`\n\nDELETE note request for noteId: ${noteId}`);

    readFromFile('./db/db.json')
    .then((data)=> JSON.parse(data))
    .then((json) => {

        const result = json.filter((note)=> note.id !== noteId);
        console.log(result)
        writeToFile('./db/db.json',result);
        res.json(`Note ${noteId} has been deleted`);
    })
})

module.exports = notes;