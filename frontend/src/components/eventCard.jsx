import { Card, CardContent, Typography, Button, Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';



function EventCard({ index, event, handleDelete, handleEdit }) {

    const now = new Date();
    const event_startDate = new Date(event.start_datetime);
    const event_endDate = new Date(event.end_datetime);
    
    const [canSendNotification, setCanSendNotification] = useState(false);

    const color = (now < event_endDate) ? '#fff;' : '#9b9b9b';

    const dateTimeOptions =  {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      };
      

    // to allow notifications
    useEffect(()=>{
        if (Notification.permission === "granted") {
            setCanSendNotification(true);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    setCanSendNotification(true);
                }
            });
        }
    })

    // to setTimeout for a notification
    useEffect(() => {
        let interval;
        if (now < event_startDate && canSendNotification) {
            interval = setTimeout(() => {
                new Notification(`Reminder: ${event.title}`, { body: event.description });
                console.log('new notification');
            }, event_startDate - now);
            console.log('time set for'+event_startDate - now+" ms");
            
        }

        return () => {
            if (interval) {
                clearTimeout(interval);
            }
        };
    }, [event, canSendNotification]);


    return (

        <Card sx={{ maxWidth: 350, margin: '20px', border: '1px solid #ffffff2e', background: 'none', color }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {event.title}
                </Typography>
                <Typography variant="body2">
                    <strong>Start:</strong> {new Date(event.start_datetime).toLocaleString(undefined, dateTimeOptions)}
                </Typography>
                <Typography variant="body2">
                    <strong>End:</strong> {new Date(event.end_datetime).toLocaleString(undefined, dateTimeOptions)}
                </Typography>
                <Typography variant="body2">
                    <strong>Description:</strong> {event.description}
                </Typography>
                <Typography variant="body2">
                    <strong>Meeting Link:</strong>{' '}
                    <a
                        href={event.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#4FBAEE' }}
                    >
                        {event.meeting_link}
                    </a>
                </Typography>
                <Box sx={{ marginTop: '10px' }}>
                    <Stack spacing={2} direction="row" justifyContent={'center'}>
                        <Button metaindex={index} onClick={handleEdit} variant="contained" fullWidth={true}>Edit</Button>
                        <Button metaid={event.id} onClick={handleDelete} variant="contained" fullWidth={true}>Delete</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
}


export default EventCard;