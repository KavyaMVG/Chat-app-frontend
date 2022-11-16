import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "../utils/routes";
import "../index.css";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
