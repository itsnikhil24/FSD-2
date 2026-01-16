export default function Contact() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📞 Contact</h1>
      <p style={styles.text}>Feel free to reach out anytime!</p>
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
    color: "#dc2626",
  },
  text: {
    fontSize: "1.2rem",
    color: "#555",
  },
};
