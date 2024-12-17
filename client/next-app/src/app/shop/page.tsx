import Link from "next/link";
import { IProduct } from "../types/types";
import MainContainer from "../ui/MainContainer";

async function getData() {
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "force-cache",
  });
  return res.json();
}
const page: React.FC = async () => {
  const data = await getData();
  console.log(data.rows);
  return (
    <MainContainer>
      {data.rows.map((item: IProduct) => (
        <div>
          <h1>{item.name}</h1>
          <div>Basic price:{item.price}</div>
          <div>Discount:{item.discount}</div>
          <div>Total price:{item.price - item.discount}</div>
          <div>About:{item.description}</div>
          <div>Article:{item.article}</div>
          {item.img && (
            <img
              src={`http://localhost:5000/${item.img.replace(
                /[\"\[\]\\\\s]/g,
                ""
              )}`}
            />
          )}
        </div>
      ))}
    </MainContainer>
  );
};

export default page;
