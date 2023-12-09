import { useState, useEffect } from "react";
import axios from "axios"; // or use fetch

const InfiniteScrollMenu = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(`your_api_endpoint?page=${page}`);
        const newItems = response.data; // Assuming the response is an array of items
        setItems((prevItems) => [...prevItems, ...newItems]);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [page]);

  // Function to handle scrolling and load more data
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteScrollMenu;
