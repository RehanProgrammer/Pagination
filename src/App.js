import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./components/Posts";
import { Pagination } from "./components/Pagination";

function App() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostperPage] = useState(50);

  useEffect(() => {
    const Posts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setPost(res.data);
      setLoading(false);
    };
    Posts();
  }, []);

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstpage = indexOfLastPage - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstpage, indexOfLastPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3 mt-5">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
