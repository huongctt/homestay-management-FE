import { useState, useEffect } from "react";
import { getYourBooking } from "../../../services/booking";
import Table from "react-bootstrap/esm/Table";
import { format } from "date-fns";
import classes from "../../ManageHomestay/HomestayPage/style.module.css";
import Modal from "../../../layout/components/Modal";

const YourBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingIdToReview, setBookingIdToReview] = useState("");
  useEffect(() => {
    setLoading(true);
    async function getData() {
      const response = await getYourBooking();
      setBookings(response.data.bookings);
      setLoading(false);
    }
    getData();
  }, []);
  if (loading) {
    return (
      <>
        <h1 className="text-center">Your Booking</h1>
        <p className="text-center">Loading...</p>
      </>
    );
  }
  //add review
  const reviewHandler = (e) => {
    e.preventDefault();
  };
  //modal
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 className="text-center">Your Booking</h1>
      <div className="container">
        <Table stripped bordered hover size="sm">
          <thead className="thead-dark text-center">
            <tr>
              <th scope="col">Homestay</th>
              <th scope="col">Phone</th>
              <th scope="col">People</th>
              <th scope="col">Checkin</th>
              <th scope="col">Checkout</th>
              <th scope="col">Money</th>
              <th scope="col">Status</th>
              <th scope="col">More</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              return (
                <tr key={booking._id}>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.homestay?.name}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.phone}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.people}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {format(new Date(booking.checkin), "dd/MM/yyyy")}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {format(new Date(booking.checkout), "dd/MM/yyyy")}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.money}
                  </td>
                  <td style={{ paddingTop: "10px" }} className="text-center">
                    {booking.status}
                  </td>
                  {booking.status === "stayed" ? (
                    <td style={{ paddingTop: "10px" }} className="text-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowModal(true);
                          setBookingIdToReview(booking._id);
                        }}
                      >
                        Click to review
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <form onSubmit={reviewHandler}>
            <div className="form-group">
              <label for="number">Quantity</label>
              <input
                style={{ borderRadius: "15px" }}
                type="Number"
                name="number"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label for="number">Comment</label>
              <input
                style={{ borderRadius: "15px" }}
                type="Text"
                name="comment"
                className="form-control"
                required
              />
            </div>
            <div className={classes.actions}>
              <button className={classes["button--alt"]}>Review</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
export default YourBooking;
