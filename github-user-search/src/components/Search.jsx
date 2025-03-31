import { useState, useEffect } from "react";
import fetchUserData from "../services/githubService";
import { FaGithub } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [page]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await fetchUserData(query, location, minRepos, page);
      setUsers(data.items);
      setTotalPages(Math.ceil(data.total_count / 30));
    } catch (err) {
      setError("Looks like we cant find the user");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full">
      {/* GitHub Icon at the Top */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black text-4xl"
      >
        <FaGithub className="hover:text-gray-700 transition duration-300 h-12 w-12" />
      </a>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-4 w-full bg-white p-6 rounded-lg shadow-lg max-w-sm"
      >
        <input
          type="text"
          placeholder="GitHub Username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 placeholder:text-sm p-2 rounded-lg focus:border-green-700 focus:outline-none"

        />
        <input
          type="text"
          placeholder="Location (Optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 placeholder:text-sm p-2 rounded-lg focus:border-green-700 focus:outline-none"

        />
        <input
          type="number"
          placeholder="Minimum Repositories (Optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border border-gray-300 placeholder:text-sm p-2 rounded-lg focus:border-green-700 focus:outline-none"

        />

        {/* Green Search Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Results Section */}
      <div className="w-full max-w-xl">
        {users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 border rounded-lg shadow-md"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold">{user.login}</h3>
                  {user.location && (
                    <p className="text-sm text-gray-600">📍 {user.location}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    📦 {user.public_repos || 0} Repos
                  </p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Buttons */}
      {users.length > 0 && (
        <div className="flex gap-4 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Footer Section */}
      <footer className="w-full text-center mt-6 text-sm text-gray-500">
        <div className="flex justify-center gap-4">
          <a
            href="https://docs.github.com/en/github/site-policy/github-terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600 text-xs"
          >
            Terms
          </a>
          <a
            href="https://github.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600 text-xs"
          >
            Privacy
          </a>
          <a
            href="https://github.com/security"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600 text-xs"
          >
            Security
          </a>
          <a
            href="https://support.github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-xs"
          >
            Contact GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Search;
