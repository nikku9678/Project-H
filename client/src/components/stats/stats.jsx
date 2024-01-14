import InfoCard from './InfoCard/infoCard';
import './stats.css'
// import axios from 'axios';
import Navbar from '../navbar/Navbar';
import baseURL from "../../../baseUrl";

const Stats = () => {

    // try {
    //     await axios.get(`${baseURL}/docter/docStats`, )
    // } catch (error) {
    //     console.log(error);
    // }


    const selfStats = [
        {
            totalChats: 12,
            totalMinutes: 100,
            totalSessions: 10,
            totalEarning: '$2000'
        }
    ]


    const userStats = [
        {
            id: '123',
            name: 'Baibhav Kumar',
            pid: 'bk@123',
            age: 21
        },

        {
            id: '1234',
            name: 'B Kumar',
            pid: 'bk@1234',
            age: 21
        },
    ]

    console.log('Inside Stats');
    return (
        <>
            <Navbar />
            <div className='stat'>
                <div className='stat-form'>
                    <span>
                        <b>Total No. Of Chats</b>: {selfStats[0].totalChats}
                    </span> <br />

                    <span>
                        <b>Total Minutes</b>: {selfStats[0].totalMinutes}
                    </span> <br />

                    <span>
                        <b>Total Sessions</b>: {selfStats[0].totalSessions}
                    </span> <br />

                    <span>
                        <b>Total earnings</b>: {selfStats[0].totalEarning}
                    </span>
                </div>

                <div className='graph'>Graph Space.</div>


                {userStats.map((data) => (
                    <InfoCard key={data.id} {...data} />
                ))}
            </div>
        </>
    )
}

export default Stats;