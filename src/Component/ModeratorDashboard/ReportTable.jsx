import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";


const ReportTable = ({item, index}) => {
    const {name,_id} = item;
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

                const res = await axiosPublic.delete(`/featured/report/${id}`);
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
            <button
                                       onClick={()=> handleDelete(_id)}
                                       className="btn btn-ghost btn-lg">
                                       <FaTrashAlt className="text-red-500"></FaTrashAlt>
                                   </button>
            </td>
        

    </tr>
    );
};

export default ReportTable;