import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        const titles = await db.query("SELECT title FROM stories");
        const backgroundImage = '/images/default.jpg';
        res.render("index.ejs", { titles: titles.rows, backgroundImage: backgroundImage });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving titles from database.");
    }
});

app.get('/chapter:chapterNumber', async (req, res) => {
    const chapterNumber = parseInt(req.params.chapterNumber, 10);
    
    try {
        const backgroundImage = `/images/chapter${chapterNumber}.jpg`;
        const titles = await db.query("SELECT title FROM stories");
        const data = await db.query("SELECT * FROM stories");
        if (chapterNumber > 0 && chapterNumber <= data.rows.length) {
            res.render('chapter.ejs', {
                data: data.rows[chapterNumber - 1],
                titles: titles.rows,
                chapterNumber: chapterNumber,
                backgroundImage
            });
        } else {
            res.status(404).send("Chapter not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving data for chapter.");
    }
});

app.get('/final', async (req, res) => {
    try {
        const backgroundImage = "/images/final.png"
        const titles = await db.query("SELECT title FROM stories");
        const video = "/videos/final.mp4";
        res.render('final.ejs', { titles: titles.rows, backgroundImage, video });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving titles for the final page.");
    }
});

app.listen(PORT, () => {
    console.log("The server is running on port: ", PORT);
});
