import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  whatsappNumber: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true,
    match: [/^\d{10,15}$/, 'WhatsApp number must be between 10 and 15 digits']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  vision: {
    type: String,
    required: [true, 'Vision is required'],
    minlength: [10, 'Vision must be at least 10 characters long'],
    trim: true
  },
  subscribeToNewsletter: {
    type: Boolean,
    default: false
  }
});

const Form = mongoose.model('Form', formSchema);

export default Form;