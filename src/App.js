import logo from "./logo.svg";
import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound/NotFound";
import CreateHomestay from "./screens/ManageHomestay/CreateHomestay/CreateHomestay";
import NavTop from "./layout/components/NavTop";

function App() {
  return (
    <>
      <NavTop />
      {/* <Routes>
        <Route index element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="homestays" element={<Home />}>
          <Route path="create" element={<CreateHomestay />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="homestays" element={<Home />} />
        <Route path="homestays/create" element={<CreateHomestay />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
