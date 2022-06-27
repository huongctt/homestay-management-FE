import { useState } from "react";
import HomestayInList from "../../../components/HomestayInList/homestayInList";
import { useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { getCookie } from "../../../constant/request";
import { getListHomestay } from "../../../services/homestayManagementService";
const HomestayListings = () => {
  const userid = getCookie("userid");
  const [homestays, setHomestays] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await getListHomestay(userid);
      setHomestays(response.data.homestays);
    }
    getData();
  }, []);
  console.log(homestays);
  // const { data, isFetching, isLoading, error, isError } = useQuery(
  //   "getListHomestays",
  //   getListHomestay(userid)
  // );
  // console.log({ data });
  // const getListHomestay = useCallback(async () => {
  //   console.log("abc");
  //   const response = await getListHomestay(userid);
  //   console.log(response);
  // }, []);

  // useEffect(() => {
  //   getListHomestay();
  // }, [getListHomestay]);
  var list = [];
  for (var i = 0; i < homestays.length; i++) {
    list.push(
      <HomestayInList
        key={homestays[i]._id}
        id={homestays[i]._id}
        name={homestays[i].name}
        price={homestays[i].price}
        address={homestays[i].address}
        people={homestays[i].people}
        pool={homestays[i].pool}
      />
    );
  }
  return (
    <>
      <div className="container">
        <h1 className="text-center mb-6"> Homestay listings</h1>
        <div className="row">{list}</div>
      </div>
    </>
  );
};
export default HomestayListings;
