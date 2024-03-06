import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductRaiting from "./ProductRaiting";
import styles from "./productInfo.module.css";

export default function ProductInfo() {
  const { id } = useParams();

  const product = useSelector((state) => state.goods.goodWithId);

  const formattedPrice = new Intl.NumberFormat("ru-RU").format(product.price);
  console.log(id, product);

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={`/products/0`}>
        <img
          className={styles.linkImg}
          src="/images/arrow_left.png"
          alt="стрелка влево"
        />
        Назад
      </Link>
      <div className={styles.productContainer}>
        <img className={styles.img} src={product.picture} alt="Фото продукта" />
        <div className={styles.productInfo}>
          <div>
            <h2 className={styles.title}>{product.title}</h2>
            <ProductRaiting rating={product.rating} />
          </div>
          <div>
            <p className={styles.price}>{formattedPrice} &#8381;</p>
            <button className={styles.button}>Оформить заказ</button>
          </div>
          <div>
            <h3 className={styles.returnPolicyTitle}>
              <img
                className={styles.returnPolicyImg}
                src="/images/return_policy_arrow.png"
                alt="иконка возврата"
              />
              Условия возврата
            </h3>
            <p className={styles.returnPolicyText}>
              Обменять или вернуть товар надлежащего качества можно в течение 14
              дней с момента покупки.
            </p>
          </div>
          <p className={styles.disclaimerText}>
            Цены в интернет-магазине могут отличаться от розничных магазинов.
          </p>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <h3 className={styles.descriptionTitle}>Описание</h3>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </div>
  );
}
