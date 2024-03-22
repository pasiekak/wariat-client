import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Actions = () => {
  const navigate = useNavigate();

  return (
    <div className="actions">
      <Button variant="dark" onClick={() => navigate("/dashboard/users")}>
        Wróć do listy użytkowników
      </Button>
    </div>
  );
};

export default Actions;
