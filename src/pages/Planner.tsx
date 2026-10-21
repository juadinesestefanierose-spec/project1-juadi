import auditoriumHallImage from "../assets/auditoriumhall.png";
import conferenceRoomImage from "../assets/conferenceroom.png";
import presentationRoomImage from "../assets/presentationroom.png";
import largeMeetingRoomImage from "../assets/largemeetingroom.png";
import smallMeetingRoomImage from "../assets/smallmeetingroom.png";

import speakerImage from "../assets/speaker.png";
import microphoneImage from "../assets/micropone.png";
import whiteboardImage from "../assets/whiteboard.png";
import projectorImage from "../assets/projector.png";
import signageImage from "../assets/signage.png";
import landingPage from "../assets/landingpage.png";
import { useState } from "react";
import Navbar from "../components/Navbar";
import QuantityControl from "../components/QuantityControl";
import DetailsModal, {
  type DetailItem,
} from "../components/DetailsModal";
import "./Planner.css";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description: string;
};

const rooms: Product[] = [
  {
    id: "auditorium",
    name: "Auditorium Hall",
    category: "Room",
    price: 5500,
    image: auditoriumHallImage,
    description: "Capacity: 200 people",
  },
  {
    id: "conference",
    name: "Conference Room",
    category: "Room",
    price: 3500,
    image: conferenceRoomImage,
    description: "Capacity: 15 people",
  },
  {
    id: "presentation",
    name: "Presentation Room",
    category: "Room",
    price: 700,
    image: presentationRoomImage,
    description: "Capacity: 50 people",
  },
  {
    id: "large-meeting",
    name: "Large Meeting Room",
    category: "Room",
    price: 900,
    image: largeMeetingRoomImage,
    description: "Capacity: 10 people",
  },
  {
    id: "small-meeting",
    name: "Small Meeting Room",
    category: "Room",
    price: 1100,
    image: smallMeetingRoomImage,
    description: "Capacity: 5 people",
  },
];

const addons: Product[] = [
  {
    id: "speakers",
    name: "Speakers",
    category: "Add-on",
    price: 35,
    image: speakerImage,
    description: "Clear sound for your event",
  },
  {
    id: "microphones",
    name: "Microphones",
    category: "Add-on",
    price: 45,
    image: microphoneImage,
    description: "For speakers and presenters",
  },
  {
    id: "whiteboards",
    name: "Whiteboards",
    category: "Add-on",
    price: 80,
    image: whiteboardImage,
    description: "For notes and brainstorming",
  },
  {
    id: "projectors",
    name: "Projectors",
    category: "Add-on",
    price: 200,
    image: projectorImage,
    description: "Display your presentations",
  },
  {
    id: "signage",
    name: "Signage",
    category: "Add-on",
    price: 80,
    image: signageImage,
    description: "Guide guests around the venue",
  },
];

const meals: Product[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    category: "Meal",
    price: 50,
    description: "Per person",
  },
  {
    id: "lunch",
    name: "Lunch",
    category: "Meal",
    price: 60,
    description: "Per person",
  },
  {
    id: "high-tea",
    name: "High Tea",
    category: "Meal",
    price: 25,
    description: "Per person",
  },
  {
    id: "dinner",
    name: "Dinner",
    category: "Meal",
    price: 70,
    description: "Per person",
  },
];

const allProducts = [...rooms, ...addons, ...meals];

function formatMoney(amount: number) {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function Planner() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showDetails, setShowDetails] = useState(false);

  const updateQuantity = (id: string, quantity: number) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: quantity,
    }));
  };

  const detailItems: DetailItem[] = allProducts.map((product) => {
    const quantity = quantities[product.id] ?? 0;

    return {
      type: product.category,
      name: product.name,
      unitCost: product.price,
      quantity,
      subtotal: product.price * quantity,
    };
  });

  const grandTotal = detailItems.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const renderProducts = (products: Product[]) => (
    <div className="planner-grid">
      {products.map((product) => {
        const quantity = quantities[product.id] ?? 0;

        return (
          <article className="planner-card" key={product.id}>
            {product.image ? (
  <div className="planner-card-image">
    <img
      src={product.image}
      alt={product.name}
    />
  </div>
) : (
  <div className="planner-meal-icon">✳</div>
)}

            <div className="planner-card-content">
              <p className="planner-card-category">
                {product.category}
              </p>

              <h3>{product.name}</h3>
              <p className="planner-card-description">
                {product.description}
              </p>

              <p className="planner-price">
                {formatMoney(product.price)}
                {product.category === "Meal" ? (
                  <span> / person</span>
                ) : null}
                {product.category === "Room" ? (
                  <span> / room</span>
                ) : null}
                {product.category === "Add-on" ? (
                  <span> / item</span>
                ) : null}
              </p>

              <div className="planner-card-bottom">
               {product.category === "Meal" ? (
  <input
    className="meal-people-input"
    type="number"
    min="0"
    step="1"
    value={quantity}
    aria-label={`Number of people for ${product.name}`}
    onChange={(event) => {
      const value = event.target.value;
      const nextQuantity =
        value === "" ? 0 : Math.max(0, Math.floor(Number(value)));

      updateQuantity(product.id, nextQuantity);
    }}
  />
) : (
  <QuantityControl
    quantity={quantity}
    onChange={(nextQuantity) =>
      updateQuantity(product.id, nextQuantity)
    }
  />
)}

                <span className="planner-subtotal">
                  {formatMoney(product.price * quantity)}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );

  return (
    <div className="planner-page">
      <Navbar onShowDetails={() => setShowDetails(true)} />
      <div
  className="planner-hero-background"
  style={{ backgroundImage: `url(${landingPage})` }}
>
  <header className="planner-hero">
    <p className="planner-eyebrow">LET'S PLAN SOMETHING GREAT</p>

    <h1>
      Your event, <span>your way.</span>
    </h1>

    <p>
      Choose your spaces, essentials, and meals.
      We'll keep track of the costs as you go.
    </p>
  </header>
</div>

      <main className="planner-content">
        <section id="rooms" className="planner-section">
          <div className="planner-section-heading">
            <div>
              <p className="planner-eyebrow">01 — THE VENUE</p>
              <h2>Find your space</h2>
              <p>Choose the rooms that fit your conference.</p>
            </div>
          </div>

          {renderProducts(rooms)}
        </section>

        <section id="addons" className="planner-section">
          <div className="planner-section-heading">
            <div>
              <p className="planner-eyebrow">02 — THE ESSENTIALS</p>
              <h2>Little things, big difference</h2>
              <p>Prepare the equipment your event needs.</p>
            </div>
          </div>

          {renderProducts(addons)}
        </section>

        <section id="meals" className="planner-section">
          <div className="planner-section-heading">
            <div>
              <p className="planner-eyebrow">03 — FOOD & DRINKS</p>
              <h2>Gather around the table</h2>
              <p>Set the number of people for each meal.</p>
            </div>
          </div>

          {renderProducts(meals)}
        </section>
      </main>

      <footer className="planner-footer">
        <div>
          <p className="planner-eyebrow">YOUR CONFERENCE ESTIMATE</p>
          <p className="planner-footer-note">
            Your selections and prices update automatically.
          </p>
        </div>

        <div className="planner-footer-total">
          <span>Grand Total</span>
          <strong>{formatMoney(grandTotal)}</strong>
        </div>

        <button
          type="button"
          className="planner-review-button"
          onClick={() => setShowDetails(true)}
        >
          Show Details →
        </button>
      </footer>

      {showDetails && (
        <DetailsModal
          items={detailItems}
          total={grandTotal}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}

export default Planner;
