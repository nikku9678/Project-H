import './infroCard.css';

const InfoCard = ({id, name, age, pid}) => {
    return (
        <div className='card'>
            

            <div className='data'>
                <img src="./profile.jpeg" alt="Profile-image" id='img' /> <br />

                <span className='spn'>
                    <b>Name</b>: {name}
                </span> <br />

                <span className='spn'>
                    <b>P.ID</b>: {pid}
                </span> <br />

                <span className='spn'>
                    <b>Age</b>: {age}
                </span>

            </div>
            <div className='allbtn'>
                <button className='btn'>View Profile</button>
                <button className='btn'>View Chat</button>
                <button className='btn'>View Stats</button>
                <button className='btn'>View Notes</button>
            </div>
        </div>
    )
}

export default InfoCard;