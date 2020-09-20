import React from "react";
import { Loader } from "semantic-ui-react";

const List = ({ items, onClickItem, onDragStart, onDrop, shelf }) => {
  return (
    <div
      className='List'
      onDragOver={(e) => onDrop && e.preventDefault()}
      onDrop={(e) => onDrop && onDrop(e)}
    >
      <ul style={{ marginTop: 0 }}>
        {items ? (
          items.length > 0 ? (
            items.map(({ bookId, title, author }) => (
              <li
                draggable={onDragStart && true}
                key={bookId}
                data-bookid={bookId}
                onClick={(e) => onClickItem && onClickItem(e)}
                onDragStart={(e) => onDragStart && onDragStart(e, bookId)}
              >
                {title} by {author}
              </li>
            ))
          ) : (
              <div style={{ margin: "0 auto" }}>No books found.</div>
            )
        ) : (
            <Loader inline='centered' active />
          )}
      </ul>
    </div>
  );
};

export default List;
