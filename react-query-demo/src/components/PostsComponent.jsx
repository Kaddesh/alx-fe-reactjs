import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
};

const PostsComponent = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5000, // Keeps data fresh for 5 seconds
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      <button onClick={refetch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Refresh Posts
      </button>
      <ul className="list-disc pl-5">
        {posts.slice(0, 20).map((post) => (
          <li key={post.id} className="border-b pb-2">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
