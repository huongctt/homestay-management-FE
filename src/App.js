import logo from "./logo.svg";
import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound/NotFound";
import CreateHomestay from "./screens/ManageHomestay/CreateHomestay/CreateHomestay";
import HomestayPage from "./screens/ManageHomestay/HomestayPage";
import NavTop from "./layout/components/NavTop";
import HomestayListings from "./screens/ManageHomestay/HomestayListings";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
          <Route path="homestays" element={<HomestayListings />} />
          <Route path="homestays/create" element={<CreateHomestay />} />
          <Route path="homestays/:id" element={<HomestayPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
