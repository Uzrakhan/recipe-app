import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();

//enable CORS for all routes
app.use(cors());

const SPOONACULAR_API_KEY = 'c307e9bf0d7b47dc82fc3d4ccf883754';

//proxy endpoint
app.get('/api/recipes', async (req,res) => {
    const query = req.query.q || '';
    const apiurl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${SPOONACULAR_API_KEY}`;

    //const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`;

    try{
        const response = await fetch(apiurl);
        const data = await response.json();
        res.json(data);
    } catch(error) {
        res.status(500).json({error: 'Error fetching recipes.'})
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

