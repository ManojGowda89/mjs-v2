
import React from 'react';
export default function Navbar() {
  return (
    <nav>
      <h1>My App</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </nav>
  );
}