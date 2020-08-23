import React, { useRef } from "react";

const Book = ({ title, author, imgUrl }) => {
  const container = useRef();
  const text = useRef();
  const bookImg = useRef();

  const hoverImg = (event) => {
    const imgWidth = event.target.offsetWidth;
    const imgHeight = event.target.offsetHeight;

    event.target.style.opacity = "0.2";
    container.current.style.minWidth = imgWidth + "px";
    text.current.style.minWidth = imgWidth + "px";
    text.current.style.height = imgHeight + "px";
    text.current.style.left = -imgWidth + "px";
  };

  const stopHover = () => {
    bookImg.current.style.opacity = "1";
    container.current.style.minWidth = "64px";
    text.current.style.left = "0px";
  };

  return (
    <div key={title} ref={container} className='Book' draggable='true'>
      <img
        src={imgUrl}
        alt={title}
        ref={bookImg}
        onMouseEnter={(e) => hoverImg(e)}
      />
      <div ref={text} className='Book-text' onMouseLeave={(e) => stopHover(e)}>
        <b>{title}</b>
        <br />
        {author}
      </div>
    </div>
  );
};

export default Book;
