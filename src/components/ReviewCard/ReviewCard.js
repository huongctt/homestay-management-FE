import { Rating } from "@mui/material";
const ReviewCard = (props) => {
  return (
    <>
      <div className="card" style={{ width: "100%", marginTop: "15px" }}>
        <div className="row">
          <div className="col-md-9">
            <p style={{ padding: "10px 15px 0px 15px" }}>{props.username}</p>
            <Rating
              name="read-only"
              value={props.rate}
              readOnly
              style={{ padding: "0px 15px" }}
            />
            <p style={{ padding: "0px 15px" }}>Comment: {props.comment}</p>
          </div>
          <div className="col-md-3">
            <img src="http://localhost:3333/homestays/62bd72ed92f6cf0b903ae891/images?index=0" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ReviewCard;
