import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import Loader from "./Loader";
import styles from "./productsList.module.css";
import { fetchGoods, setFirstLoading } from "../redux/goodsSlice";
import { InView } from "react-intersection-observer";

export default function ProductsList() {
  const data = useSelector((state) => state.goods.goods);
  const goodsPage = useSelector((state) => state.goods.goodsPage);
  const isLoading = useSelector((state) => state.goods.isLoading);
  const allGoodsLoaded = useSelector((state) => state.goods.allGoodsLoaded);
  const firstLoaded = useSelector((state) => state.goods.firstLoading);
  const errorMessage = useSelector((state) => state.goods.errorMessage);
  const dispatch = useDispatch();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    dispatch(fetchGoods(goodsPage))
    .finally(() => {
      dispatch(setFirstLoading(true));
    });
  }, [])

  useEffect(() => {
    if (isInView && !isLoading && !allGoodsLoaded) {
      if (firstLoaded === true) {
        dispatch(setFirstLoading(false));
      }
      dispatch(fetchGoods(goodsPage)).finally(() => {
      });
    }
  }, [isInView, isLoading, allGoodsLoaded, dispatch, goodsPage, firstLoaded]);

  return (
    <>
      <div className={styles.container}>
        {firstLoaded && data.length === 0 ? (
        <>
          {errorMessage ? <p className={styles.text}>{errorMessage}</p> : <p className={styles.text}>Сожалеем, но товаров не найдено</p>}
        </>
        ) : (
          data.map((item) => <ProductItem key={item.id} {...item} />)
        ) }      
      </div>
      <InView as="div" onChange={(inView) => {setIsInView(inView)}}  threshold={1}></InView>
      {isLoading && <Loader />}
    </>
  );
}
