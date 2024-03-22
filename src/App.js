import { RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/shared/variables.css";
import "./styles/shared/animated-underline.css";
import "./styles/App.css";
import { router } from "./features/routing/router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
