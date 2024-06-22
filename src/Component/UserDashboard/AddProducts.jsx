import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import SectionTitle from "../../Page/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../Proviter/AuthProviders";

// import React, { useState } from 'react';
// import { WithContext as ReactTags } from 'react-tag-input';
// import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported



const image_hosting_key1 = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key1);
const image_hosting = `https://api.imgbb.com/1/upload?key=${image_hosting_key1}`
const AddProducts = () => {
    const { register, handleSubmit , reset} = useForm();
    const axiosPublic = UseAxiosPublic();
    const {user}= useContext(AuthContext);

//----------------------------
//     const [tags, setTags] = useState([]);

//   const handleDelete = (i) => {
//     setTags(tags.filter((tag, index) => index !== i));
//   };

//   const handleAddition = (tag) => {
//     setTags([...tags, tag]);
//   };

//   const handleDrag = (tag, currPos, newPos) => {
//     const newTags = tags.slice();
//     newTags.splice(currPos, 1);
//     newTags.splice(newPos, 0, tag);
//     setTags(newTags);
//   };

//-----------------------------------------



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
                links: data.links,
                description: data.description,
                tag: data.tag,
                image: res.data.data.display_url,
                UpVote: "0",
                
            }
          //-------------------------------------------------
          const menuRes = await axiosPublic.post('/featured', menuItem);
          console.log(menuRes.data);
          if(menuRes.data.insertedId){
            //show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is added to the menu`,
                showConfirmButton: false,
                timer: 1500
              });
          }
        }
        console.log( 'with image url' ,res.data);
    };
    return (
        
       <div>
        <SectionTitle
           heading={"Add Products"}
        ></SectionTitle>

        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            
        <div className="form-control w-full ">
                <div className="label">
                    <span className="label-text">Product Name</span>
                    
                </div>
                <input 
                type="text" 
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
                placeholder="Owner_email" 
                {...register("Owner_email", {required: true})} 
                className="input input-bordered w-full " />
                
            </div>
            </div>


             
         {/* tag */}
         {/* <div className="w-full max-w-md mx-auto mt-6">
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        inputFieldPosition="inline"
        autocomplete
        {...register("tag", {required: true})}
        classNames={{
          tags: 'flex flex-wrap border border-gray-300 rounded p-2',
          tagInput: 'inline-block',
          tagInputField: 'outline-none border-none focus:ring-0 focus:border-transparent',
          selected: 'flex flex-wrap',
          tag: 'bg-blue-500 text-white rounded px-2 py-1 m-1 flex items-center',
          remove: 'ml-2 cursor-pointer',
        }}
      />
    </div> */}

                  {/* tag */}
                    <div className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Tag</span>

                        </div>
                        <input
                            type="text"
                            placeholder="Tag"
                            {...register("tag", { required: true })}
                            className="input input-bordered w-full " />

                    </div>


                    {/* External Links  */}
                    <div className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">External Links</span>

                        </div>
                        <input
                            type="text"
                            placeholder="External Links"
                            {...register("links", { required: true })}
                            className="input input-bordered w-full " />

                    </div>



            {/* text area */}
            <label className="form-control my-4">
                <div className="label">
                    <span className="label-text">Description</span>
                    
                </div>
                <textarea {...register("description", {required: true})} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                
            </label>

            {/* file input */}
            <div className="form-control w-full my-4 ">
            <input {...register("image", {required: true})} type="file" className="file-input w-full  " />
            </div>

           <button className="btn">
            Add Item 
           </button>
           
            
        </form>
      </div>
       </div>
    );
};

export default AddProducts;