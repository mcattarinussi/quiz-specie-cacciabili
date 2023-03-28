const annatidi = ['Germano reale', 'Alzavola', 'Marzaiola', 'Fischione', 'Codone', 'Mestolone', 'Canapiglia', 'Moretta', 'Moriglione'];


const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');


const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);


const generateChoices = (wrongAnswers: string[], correctAnswer: string, answerChoices: number) => shuffleArray([
    ...shuffleArray(wrongAnswers).slice(0, answerChoices - 1),
    correctAnswer,
]);


const questions = [
    ...annatidi.map(name => ({ correctAnswer: name, wrongAnswers: annatidi.filter(n => n !== name) })),
];


export const getRandomQuestions = (count: number = 10, answerChoices: number = 4) => shuffleArray(
    questions.map(
        ({ correctAnswer, wrongAnswers }) => ({
            correctAnswer,
            choices: generateChoices(wrongAnswers, correctAnswer, answerChoices),
            imageUrl: `${process.env.PUBLIC_URL}/species/${slugify(correctAnswer)}/${Math.floor(Math.random() * 5) + 1}.jpg`
        })
    )
).slice(0, count);
