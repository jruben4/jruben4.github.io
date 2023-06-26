const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

// google scholar stuff
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("eaadd244ff01ebb2a33c437d6bc8baf203afd2a42edd839db7e1757e8a65d5ca");

const port = process.env.PORT || 3000;

const handleData = async (req, res) => {
    return new Promise((resolve) => {
        const params = {
            engine: "google_scholar_author",
            author_id: "7IcrxFUAAAAJ"
        };
        
        const callback = function(data) {
            resolve(data);
        };
  
      search.json(params, callback);
    });
};

app.get('/', cors(), async (req,res) => {
      
    // Show result as JSON
    const result = await handleData();

    console.log(result);
    res.json(result);
});

app.post("/", async (req, res) => {
    console.log("hi!");
    const { info } = req.body;
    
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));