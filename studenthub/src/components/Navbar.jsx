import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.brand}>StudentHub</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/add" style={styles.link}>Add Student</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: { color: '#fff', margin: 0, fontSize: '1.5rem' },
  links: { display: 'flex', gap: '1.5rem' },
  link: { color: '#ecf0f1', textDecoration: 'none', fontWeight: 'bold' },
};

export default Navbar;