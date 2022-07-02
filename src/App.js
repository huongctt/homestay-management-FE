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
import EditService from "./screens/ManageService/EditService";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import EditHomestay from "./screens/ManageHomestay/EditHomestay";
import BookingForm from "./screens/Booking/CreateBooking/BookingForm";
import BookingList from "./screens/Booking/BookingList";
import EditBooking from "./screens/Booking/EditBooking";
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
          <Route path="homestays/:id/edit" element={<EditHomestay />} />
          <Route path="services/:id/edit" element={<EditService />} />
          <Route path="bookings/:homestayId/create" element={<BookingForm />} />
          <Route path="bookings/:homestayId" element={<BookingList />} />
          <Route path="bookings/:id/edit" element={<EditBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
