import './SocialCard.css';
import Location from './Location';
import Phone from './Phone';

const Card = (props) => {
    return (
        <div className="card">
            <div className="card__title">{props.title}</div>
            <div className="card__body">
               <h3 id='totalUser'>{props.length}</h3>
               <p >Benefitted : {props.benefit}</p>
               <p >Not Benefitted : {props.NotBenefit}</p>
            </div>

        </div>
    )
};

export default Card;