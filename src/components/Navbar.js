import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    setPosition(window.pageYOffset);
  }
  return (
    <div className={position > 20 ? "navbar scrolled" : "navbar"}>
      <img
        src="/images/netflix.png"
        className="netflix-logo"
        alt="Netflix Logo"
      />
    </div>
  );
}
