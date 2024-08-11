import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  _id: {
    type: String, // Or mongoose.Schema.Types.ObjectId if you prefer ObjectId format
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  problemId: {
    type: String, // Store UUID or ObjectId of the related problem
    required: true,
  },
});

const TestCase = mongoose.model('TestCase', testCaseSchema);
export default TestCase;
