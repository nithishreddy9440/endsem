import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const initialStudents = [
  { id: 1, name: "Nithish Reddy", email: "nithish@example.com", course: "CSE", year: "3rd Year", marks: 86 },
  { id: 2, name: "Rahul Kumar", email: "rahul@example.com", course: "ECE", year: "2nd Year", marks: 78 },
  { id: 3, name: "Anu Sharma", email: "anu@example.com", course: "CSE", year: "1st Year", marks: 91 }
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "", email: "", course: "CSE", year: "1st Year", marks: ""
  });

  const filtered = students.filter(s =>
    `${s.name} ${s.email} ${s.course}`.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || form.marks === "") return;

    if (editing) {
      setStudents(students.map(s => s.id === editing ? { ...form, id: editing, marks: Number(form.marks) } : s));
      setEditing(null);
    } else {
      setStudents([...students, { ...form, id: Date.now(), marks: Number(form.marks) }]);
    }
    setForm({ name: "", email: "", course: "CSE", year: "1st Year", marks: "" });
  }

  function editStudent(student) {
    setEditing(student.id);
    setForm({ ...student, marks: String(student.marks) });
  }

  function deleteStudent(id) {
    if (confirm("Delete this student?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  }

  return (
    <div className="app">
      <header>
        <div>
          <p className="tag">COLLEGE PORTAL</p>
          <h1>Student Management System</h1>
          <p className="subtitle">Manage student records quickly and easily.</p>
        </div>
        <div className="count">{students.length}<span> Students</span></div>
      </header>

      <section className="stats">
        <div><b>{students.length}</b><span>Total Students</span></div>
        <div><b>{students.filter(s => s.course === "CSE").length}</b><span>CSE Students</span></div>
        <div><b>{students.length ? Math.round(students.reduce((a,s) => a+s.marks,0)/students.length) : 0}%</b><span>Average Marks</span></div>
      </section>

      <main>
        <section className="card form-card">
          <h2>{editing ? "Edit Student" : "Add Student"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Name<input value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Enter student name" /></label>
            <label>Email<input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="Enter email" /></label>
            <div className="row">
              <label>Course<select value={form.course} onChange={e => setForm({...form,course:e.target.value})}>
                <option>CSE</option><option>ECE</option><option>EEE</option><option>MECH</option><option>CIVIL</option>
              </select></label>
              <label>Year<select value={form.year} onChange={e => setForm({...form,year:e.target.value})}>
                <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
              </select></label>
            </div>
            <label>Marks<input type="number" min="0" max="100" value={form.marks} onChange={e => setForm({...form,marks:e.target.value})} placeholder="0 - 100" /></label>
            <button className="primary">{editing ? "Update Student" : "Add Student"}</button>
            {editing && <button type="button" className="cancel" onClick={() => {setEditing(null);setForm({name:"",email:"",course:"CSE",year:"1st Year",marks:""})}}>Cancel</button>}
          </form>
        </section>

        <section className="card list-card">
          <div className="list-head">
            <div><h2>Student Records</h2><p>View and manage all students</p></div>
            <input className="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." />
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Student</th><th>Course</th><th>Year</th><th>Marks</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong><small>{s.email}</small></td>
                    <td><span className="badge">{s.course}</span></td>
                    <td>{s.year}</td>
                    <td><b>{s.marks}%</b></td>
                    <td><button className="edit" onClick={() => editStudent(s)}>Edit</button><button className="delete" onClick={() => deleteStudent(s.id)}>Delete</button></td>
                  </tr>
                ))}
                {!filtered.length && <tr><td colSpan="5" className="empty">No students found.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <footer>React Student Management System • CRUD Application</footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
