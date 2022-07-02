import { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  editHomestay,
  getHomestay,
} from "../../../services/homestayManagementService";
const EditHomestay = () => {
  const [files, setFiles] = useState(null);
  const nameInput = useRef();
  const addressInput = useRef();
  const cityInput = useRef();
  const priceInput = useRef();
  const peopleInput = useRef();
  const poolInput = useRef();
  const descriptionInput = useRef();

  let { id } = useParams();
  const navigate = useNavigate();
  const linkHomestay = `/homestays/${id}`;

  useEffect(() => {
    async function getData() {
      const response = await getHomestay(id);
      if (response.data.homestay) {
        nameInput.current.value = response.data.homestay.name;
        addressInput.current.value = response.data.homestay.address;
        cityInput.current.value = response.data.homestay.city;
        priceInput.current.value = response.data.homestay.price;
        peopleInput.current.value = response.data.homestay.people;
        descriptionInput.current.value = response.data.homestay.description;
      }
    }
    getData();
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();
    const data = {
      name: nameInput.current.value,
      address: addressInput.current.value,
      city: cityInput.current.value,
      price: priceInput.current.value,
      people: peopleInput.current.value,
      pool: poolInput.current.value,
      description: descriptionInput.current.value,
    };
    const response = await editHomestay(id, data);
    if (response.status >= 400 || !response) {
      toast.error("Something went wrong! Cannot update homestay");
      return;
    }
    if (response.status === 200) {
      toast.success("Update homestay successfully");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mt-6" style={{ marginTop: "30px" }}>
              <div
                className="card-header bg-hb text-light"
                style={{ backgroundColor: "#7D9BF6" }}
              >
                <h4> Edit homestay</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleEdit} enctype="multipart/form-data">
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="text"
                      name="name"
                      className="form-control"
                      ref={nameInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="address">Address</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="text"
                      name="address"
                      className="form-control"
                      ref={addressInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="city">City</label>
                    <select
                      name="city"
                      className="form-control"
                      id="type"
                      style={{ borderRadius: "15px" }}
                      ref={cityInput}
                    >
                      <option value="Ha Noi">Ha Noi</option>
                      <option value="Ho Chi Minh">Ho Chi Minh</option>
                      <option value="Da Nang">Da Nang</option>
                      <option value="Hue">Hue</option>
                      <option value="Can Tho">Can Tho</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="price">Price</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="text"
                      name="price"
                      className="form-control"
                      ref={priceInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="people">People</label>
                    <input
                      style={{ borderRadius: "15px" }}
                      type="number"
                      name="people"
                      className="form-control"
                      ref={peopleInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="pool">Pool</label>
                    <select
                      name="pool"
                      className="form-control"
                      id="type"
                      style={{ borderRadius: "15px" }}
                      ref={poolInput}
                    >
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="description">Description</label>
                    <textarea
                      style={{ borderRadius: "15px" }}
                      rows="5"
                      type="description"
                      name="description"
                      className="form-control"
                      ref={descriptionInput}
                      required
                    ></textarea>
                  </div>
                  <input
                    name="image"
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />

                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-secondary btn-block mt-4 mb-6"
                  />
                </form>
                <Link
                  to={linkHomestay}
                  className="mt-6 text-center"
                  style={{ marginTop: "50px" }}
                >
                  Go back to homestay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditHomestay;
