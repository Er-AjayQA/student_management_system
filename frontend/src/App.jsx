import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/AdminPages/loginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/signup" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
