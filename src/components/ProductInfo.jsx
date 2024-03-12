import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductRaiting from "./ProductRaiting";
import styles from "./productInfo.module.css";
import { useEffect } from "react";
import { fetchGoodByID } from "../redux/goodsSlice";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import NotFound from "./NotFound";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "../utils/supportFunctions";

export default function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { picture, title, rating, price, description } = useSelector(
    (state) => state.goods.goodWithId
  );
  const isLoading = useSelector((state) => state.goods.isLoading);
  const error = useSelector((state) => state.goods.errorMessage);


  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchGoodByID(id));
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error ? (
        <NotFound />
      ) : (
        <div className={styles.container}>
          <Link className={styles.link} onClick={() => navigate(-1)}>
            <img
              className={styles.linkImg}
              src="/images/arrow_left.png"
              alt="стрелка влево"
            />
            Назад
          </Link>
          <div className={styles.productContainer}>
            <img className={styles.img} src={picture} alt="Фото продукта" />
            <div className={styles.productInfo}>
              <div>
                <h2 className={styles.title}>{title}</h2>
                <ProductRaiting rating={rating} />
              </div>
              <div>
                <p className={styles.price}>{formatPrice(price)} &#8381;</p>
                <AddToCartButton id={id} />
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
                  Обменять или вернуть товар надлежащего качества можно в
                  течение 14 дней с момента покупки.
                </p>
              </div>
              <p className={styles.disclaimerText}>
                Цены в интернет-магазине могут отличаться от розничных
                магазинов.
              </p>
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <h3 className={styles.descriptionTitle}>Описание</h3>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      )}
    </>
  );
}
