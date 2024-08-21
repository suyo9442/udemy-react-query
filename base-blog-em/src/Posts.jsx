import {useEffect, useState } from "react";
import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const maxPostPage = 10;

export function Posts() {
	const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
	
	// useMutation
	const deleteMutation = useMutation({
		mutationFn: (postId) => deletePost(postId)
	});
	const updateMutation = useMutation({
		mutationFn: (postId) => updatePost(postId)
	});
	
	// useQuery
	const {data, isLoading, isError, error} = useQuery({
		queryKey: ["posts", currentPage],
		queryFn: () => fetchPosts(currentPage),
		// staleTime: Infinity,
		// gcTime: 5000,
	});
	
	// Pre-fetching
	useEffect(() => {
		if(currentPage >= maxPostPage) return;
		const nextPage = currentPage + 1;
		queryClient.prefetchQuery({
			queryKey: ['posts', nextPage],
			queryFn: () => fetchPosts(nextPage)
		});
	}, [currentPage, queryClient]);
	
	if(isLoading) return <div>Loading...</div>;
	if(isError) return <div>{error.toString()}</div>;
	
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
							deleteMutation.reset();
							updateMutation.reset();
							setSelectedPost(post);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => setCurrentPage(prev => prev - 1)}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= maxPostPage} onClick={() => setCurrentPage(prev => prev + 1)}>
          Next page
        </button>
      </div>
      <hr />
      {
				selectedPost &&
				<PostDetail
					post={selectedPost}
					deleteMutation={deleteMutation}
					updateMutation={updateMutation}
				/>
			}
    </>
  );
}
