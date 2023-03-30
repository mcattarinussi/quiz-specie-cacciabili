import { slugify, shuffleArray } from "./utils";

const animals = {
    anseriformi: [
        // Annatidi
        'Germano reale', 'Alzavola', 'Marzaiola', 'Fischione', 'Codone', 'Mestolone', 'Canapiglia', 'Moretta', 'Moriglione'
    ],
    galliformi: [
        // Fasianidi
        'Fagiano', 'Starna', 'Coturnice', 'Pernice rossa', 'Quaglia',
        // Tetraonidi
        'Gallo forcello', 'Pernice bianca', 'Gallo cedrone', 'Francolino di monte'
    ],
    gruiformi: [
        // Rallidi
        'Folaga', 'Gallinella d\'acqua', 'Porciglione'
    ],
    caradriformi: [
        // Caradridi
        'Pavoncella',
        // Scolopacidi
        'Beccaccia', 'Beccaccino', 'Frullino', 'Combattente'
    ],
    columbiformi: [
        // Columbidi
        'Colombaccio', 'Tortora'
    ],
    passeriformi: [
        // Corvidi
        'Gazza', 'Cornacchia grigia', 'Cornacchia nera', 'Ghiandaia',
        // Turdidi
        'Merlo', 'Tordo bottaccio', 'Tordo sassello', 'Cesena',
        // Alaudidi
        'Allodola'
    ]
}


const generateChoices = (wrongAnswers: string[], correctAnswer: string, answerChoices: number) => shuffleArray([
    ...shuffleArray(wrongAnswers).slice(0, answerChoices - 1),
    correctAnswer,
]);


const buildQuestions = (animals: string[], imageFolder: string) => animals.map(
    name => ({ correctAnswer: name, imageFolder, wrongAnswers: animals.filter(n => n !== name) })
);


const questions = Object.entries(animals).map(([k, v]) => buildQuestions(v, k)).flat();


export const getRandomQuestions = (count: number, answerChoices: number = 4) => shuffleArray(
    questions.map(
        ({ correctAnswer, imageFolder, wrongAnswers }) => ({
            correctAnswer,
            choices: generateChoices(wrongAnswers, correctAnswer, answerChoices),
            imageUrl: `${process.env.PUBLIC_URL}/species/${imageFolder}/${slugify(correctAnswer)}/${Math.floor(Math.random() * 5) + 1}.jpg`
        })
    )
).slice(0, count);
