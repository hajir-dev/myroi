export function EmptyPage({ navigate }) {
  return (
    <section className="panel empty-page">
      <h1>Page not found</h1>
      <p>Route ini belum tersedia di Phase 1.</p>
      <button className="primary-button" onClick={() => navigate("/dashboard")} type="button">
        Back to Dashboard
      </button>
    </section>
  );
}
