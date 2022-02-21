import { Route, Routes } from "react-router-dom";

import Template from "./Template";
import "./App.css";

import BasicForm from "./pages/BasicForm";
import ReactHookFormRegister from "./pages/ReactHookFormRegister";
import ReactHookFormController from "./pages/ReactHookFormController";

function App() {
  return (
    <Template>
      <Routes>
        <Route path="/" element={<BasicForm />} />
        <Route
          path="/react-hook-form-register"
          element={<ReactHookFormRegister />}
        />
        <Route
          path="/react-hook-form-controller"
          element={<ReactHookFormController />}
        />
      </Routes>
    </Template>
  );
}

export default App;
