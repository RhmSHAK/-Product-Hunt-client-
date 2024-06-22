
import VerifyButton from "./VerifyButton";

import useUsers from "../../Hook/useUsers";
import PaymentGet from "../Paymnet/PaymentGet";


const MyProfile = () => {
       
    

      const [user]=useUsers();

    return (
        <div>
        <h2 className="text-3xl text-center text-orange-400">Total Users: {user.length}</h2>
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>User Image</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Membership Subscribe</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((users,index)=>
                            <tr key={users._id}>
                        <th>{index+1}</th>
                         <th>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                         </th>
                        <td>{users.name}</td>
                        <td>{users.email}</td>
                        <td>
                                     
                                 <VerifyButton users={users}></VerifyButton>      
                        </td>
                        {/* <td>
                            <Status></Status>
                        </td> */}
                        
                       
                
                    </tr>
                        )
                    }
                    
                   
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyProfile;