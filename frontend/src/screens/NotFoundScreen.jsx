import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <main>
      <div className="container">
        <section
          className="section error-404 d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: `calc(100vh - 120px)` }}
        >
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>
          <Link className="btn" to="/">
            Back to home
          </Link>
        </section>
      </div>
    </main>
  );
};

export default NotFoundScreen;
