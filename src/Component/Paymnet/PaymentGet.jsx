 import {  useEffect, useState } from "react";
//import MyProfile from "../UserDashboard/MyProfile";
// import { AuthContext } from "../../Proviter/AuthProviders";
// import VerifyButton from "../UserDashboard/VerifyButton";
import Status from "../UserDashboard/Status";
import VerifyButton from "../UserDashboard/VerifyButton";


const PaymentGet = ({users}) => {
    // const {email} = users;
    // const {user}=useContext(AuthContext);
    const [Payments , setPayment] = useState([]);
    console.log(Payments);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        //if(user.email === users.email){
        fetch('https://last-project-12-sever.vercel.app/payment')
        .then(res => res.json())
        .then(data =>{
            
            setPayment(data);
            setLoading(false);
        })
    //}
    })

    return (
        <div>
            {
                Payments.map(payment =>
                    //  <p key={payment.id}>{payment.status}</p>
                    <VerifyButton
                      key={payment.payID}
                      payment={payment}
                    ></VerifyButton>
                )
            }
        </div>
    );
};

export default PaymentGet;