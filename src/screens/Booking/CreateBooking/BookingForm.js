import { useParams } from "react-router-dom";
import { getHomestay } from "../../../services/homestayManagementService";
import DatePicker from "react-date-picker";
import { useQuery } from "react-query";
import { useRef } from "react";
import "./style.css";
import { useEffect, useState } from "react";
import { book } from "../../../services/booking";
import { toast, ToastContainer } from "react-toastify";
const BookingForm = () => {
  const { homestayId } = useParams();
  const [homestay, setHomestay] = useState(null);
  const phone = useRef();
  const email = useRef();
  const people = useRef();
  // const deposit = useRef();
  const [deposit, setDeposit] = useState(0);
  const note = useRef();
  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCheckout] = useState(new Date());

  useEffect(() => {
    async function getData() {
      const response = await getHomestay(homestayId);
      if (response.status >= 400) {
        return <h5 className="text-center">Cannot find homestay to book</h5>;
      }
      if (response.data.homestay) {
        setHomestay(response.data.homestay);
      }
    }
    getData();
  }, []);
  const formatDate = (date) => {
    const format = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return new Date(format);
  };

  useEffect(() => {
    var date =
      (formatDate(checkout) - formatDate(checkin)) / (60 * 60 * 24 * 1000);
    const money = (homestay?.price || 0) * date * 0.8;
    setDeposit(money);
  }, [checkin, checkout]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const data = {
      phone: phone.current.value,
      email: email.current.value,
      people: people.current.value,
      deposit: deposit,
      note: note.current.value,
      checkin: formatDate(checkin),
      checkout: formatDate(checkout),
    };

    const response = await book(homestayId, data);
    if (response.status >= 400) {
      toast.error(
        "Cannot book this homestay! Please check your infomation and homestay availability"
      );
      return;
    }
    if (response.data.booking) {
      toast.success("Booking successfully");
    }
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <div
        class="room-booking ptb-100 white_bg"
        style={{ marginTop: "50px", fontFamily: "inherit" }}
      >
        <div className="container">
          <div style={{ width: "70%", marginLeft: "15%" }}>
            <div class="booking_form">
              <div>
                <h3>Booking Now</h3>
                <p>You shoud deposit 80% of total money</p>
              </div>
              <div class="room-booking-box">
                <form onSubmit={handleBooking}>
                  <div class="booking-box1 mb-15 fix">
                    <div class="booking-filed">
                      <input
                        type="text"
                        placeholder="Email"
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                        ref={email}
                      />
                    </div>
                    <div class="booking-filed">
                      <input
                        type="text"
                        placeholder="Phone"
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                        ref={phone}
                      />
                    </div>
                  </div>
                  <div class="booking-box1 mb-15 fix">
                    <div class="booking-filed">
                      <input
                        type="text"
                        placeholder="People"
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                        ref={people}
                      />
                    </div>
                    <div class="booking-filed">
                      <input
                        type="Deposit"
                        placeholder="Deposit"
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                        value={deposit}
                      />
                    </div>
                  </div>
                  <div class="select-book room  mb-15 fix">
                    <select
                      name="book"
                      style={{
                        width: "100%",
                        marginTop: "20px",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "black",
                      }}
                    >
                      <option value="" selected>
                        Homestay: {homestay?.name}
                      </option>
                    </select>
                  </div>
                  <div class="select-book room  mb-15 fix">
                    <select
                      name="book"
                      style={{
                        width: "100%",
                        marginTop: "20px",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "black",
                      }}
                    >
                      <option value="" selected>
                        Price per day: {homestay?.price || 0}
                      </option>
                    </select>
                  </div>
                  <div class="booking-box2 mb-15 fix">
                    <div
                      style={{
                        marginTop: "15px",
                        borderRadius: "15px",
                        float: "left",
                        width: "50%",
                      }}
                    >
                      <DatePicker
                        className="form-control"
                        placeholder="Arrive Date"
                        onChange={setCheckin}
                        value={checkin}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "15px",
                        borderRadius: "15px",
                        float: "left",
                        width: "45%",
                        marginLeft: "30px",
                      }}
                    >
                      <DatePicker
                        className="form-control"
                        placeholder="Arrive Date"
                        onChange={setCheckout}
                        value={checkout}
                        popperPlacement="bottom-end"
                      />
                    </div>
                  </div>
                  <div class="booking-comment fix">
                    <textarea
                      placeholder="Note"
                      style={{
                        width: "100%",
                        marginTop: "15px",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                      ref={note}
                    ></textarea>
                  </div>
                  <div
                    style={{
                      margin: "25px auto",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        padding: "6px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#7D9BF6",
                        color: "white",
                      }}
                    >
                      Book homestay
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookingForm;
