
import { useNavigate } from "react-router-dom";
import landingPage from "../assets/landingpage.png";
import dinosaur from "../assets/dinosaur.png";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <header className="home-navbar">
        <a className="home-brand" href="/">
          <img src={dinosaur} alt="DinoMeet mascot" />
          <span>DinoMeet</span>
        </a>

        <span className="home-brand-subtitle">
          CONFERENCE PLANNER
        </span>
      </header>

      <section
        className="home-hero"
        style={{ backgroundImage: `url(${landingPage})` }}
      >
        <div className="home-overlay" />

        <div className="home-content">
          <p className="home-eyebrow">YOUR EVENT, BEAUTIFULLY PLANNED</p>

          <h1>
            Plan Better.
            <br />
            Meet Greater.
          </h1>

          <p className="home-description">
            From choosing the perfect venue to organizing equipment
            and meals, DinoMeet makes conference planning simple.
          </p>

          <button
            className="home-start-button"
            onClick={() => navigate("/planner")}
          >
            Get Started <span>→</span>
          </button>

          <p className="home-note">
            Let’s make your next event a great one.
          </p>
        </div>

      </section>
    </main>
  );
}

export default Home;
