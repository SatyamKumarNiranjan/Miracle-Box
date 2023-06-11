// import './SocialCard.css';
// import Location from './Location';
// import Phone from './Phone';

// const Card = (props) => {
//     return (
//         <div className="card">
//             <div className="card__title">{props.title}</div>
//             <div className="card__body">
//                <h1 id='totalUser'>{props.More}</h1>
//                <p >Benefitted: {props.LessI}</p>
//                {/* <p >Not Benefitted: {props.NotBenefit}</p> */}
//             </div>

//         </div>
//     )
// };

// export default Card;
import './SocialCard.css';
import Location from './Location';
import Phone from './Phone';

const Card = (props) => {
    return (
        <div className="card">
            <div className="card__title">{props.title}</div>
            <div className="card__body">
               {/* <h3 id='totalUser'>{props.length}</h3> */}
               <p >More than 50000 : {props.MoreI}</p>
               <p >Less than 50000 : {props.LessI}</p>
            </div>

        </div>
    )
};

export default Card;