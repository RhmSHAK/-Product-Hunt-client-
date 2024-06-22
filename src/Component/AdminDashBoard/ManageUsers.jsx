import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";



const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { refetch, data: user = []} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
          const res = await axiosSecure.get('/user');
          return res.data;
        },
      })

      //admin
      const handleMakeAdmin = user =>{
        axiosSecure.patch(`/user/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1800
                  });
            }
        })
      }

      //moderator
      const handleMakeModerator = user =>{
        axiosSecure.patch(`/user/moderator/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an moderator Now!`,
                    showConfirmButton: false,
                    timer: 1800
                  });
            }
        })
      }




    return (
        <div>
            <h2 className="text-3xl">Total Users: {user.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>UserEmail</th>
                            <th>Make Moderator</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((users,index)=>
                                <tr key={users._id}>
                            <th>{index+1}</th>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>
                                       { users.Make_Moderator === 'moderator' ? 'Moderator' : <button
                                            onClick={() => handleMakeModerator(users)}
                                            className="btn bg-center bg-orange-300 btn-xl"
                                            disabled={users.Make_Admin === 'admin'}
                                            >
                                            {/* <FaUsers className="text-white  text-2xl"></FaUsers> */}
                                            Moderator
                                        </button>}
                                </td>
                            <td>
                                       { users.Make_Admin === 'admin' ? 'Admin' : <button
                                            onClick={() => handleMakeAdmin(users)}
                                            className="btn bg-center bg-lime-400 btn-xl"
                                            disabled={users.Make_Moderator === 'moderator'}
                                            >
                                            {/* <FaUsers className="text-white  text-2xl"></FaUsers> */}
                                            Admin
                                        </button>}
                                </td>
                        </tr>
                            )
                        }
                        
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;