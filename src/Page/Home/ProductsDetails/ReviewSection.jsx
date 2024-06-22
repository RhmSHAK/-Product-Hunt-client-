
import { FcRating } from "react-icons/fc";

import { useLoaderData } from "react-router-dom";
import useReview from "../../../Hook/useReview";

const ReviewSection = () => {
     const items = useLoaderData();
    //const {_id} = items;
    //console.log(items._id);
    const [reviews] = useReview();
    //   const {_id} = reviews;
      console.log(reviews);
    return (

       
    

         
         <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-5 ">

            {
                reviews.map((reviews) => 
                    items._id === reviews._id ?

                    <div key={reviews.id} className="card w-96 bg-base-100 shadow-xl">
                        <div className="chat mt-6 chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 mx-4 rounded-full">
                                    <img alt="Tailwind CSS chat bubble component" src={reviews.image} />
                                </div>
                            </div>
                            <div className="chat-header">
                                {reviews.name}

                            </div>
                            <div className="chat-bubble">{reviews.description}</div>
                            {/* <div className="chat-bubble">{reviews.}</div> */}

                        </div>

                        <div className="card-body">
                            <h2 className="card-title">Rating: {reviews.rating} <FcRating></FcRating></h2>


                        </div>
                    </div>
                    : <></>


                )
            }

           
        
        </div> 
        
        );
};

export default ReviewSection;