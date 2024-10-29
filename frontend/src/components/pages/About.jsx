import React, { useContext } from "react";
import { Context } from "../../main";

const About = () => {
  const { mode } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>About BlogNest</h2>
        <p>
          Welcome to BlogNest – your ultimate destination for insightful and
          engaging content, meticulously crafted by a dedicated team of
          developers and visionaries: Vasu, Meet, and Jay. BlogNest is a
          comprehensive full-stack blog application designed to provide an
          exceptional reading and writing experience. Our platform blends the
          power of modern web technologies with intuitive design to offer users
          an environment where they can explore, share, and interact with
          diverse blog content.
        </p>
        <p>
          Our Mission At BlogNest, our mission is to foster a vibrant community
          of writers and readers. We strive to create a space where compelling
          stories, thought-provoking articles, and valuable insights come to
          life. Whether you're an avid reader or a passionate writer, BlogNest
          is here to help you connect with like-minded individuals and discover
          content that resonates with you.
        </p>
        <p>
          We believe that what you read and write matters. Words can divide or
          empower us, inspire or discourage us. In a world where the most
          sensational and surface-level stories often win, we’re building a
          system that rewards depth, nuance, and time well spent. A space for
          thoughtful conversation more than drive-by takes, and substance over
          packaging.
        </p>
        <h3>What Sets Us Apart</h3>
        <p>
          <b>User-Centric Design:</b> Our platform is built with the user in mind,
          offering a seamless and enjoyable experience. From easy navigation to
          a clean, responsive design, we ensure that BlogNest is accessible and
          engaging on all devices.
        </p>
        <p>
         <b> Future-Ready Features:</b> We’re excited to introduce advanced features,
          including a machine learning-powered review system. This upcoming
          addition will enhance your experience by providing personalized
          recommendations and valuable feedback based on your interactions and
          preferences.{" "}
        </p>
        <p>
          <b>Collaborative Development:</b> BlogNest is the result of the hard work and
          collaboration of Vasu, Meet, and Jay. Our team is passionate about
          pushing boundaries and constantly improving the platform to meet the
          evolving needs of our users.
        </p>
      </div>
    </article>
  );
};

export default About;
