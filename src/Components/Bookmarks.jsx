import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";

const API = import.meta.env.VITE_API_URL;

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch(`${API}/bookmarks`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => setBookmarks(responseJSON))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
