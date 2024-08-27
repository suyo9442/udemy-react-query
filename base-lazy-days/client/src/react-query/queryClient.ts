import { toast } from "@/components/app/toast";
import { QueryCache, QueryClient } from "@tanstack/react-query";

function errorHandler(errorMsg: string) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = "react-query-toast";

  if (!toast.isActive(id)) { // 중복으로 토스트창이 띄워지지 않도록
    const action = "fetch"; // 추후 mutation도 제어할 수 있도록 추가
    const title = `could not ${action} data: ${ 
      errorMsg ?? "error connecting to server" // 반환하는 에러메시지가 없다면 서버 오류
    }`;
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetch를 줄이기 위한 설정
        staleTime: 600000,
        gcTime: 900000,
        refetchOnWindowFocus: false,
      }
    },
    queryCache: new QueryCache({
        onError: (error) => { // 쿼리에서 발생한 오류가 인자로 전달됨
            errorHandler(error.message);
        }
    })
});