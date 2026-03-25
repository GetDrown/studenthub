import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddStudent({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
    name: '',
    course: '',
    year: '',
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.id || !form.name || !form.course || !form.year) {
      setError('All fields are required.');
      return;
    }
    onAdd({ ...form, year: Number(form.year) });
    navigate('/');
  }

  return (
    <div style={styles.container}>
      <h2>Add New Student</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Student ID</label>
        <input name="id" value={form.id} onChange={handleChange} style={styles.input} />

        <label>Full Name</label>
        <input name="name" value={form.name} onChange={handleChange} style={styles.input} />

        <label>Course</label>
        <select name="course" value={form.course} onChange={handleChange} style={styles.input}>
          <option value="">-- Select Course --</option>
          <option value="BSIT">BSIT</option>
          <option value="BSCS">BSCS</option>
          <option value="BSIS">BSIS</option>
        </select>

        <label>Year Level</label>
        <select name="year" value={form.year} onChange={handleChange} style={styles.input}>
          <option value="">-- Select Year --</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <button type="submit" style={styles.submitBtn}>Add Student</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '480px' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  input: { padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' },
  submitBtn: {
    marginTop: '0.5rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: { color: '#e74c3c', fontWeight: 'bold' },
};

export default AddStudent;