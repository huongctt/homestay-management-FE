import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { getHomestay } from "../../../services/homestayManagementService";
import { createService } from "../../../services/serviceManagement";
import Modal from "../../../layout/components/Modal";
import classes from "./style.module.css";

const HomestayPage = (props) => {
  let { id } = useParams();
  const [homestay, setHomestay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const serviceName = useRef();
  const servicePrice = useRef();
  const serviceDescription = useRef();
  useEffect(() => {
    async function getData() {
      const response = await getHomestay(id);
      if (response.data.homestay) {
        setHomestay(response.data?.homestay);
        setOwner(response.data?.owner);
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  console.log({ homestay });
  console.log(isLoading);
  //modal
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

  //add service
  const addServiceHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: serviceName.current.value,
      description: serviceDescription.current.value,
      price: servicePrice.current.value,
      homestay: id,
    };
    const response = await createService(data);
    if (response.status >= 400 || !response) {
      toast.error("Something went wrong! </br>Cannot create homestay");
      return;
    }
  };
  if (!isLoading && !homestay) {
    return (
      <>
        <p className="text-center">Not found homestay</p>
      </>
    );
  }

  if (isLoading && !homestay) {
    return (
      <>
        <p className="text-center">Loading...</p>
      </>
    );
  }
  return (
    <>
      <h3 className="text-center mt-6">{homestay.name}</h3>
      <section id="listing" class="py-4">
        <div class="container">
          <div class="row">
            <div class="col-md-9">
              <img
                src="../../../assets/img/homes/home-1.jpg"
                alt=""
                class="img-main img-fluid mb-3"
              />
              <div class="row mb-5 thumbs">
                <div class="col-md-2">
                  <a
                    href="../../../assets/img/homes/home-1.jpg"
                    data-lightbox="home-images"
                  >
                    <img
                      src="../../../assets/img/homes/home-1.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col-md-2">
                  <a
                    src="../../../assets/img/homes/home-1.jpg"
                    data-lightbox="home-images"
                  >
                    <img
                      src="../../../assets/img/homes/home-1.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col-md-2">
                  <a
                    href="../../../assets/img/homes/home-1.jpg"
                    data-lightbox="home-images"
                  >
                    <img
                      src="../../../assets/img/homes/home-1.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col-md-2">
                  <a
                    href="../../../assets/img/homes/home-1.jpg"
                    data-lightbox="home-images"
                  >
                    <img
                      src="../../../assets/img/homes/home-1.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col-md-2">
                  <a
                    href="../../../assets/img/homes/home-1.jpg"
                    data-lightbox="home-images"
                  >
                    <img
                      src="../../../assets/img/homes/home-1.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col-md-2">
                  <a
                    href="../../../assets/img/homes/home-1.jpg"
                    data-lightbox="home-images"
                  >
                    <img
                      src="../../../assets/img/homes/home-1.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div class="row mb-5 fields">
                <div class="col-md-6">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item text-secondary">
                      <i class="fas fa-money-bill-alt"></i> Price:
                      <span class="float-right">{homestay.price}</span>
                    </li>
                    <li class="list-group-item text-secondary">
                      <i class="fas fa-bed"></i> People
                      <span class="float-right">{homestay.people}</span>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item text-secondary">
                      <i class="fas fa-car"></i> City:
                      <span class="float-right">{homestay.city}</span>
                    </li>
                    <li class="list-group-item text-secondary">
                      <i class="fas fa-bath"></i> Pool:
                      {homestay.pool ? (
                        <span class="float-right">Yes</span>
                      ) : (
                        <span class="float-right">No</span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="row mb-5">
                <div class="col-md-12">{homestay.description}</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card mb-3">
                <img
                  class="card-img-top"
                  src="assets/img/realtors/kyle.jpg"
                  alt="Seller of the month"
                />
                <div class="card-body">
                  <h5 class="card-title">Homestay Owner</h5>
                  <h6 class="text-secondary">{owner.name}</h6>
                </div>
              </div>
              <button
                class="btn-primary btn-block btn-lg"
                onClick={showModalHandler}
              >
                Add service
              </button>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <form onSubmit={addServiceHandler}>
            <div className="form-group">
              <label for="name">Service Name</label>
              <input
                style={{ borderRadius: "15px" }}
                type="text"
                name="name"
                className="form-control"
                ref={serviceName}
                required
              />
            </div>
            <div className="form-group">
              <label for="address">Price</label>
              <input
                style={{ borderRadius: "15px" }}
                type="number"
                name="address"
                className="form-control"
                ref={servicePrice}
                required
              />
            </div>
            <div className="form-group">
              <label for="address">Description</label>
              <input
                style={{ borderRadius: "15px" }}
                type="text"
                name="address"
                className="form-control"
                ref={serviceDescription}
                required
              />
            </div>
            <div className={classes.actions}>
              <button className={classes["button--alt"]}>Add service</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default HomestayPage;
