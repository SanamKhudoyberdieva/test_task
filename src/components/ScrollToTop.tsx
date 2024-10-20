import { useEffect, useRef } from 'react';

const ScrollToTopButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (buttonRef.current) {
      if (scrollTop > 350) {
        buttonRef.current.classList.add("visible");
      } else {
        buttonRef.current.classList.remove("visible");
      }
    }
  };

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button ref={buttonRef} onClick={handleBackToTop} className="back-top-button" aria-label="Back to top">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 1.3335L8 14.6668"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.33301 8.00016L7.99967 1.3335L14.6663 8.00016"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;