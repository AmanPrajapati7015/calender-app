import { Card, CardContent, Typography, Button, Box, Stack } from '@mui/material';


function EventCard({index, event, handleDelete ,handleEdit}) {
    
    
    return (
        <Card sx={{ maxWidth: 350, margin: '20px', backgroundColor: '#333', color: '#fff'}}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {event.title}
                </Typography>
                <Typography variant="body2">
                    <strong>Start:</strong> {new Date(event.start_datetime).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                    <strong>End:</strong> {new Date(event.end_datetime).toLocaleString()}
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


export default  EventCard;