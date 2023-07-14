import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";
import axios from "axios";

//BASE URL 
//Start all variable names with REACT_APP_
const API = process.env.REACT_APP_API_URL;
console.log(API)// log to make sure it works>> it works it shows: http://localhost:3003

function Bookmarks() {
  //setBookmarks will update the state when bookmarks changes.
  const [bookmarks, setBookmarks] = useState([]);

  //useEffect to handle the data load and show AFTER the component has been fully mounted/loaded to the DOM
  //In other words, we want to wait for the Bookmarks component to load then we want to get the data to show on the page.
  useEffect(() => {
    axios.get(`${API}/bookmarks`).then((response) =>
      //console.log(response);
      //console.log(response.data);
      setBookmarks(response.data))
      .catch((e) => console.error("catch", e));
  }, []);
  //Once the request is complete, then, what should happen? 
    //.then() takes two arguments. Both callback function The first is executed when the promise is fulfilled (in our case, a successful response from the server). The second is executed if the promise is rejected (in our case, there is some error with our fetch request). We can, instead, add a .catch() - this will be the final error handling of our fetch request.

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
