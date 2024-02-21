/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

export function getCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://localhost:7263/api/Category")
    .then(response => response.json())
    .then(data => setCategories(data))
    .catch(e => console.log(e.message))
}, []);
  return categories;
}