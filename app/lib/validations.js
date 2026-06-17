import { z } from 'zod';

// Utility to sanitize strings by removing potentially dangerous HTML tags
const sanitizeHtml = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>?/gm, ''); // Removes any HTML tags
};

// Inquiry Schema for Contact Form
export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).transform(sanitizeHtml),
  email: z.string().email("Invalid email address").max(100),
  phone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone number format").max(20),
  subject: z.string().min(2, "Subject is required").max(150).transform(sanitizeHtml),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000).transform(sanitizeHtml),
});

// Product Schema for Admin Dashboard
export const productSchema = z.object({
  name: z.string().min(2, "Product name is required").max(150).transform(sanitizeHtml),
  category: z.string().min(2, "Category is required").max(50).transform(sanitizeHtml),
  description: z.string().max(2000).optional().transform(v => v ? sanitizeHtml(v) : v),
  image: z.string().url().optional().or(z.literal('')),
  packaging: z.string().max(100).optional().transform(v => v ? sanitizeHtml(v) : v),
  usage: z.string().max(500).optional().transform(v => v ? sanitizeHtml(v) : v),
});

// Category Schema
export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters").max(50).transform(sanitizeHtml),
});

// Gallery Schema
export const gallerySchema = z.object({
  title: z.string().min(2, "Title is required").max(100).transform(sanitizeHtml),
  url: z.string().url("Invalid URL"),
  type: z.enum(["image", "video"]),
});
