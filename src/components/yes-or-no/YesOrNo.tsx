import Button from "react-bootstrap/Button";
import "./yes-or-no.css";

interface IYesOrNo {
  question: string;
  approveFn: () => void;
  declineFn: () => void;
}

const YesOrNo = ({ question, approveFn, declineFn }: IYesOrNo) => {
  return (
    <div className="yes-or-no">
      <h1>{question}</h1>
      <div className="actions">
        <Button onClick={declineFn} variant="dark">
          Nie
        </Button>
        <Button onClick={approveFn} variant="dark">
          Tak
        </Button>
      </div>
    </div>
  );
};

export default YesOrNo;
