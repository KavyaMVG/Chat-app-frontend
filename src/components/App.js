import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "../utils/routes";
import "../index.css";
import { useState } from "react";
import AuthContext from "../store/auth-context";

function App() {
  const router = createBrowserRouter(routes);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className="App">
      <AuthContext.Provider value={{ user: user, setUser: setUser }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
