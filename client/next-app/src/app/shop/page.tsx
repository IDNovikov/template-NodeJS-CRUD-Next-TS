import Link from "next/link";
import { IProduct } from "../types/types";
// import MainContainer from "../../ui/MainContainer";
import styles from "../styles/shop.module.css";

async function getData() {
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-cache",
  });
  return res.json();
}

export default async function ShopPage() {
  const data = await getData();

  return (
    <>
      <h1 className={styles.pageTitle}>Our Products</h1>
      <div className={styles.productGrid}>
        {data.rows.map((item: IProduct) => (
          <div key={item.id} className={styles.productCard}>
            <h2 className={styles.productTitle}>{item.name}</h2>
            <img
              className={styles.productImage}
              src={`http://localhost:5000/${item.img?.replace(
                /[\"\[\]\\\\s]/g,
                ""
              )}`}
              alt={item.name}
            />
            <div className={styles.productInfo}>
              <p>
                Basic price: <b>${item.price}</b>
              </p>
              <p>
                Discount: <b>${item.discount}</b>
              </p>
              <p>
                Total price: <b>${item.price - item.discount}</b>
              </p>
            </div>
            <Link href={`/shop/${item.id}`} className={styles.productLink}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
