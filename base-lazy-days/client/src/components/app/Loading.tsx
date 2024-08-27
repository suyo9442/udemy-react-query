import { Spinner, Text } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";

export function Loading() {
  const isFetching = useIsFetching();
  const display = isFetching ? "inherit" : "none";

  /*
   useIsFetching: 진행중인 쿼리의 수를 반환함
   진행중인 쿼리의 수가 없다면(fetching이 끝났다면) 로딩을 보여줌
  */

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
