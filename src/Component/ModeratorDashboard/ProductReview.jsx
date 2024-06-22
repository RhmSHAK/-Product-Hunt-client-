

import useFeature from "../../Hook/useFeature";
import SectionTitle from "../../Page/SectionTitle/SectionTitle";
import ProductsDetails from "./ProductsDetails";


const ProductReview = () => {
    const [feature] = useFeature()
    
    return (
        <div>
        <SectionTitle
         heading="Product Review Queue"
         
      ></SectionTitle>
      <div>
           <div className="overflow-x-auto">
               <table className="table">
                   {/* head */}
                   <thead>
                       <tr>
                           <th>
                              #
                           </th>
                           <th>Products Name</th>
                           <th>View Details</th>
                           <th>Make Featured</th>
                           <th>Accept Button</th>
                           <th>Reject Button</th>
                       </tr>
                   </thead>
                   <tbody>
                       
                      {
                       feature.map((item, index) =>  
                        <ProductsDetails 
                       key={item.id} 
                       index={index}
                       item={item}
                       ></ProductsDetails>
                       )
                      }
                       
                   </tbody>
                   

               </table>
           </div>
      </div>
   </div>
    );
};

export default ProductReview;