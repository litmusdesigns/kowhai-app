type ChoicesProps = {
    choices: string[],
    onClick: Function
}
export default function Choices(props: ChoicesProps) {
  const { choices, onClick } = props;
  return (
    <ul>
      {choices && (choices.map((choice) => (
        <li key={choice}
        onClick={onClick}>{choice}</li>
      )))}
    </ul>
  );
}
