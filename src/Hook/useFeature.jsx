import { useEffect, useState } from "react";


const useFeature = () => {

    const [feature , setFeature] = useState([]);
    //console.log(feature);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('https://last-project-12-sever.vercel.app/featured')
        .then(res => res.json())
        .then(data =>{
            
            setFeature(data);
            setLoading(false);
        })
    })

    return [feature, loading]
};

export default useFeature;