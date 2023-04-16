import React from "react";
import { Grommet } from "grommet";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/FirebaseAuth";
import Signup from "./Screen/Signup";
import Signin from "./Screen/Signin";
import "./index.css";
import Main from "./Screen/Main";
import ProtectedRoute from "./functions/ProtectedRoute";
import MathQuiz from "./Screen/MathQuiz";
import Slate from "./Screen/Slate";
import ABCD from "./Screen/ABCD";

function App() {
  return (
    <Grommet full>
      <AuthContextProvider>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mathquiz"
            element={
              <ProtectedRoute>
                <MathQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Slate"
            element={
              <ProtectedRoute>
                <Slate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/abcd"
            element={
              <ProtectedRoute>
                <ABCD />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </Grommet>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
