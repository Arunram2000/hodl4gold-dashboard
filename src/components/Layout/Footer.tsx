import React, { useLayoutEffect, useState } from "react";

import "./Header.scss";

const Footer: React.FC = () => {
  const [isScrollbar, setIsScrollbar] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      const vs = document.body.scrollHeight > document.body.clientHeight;
      if (vs) return setIsScrollbar(true);
      return setIsScrollbar(false);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  });

  return (
    <div
      className={
        isScrollbar ? "footer scroll-active pad" : "footer scroll-inactive pad"
      }
    >
      <footer className="mx">
        <p>2022 © Hold4Gold</p>
        <p>Powered by Hold4Gold</p>
      </footer>
    </div>
  );
};

export default Footer;
