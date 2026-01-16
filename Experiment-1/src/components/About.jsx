export default function About() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>ℹ️ About Us</h1>
      <p style={styles.text}>
        This app demonstrates routing using React Router.
      </p>
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
    color: "#16a34a",
  },
  text: {
    fontSize: "1.2rem",
    color: "#555",
  },
};
