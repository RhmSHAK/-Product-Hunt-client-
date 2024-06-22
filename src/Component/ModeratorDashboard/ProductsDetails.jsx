import { Link } from "react-router-dom";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import Swal from "sweetalert2";


const ProductsDetails = ({item,index}) => {
    console.log(item);
    const {name,_id,product_status} = item;
    const axiosPublic= UseAxiosPublic()

//Accept==============
    const handleAccept = item =>{
        axiosPublic.patch(`/featured/accept/${item._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} is an Accept Now!`,
                    showConfirmButton: false,
                    timer: 1800
                  });
            }
        })
      }


    //reject------------------------------------
    const handleReject = item =>{
        axiosPublic.patch(`/featured/reject/${item._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} is an Rejected Now!`,
                    showConfirmButton: false,
                    timer: 1800
                  });
            }
        })
      }


    return (
        <tr >
                           <td>
                               {index+1}
                           </td>

                           
                           <td>
                               {name} 
                           </td>
                           <td>
                               <Link 
                               to={`/details/${_id}`}
                               >
                                   <button className="btn btn-link">Product <br /> Details</button>
                               </Link>
                           </td>
                           <td>
                               <Link 
                               to={'/featureProducts'}
                               >
                                   <button className="btn btn-link"> Featured <br /> Products</button>
                               </Link>
                           </td>
            <td>
                {product_status === 'Accepted' ? 'Accepted' : <button
                    onClick={() => handleAccept(item)}
                    className="btn bg-center bg-lime-400 btn-xl"
                    disabled={product_status === 'Rejected'}
                >
                    {/* <FaUsers className="text-white  text-2xl"></FaUsers> */}
                    Accept
                </button>}
            </td>
            <td>
                {product_status === 'Rejected' ? 'Rejected' : <button
                    onClick={() => handleReject(item)}
                    className="btn bg-center bg-lime-400 btn-xl"
                    disabled={product_status === 'Accepted'}
                >
                    {/* <FaUsers className="text-white  text-2xl"></FaUsers> */}
                    Reject
                </button>}
            </td>

                       </tr>
    );
};

export default ProductsDetails;