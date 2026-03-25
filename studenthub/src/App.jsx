import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import About from "./pages/About";

// const initialStudents = [
//   { id: 'STU001', name: 'Maria Santos', course: 'BSIT', year: 2 },
//   { id: 'STU002', name: 'Juan Dela Cruz', course: 'BSCS', year: 3 },
//   { id: 'STU003', name: 'Ana Reyes', course: 'BSIT', year: 1 },
// ];

function App() {
  const [students, setStudents] = useState([]);
  // 1. FETCH DATA (GET) - Runs once when the app starts
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  // The empty array [] means this runs only once on load
  function addStudent(newStudent) {
    fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent), // Convert JS object to JSON string
    })
      .then((response) => response.json())
      .then((addedStudent) => {
        // Update the UI only after the database confirms the save
        if (addedStudent.id) {
          setStudents([...students, addedStudent]);
        } else {
          alert(addedStudent.message); // Show error if ID already exists
        }
      })
      .catch((error) => console.error("Error adding student:", error));
  }

  function deleteStudent(id) {
    fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the student from the UI after successful deletion
        setStudents(students.filter((s) => s.id !== id));
      })
      .catch((error) => console.error("Error deleting student:", error));
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "1rem 2rem" }}>
        <Routes>
          <Route
            path="/"
            element={<Home students={students} onDelete={deleteStudent} />}
          />
          <Route path="/add" element={<AddStudent onAdd={addStudent} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
