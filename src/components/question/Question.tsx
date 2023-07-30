type QuestionProps = {
    stemWord: string,
    // answerLanguage: string,
    // questionLanguage: string
}
export default function Question(props: QuestionProps) {
    const { stemWord } = props;
    return (
        <div>
            <h3>Hey mate, what's the pākehā word for</h3>
            <h1>{stemWord}?</h1>
        </div>
    )
}