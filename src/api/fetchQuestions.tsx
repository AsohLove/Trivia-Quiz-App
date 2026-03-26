export async function fetchQuestions() {
   const res = await  fetch('https://the-trivia-api.com/v2/questions')
    return res.json()
}