import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getHomestay } from "../../../services/homestayManagementService";
import {
  createService,
  getServicesByHomestay,
} from "../../../services/serviceManagement";
import Modal from "../../../layout/components/Modal";
import classes from "./style.module.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ServiceCard from "./ServiceCard";
import useAuthen from "../../../hooks/useAuthen";

const HomestayPage = (props) => {
  let { id } = useParams();
  const { username } = useAuthen();
  const editLink = `/homestays/${id}/edit`;
  const bookingListLink = `/bookings/${id}`;

  const [homestay, setHomestay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);

  const serviceName = useRef();
  const servicePrice = useRef();
  const serviceDescription = useRef();

  useEffect(() => {
    async function getData() {
      const response = await getHomestay(id);
      if (response.data.homestay) {
        setHomestay(response.data?.homestay);
        setOwner(response.data?.owner);
        const arr = [];
        for (let i = 0; i < response.data.homestay.images.length; i++) {
          arr.push(`http://localhost:3333/homestays/${id}/images?index=${i}`);
        }
        setImages(arr);
        setIsLoading(false);
      }
      const servicesResponse = await getServicesByHomestay(id);
      if (servicesResponse.data.services) {
        setServices(servicesResponse.data.services);
        console.log({ services });
      }
    }
    getData();
  }, []);
  //list services
  const serviceList = services.map((service) => {
    return (
      <ServiceCard
        key={service._id}
        id={service._id}
        name={service.name}
        description={service.description}
        price={service.price}
        isOwner={owner.username === username}
        className="mt-6"
      />
    );
  });
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
    setServices((prev) => [...prev, data]);
    setShowModal(false);
  };

  //loading
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
      <h3 className="text-center mt-6" style={{ marginTop: "20px" }}>
        {homestay.name}
      </h3>
      <section id="listing" class="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="slide-container container">
                <Slide>
                  {images.map((slideImage, index) => (
                    <div
                      className="each-slide img-main img-fluid mb-3"
                      key={index}
                    >
                      <img
                        src={slideImage}
                        width="100%"
                        key={index}
                        className="center"
                      />
                    </div>
                  ))}
                </Slide>
              </div>

              <div className="row mb-5 fields">
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item text-secondary">
                      <i className="fas fa-money-bill-alt"></i> Price:
                      <span className="float-right">{homestay.price}</span>
                    </li>
                    <li className="list-group-item text-secondary">
                      <i className="fas fa-bed"></i> People
                      <span className="float-right">{homestay.people}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item text-secondary">
                      <i className="fas fa-car"></i> City:
                      <span className="float-right">{homestay.city}</span>
                    </li>
                    <li className="list-group-item text-secondary">
                      <i className="fas fa-bath"></i> Pool:
                      {homestay.pool ? (
                        <span className="float-right">Yes</span>
                      ) : (
                        <span className="float-right">No</span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row mb-5">
                <h5>Description:</h5>
                <div className="col-md-12">{homestay.description}</div>
              </div>

              <div className="row mb-5">
                <h5>Services:</h5>
                {serviceList}
              </div>
            </div>
            <div className="col-md-3">
              <div className="card mb-3">
                <img
                  className="card-img-top"
                  src="assets/img/realtors/kyle.jpg"
                  alt="Seller of the month"
                />
                <div className="card-body">
                  <h5 className="card-title">Homestay Owner</h5>
                  <h6 className="text-secondary">{owner.name}</h6>
                </div>
              </div>
              {owner.username === username && (
                <div>
                  <button
                    className="btn-primary btn-block"
                    style={{ borderRadius: "10px", padding: "4px" }}
                    onClick={showModalHandler}
                  >
                    Add service
                  </button>
                  <Link
                    to={editLink}
                    className="btn-primary btn-block text-center"
                    style={{ borderRadius: "10px", padding: "5px" }}
                  >
                    Edit homestay
                  </Link>
                  <Link
                    to={bookingListLink}
                    className="btn-primary btn-block text-center"
                    style={{ borderRadius: "10px", padding: "5px" }}
                  >
                    Booking List
                  </Link>
                </div>
              )}
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
