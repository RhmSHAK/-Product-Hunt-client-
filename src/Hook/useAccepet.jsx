import { useEffect, useState } from "react";


const useAccepet = () => {
    const [feature , setFeature] = useState([]);
    //console.log(feature);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('https://last-project-12-sever.vercel.app/featureds')
        .then(res => res.json())
        .then(data =>{
            
            setFeature(data);
            setLoading(false);
        })
    })

    return [feature, loading]
};

export default useAccepet;