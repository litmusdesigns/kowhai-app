export default async function getData(answerLanguage: string, subject: string, questionLanguage: string) {
    const res = await fetch(`http://127.0.0.1:5000/api/get_question?answer_lang=${answerLanguage}&subject=${subject}&question_lang=${questionLanguage}`, {cache: "no-store"})
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }