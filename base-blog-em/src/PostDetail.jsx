import { fetchComments } from "./api";
import "./PostDetail.css";
import {useQuery} from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  const {data, isLoading} = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    // staleTime: Infinity,
    // gcTime: 5000,
  })
  if(isLoading) return <>Loading...</>

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        { deleteMutation.isError && <p className="error">게시물 삭제 중 문제가 발생했습니다. ({deleteMutation.error.toString()})</p> }
        { deleteMutation.isPending && <p className="loading">게시물 삭제 중...</p> }
        { deleteMutation.isSuccess && <p className="success">게시물이 삭제되었습니다.</p> }
			</div>
			<div>
        <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
				{ updateMutation.isSuccess && <p className="error">게시물 수정 중 문제가 발생했습니다.</p> }
				{ updateMutation.isPending && <p className="loading">게시물 수정 중...</p> }
				{ updateMutation.isSuccess && <p className="success">게시물이 수정되었습니다.</p> }
			</div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
