import useFeature from "../../Hook/useFeature";
import useReview from "../../Hook/useReview";
import useUsers from "../../Hook/useUsers";
import SectionTitle from "../../Page/SectionTitle/SectionTitle";


const StatisticsPage = () => {

    const [feature] = useFeature();
    const [user] = useUsers();
    const [reviews]=useReview();

    return (
        <div>
            
            <SectionTitle heading={'Statistics Page'} ></SectionTitle>

            <div className="stats shadow mx-[20%]">

                <div className="stat place-items-center">
                    <div className="stat-title">number of products</div>
                    <div className="stat-value">{feature.length}</div>

                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">number of  Users</div>
                    <div className="stat-value text-secondary">{user.length}</div>

                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">number of reviews</div>
                    <div className="stat-value text-primary">{reviews.length}</div>

                </div>

            </div>

        </div>
    );
};

export default StatisticsPage;