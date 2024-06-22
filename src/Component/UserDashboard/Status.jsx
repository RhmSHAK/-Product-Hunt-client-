

const Status = ({payment}) => {
    console.log(payment.price);
    return (
        <div>
            <p>{payment.price}</p>
            <p>{payment.status}</p>
        </div>
    );
};

export default Status;