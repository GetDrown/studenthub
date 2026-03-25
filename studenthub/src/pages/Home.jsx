import StudentCard from '../components/StudentCard';

function Home({ students, onDelete }) {
  return (
    <div>
      <h2>Student Records ({students.length} students)</h2>
      {students.length === 0 ? (
        <p>No students found. Add one!</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
