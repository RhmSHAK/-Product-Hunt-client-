import { FaThumbsUp } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../SectionTitle/SectionTitle";
import UseAxiosPublic from "../../../Hook/UseAxiosPublic";
import Swal from "sweetalert2";
import ReviewSection from "./ReviewSection";
import { useContext } from "react";
import { AuthContext } from "../../../Proviter/AuthProviders";



const ProductsDetails = () => {
     const{user} = useContext(AuthContext);
    const items = useLoaderData();
    console.log(items);
    const {name,image,description,Vote,_id,report_status,email}=items;
    const axiosPublic = UseAxiosPublic();

//Report---------------------------------------------------------
    const handleReport = item =>{
        axiosPublic.patch(`/featured/report/${item._id}`)
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
            window.location.reload();
        })
      }

    //vote----------------------------
    const handleVote = item =>{
       const VoteCount = {
           email: user.email
       }
       if(email !== user.email){
        axiosPublic.patch(`/featured/vote/${item._id}`,VoteCount)
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
            window.location.reload();

          
        })
    }
      }



    const handleReview = event =>{
        event.preventDefault();
        const from = event.target;
        const name = from.name.value;
        const description = from.description.value;
        const rating = from.rating.value;
        const image = from.image.value;

        //console.log(name, description,image,rating);
        const reviewInfo =  {
            name: name,
            image: image,
            description: description,
            rating: rating,
            _id: _id
        }
        //console.log(reviewInfo);

        axiosPublic.post('/review', reviewInfo)
        .then(res => {
            
            if(res.data.insertedId){
                from.reset();
                Swal.fire({
                  title: 'Successful',
                  text: 'Review Post Successful',
                  icon: 'success',
                  confirmButtonText: 'Cool'
                });
                from.reset();
                window.location.reload();
              }
        }
            
        )
        .catch(error => {
            console.log(error);
        })
    }




    return (
       <div>
         <div className="card card-side bg-base-100 shadow-xl">
            <figure><img src={image} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p> <span className="font-bold">Description:</span> {description}</p>
                <p> <span className="font-bold">Vote: </span> {Vote}</p>
                
                <div className="card-actions">
                    
                    <button onClick={() => handleVote(items)}  className="btn btn-primary"><FaThumbsUp className="text-2xl"></FaThumbsUp></button>
                    <button
                    onClick={() => handleReport(items)}
                    className="btn bg-center bg-lime-400 btn-xl"
                     disabled={report_status === 'Report'}
                >
                    {/* <FaUsers className="text-white  text-2xl"></FaUsers> */}
                    Report
                </button>
                </div>
            </div>
        </div>

        {/* review section */}
        <SectionTitle heading={"Review Section"}></SectionTitle>
            <ReviewSection></ReviewSection>

        {/* Post Review Section */}
        <SectionTitle heading={"Post Review Section"} ></SectionTitle>
           
            <div >
            <form className="card-body"
                        onSubmit={handleReview}
                        >
                            {/* ---------------name------------------ */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Reviewer Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                            </div>

                             {/* image */}
                             <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Reviewer Url</span>
                                </label>
                                <input type="text" placeholder="image url" name="image" className="input input-bordered" required />
                            </div>

                            {/* --------------Description---------------- */}
                            <div className="form-control">
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Description</span>
                                        
                                    </div>
                                    <textarea name="description" placeholder="Description" className="textarea textarea-bordered h-24" ></textarea>
                                    
                                </label>
                                {/* <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required /> */}
                            </div>

                           

                            {/* ------------Rating------------- */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <input type="text" name="rating" placeholder="Rating" className="input input-bordered" required />
                                
                            </div>

                            {/* ------------submit button------------------ */}
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Submit" />

                            </div>

                        </form>
            </div>



       </div>
    );
};

export default ProductsDetails;