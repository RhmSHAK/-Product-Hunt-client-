import { useEffect, useState } from "react";
import SortCard from "./SortCard";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";


const TrendingSort = () => {
    const [feature_Sort , setFeature] = useState([]);
    //console.log(feature);
    //const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('https://last-project-12-sever.vercel.app/featureds/sort')
        .then(res => res.json())
        .then(data =>{
            
            setFeature(data);
           // setLoading(false);
        })
    })


    return (
        <div>
            <SectionTitle heading={"Trending Products Section"} ></SectionTitle>
            <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-5 ">
            {
                feature_Sort.map(items => <SortCard
                    key={items._id}
                    items={items}
                    ></SortCard>
                    
                 )
            }
            </div>
            <div className="mx-auto text-center md:w-4/12 my-8">
            <Link to="/products">
              <button className="btn btn-wide btn-outline btn-warning ">Show All Products</button>
            </Link>
            </div>
        </div>
    );
};

export default TrendingSort;