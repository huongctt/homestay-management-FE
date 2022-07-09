import { format } from "date-fns";
const DiscountCard = (props) => {
  return (
    <>
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card listing-preview">
          <div style={{ backgroundColor: "rgba(172, 180, 231,0.5)" }}>
            <div className="listing-heading text-center">
              <h4 style={{ marginTop: "10px" }}>{props.percentage}%</h4>
            </div>
            <div className="text-center">
              <p>Quantity: {props.quantity}</p>
            </div>
          </div>
          <div className="card-body">
            <div className="text-center">
              <p>
                {format(new Date(props.checkin), "dd/MM/yyyy")} {" => "}
                {format(new Date(props.checkout), "dd/MM/yyyy")}
              </p>
            </div>
            <div style={{ paddingLeft: "20px", height: "150px" }}>
              <p>Homestays: </p>
              {props.homestays.map((homestay) => (
                <p> + {homestay.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DiscountCard;
