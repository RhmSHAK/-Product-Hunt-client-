import { useEffect, useState } from "react";


const useReport = () => {
    const [Report , setReport] = useState([]);
    //console.log(Report);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('https://last-project-12-sever.vercel.app/report')
        .then(res => res.json())
        .then(data =>{
            
            setReport(data);
            setLoading(false);
        })
    })

    return [Report, loading]
};

export default useReport;