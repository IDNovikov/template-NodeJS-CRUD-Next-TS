import { IProduct } from "../../types/types";
// import MainContainer from "../../../ui/MainContainer";
import styles from "../../../styles/Product.module.css";

interface ProductPageProps {
  params: { id: string };
}

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    cache: "no-cache",
  });
  return res.json();
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: IProduct = await getProduct(params.id);

  return (
    <>
      <div className={styles.productContainer}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        {product.img && (
          <img
            className={styles.productImage}
            src={`http://localhost:5000/${product.img.replace(
              /[\"\[\]\\\\s]/g,
              ""
            )}`}
            alt={product.name}
          />
        )}
        <div className={styles.productDetails}>
          <p>
            Basic price: <b>${product.price}</b>
          </p>
          <p>
            Discount: <b>${product.discount}</b>
          </p>
          <p>
            Total price: <b>${product.price - product.discount}</b>
          </p>
          <p>Description: {product.description}</p>
        </div>
      </div>
    </>
  );
}
