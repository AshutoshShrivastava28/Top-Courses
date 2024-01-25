import "./App.css";
import Navbar from "./components/Navbar";
import { apiUrl, filterData } from "./data.js";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

function App() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  // If there is an error coming like forEach loop and null value some thing like this, initialise courses with an empty array rather than null value because it will throw an error as the initial state is an null object and we cant apply forEach loop on it.
  async function fetchData() {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();
      setCourses(output.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-sky-700">
      <div>
        <Navbar />
      </div>
      <div className="bg-sky-700">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center mn-h-[50vh]">
          {loading ? (
            <Spinner />
          ) : (
            <Cards courses={courses} category={category} />
          )}
          ;
        </div>
      </div>
    </div>
  );
}

export default App;
