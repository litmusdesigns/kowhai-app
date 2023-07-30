"use client"

import { useEffect, useState } from 'react';

import Choices from "@/components/choices/Choices"
import Feedback from "@/components/feedback/Feedback"
import Question from "@/components/question/Question"

export default function Quiz() {
    const [correctAnswer, setCorrectAnswer] = useState('yellow');
    const [answered, setAnswered] = useState(0);
    const [answeredCorrectly, setAnsweredCorrectly] = useState(0);
    const [choices, setChoices] = useState(['red', 'green', 'blue', 'yellow']);
    const [score, setScore] = useState(0);
    const [stemWord, setStemWord] = useState('kowhai');
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
    }

    useEffect(() => {
        calculateScore()
    }, [answered, answeredCorrectly])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {success === undefined && (
                <>
                    <Question stemWord={stemWord} />
                    <Choices choices={choices} onClick={handleChoiceClick} />
                </>
            )}
            <Feedback correctAnswer={correctAnswer} stemWord={stemWord} success={success} />
            {success !== undefined && (<button onClick={handleNextClick} className="btn btn-blue">Try another...</button>)}
            {score > 0 && (<p>Here's how it's going: {answeredCorrectly} of {answered} ({score}%)</p>)}
        </main>
    )
}
