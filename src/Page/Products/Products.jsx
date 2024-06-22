

import useAccepet from "../../Hook/useAccepet";
import ProductsCard from "./ProductsCard";


const Products = () => {
    const [features] = useAccepet();

    return (
        <div>
           
            <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-5 ">
            {
                features.map(items => <ProductsCard
                    key={items._id}
                    items={items}
                    ></ProductsCard>
                    
                 )
            }
            </div>
        </div>
    );
};

export default Products;