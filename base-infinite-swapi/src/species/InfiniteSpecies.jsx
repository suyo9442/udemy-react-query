import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data, 
    fetchNextPage, // = queryFn
    hasNextPage, 
    isFetching, 
    isLoading, 
    isError, 
    error
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined 
    // getNextPageParam: 이 값은 pageParam으로 들어감
    // pageParam: 이 값은 hasNextPage를 판단함
  })

  if(isLoading) return <div className="loading"> Loading ... </div>;
  if(isError) return <div>{ error.toString() }</div>;

  return (
    <>
      { isFetching && <div className="loading"> Loading ... </div> }
     <InfiniteScroll
      loadMore={() => { if(!isFetching) fetchNextPage() }} // api 중복호출 방지
      hasMore={hasNextPage} // 계속 데이터를 로딩해야하는지 판단
      initialLoad={false}
     >
      {
        data.pages.map(pageData => 
          pageData.results?.map(list => (
              <Species
                key={list.name}
                name={list.name}
                language={list.language}
                averageLifespan={list.average_height}
            />
          )))
      }
     </InfiniteScroll>
    </>
  );
}
