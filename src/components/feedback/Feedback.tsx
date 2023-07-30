type FeedbackProps = {
    correctAnswer: string
    stemWord: string
    success: boolean | undefined
}

export default function Feedback(props: FeedbackProps) {
    const { stemWord, success, correctAnswer } = props;
    return (
        <>
            {success === true && (
                <>Mean, bro!</>
            )}
            {success === false && (
                <>Yeah, nah; {stemWord} means {correctAnswer}</>
            )}
        </>
    );
}
