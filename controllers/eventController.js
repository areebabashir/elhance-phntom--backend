import Event from '../models/eventModel.js';

// Function to handle event creation
export const createEvent = async (req, res) => {
    try {
      const { title, description } = req.body;
      const photo = req.file ? req.file.path : null;
  
      if (!photo) {
        return res.status(400).send({ message: 'Photo is required' });
      }
  
      if (!title) {
        return res.status(400).send({ message: 'Title is required' });
      }
  
      if (!description) {
        return res.status(400).send({ message: 'Description is required' });
      }
  
      // Create a new event instance with the validated data
      const eventData = new Event({ photo, title, description });
  
      // Save the event data to the database
      await eventData.save();
  
      // Send a success response
      res.status(201).send({ message: 'Event created successfully', data: eventData });
    } catch (error) {
      // Send an error response if something goes wrong
      res.status(400).send({ message: 'Error creating event', error: error.message });
    }
  };

  // Function to handle event update
export const updateEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const photo = req.file ? req.file.path : null;
  
      const event = await Event.findById(id);
  
      if (!event) {
        return res.status(404).send({ message: 'Event not found' });
      }
  
      if (title) event.title = title;
      if (description) event.description = description;
      if (photo) event.photo = photo;
  
      await event.save();
  
      res.status(200).send({ message: 'Event updated successfully', data: event });
    } catch (error) {
      res.status(400).send({ message: 'Error updating event', error: error.message });
    }
  };
  
  // Function to handle event deletion
  export const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      const event = await Event.findById(id);
  
      if (!event) {
        return res.status(404).send({ message: 'Event not found' });
      }
  
      await event.remove();
  
      res.status(200).send({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(400).send({ message: 'Error deleting event', error: error.message });
    }
  };