import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { getSearch } from "../core/_request";
import { mapCandidatesData } from "../utils/_function";

interface Candidate {
  id: string;
  full_name: string;
  // Add other fields if needed
}

interface SearchFieldProps {
  values?: string;
  handleUserClick: (data: any) => void;
}

const SearchField = ({ values = "", handleUserClick }: SearchFieldProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Candidate[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const justSelectedRef = useRef(false);

  useEffect(() => {
    setQuery(values); // Always update input value
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      setShowDropdown(false); // Prevent dropdown reopening
    }
  }, [values]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setLoading(true);

    timeoutRef.current = window.setTimeout(async () => {
      try {
        const res = await getSearch(query);
        if ([200, 201].includes(res?.status)) {
          setResults(res?.candidates || []);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search failed", error);
        setResults([]);
      } finally {
        setLoading(false);
        setShowDropdown(true);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  const handleUserSelect = (candidate: Candidate) => {
    const transformedData = mapCandidatesData([candidate]);
    handleUserClick(transformedData);
    justSelectedRef.current = true;
    setShowDropdown(false);
  };

  return (
    <div className="search-container" style={{ position: "relative" }}>
      <span className="search-icon">
        <IoIosSearch />
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
      />
      {showDropdown && (
        <ul className="search-dropdown">
          {loading ? (
            <li className="search-result">Loading...</li>
          ) : results.length > 0 ? (
            results.map((item) => (
              <li
                key={item.id}
                className="search-result"
                onMouseDown={() => handleUserSelect(item)} // Prevent blur-before-click
              >
                {item.full_name}
              </li>
            ))
          ) : (
            <li className="search-result">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchField;
