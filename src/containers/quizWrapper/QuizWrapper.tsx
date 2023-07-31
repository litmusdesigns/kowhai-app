"use client"

import { useEffect, useState } from 'react';

import Choices from "@/components/choices/Choices"
import Feedback from "@/components/feedback/Feedback"
import Question from "@/components/question/Question"

export default function QuizWrapper() {
    const answerLanguage = 'en'
    const subject = 'colors'
    const questionLanguage = 'mi'

    const [correctAnswer, setCorrectAnswer] = useState('');
    const [answered, setAnswered] = useState(0);
    const [answeredCorrectly, setAnsweredCorrectly] = useState(0);
    const [choices, setChoices] = useState(['']);
    const [data, setData] = useState<any>(null); // TODO: type this
    const [score, setScore] = useState(0);
    const [stemWord, setStemWord] = useState('');
    const [success, setSuccess] = useState<boolean | undefined>(undefined);

    const calculateScore = () => {
        setScore(Math.round((answeredCorrectly / answered) * 100));
    }

    const checkAnswer = (choice: string) => {
        const isSuccess = choice === correctAnswer;
        setSuccess(isSuccess);
        setAnswered(answered + 1);
        if (isSuccess) {
            setAnsweredCorrectly(answeredCorrectly + 1);
        }
    }

    const fetchDataHandler = () => {
        fetch(`http://127.0.0.1:5000/api/get_question?answer_lang=${answerLanguage}&subject=${subject}&question_lang=${questionLanguage}`, {cache: "no-store"})
            .then(res => res.json())
            .then(data => {
                setData(data)
            }
        )
    }

    const handleChoiceClick = ({ target: { innerText } }: { target: { innerText: string } }) => {
        checkAnswer(innerText)
    }

    function handleNextClick() {
        setSuccess(undefined);
        fetchDataHandler();
    }

    useEffect(() => {
        fetchDataHandler();
    }, [])

    useEffect(() => {
        calculateScore()
    }, [answered, answeredCorrectly])

    useEffect(() => {
        if(!data) return;
        setCorrectAnswer(data.answer);
        setChoices(data.options);
        setStemWord(data.question);
    }, [data])
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {success === undefined && stemWord && (
                <>
                    <Question stemWord={stemWord} />
                    <Choices choices={choices} onClick={handleChoiceClick} />
                </>
            )}
            <Feedback correctAnswer={correctAnswer} stemWord={stemWord} success={success} />
            {success !== undefined && (<button onClick={handleNextClick} className="btn btn-blue">Try another...</button>)}
            {score > 0 && (<p>Here's how you're going: {answeredCorrectly} of {answered} ({score}%)</p>)}
        </main>
    )
}
