import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignInSide from "./Components/SignInSide/SignInSide";
import Dashboard from "./Pages/Admin/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
