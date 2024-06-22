import { useContext } from "react";
import { FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Proviter/AuthProviders";
import UseAxiosPublic from "../../../Hook/UseAxiosPublic";


const SortCard = ({items}) => {
    const {name,image,Vote,_id,email,tag} = items;
    const{user} = useContext(AuthContext);
     const axiosPublic = UseAxiosPublic();



    const handleVote2 = item =>{
        const VoteCount = {
            email: user.email
        }
        if(email !== user.email){
         axiosPublic.patch(`/featured/voteSort/${item._id}`,VoteCount)
         .then(res => {
             console.log(res.data);
           
             
             if(res.data.modifiedCount > 0){
                 
                 Swal.fire({
                     position: "top-end",
                     icon: "success",
                     title: `${name} is an Vote Now!`,
                     showConfirmButton: false,
                     timer: 1800
                   });
             }
            //  window.location.reload();
 
           //}
         })
        }
       }
 




    return (
       <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image} alt="" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title"> {name}</h2>
                    <p>Tags: {tag}</p>

                </div>
                <div className="card-actions flex justify-around mb-3 ">
                    <button
                        onClick={()=>handleVote2(items)}  
                        className="btn btn-primary">UpVoteButton</button>
                    <div className="flex gap-3">
                        <FaThumbsUp className="text-3xl mt-1"></FaThumbsUp>
                        <p className="mt-2 text-[22px]">{Vote}</p>
                    </div>
                </div>
            </div>
           
       </div>
    
    );
};

export default SortCard;