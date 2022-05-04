const http = require('http');
const hostname = `127.0.0.1`;
const port = 3000;

const express = require('express');
const app = express();

const server = http.createServer(app);
const songs = require('./app.js'); //<-- Importing the list of albums from app.js

app.get('/', (req, res) => {
    res.send(`This is a test for the Music Player`);
});

//::::::::::::::::::::::::::FOR UNLINKED LIST OF ALBUMS::::::::::::::::::::::::::::::::::::::::::::
// app.get('/albums', (req, res) => {
//     let htmlData = `<ul>`;
//     for (let cd of songs) {
//         htmlData += `<li>${cd.name}</li>`;
//         //for testing only
//         // htmlData += `<li>${req.path}</li>`;


//     }
//     htmlData += `</ul>`;
//     res.send(htmlData);
// });


//::::::::::::::::::::::::::FOR LINKED LIST OF ALBUMS::::::::::::::::::::::::::::::::::::::::::::
app.get('/albums', (req, res) => {
    let htmlData = `<ul>`;
    for (let cd of songs){
        htmlData += `<li>
                            <a href="${req.path}${cd.albumNumber}">${cd.name}</a>
                    </li>`;
    }
    htmlData += `</ul>`;
    res.send(htmlData);
});

//::::::::::::::::::::::::::FINDING THE ALBUM BASED ON ALBUMNUMBER KEY::::::::::::::::::::::::::::::::::::::::::::
app.get('/albums/:albumNumber', (req, res)=> {
    //Display the details of a given album
    const {albumNumber} = req.params;
    // res.send(`<h1>${albumNumber}</h1>`);
    const song = songs.find(s => s.albumNumber === albumNumber);
    if(song){
        let htmlData = ` `;
        htmlData += `<h1>${song.name}</h1>`;
        htmlData += `<img src="${song.imgURL}" alt=" " width="500" height="500">`
        htmlData += `<h3>Year Released: ${song.publishDate}</h3>`;
        //htmlData += `<h3>${song.description}</h3>`;
        htmlData += `<h2>${song.songTitles}</h2>`;
        res.send(htmlData);
    }else{
        res.send('There is no Album associated with this Number');
    }
});

//---------------------------------NOTHING BEYOND THIS POINT------------------------------------
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});