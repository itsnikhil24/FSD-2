export default function Home() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🏠 Home</h1>
      <p style={styles.text}>Welcome to our Single Page Application</p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "3rem",
    color: "#2563eb",
  },
  text: {
    fontSize: "1.2rem",
    color: "#555",
  },
};
