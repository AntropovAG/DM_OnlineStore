import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductInfo() {
    const {id} = useParams();
    // const product = useSelector((state) => state.goods.find((item) => item.id === id);

    const product = useSelector((state) => state.goods.goodWithId);
    console.log(id, product);

    return (

    <div>
        <h2>ProductInfo on product with {id}</h2>
        <p>{product.category}</p>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <p>{product.price}</p>
        <p>{product.title}</p>

    </div>
  )
}
