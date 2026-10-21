
import "./Navbar.css";
import dinosaur from "../assets/dinosaur.png";
type NavbarProps = {
  onShowDetails: () => void;
};

function Navbar({ onShowDetails }: NavbarProps) {
  return (
    <nav className="navbar">
      
      <a className="home-brand" href="/">
          <img src={dinosaur} alt="DinoMeet mascot" />
          <span>DinoMeet</span>
        </a>

      <div className="navbar-links">
        <a href="#rooms">Rooms</a>
        <a href="#addons">Add-ons</a>
        <a href="#meals">Meals</a>

        <button
          className="navbar-details"
          onClick={onShowDetails}
        >
          Show Details
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
