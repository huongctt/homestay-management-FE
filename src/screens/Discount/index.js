import classes from "../ManageHomestay/HomestayPage/style.module.css";
import Modal from "../../layout/components/Modal";
import DatePicker from "react-date-picker";
import { useEffect, useState } from "react";
import { getListHomestay } from "../../services/homestayManagementService";
import { getCookie } from "../../constant/request";
import { createDiscount, getListDiscount } from "../../services/discount";
import { ToastContainer, toast } from "react-toastify";
import { set } from "date-fns";
import DiscountCard from "./DiscountCard";
const Discount = () => {
  const userid = getCookie("userid");
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [percentage, setPercentage] = useState(0);
  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCHeckout] = useState(new Date());
  const [homestays, setHomestays] = useState([]);
  const [homestaysApply, setHomestaysApply] = useState([]);
  const [activeDisounts, setActiveDiscounts] = useState([]);
  const [inactiveDisounts, setInactiveDiscounts] = useState([]);

  useEffect(() => {
    async function getData() {
      const responseDiscount = await getListDiscount();
      if (responseDiscount.status === 200) {
        setActiveDiscounts(responseDiscount.data.activeDiscounts);
        setInactiveDiscounts(responseDiscount.data.inactiveDiscounts);
      }
      const response = await getListHomestay(userid);
      setHomestays(response.data.homestays);
    }
    getData();
  }, []);
  console.log({ activeDisounts });

  const formatDate = (date) => {
    const format = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return new Date(format);
  };
  //modal
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

  const handleOnChange = (id) => {
    if (homestaysApply.includes(id)) {
      const tmp = homestaysApply.filter((item) => item !== id);
      setHomestaysApply(tmp);
    } else {
      homestaysApply.push(id);
    }
  };

  const addDiscountHandler = async (e) => {
    e.preventDefault();
    const data = {
      percentage,
      quantity,
      checkin: formatDate(checkin),
      checkout: formatDate(checkout),
      homestays: homestaysApply,
    };
    const response = await createDiscount(data);
    if (response.status >= 400) {
      toast.error("Cannot create discount!");
    } else {
      setShowModal(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2 className="text-center mb-6" style={{ margin: "15px" }}>
          Discounts
        </h2>
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            style={{ marginBottom: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            Add discount
          </button>
        </div>
        <p className="text-center">List active discounts</p>
        <div className="row">
          {activeDisounts?.map((discount) => (
            <DiscountCard
              quantity={discount.quantity}
              checkin={discount.checkin}
              checkout={discount.checkout}
              percentage={discount.percentage}
              homestays={discount.homestays}
            />
          ))}
        </div>
        <p className="text-center">List inactive discounts</p>
        <div className="row">
          {inactiveDisounts?.map((discount) => (
            <DiscountCard
              quantity={discount.quantity}
              checkin={discount.checkin}
              checkout={discount.checkout}
              percentage={discount.percentage}
              homestays={discount.homestays}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <form onSubmit={addDiscountHandler}>
            <h5 className="text-center">Discount</h5>
            <div className="form-group">
              <label for="number">Quantity: </label>
              <input
                style={{ borderRadius: "15px" }}
                type="Number"
                name="comment"
                className="form-control"
                min="1"
                onChange={(e) => {
                  e.preventDefault();
                  setQuantity(e.target.value);
                }}
                value={quantity}
                required
              />
            </div>
            <div className="form-group">
              <label for="number">Percentage: </label>
              <input
                style={{ borderRadius: "15px" }}
                type="Number"
                name="comment"
                className="form-control"
                onChange={(e) => {
                  e.preventDefault();
                  setPercentage(e.target.value);
                }}
                value={percentage}
                min="1"
                max="100"
                required
              />
            </div>
            <div className="form-group">
              <label for="number">Homestays: </label>
              {homestays.map((homestay, index) => {
                return (
                  <div className="row" style={{ paddingLeft: "35px" }}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value={homestay._id}
                      // checked={checkedState[index]}
                      onChange={() => handleOnChange(homestay._id)}
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   console.log(e.target.value);
                      //   console.log(e.target.checked);
                      // }}
                    />
                    <label class="form-check-label" for="inlineCheckbox1">
                      {homestay.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="form-group">
              <div className="row" style={{ margin: "5px" }}>
                <div style={{ width: "50%" }}>
                  <label for="number">Checkin: </label>
                  <DatePicker
                    className="form-control"
                    placeholder="Arrive Date"
                    onChange={setCheckin}
                    value={checkin}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <label for="number">Checkout: </label>
                  <DatePicker
                    className="form-control"
                    placeholder="Arrive Date"
                    onChange={setCHeckout}
                    value={checkout}
                  />
                </div>
              </div>
            </div>
            <div className={classes.actions}>
              <button className={classes["button--alt"]}>Add discount</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
export default Discount;
