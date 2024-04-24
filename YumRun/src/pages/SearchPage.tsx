import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
};

export const SearchPage = () => {
  const { city } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalResults, setOriginalResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); // New state for filtered results
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
  });
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]); // New state to store selected cuisines
  const [totalPages, setTotalPages] = useState(1); // State to store total pages
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const handleSearch = async () => {
      const storesRef = collection(db, "stores");
      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(storesRef, async (querySnapshot) => {
        const storesData = [];
        for (const doc of querySnapshot.docs) {
          const storeData = doc.data();
          storesData.push({ ...storeData, id: doc.id });
        }
        // Filter stores by city
        const filteredData = storesData.filter(
          (store) => store.city.toLowerCase() === city.toLowerCase()
        );
        setOriginalResults(filteredData);
        setFilteredResults(filteredData); // Initialize filtered results with original data
        setIsLoading(false); // Set loading to false once data is fetched
      });
      // Cleanup function to unsubscribe when component unmounts
      return () => {
        unsubscribe();
      };
    };
    handleSearch();
  }, [city]);

  useEffect(() => {
    const startIndex = (searchState.page - 1) * 5;
    const endIndex = startIndex + 5;
    setResults(filteredResults.slice(startIndex, endIndex));
  }, [searchState.page, filteredResults]);

  useEffect(() => {
    // Calculate total pages dynamically
    const totalPages = Math.ceil(filteredResults.length / 5);
    setTotalPages(totalPages);
  }, [filteredResults]);

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    // Filter results by the search query using cuisines array and name
    const filteredResults = originalResults.filter((store) => {
      const cuisines = store.cuisines.map((cuisine) => cuisine.toLowerCase());
      return (
        store.storeName
          .toLowerCase()
          .includes(searchFormData.searchQuery.toLowerCase()) ||
        cuisines.some((cuisine) =>
          cuisine.includes(searchFormData.searchQuery.toLowerCase())
        )
      );
    });

    // Update results with filtered results
    setResults(filteredResults.slice(0, 5));
    setFilteredResults(filteredResults); // Update filtered results state

    // Reset page to 1 after filtering
    setSearchState((prevState) => ({
      ...prevState,
      page: 1,
    }));
  };

  // Reset search functionality
  const resetSearch = () => {
    // Reset search query and results to original state
    setResults(originalResults.slice(0, 5)); // Reset to first page
    setFilteredResults(originalResults); // Reset filtered results to original data
    setSearchState({
      searchQuery: "",
      page: 1,
    });
  };

  const handleSelectedCuisinesChange = (cuisines: string[]) => {
    setSelectedCuisines(cuisines);
    //filter by selected cuisines
    const filteredResults = originalResults.filter((store) => {
      return cuisines.every((cuisine) => store.cuisines.includes(cuisine));
    });
    setFilteredResults(filteredResults);
    // Reset page to 1 after filtering
    setSearchState((prevState) => ({
      ...prevState,
      page: 1,
    }));
  };

  if (!results || !city) {
    return <span>No results found</span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={selectedCuisines}
          onChange={handleSelectedCuisinesChange}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>

      <div className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by store name, cuisine..."
          onReset={resetSearch}
        />
        <SearchResultInfo total={filteredResults.length} city={city} />
        {results.map((store) => (
          <SearchResultCard key={store.id} store={store} />
        ))}

        <PaginationSelector
          filteredResults={filteredResults.length}
          page={searchState.page}
          pages={totalPages} // Use totalPages state
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
