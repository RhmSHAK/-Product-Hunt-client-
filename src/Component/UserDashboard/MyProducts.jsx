import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../Page/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useFeature from "../../Hook/useFeature";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import { Link } from "react-router-dom";




const MyProducts = () => {
    const [feature] = useFeature()
    const axiosPublic= UseAxiosPublic();

    const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {

                const res = await axiosPublic.delete(`/featured/${id}`);
                console.log(res.data);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }

    return (
        <div>
        <SectionTitle
         heading="manage all items"
         subHeading="--Hurry Up--"
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
                           <th>Number of votes</th>
                           <th>Update</th>
                           <th>Delete</th>
                       </tr>
                   </thead>
                   <tbody>
                       
                      {
                       feature.map((item, index) =>  <tr key={item._id}>
                           <td>
                               {index+1}
                           </td>

                           
                           <td>
                               {item.name} 
                           </td>
                           <td>
                               {item.Vote} 
                           </td>

                          

                           <td>
                                   <Link to={`/dashboard/updateItem/${item._id}`}>
                                   <button

                                       className="btn bg-orange-500 btn-md">
                                       <FaEdit className="text-white text-xl"></FaEdit>
                                   </button>
                                   </Link>
                           </td>

                           <td>
                                <button
                                       onClick={()=> handleDelete(item._id)}
                                       className="btn btn-ghost btn-lg">
                                       <FaTrashAlt className="text-red-500"></FaTrashAlt>
                                   </button>
                           </td>

                       </tr>
                       )
                      }
                       
                   </tbody>
                   

               </table>
           </div>
      </div>
   </div>
    );
};

export default MyProducts;