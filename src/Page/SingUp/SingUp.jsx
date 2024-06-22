import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Proviter/AuthProviders";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import { sendEmailVerification } from "firebase/auth";



const SingUp = () => {
    const navigate = useNavigate();
    const axiosPublic= UseAxiosPublic()

    const {createUser,LogOut,updateUserProfile} = useContext(AuthContext);
    //const [registerError,setRegisterError] = useState(' ');

const handleSignUp= event =>{
event.preventDefault();
const from = event.target;
const name = from.name.value;
const email = from.email.value;
const password = from.password.value;
const image = from.image.value ;

console.log(name,email,password);

  //password required--------------
//   if(password.length < 6){
//     setRegisterError('Length must be at least 6 character or longer');
//     return;
//  }
//  else if(!/[A-Z]/.test(password)){
//     setRegisterError(' Must have an Uppercase letter in the password')
//     return;
//  }
//  else if(!/[a-z]/.test(password)){
//     setRegisterError('Must have an Lowercase letter in the password')
//     return;
//  }




createUser(email,password)
.then(result => {
    console.log(result.user);
    from.reset();
    updateUserProfile(name,image)
    .then(()=>{
      //create user entry in the database
              const userInfo = {
                name: name,
                email: email,
                image: image,
              } 
              
              axiosPublic.post('/user', userInfo)
              .then(res => {
                if(res.data.insertedId){
                  from.reset();
                  Swal.fire({
                    title: 'Successful',
                    text: 'Create Account',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  });
                  LogOut();
                  navigate('/login');
                }
              })

      
    })

    //verify
    sendEmailVerification(result.user)
    .then(()=>{
      Swal.fire({
        title: 'Successful',
        text: 'please check your email and verify your account',
        icon: 'success',
        confirmButtonText: 'Cool'
      });

    })
})
.catch(error =>{
    console.log(error);
    
})
   
}

return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row">
      {/* <div className="mr-20 w-1/2">
        <img src={img} alt="" />
      </div> */}
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <h1 className="text-3xl text-center font-bold mt-4">Sign Up</h1>
        
        <form className="card-body" onSubmit={handleSignUp}>
        {/* ---------------name------------------ */}
        <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
          </div>

        {/* --------------Email---------------- */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
          </div>
          
          {/* image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image Url</span>
            </label>
            <input type="text" placeholder="image url" name="image" className="input input-bordered" required />
          </div>
          
          {/* ------------Password------------- */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
  
        {/* ------------submit button------------------ */}
          <div className="form-control mt-6">
            
            <input className="btn btn-primary" type="submit" value="Sign Up" />

          </div>

        </form>
            
            {/* error sms
  {
               registerError && <p className="text-red-600">{registerError}</p>
             } */}


        <p className='my-4 text-center'>Already have an account? <Link className='text-orange-600 font-bold' to="/login">Login</Link></p>
      </div>
    </div>
  </div>
);
};


export default SingUp;