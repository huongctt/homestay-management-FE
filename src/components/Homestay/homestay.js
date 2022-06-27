import classes from "./style.module.css";
import { Link } from "react-router-dom";
const Homestay = (props) => {
  return (
    <>
      <div className={classes["l-post"]}>
        <figure>
          <img alt="" src="../../assets/img/homes/home-1.jpg" />
        </figure>
        <div className={classes["l-post-meta"]}>
          <h4 class="font-weight-bold">
            <Link to="#">Name</Link>
          </h4>
          <div className={classes["l-post-ranking"]}>
            <a className={classes.admin} href="#" title="">
              admin
            </a>
            <a className={classes["pdate"]} href="#" title="">
              04-23-19
            </a>
            <a className={classes["time-post"]} href="#" title="">
              {" "}
              -12 hours ago
            </a>
          </div>
          <p class="font-weight-bold">Address: abc</p>
          <p class="font-weight-bold">Price: abc</p>
          <div className="row">
            <p className="col-6">People: abc</p>
            <p className="col-6">Pool: abc</p>
          </div>
          <div className="row">
            <p className="col-6">Rate: abc</p>
            <p className="col-6">Number of guests: abc</p>
          </div>

          <a href="#" title="" class="read">
            Read More
          </a>
        </div>
      </div>
    </>
  );
};
export default Homestay;
