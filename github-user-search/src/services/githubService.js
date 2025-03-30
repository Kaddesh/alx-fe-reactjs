import axios from "axios";

const fetchUserData = async (username, location, minRepos, page = 1) => {
  const baseUrl = "https://api.github.com/search/users?q";
  let searchQuery = `${username}`;

  // Add location filter if provided
  if (location) searchQuery += ` location:${location}`;

  const URL = `${baseUrl}=${encodeURIComponent(searchQuery)}&page=${page}&per_page=30`;

  try {
    const response = await axios.get(URL, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      },
    });

    const users = response.data.items;
    console.log("api data:", users)

    // Fetch additional details (public_repos) for each user
    const userDetails = await Promise.all(
      users.map(async (user) => {
        const userResponse = await axios.get(user.url, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
          },
        });
        return { ...user, public_repos: userResponse.data.public_repos };
      })
    );

    console.log("Fetched User Details:", userDetails); // Console log user details
    // Apply minimum repositories filter
    const filteredUsers = minRepos
      ? userDetails.filter((user) => user.public_repos >= minRepos)
      : userDetails;

    return { items: filteredUsers, total_count: filteredUsers.length };
  } catch {
    throw new Error("No users found");
  }
};

export default fetchUserData;
