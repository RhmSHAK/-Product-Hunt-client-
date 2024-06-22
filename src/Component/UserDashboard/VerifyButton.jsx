import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Proviter/AuthProviders";


const VerifyButton = ({users}) => {
    // console.log("payment", payment);
    //  const {price}= payment;
    const {user}=useContext(AuthContext);

    
    return (
        <div>
            {/* <p>{status}</p> */}
            <Link to='/dashboard/payment'>


                { user?.email === users?.email ?  <button 
                    //disabled={payment.status}
                    className="btn bg-center  bg-lime-500 btn-xl">
                 
                    Subscribe
                </button>:
                <button disabled
                
                className="btn bg-center 
                                    bg-lime-500 btn-xl">
                
                Subscribe
            </button>
                }
            </Link>
        </div>
    );
};

export default VerifyButton;