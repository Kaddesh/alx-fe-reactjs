import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

const PostsComponent = () => {
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Disable refetching when window regains focus
    keepPreviousData: true, // Keep old data while fetching new data
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostsComponent;
