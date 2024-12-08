import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    const titles = [
        { title: 'Etherea Prime' },
        { title: 'Regalia Imperium' },
        { title: 'Chronous Vale' },
        { title: 'Constellara Nexus' }
    ];
    const backgroundImage = '/images/default.jpg';
    res.render("index.ejs", { titles: titles, backgroundImage: backgroundImage });
});

app.get('/chapter:chapterNumber', (req, res) => {
    const chapterNumber = parseInt(req.params.chapterNumber, 10);
    const backgroundImage = `/images/chapter${chapterNumber}.jpg`;
        const titles = [
            { title: 'Etherea Prime' },
            { title: 'Regalia Imperium' },
            { title: 'Chronous Vale' },
            { title: 'Constellara Nexus' }
        ];
        const data = [
            {
              id: 1,
              title: 'Etherea Prime',
              thought: 'The mystical and magical universe where nature comes alive, and the profound connection with YOU begins.',
              body: 'It was the day of 2 August 2024. This universe, was magical, mystical and auric in nature. Where not just animals but trees and plants lived as freely as we live. They feel, they react, they communicate. A serene world full of floating isles and golden forests. Like the soil in our land, there it was the gold itself. Just like Adam and Eve, in this world were YOU AND ME, unknown to each other for very long. Once I stood up on one of such isles full of loneliness not because there weren’t people around me but cause of not having someone who could feel me, care for me, love me like the way I wanted. But soon my eyes sighted a luminous presence of someone in those aureate forests, it was none other than YOU. I was pained to be attached to someone again but your presence and aura embraced me as if I was destined to meet YOU. It was you who took the step to awaken me from my despairs and be the one I always needed. You became the incomplete and inseparable part of my life’s interwoven maze. YOU are as if the universe plucked you from the lands of heaven.'
            },
            {
              id: 2,
              title: 'Regalia Imperium',
              thought: 'A vast empire born of wars but transformed by love and devotion with YOU bringing prosperity and fortune.',
              body: '07 August 2024. Regalia Imperium wasn’t just a universe but a very great and vast empire. I was one of those who controlled the empire and looked after the world. Unfortunately this very large empire was never flourished or had a touch of beauty. It was forged with fear and wars which never brought happiness and prosperity amongst the hearts of the people who lived in it. In this universe we were already met each other and were deeply devoted to each other. No matter how worsen situation happened in the empire I only felt comfort and happiness when I was with YOU. One day my heart enforced me to take you with me to my home, my empire where my family resides. It was the time I bring the fortune not just my life but to my home as well. As I introduced you to my family, my home it began to prosper itself as if you were the very spark that was needed to this home from so long. I firmly decided and sworn to bring this very fortune to my home for the rest of life.'
            },
            {
              id: 3,
              title: 'Chronous Vale',
              thought: 'A parallel universe with laws defying physics, where our first kiss transcended time and space.',
              body: "07 August 1930. This universe is said to be parallel universe of ours. It was the universe where the laws of physics was totally opposite to that of ours. Every quantity that existed here acted differently and abnormally. It was the universe of unexpected, unpredictable and had so much of events which were immeasurable. The time here was never independent, the people of this universe were already so advanced at an early stage of humanity yet their era was same as our world had in 1900s. It was the time of 1930s, the day was 7 August, of Wednesday, when I found myself standing in the heart of Vaeloria, the capital city, at the bus stop waiting for you, and you arrived like the arrival of Juliet in Romeo's life. We decided to walk together and enjoy this bliss of that night. We reached 'middle of the road where there's no one but only us and the dark sky filled with shiny stars and road surrounded by tulips fields then, YOU catch my hand made an eye contact and then came closer to ME by pulling my collar, breathed near my face so that it would be kinda exciting vaala kiss and then kissed ME annddddd when we kiss YOU imagined all the butterflies just coming from nowhere surrounding US'. As we were passionately dived into kissing and exploring ourselves, that FIRST KISS of ours just stopped the time of this universe as well as the rocket fire behind us in this sky stopped as if it was the milky galaxy floating in the sky.🙃💖"
            },
            {
              id: 4,
              title: 'Constellara Nexus',
              thought: 'The heart of the multiverse where our love is realized as eternal and universal across all realities.',
              body: 'The Constellara Nexus, the heart of the multiverse, is an expanse of infinite possibilities. Here, galaxies spiral like glowing threads woven into a cosmic tapestry, and stars sing melodies of creation. This is the meeting point of all realities, where the laws of every universe converge, and where time bends and space folds upon itself in a dance of eternal harmony. This is where, in this luminous realm of multiverses, I finally discovered and realised the truth or you can the universal fact: Our love existed and exists across all universes. No matter whether the mystical isles with richness of golden forests Etherea Prime, the war-torn majesty of Regalia Imperium, the contrast chaos of Chronous Vale, or in the cosmos of universe with profound memories of our own world, YOU and ME are destined to be together! In this heart of the multiverse, Nexus, we hold our hands and stood up facing the realizations and the harmony, which was very overwhelming yet relieving. Every kiss, every touch and every moment of joy and peace we felt and experienced carved the different constellations in the sky around us, as if marking it as our trophy of memories.'
            }
          ];
        console.log(data.rows);
        if (chapterNumber > 0 && chapterNumber <= data.length) {
            res.render('chapter.ejs', {
                data: data[chapterNumber - 1],
                titles: titles,
                chapterNumber: chapterNumber,
                backgroundImage
            });
        } else {
            res.status(404).send("Chapter not found.");
        }
});

app.get('/final', (req, res) => {
    const backgroundImage = "/images/final.png"
        const titles = [
            { title: 'Etherea Prime' },
            { title: 'Regalia Imperium' },
            { title: 'Chronous Vale' },
            { title: 'Constellara Nexus' }
        ];
        const video = "/videos/final.mp4";
        res.render('final.ejs', { titles: titles, backgroundImage, video });
});

app.listen(PORT, () => {
    console.log("The server is running on port: ", PORT);
});
