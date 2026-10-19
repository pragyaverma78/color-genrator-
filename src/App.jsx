
import { useState } from "react";

const generateColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

function App() {
  const [colors, setColors] = useState([
    "#FF6B6B",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#845EC2",
  ]);

  const [copied, setCopied] = useState("");

  function generatePalette() {
    const newColors = Array.from(
      { length: 5 },
      () => generateColor()
    );

    setColors(newColors);
    setCopied("");
  }

  async function copyColor(color) {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(color);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      alert("Copy nahi hua. HEX code manually copy karein.");
    }
  }

  return (
    <main className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">◉</span>
          ColorCraft
        </div>

        <p className="tagline">
          Find the perfect colors for your next idea.
        </p>
      </header>

      <section className="palette-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR COLOR PALETTE</p>
            <h1>Colors that inspire.</h1>
          </div>

          <span className="color-count">5 COLORS</span>
        </div>

        <div className="palette">
          {colors.map((color, index) => (
            <div className="color-column" key={index}>
              <button
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => copyColor(color)}
                aria-label={`Copy color ${color}`}
                title={`Copy ${color}`}
              >
                <span className="copy-icon">
                  {copied === color ? "✓" : "⧉"}
                </span>
              </button>

              <button
                className="hex-code"
                onClick={() => copyColor(color)}
              >
                {copied === color ? "COPIED!" : color}
              </button>
            </div>
          ))}
        </div>

        <button
          className="generate-button"
          onClick={generatePalette}
        >
          <span>↻</span> Generate Palette
        </button>

        <p className="hint">
          Click any color or HEX code to copy it.
        </p>
      </section>

      <footer className="footer">
        Made for creative minds <span>♥</span>
      </footer>
    </main>
  );
}

export default App;
