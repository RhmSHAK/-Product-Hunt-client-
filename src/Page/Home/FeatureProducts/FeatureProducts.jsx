import useAccepet from "../../../Hook/useAccepet";
//import useFeature from "../../../Hook/useFeature";
import SectionTitle from "../../SectionTitle/SectionTitle";
import FeatureCard from "./FeatureCard";




const FeatureProducts = () => {
   const [feature] = useAccepet();

    return (
        <div>
           <SectionTitle heading={"Featured Products Section"} ></SectionTitle>
            <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-5 ">
            {
                feature.map(items => <FeatureCard 
                    key={items._id}
                    items={items}
                    ></FeatureCard>
                    
                 )
            }
            </div>
        </div>
    );
};

export default FeatureProducts;