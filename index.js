const express = require('express'); // Import the Express library
// const nodeFetch = require('node-fetch');
const path = require('path'); 
// const fetch = nodeFetch.default || nodeFetch;  
const app = express(); // Create an Express application instance
const port = 3000; // Define the port the server will listen on

app.use(express.json());
app.use(express.static('public'))

app.get('/api', async function(req, res){
    // Only if the word exists
    if(req.query.word) {
        let word = req.query.word.toLowerCase().trim(); 
        try {
            let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok){
                res.send(JSON.stringify(response)); 
                return; 
            }
            res.json(await response.json());
            return; 
        }
        catch(error){
            // TODO: is that even valid? 
            res.send(JSON.stringify(error))
            return; 
        }
    } else {  
        // res.sendFile(index.html);     
    }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});