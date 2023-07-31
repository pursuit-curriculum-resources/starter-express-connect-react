import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  let navigate = useNavigate();
  let { index } = useParams();

  // On page load, load bookmark details
  useEffect(() => {
    fetch(`${API}/bookmarks/${index}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        setBookmark(responseJSON);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, [index, navigate]);

  // Be able to delete a bookmark. Return to index view.
  const handleDelete = () => {
    fetch(`${API}/bookmarks/${index}`, { method: "DELETE" })
      .then(() => {
        navigate(`/bookmarks`);
      })
      .catch((e) => console.error(e));
  };

  return (
    <article>
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;
