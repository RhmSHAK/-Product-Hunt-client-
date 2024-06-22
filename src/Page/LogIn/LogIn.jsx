import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Proviter/AuthProviders";
// import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
//import { Helmet } from "react-helmet-async";


const LogIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic= UseAxiosPublic();
    const emailRef = useRef(null);

    const auth = getAuth(app);

    const from = location.state?.from?.pathname || "/";

    // const captchaRef = useRef(null);

    // const [disabled, setDisabled] = useState(true);

    const {logIn,googleLogIn,GithubLogIn} = useContext(AuthContext);

    // useEffect( ()=>{
    //     loadCaptchaEnginge(6);
    // } , [])

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        console.log(email,password);
          
        

        logIn(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: 'Successful',
                    text: 'LogIn Successful',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                navigate(from, {replace: true});
            })
            .catch(error => {
                console.log(error);
            })
    }
    

    // const handleValidateCaptcha = (e) =>{
        

    //      const user_captcha_value = e.target.value;
    //      if (validateCaptcha(user_captcha_value)==true) {
    //          setDisabled(false);
    //     }
   
    //     else {
    //         setDisabled(true);
    //     }
    // }

    const handleGoogle = () =>{
        googleLogIn()
        .then(result=>{
          console.log(result.user);
          const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            image: result.user?.photoURL
          }

          axiosPublic.post('/user', userInfo)
          .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
                    title: 'Successful',
                    text: 'LogIn Successful',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
                  
              }

          })
          navigate(from, {replace: true});

        })
        .catch(error =>{
          console.log(error)
        })
      }
      
      
      const handleGithub = () =>{
        GithubLogIn()
        .then(result=>{
          console.log(result.user);
          Swal.fire({
              title: 'Successful',
              text: 'LogIn Successful',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            navigate(from, {replace: true});
        })
        .catch(error =>{
          console.log(error)
        })
      
    }

    //forget
    const handleForget = e =>{
        const email = emailRef.current.value;
        if(!email){
        console.log('email forget', emailRef.current.value);
        return
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            alert('please write a valid email');
            return
        }

        //send validation
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Please check your email",
                showConfirmButton: false,
                timer: 1500
              });
        })
        .catch(error=>{
            console.log(error);
        })
    }



      

    return (
       <>
        
        {/* <Helmet>
                <title>Bistro Boss | LogIn</title>

            </Helmet> */}
       
       <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card md:w-1/2  max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" onClick={handleForget} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {/* <div className="form-control">
                            <label className="label">
                            <LoadCanvasTemplate />
                            </label>
                            <input type="text" onBlur={handleValidateCaptcha} name="captcha" placeholder="type the captcha above" className="input input-bordered" required />
                            {/* <button  className="btn btn-outline btn-xs mt-2">Validate</button> */}
                        {/* </div>  */}

                        <div className="form-control mt-6">
                           
                            <input  type="submit" className="btn btn-primary" value="LogIN" />
                        </div>
                    </form>

                    <p className='my-4 text-center'>New user <Link className='text-orange-600 font-bold' to="/singUp">Sign Up</Link></p>

                    <div className="flex justify-around">
                        <p>
                            <button onClick={handleGoogle} className="mx-6 mb-4 btn btn-ghost">Google</button>
                        </p>
                        {/* <p>
                            <button onClick={handleGithub} className="mx-6 mb-4 btn btn-ghost">GitHub</button>
                        </p> */}
                    </div>

                </div>
            </div>
        </div>
       
       </>
    );
};


export default LogIn;