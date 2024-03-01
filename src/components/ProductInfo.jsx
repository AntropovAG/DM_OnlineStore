import { useParams } from "react-router-dom";

export default function ProductInfo() {
    const {id} = useParams();

    console.log(id);

    return (

    <div>
        <h2>ProductInfo on product with {id}</h2>
    </div>
  )
}
