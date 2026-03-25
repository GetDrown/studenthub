function StudentCard({ student, onDelete }) {
    return (
        <div style={styles.card}>
            <h3>{student.name}</h3>
            <p><strong>ID:</strong> {student.id}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Year Level:</strong> {student.year}</p>
            <button
                onClick={() => onDelete(student.id)}
                style={styles.deleteBtn}
            >
                Delete
            </button>
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        width: '220px',
        // textAlign: 'left'
    },
    deleteBtn: {
        marginTop: '0.5rem',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
        
    },
};

export default StudentCard;