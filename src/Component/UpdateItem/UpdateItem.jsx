import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../Page/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";

const image_hosting_key1 = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key1);
const image_hosting = `https://api.imgbb.com/1/upload?key=${image_hosting_key1}`
const UpdateItem = () => {
    const items = useLoaderData();
    const {_id,name,Owner_name,Owner_image,Owner_email,description} = items;
    console.log(items);
    const { register, handleSubmit , reset} = useForm();
    const axiosPublic = UseAxiosPublic();

    const onSubmit =  async (data) => {
        console.log(data)
        //image upload to imgbb and then get an url
        const imageFile = {image: data.image[0]};
        console.log(imageFile);
        
        const res = await axiosPublic.post(image_hosting, imageFile,{
            headers: {
                'content-Type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            // now send the menu item data to server with the image url
            const menuItem = {
                name: data.name,
                Owner_name: data.Owner_name,
                Owner_image: data.Owner_image,
                Owner_email: data.Owner_email,
                description: data.description,
                image: res.data.data.display_url,
                
            }
          //
          const menuRes = await axiosPublic.patch(`/featured/${_id}`, menuItem);
          console.log(menuRes.data);
          if(menuRes.data.modifiedCount > 0){
            //show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is Update to the menu`,
                showConfirmButton: false,
                timer: 1500
              });
          }
        }
        console.log( 'with image url' ,res.data);
    };
    return (
        <div>
            <SectionTitle heading={"Update an Item"} ></SectionTitle>

            <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            
        <div className="form-control w-full ">
                <div className="label">
                    <span className="label-text">Product Name</span>
                    
                </div>
                <input 
                type="text" 
                defaultValue={name}
                placeholder="Product_name" 
                {...register("name", {required: true})} 
                className="input input-bordered w-full " />
                
            </div>

             <p className="text-xl mt-4">Product Owner Info</p>
            <div className="flex gap-6 ">
                {/*Owner name */}
                <div className="form-control w-full ">
                <div className="label">
                    <span className="label-text">Owner Name</span>
                    
                </div>
                <input 
                type="text" 
                defaultValue={Owner_name}
                placeholder="Owner_name" 
                {...register("Owner_name", {required: true})} 
                className="input input-bordered w-full " />
                
            </div>

                {/* Owner image */}
                <div className="form-control w-full ">
                <div className="label">
                    <span className="label-text">Owner image</span>
                    
                </div>
                <input 
                type="text" 
                defaultValue={Owner_image}
                placeholder="Owner_image" 
                {...register("Owner_image", {required: true})} 
                className="input input-bordered w-full " />
                
            </div>


                {/* Owner email */}
                <div className="form-control w-full ">
                <div className="label">
                    <span className="label-text">Owner email</span>
                    
                </div>
                <input 
                type="email" 
                defaultValue={Owner_email}
                placeholder="Owner_email" 
                {...register("Owner_email", {required: true})} 
                className="input input-bordered w-full " />
                
            </div>
                       

            </div>

            {/* text area */}
            <label className="form-control my-4">
                <div className="label">
                    <span className="label-text">Description</span>
                    
                </div>
                <textarea defaultValue={description} {...register("description", {required: true})} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                
            </label>

            {/* file input */}
            <div className="form-control w-full my-4 ">
            <input  {...register("image", {required: true})} type="file" className="file-input w-full  " />
            </div>

           <button className="btn">
            Update Item 
           </button>
           
            
        </form>
      </div>
        </div>
    );
};

export default UpdateItem;