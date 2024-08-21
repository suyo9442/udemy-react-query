import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import {useInfiniteQuery} from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
	const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
		queryKey: ["sw-people"],
		queryFn: ({pageParam = initialUrl}) => fetch(pageParam),
		getNextPageParam: (lastPage) => {
			// lastPage: 쿼리의 마지막 데이터
			// fetchNextPage는 lastPage.next가 반환하는 값에 따라 동작을 달리함
			// getNextPageParam가 반환하는 값에 따라 hasNextPage가 결정됨
			return lastPage.next || undefined;
		}
	})

  return (
		<InfiniteScroll>
		
		</InfiniteScroll>
  );
}
