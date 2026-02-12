const express = require('express');
const axios = require('axios');

const public_users = express.Router();
const BASE_URL = "http://localhost:5000";

// Get all books
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving all books" });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${req.params.isbn}`);
    if (!response.data || Object.keys(response.data).length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book by ISBN" });
  }
});

// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${req.params.author}`);
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: "No books found for this author" });
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// Get book details based on title
public_users.get('/title/:title', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/title/${req.params.title}`);
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: "No books found with this title" });
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by title" });
  }
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/review/${req.params.isbn}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Review not found" });
  }
});

module.exports.general = public_users;
