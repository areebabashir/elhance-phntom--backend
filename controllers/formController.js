import Form from '../models/FormModel.js';

// Function to handle form submission
export const submitForm = async (req, res) => {
  try {
    const { name, email, whatsappNumber, department, vision, subscribeToNewsletter } = req.body;

    if (!name || name.length < 3) {
      return res.status(400).send({ message: 'Name is required and must be at least 3 characters long' });
    }

    const emailRegex = /.+\@.+\..+/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).send({ message: 'Valid email is required' });
    }

    const whatsappNumberRegex = /^\d{10,15}$/;
    if (!whatsappNumber || !whatsappNumberRegex.test(whatsappNumber)) {
      return res.status(400).send({ message: 'WhatsApp number must be between 10 and 15 digits' });
    }

    if (!department) {
      return res.status(400).send({ message: 'Department is required' });
    }

    if (!vision || vision.length < 10) {
      return res.status(400).send({ message: 'Vision is required and must be at least 10 characters long' });
    }

    // Create a new form instance with the validated data
    const formData = new Form({ name, email, whatsappNumber, department, vision, subscribeToNewsletter });

    // Save the form data to the database
    await formData.save();

    // Send a success response
    res.status(201).send({ message: 'Form submitted successfully', data: formData });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(400).send({ message: 'Error submitting form', error: error.message });
  }
};
