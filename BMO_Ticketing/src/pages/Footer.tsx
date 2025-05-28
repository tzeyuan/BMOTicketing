import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-socials">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/X.png" alt="X" />
          </a>
        </div>

        <div className="footer-links">
          <a href="/contact">Contact Us</a>
          <a href="/qna">Q&A</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© BMO TICKETING SDN BHD All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
