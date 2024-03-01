import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import Loader from "./Loader";
import styles from "./productsList.module.css";
import { fetchGoods, setFirstLoading } from "../redux/goodsSlice";

export default function ProductsList() {
  const data = useSelector((state) => state.goods.goods);
  const goodsPage = useSelector((state) => state.goods.goodsPage);
  const isLoading = useSelector((state) => state.goods.isLoading);
  const allGoodsLoaded = useSelector((state) => state.goods.allGoodsLoaded);
  const firstLoaded = useSelector((state) => state.goods.firstLoading);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !isFetching
    ) {
      if (firstLoaded === true) {
        dispatch(setFirstLoading(false));
      }
      setIsFetching(true);
      dispatch(fetchGoods(goodsPage)).finally(() => {
        setIsFetching(false);
      });
    }
  }, [dispatch, goodsPage, isFetching, firstLoaded]);

  useEffect(() => {
    if (!allGoodsLoaded) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [allGoodsLoaded, handleScroll]);

  return (
    <>
      <div className={styles.container}>
        {firstLoaded && data.length === 0 ? (
          <p className={styles.text}>Сожалеем, но товаров не найдено</p>
        ) : (
          data.map((item) => <ProductItem key={item.id} {...item} />)
        )}
      </div>
      {isLoading && <Loader />}
    </>
  );
}
