import "../../../assets/css/all.css";
import "../../../assets/css/bootstrap.css";
import "../../../assets/css/style.css";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createHomestay } from "../../../services/homestayManagementService";
import { multipleFilesUpload } from "../../../constant/request";
const HomestayForm = () => {
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("Ha Noi");
  // const [price, setPrice] = useState("");
  // const [people, setPeople] = useState("");
  // const [pool, setPool] = useState(false);
  // const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const nameInput = useRef();
  const addressInput = useRef();
  const cityInput = useRef();
  const priceInput = useRef();
  const peopleInput = useRef();
  const poolInput = useRef();
  const descriptionInput = useRef();

  const handleCreate = async (event) => {
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
    // let tmp = `{ "name": "${data.name}", "address": "${data.address}", "city": "${data.city}", "price": "${data.price}", "people": "${data.people}", "pool": "${data.pool}", "description": "${data.description}" }`;
    // let params = JSON.parse(tmp);
    const response = await createHomestay(data);
    if (response.status >= 400 || !response) {
      toast.error("Something went wrong! </br>Cannot create homestay");
      return;
    }
    const id = response.data._id;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    const url = process.env.REACT_APP_BACK_END + "/homestays/" + id;
    const responseUpload = await multipleFilesUpload(url, formData);
    // if (responseUpload.status >= 400 || !responseUpload) {
    //   toast.error("Something went wrong! </br>Cannot create homestay");
    //   return;
    // }
    console.log(responseUpload);
    if (responseUpload?.status === 201) {
      toast.success("Create homestay successfully!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div
                className="card-header bg-hb text-light"
                style={{ backgroundColor: "rgb(147, 149, 240)" }}
              >
                <h4> New homestay</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleCreate} enctype="multipart/form-data">
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
                      class="form-control"
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
                      class="form-control"
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
                      class="form-control"
                      ref={peopleInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="pool">Pool</label>
                    <select
                      name="pool"
                      class="form-control"
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
                      class="form-control"
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
                    value="Create"
                    className="btn btn-secondary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomestayForm;
