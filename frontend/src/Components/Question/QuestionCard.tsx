import classes from "./styles.module.css";
import ScannerIcon from "../../assets/icons/scanner.svg";
import SolvedIcon from "../../assets/icons/solved.svg";
interface Props {
  question: string;
  solved: boolean;
}

export default function QuestionCard(props: Props) {
  return (
    <div>
      <div className={classes.container}>
        <h2>{props.question}</h2>
        <p>{props.solved}</p>
        <div className={classes.status}>
          {/* {props.solved ? <ScannerIcon /> : <SolvedIcon />} */}
          {/* <ScannerIcon /> */}
          <img src={props.solved ?  SolvedIcon :ScannerIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
