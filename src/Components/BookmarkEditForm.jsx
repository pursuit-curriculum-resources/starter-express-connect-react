import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function BookmarkEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  // Update a bookmark. Redirect to show view
  const updateBookmark = () => {
    fetch(`${API}/bookmarks/${index}`, {
      method: "PUT",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/bookmarks/${index}`);
      })
      .catch((error) => console.error("catch", error));
  };

  // On page load, fill in the form with the bookmark data.
  useEffect(() => {
    fetch(`${API}/bookmarks/${index}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        setBookmark(responseJSON);
      })
      .catch((error) => console.error(error));
  }, [index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBookmark();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={bookmark.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={bookmark.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={bookmark.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={bookmark.description}
          onChange={handleTextChange}
          placeholder="Describe why you bookmarked this site"
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkEditForm;
