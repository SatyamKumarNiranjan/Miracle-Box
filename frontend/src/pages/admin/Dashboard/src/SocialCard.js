import './SocialCard.css';
import Location from './Location';
import Phone from './Phone';

const SocialCard = ({ userData }) => {
    return (
        <div className="card">
            <div className="card__title">{userData.firstName} {userData.lastName}</div>
            <div className="card__body">
                <Location location={userData.location}/>
                <Phone number={userData.phone} type="Home"/>
                <Phone number={userData.cell} type="Cell"/>
            
            </div>

        </div>
    )
};

export default SocialCard;