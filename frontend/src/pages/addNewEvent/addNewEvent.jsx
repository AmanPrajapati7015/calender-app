import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { useAuth0 } from '@auth0/auth0-react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;



const AddEventForm = () => {
  const location = useLocation();
  const event = location.state || {};


  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    title: event.title || '',
    startDatetime: dayjs(event.start_datetime || undefined),
    endDatetime: dayjs(event.end_datetime || undefined),
    description: event.description || '',
    meetingLink: event.meeting_link || '',
  });


  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateTimeChange = (name, newValue) => {
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleAddNew = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();

      const res = await axios.post(baseURL+'/dashboard', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      if (res.status == 200) {
        navigator('/dashboard');
      }
      console.log('Form Submitted:', formData);
    }
    catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = async (e)=>{
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();

      const res = await axios.put(baseURL+`/dashboard/${event.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      if (res.status == 200) {
        navigator('/dashboard');
      }
      console.log('Form Submitted:', formData);

    }
    catch (error) {
      alert(error.message);
    }
  };



  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box mt={5} p={5} sx={{ boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', width: 'min-content', margin: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Event
        </Typography>
        <form style={{ display: 'flex', width: '280px', flexDirection: 'column', gap: '20px' }}>
          <div className="field">
            <TextField
              fullWidth
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                value={formData.startDatetime}
                onChange={(newValue) => handleDateTimeChange('startDatetime', newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date & Time"
                value={formData.endDatetime}
                onChange={(newValue) => handleDateTimeChange('endDatetime', newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="field">
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <TextField
              fullWidth
              label="Meeting Link"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            {event.id ?
              <Button type="button" onClick={handleEdit} variant="contained" color="primary" fullWidth>
                Update Event
              </Button>
              :
              <Button type="button" onClick={handleAddNew} variant="contained" color="primary" fullWidth>
                Add Event
              </Button>
            }
          </div>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default AddEventForm;
