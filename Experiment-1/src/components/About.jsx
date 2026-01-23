export default function About() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>ℹ️ About Us</h1>
        <p style={styles.text}>
          This app demonstrates routing using React Router with a clean and
          user-friendly interface.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  title: {
    fontSize: "2.5rem",
    color: "#16a34a",
    marginBottom: "16px",
  },
  text: {
    fontSize: "1.1rem",
    color: "#444",
    lineHeight: "1.6",
  },
};
