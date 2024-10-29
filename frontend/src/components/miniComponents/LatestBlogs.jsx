import React from "react";
import { Link } from "react-router-dom";

const LatestBlogs = ({ heading, newClass, blogs }) => {
  return (
    <section className={newClass ? "dashboard-blogs blogs" : "blogs"}>
      <h3>{heading}</h3>
      <div className="container">
        {blogs &&
          blogs.map((element) => (
            <Link to={`/blog/${element._id}`} className="card" key={element._id}>
              <img src={element.mainImage.url} alt="blog" className="blog-image" />
              <span className="category">{element.category}</span>
              <h4>{element.title}</h4>
              <div className="writer_section">
                <div className="author">
                  <img src={element.authorAvatar} alt="author_avatar" className="author-avatar" />
                  <p>{element.authorName}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default LatestBlogs;
