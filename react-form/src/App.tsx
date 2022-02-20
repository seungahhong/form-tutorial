import { Route, Routes } from "react-router-dom";

import Template from "./Template";
import "./App.css";

import BasicForm from "./pages/BasicForm";
import ReactHookForm from "./pages/ReactHookForm";

function App() {
  return (
    <Template>
      <Routes>
        <Route path="/" element={<BasicForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
      </Routes>
    </Template>
  );
}

export default App;
