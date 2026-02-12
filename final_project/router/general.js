const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

/**
 * Task 7 – Register new user
 */
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

/**
 * Task 2 – Get all books
 */
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

/**
 * Task 3 – Get book by ISBN
 */
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});

/**
 * Task 4 – Get books by author
 */
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;
  let result = {};

  for (let key in books) {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});

/**
 * Task 5 – Get books by title
 */
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;
  let result = {};

  for (let key in books) {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});

/**
 * Task 6 – Get book review
 */
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
