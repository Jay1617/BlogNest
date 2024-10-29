import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { FaSquareGithub } from "react-icons/fa6";
import { Context } from "../../main";
import toast from "react-hot-toast";

const Footer = () => {
  const isDashboard = useLocation().pathname;
  const { mode, setMode } = useContext(Context);

  const handleSubscribe = () => {
    toast.success("Subscribed successfully!");
  };

  return (
    <footer
      className={
        isDashboard === "/dashboard"
          ? "hideFooter"
          : mode === "light"
          ? "light-footer"
          : "dark-footer"
      }
    >
      <div className="container">
        <div className="about">
          <h3>Join us</h3>
          <p>
            Become a part of the BlogNest community today. Explore a world of
            diverse content, share your thoughts, and connect with fellow
            enthusiasts. We’re here to support you on your blogging journey and
            look forward to bringing you exciting updates and features in the
            future.
          </p>
          <p>
            <span>Email:</span>info@blognest.com
          </p>
          <p>
            <span>Phone:</span>+91-999******9
          </p>
        </div>
        <div className="quick_links">
          <h3>Quick Links</h3>
          <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"/blogs"}>Blogs</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
          </ul>
        </div>
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li>Lifestyle</li>
            <li>Technology</li>
            <li>Sports</li>
            <li>Travel</li>
            <li>Business</li>
            <li>Economy</li>
          </ul>
        </div>
        <div className="news_letter">
          <div>
            <h3>Get in touch with us...</h3>
            <p>Blog articles and offers via E-mail</p>
          </div>
          <div>
            <input type="text" placeholder={`Your Email`} />
            <button onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="logo">
          BLOG <span>NEST</span>
        </div>
        <div className="links">
          <Link to={"/"} target="_blank">
            <AiFillInstagram />
          </Link>
          <Link to={"https://github.com/Jay1617"} target="_blank">
            <FaSquareGithub />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/jay-thummar-256ba4250"}
            target="_blank"
          >
            <AiFillLinkedin />
          </Link>
          <Link to={"/"} target="_blank">
            <AiFillYoutube />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
