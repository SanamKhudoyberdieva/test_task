import $ from "jquery";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ScrollToTopButton = () => {

  const handleScroll = () => {
    const scrollTop = $(window).scrollTop();
    const t = $("#back-top");

    if (scrollTop && scrollTop > 350) {
      t.addClass("visible");
    } else {
      t.removeClass("visible");
    }
  };

  const handleBackToTop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 200);
  };

  useEffect(() => {
    $(window).on("scroll", handleScroll);
    const t = $("#back-top");
    if (t.length) {
      t.on("click", handleBackToTop);
    }

    return () => {
      $(window).off("scroll", handleScroll);
      if (t.length) {
        t.off("click", handleBackToTop);
      }
    };
  }, []);

  return (
    <Link to="#top" id="back-top">
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
    </Link>
  );
};

export default ScrollToTopButton;