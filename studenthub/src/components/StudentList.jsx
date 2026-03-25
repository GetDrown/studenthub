import StudentCard from './StudentCard';

const sampleStudents = [
  { id: 'STU001', name: 'Maria Santos', course: 'BSIT', year: 2 },
  { id: 'STU002', name: 'Juan Dela Cruz', course: 'BSCS', year: 3 },
  { id: 'STU003', name: 'Ana Reyes', course: 'BSIT', year: 1 },
];

function StudentList() {
  return (
    <div>
      <h2>Student Records</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sampleStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

export default StudentList;