// Core data type used across the library system.
export type BookStatus = "Available" | "Issued";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: BookStatus;
}

export const CATEGORIES = [
  "Computer Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Software Engineering",
  "Web Development",
  "Operating Systems",
  "Computer Networks",
  "Database Systems",
  "Algorithms & Data Structures",
  "Mathematics",
  "Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Physics",
  "Chemistry",
  "Fiction",
  "Science",
  "Technology",
  "Education",
  "History",
  "Self-Help",
  "General Knowledge",
] as const;
