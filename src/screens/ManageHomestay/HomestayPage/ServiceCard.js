import { Link } from "react-router-dom";

const ServiceCard = (props) => {
  const linkEdit = `/services/${props.id}/edit`;
  return (
    <>
      <div
        class="card"
        style={{
          width: "100%",
          borderTop: "20px",
        }}
      >
        <div class="card-body">
          <h5 class="card-title">{props.name}</h5>
          <p class="card-text">Price: {props.price}</p>
          <p class="card-text">Description: {props.description}</p>
          {props.isOwner && (
            <Link
              to={linkEdit}
              class="btn btn-primary"
              style={{ padding: "4px" }}
            >
              Edit Service
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
