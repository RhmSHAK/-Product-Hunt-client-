import useReport from "../../Hook/useReport";
import ReportTable from "./ReportTable";


const ReportedContents = () => {
    const [Report] = useReport();

    return (
        // <div>
        //    {/* <SectionTitle heading={"Featured Products Section"} ></SectionTitle> */}
        //     <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-5 ">
        //     {
        //         Report.map(items => <ReportTable 
        //             key={items._id}
        //             items={items}
        //             ></ReportTable>
                    
        //          )
        //     }
        //     </div>
        // </div>
        <div>
           <div className="overflow-x-auto">
               <table className="table">
                   {/* head */}
                   <thead>
                       <tr>
                           <th>
                              #
                           </th>
                           <th>Products Name</th>
                           <th>View Details</th>
                           <th>Delete</th>
                           
                       </tr>
                   </thead>
                   <tbody>
                       
                      {
                       Report.map((item, index) =>  
                        <ReportTable 
                       key={item.id} 
                       index={index}
                       item={item}
                       ></ReportTable>
                       )
                      }
                       
                   </tbody>
                   

               </table>
           </div>
      </div>
    );
};

export default ReportedContents;