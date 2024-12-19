import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom';
import EventCard from '../../components/eventCard';
const baseURL = import.meta.env.VITE_BASE_URL;



function Dashboard() {
    const [events, setEvents] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);

    const navigator = useNavigate();


    async function handleDelete(e) {
        try {
            const id = e.target.getAttribute('metaid');
            const token = await getAccessTokenSilently();
            const res = await axios.delete(baseURL+`/dashboard/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.status == 200){
                setEvents(events => {
                    return events.filter(evt=>evt.id!=id);
                })
            }
        }
        catch (error) {
            alert(error.message);
        }
    }

    async function handleEdit (e) {
        try {
            const i = e.target.getAttribute('metaindex');
            navigator('/addnewform', {state:events[i]});
        }
        catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently();
                const res = await axios.get(baseURL+'/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res.config.url);
                setEvents(res.data);
                setIsLoading(false);

            }
            catch (error) {
                alert(error.message);
            }
        })();


    }, [])


    return (
        <>
            {isLoading ? 'loading'
                :
                <EventList events={events} handleDelete={handleDelete} handleEdit={handleEdit} />
            }
        </>
    )



}

function EventList({ events, handleDelete, handleEdit }) {
    return (
        <div style={{ backgroundColor: '#121212', padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {events.length === 0 ? (
                <p style={{ color: '#fff' }}>Please add a new event</p>
            ) : (
                events.map((event, i) => {
                    return <EventCard 
                                index={i} 
                                key={i} 
                                event={event} 
                                handleDelete={handleDelete} 
                                handleEdit={handleEdit}
                            />
                })
            )}
        </div>
    );
}


export default Dashboard;