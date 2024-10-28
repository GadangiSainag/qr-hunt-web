import classes from "./styles.module.css";
interface Props {
  question: string;
  id: string;
  difficulty: string
}

export default function QuestionCard(props: Props) {
  return (
    <div>
      <div className={classes.container}>
        <h2>{props.question}</h2>
        <div className={classes.status}>
          <p>{props.difficulty}</p>
          <p>{props.id}</p>
        </div>
      </div>
    </div>
  );
}
