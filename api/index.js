const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://mooduser:mood1234@cluster0.zsi71.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection failed:', err.message));

const todoSchema = new mongoose.Schema({
  task: String,
  date: { type: Date, default: Date.now }
});
const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error('GET /todos error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    console.error('POST /todos error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;

module.exports = app;