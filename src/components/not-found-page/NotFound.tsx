import React from "react";
import "./not-found.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found bck-smooth">
      <h1>Nie ma takiej strony.</h1>
      <span onClick={() => navigate("/")}>Idź do strony głównej.</span>
      <span onClick={() => navigate(-1)}>Wróć do strony poprzedniej.</span>
    </div>
  );
};

export default NotFound;
