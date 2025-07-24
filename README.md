
# Peanech-Sales

> A modern sales registration and analytics dashboard built with React, TypeScript, and Vite.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How to Display and Fetch Data (with Example)](#how-to-display-and-fetch-data-with-example)
- [Scripts](#scripts)
- [ESLint & Code Quality](#eslint--code-quality)
- [License](#license)

---

## Overview

**Peanech-Sales** is a React + TypeScript application bootstrapped with Vite. It provides a beautiful, responsive UI for user registration and sales data visualization. The project demonstrates best practices in form handling, validation, API integration, and UI/UX using modern React and Tailwind CSS.

## Features

- User registration form with validation
- Responsive, accessible UI with Tailwind CSS
- Modern React patterns (hooks, functional components)
- API integration (fetch, submit, and handle responses)
- Error and success feedback with icons
- Modular component structure

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/sisovin/peanech-sales.git
cd peanech-sales
npm install
# or
yarn install
```

### Running the App

```sh
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Project Structure

```
peanech-sales/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utility functions
│   ├── stories/           # Storybook stories
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── index.html             # HTML template
├── package.json           # Project metadata & scripts
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── README.md              # Project documentation
```

## How to Display and Fetch Data (with Example)

This section demonstrates how to implement a user registration form that fetches and submits data, including validation and feedback. The following code is a comprehensive example using React hooks and Tailwind CSS.

### Example: Registration Form with Data Fetching

```tsx
import { useState } from 'react';
import { User, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number (10+ digits required)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call to Google Apps Script
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response - in real implementation, you would use:
      const response = await fetch('https://docs.google.com/spreadsheets/d/1jMYX9XxOsYLWEZFbxsI8oo4CiSFOptLs/edit?gid=101720758#gid=101720758', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      await response.json();

      // Mock duplicate check
      const isDuplicate = Math.random() > 0.8; // Simulate 20% chance of duplicate

      if (isDuplicate) {
        setSubmitStatus({ type: 'error', message: 'This email already exists!' });
      } else {
        setSubmitStatus({ type: 'success', message: 'Form submitted successfully! Check your email.' });
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Something went wrong!' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Register</h1>
          <p className="text-gray-600">Join our community today</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${submitStatus.type === 'success'
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
              }`}>
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={`text-sm font-medium ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                {submitStatus.message}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  placeholder="Enter your full name"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  placeholder="Enter your email address"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  placeholder="Enter your phone number"
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Registration</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Your information is secure and will never be shared.</p>
        </div>
      </div>

      {/* Custom Styles for Responsive Design */}
      <style>{`
        @media (max-width: 640px) {
          .max-w-md {
            max-width: 100%;
          }
          
          .bg-white {
            padding: 1.5rem;
          }
          
          .text-3xl {
            font-size: 1.875rem;
          }
        }
      `}</style>
    </div>
  );
}
```

#### Key Points

- **Validation**: The form checks for required fields and validates email/phone formats before submitting.
- **API Call**: Uses `fetch` to POST data. Replace the mock URL with your actual endpoint.
- **Feedback**: Shows success or error messages with icons.
- **UX**: Disables the submit button and shows a spinner while submitting.
- **Accessibility**: Uses semantic HTML and accessible labels.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## ESLint & Code Quality

This project uses ESLint with recommended rules for React and TypeScript. For production, consider enabling type-aware linting and stylistic rules. See the [official Vite + React template docs](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for more info.

## License

MIT
