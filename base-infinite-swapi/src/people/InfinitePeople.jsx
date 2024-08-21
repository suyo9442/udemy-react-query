import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import {useInfiniteQuery} from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
	const {data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error} = useInfiniteQuery({
		queryKey: ["sw-people"],
		queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
		getNextPageParam: (lastPage) => {
			// lastPage: 쿼리의 마지막 데이터
			// fetchNextPage는 lastPage.next가 반환하는 값에 따라 동작을 달리함
			// getNextPageParam가 반환하는 값에 따라 hasNextPage가 결정됨
			return lastPage.next || undefined;
		}
	})
	if(isLoading) return <div className="loading"> Loading... </div>;
	if(isError) return <div> Error! {error.toString()}</div>
	
	console.log(data)

  return (
		<InfiniteScroll
			loadMore={() => { if(!isFetching) fetchNextPage(); }}
			hasMore={hasNextPage}
			initialLoad={false}
		>
			{
				data.pages.map(pageData =>
				pageData.results.map(person =>
				<Person
					key={person.name}
					name={person.name}
					hairColor={person.hair_color}
					eyeColor={person.eye_color}
				/>
				))
			}
		</InfiniteScroll>
  );
}
