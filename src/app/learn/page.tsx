import QuizWrapper from '@/containers/quizWrapper/QuizWrapper';

import getData from '@/etc/getData';

export default async function Learn() {
    const answerLanguage = 'en'
    const subject = 'colors'
    const questionLanguage = 'mi'
    const data = await getData(answerLanguage, subject, questionLanguage)

    console.debug(data)
    
    return (
        <QuizWrapper data={data} />
    )
}
