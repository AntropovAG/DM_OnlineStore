import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import styles from "./productsList.module.css";
import {
  fetchGoods,
  fetchCashedGoods,
  setFirstLoading,
} from "../../redux/goodsSlice";
import { InView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

export default function ProductsList() {
  const data = useSelector((state) => state.goods.goods);
  const goodsPage = useSelector((state) => state.goods.goodsPage);
  const isLoading = useSelector((state) => state.goods.isLoading);
  const allGoodsLoaded = useSelector((state) => state.goods.allGoodsLoaded);
  const firstLoaded = useSelector((state) => state.goods.firstLoading);
  const errorMessage = useSelector((state) => state.goods.errorMessage);
  const dispatch = useDispatch();
  const [isInView, setIsInView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cashedData = JSON.parse(sessionStorage.getItem("cashedData"));
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (data.length === 0) {
      if (cashedData === null) {
        dispatch(fetchGoods(goodsPage)).finally(() => {
          dispatch(setFirstLoading(true));
        });
      } else {
        dispatch(
          fetchCashedGoods({ limit: cashedData.length, page: cashedData.page })
        ).finally(() => {
          dispatch(setFirstLoading(true));
          window.scrollTo(0, scrollPosition);
        });
      }
    } else {
      window.scrollTo(0, scrollPosition);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sessionStorage.setItem("scrollPosition", scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isInView && !isLoading && !allGoodsLoaded) {
      if (firstLoaded === true) {
        dispatch(setFirstLoading(false));
      }
      dispatch(fetchGoods(goodsPage)).finally(() => { });
    }
  }, [isInView, isLoading, allGoodsLoaded, dispatch, goodsPage, firstLoaded]);

  useEffect(() => {
    const updateUrl = () => {
      const loadedData = data.length;
      navigate(`/products/${loadedData}`);
      sessionStorage.setItem(
        "cashedData",
        JSON.stringify({ length: loadedData, page: goodsPage })
      );
    };
    updateUrl();
  }, [data.length, navigate]);

  return (
    <>
      <div className={styles.container}>
        {firstLoaded && data.length === 0 ? (
          <>
            {errorMessage ? (
              <p className={styles.text}>{errorMessage}</p>
            ) : (
              <p className={styles.text}>Сожалеем, но товаров не найдено</p>
            )}
          </>
        ) : (
          data.map((item) => <ProductItem key={item.id} {...item} />)
        )}
      </div>

      {isLoading && <Loader />}
      <InView
        as="div"
        onChange={(inView) => {
          setIsInView(inView);
        }}
        threshold={0}
      ></InView>
    </>
  );
}
