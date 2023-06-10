import './SocialCard.css';

const SocialCard = ({ userData }) => {
    return (
        <div className="card">
            <div className="card__title">{userData.name}</div>
            <div className="card__body">
            <p><strong>type: </strong> {userData.type}</p>
           <p> <strong> motive: </strong> {userData.motive}</p>
             <p> <strong>locality:</strong>  {userData.locality}</p>
             <p> <strong>date:</strong>   {userData.date}</p>
                {/* <div className="card__image"><img src={userData.picture.medium}/></div> */}
            </div>

        </div>
    )
};

export default SocialCard;