import { Link } from "react-router-dom";
import { useState } from "react";
import dangus from "../../assets/panorama.jpg";

export function HomePage() {
  const [text, setText] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isGreen, setIsGreen] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    setFormSuccess("");

    fetch("http://localhost:5531/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(() => {
        setText("");
        setFormSuccess("Forma sėkmingai išsiųsta!");
      });
  }

  return (
    <main>
      <Link
        className="title"
        to="/gallery"
        onClick={() => setIsGreen(prev => !prev)}
        style={{
          backgroundColor: isGreen ? "green" : "red",
          cursor: "pointer",
          padding: "10px"
        }}
      >
        Apžvalgos bokštas Meteliai
      </Link>

      <div className="cont">
        <img src={dangus} className="image" alt="apzvalgosbokstas" />

        <form onSubmit={handleFormSubmit}>
          <p>Čia įvedamas tekstas nebus naudojamas trečiųjų šalių</p>
          <p>Jis yra naudojamas tik mokymosi tikslais</p>
          <label htmlFor="search">
            Įvesti pageidaujamą tekstą (max 20 characters)
          </label>

          <input
            className="field"
            id="search"
            maxLength={40}
            type="text"
            placeholder="Enter your text here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit" className="submit-button">
            Siųsti
          </button>
        </form>

        {formSuccess && <p>{formSuccess}</p>}
      </div>
    </main>
  );
}