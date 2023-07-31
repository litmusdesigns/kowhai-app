"use client"

import { useEffect, useState } from 'react';

import Choices from "@/components/choices/Choices"
import Feedback from "@/components/feedback/Feedback"
import Question from "@/components/question/Question"

export default function QuizWrapper({ data }: { data: any }) {

    const [correctAnswer, setCorrectAnswer] = useState('');
    const [answered, setAnswered] = useState(0);
    const [answeredCorrectly, setAnsweredCorrectly] = useState(0);
    const [choices, setChoices] = useState(['']);
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

    const handleChoiceClick = ({ target: { innerText } }: { target: { innerText: string } }) => {
        checkAnswer(innerText)
    }

    function handleNextClick() {
        setSuccess(undefined);
        // fetchDataHandler();
    }

    useEffect(() => {
        calculateScore()
    }, [answered, answeredCorrectly])

    useEffect(() => {
        if(!data) return;

        console.debug('data choices', data)
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
