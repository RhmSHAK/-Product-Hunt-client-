import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../Proviter/AuthProviders";
import Swal from "sweetalert2";


const CheckoutForm = () => {
    const [payID, setPayID]= useState('');
    const [error, setError] = useState('');
    const {user}= useContext(AuthContext);
    const [clientSecret, setClientSecret]= useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure= useAxiosSecure();
    const totalPrice = 10;

    useEffect(()=>{
         axiosSecure.post('/create-payment-intent',{price: totalPrice})
          .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
          })


    },[axiosSecure, totalPrice])

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement)

        if (card == null) {
            return
          }

          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          })  

          if(error){
            console.log('payment error', error)
            setError(error.message)
          }
          else{
            console.log('payment method', paymentMethod)
            setError('')
          }

          //confirm payment
          const {paymentIntent , error: confirmError } = await stripe.confirmCardPayment(clientSecret,{
               payment_method: {
                card: card,
                billing_details:{
                     email: user?.email || 'anonymous',
                     name: user?.displayName || 'anonymous'
                }
               }
          })

          if(confirmError){
            console.log('confirm error');
          }
          else{
            console.log('payment intent', paymentIntent);
                  if(paymentIntent.status === 'succeeded'){
                    console.log('transaction id',paymentIntent.id);
                    setPayID(paymentIntent.id);
                    
                    //payment
                    const payment = {
                        email: user.email,
                        price: totalPrice,
                        payID: paymentIntent.id,
                        status: 'pending'
                    }

                    const res = await axiosSecure.post('/payment', payment);
                    console.log('payment saved', res);
                    if(res.data?.insertedId){
                        
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "taka poysha done",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }


                  }
            
                  return paymentIntent

          }

        
    }

    return (
        <form onSubmit={handleSubmit}>
                 <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-md btn-primary my-4" type="submit" 
      disabled={!stripe || !clientSecret}>
        Pay
      </button>

     <p className="text-red-600">{error}</p>
        {payID && <p className="text-green-600">Your transaction id : {payID}</p> }
        </form>
    );
};

export default CheckoutForm;