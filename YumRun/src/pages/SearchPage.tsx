import SearchBar, { SearchForm } from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultInfo from '@/components/SearchResultInfo';
import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export type SearchState = {
  searchQuery: string;
}

export const SearchPage = () => {
  const { city } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalResults, setOriginalResults] = useState([]);
  const [SearchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
  });


  useEffect(() => {
    const handleSearch = async () => {
      const storesRef = collection(db, 'stores');
      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(storesRef, async (querySnapshot) => {
        const storesData = [];
        for (const doc of querySnapshot.docs) {
          const storeData = doc.data();
          storesData.push({ ...storeData, id: doc.id });
        }
        // Filter stores by city
        const filteredData = storesData.filter((store) => store.city.toLowerCase() === city.toLowerCase());
        setResults(filteredData);
        setOriginalResults(filteredData);
        setIsLoading(false); // Set loading to false once data is fetched
      });
      // Cleanup function to unsubscribe when component unmounts
      return () => {
        unsubscribe();
      };
    };
    handleSearch();
  }, [city]);

  const setSearchQuery = (searchFormData: SearchForm) => {
    // filter result by the search query using cusines array and name
    const filteredResults = results.filter((store) => {
      const cuisines = store.cuisines.map((cuisine) => cuisine.toLowerCase());
      return (
        store.storeName.toLowerCase().includes(searchFormData.searchQuery.toLowerCase()) ||
        cuisines.some((cuisine) => cuisine.includes(searchFormData.searchQuery.toLowerCase()))
      );
    });

    setResults(filteredResults);
  }

  const resetSearch = () => {
    setResults(originalResults);
  }

  if ((!results || !city)) {
    return (<span>No results found</span>)
  }

  if (isLoading) {
    return (<span>Loading...</span>)
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id='cuisines-list'>
        Insert Cuisines List Here (TODO)
      </div>

      <div className="flex flex-col gap-5">
        <SearchBar
          searchQuery={SearchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder='Search by store name, cuisine...'
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.length} city={city} />
        {results.map((store) => (
          <SearchResultCard store={store} />
        ))}
      </div>

    </div>
  );
};
