const notes = require('express').Router();
const { readAndAppend, readFromFile} = require('../helpers/fsUtils');
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
    let noteId = req.params.id.toString();
    console.log(`\n\nDELETE note request for noteId: ${noteId}`);

    let data = JSON.parse( readFromFile('./db/db.json'));
    const newData = data.filter( note => note.id.toString() !== noteId );
    readAndAppend(JSON.stringify(newData),'./db/db.json');

    console.log(`\nSuccessfully deleted note with id : ${noteId}`);

    res.json(newData);
})

module.exports = notes;