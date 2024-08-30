import { toast } from "@/components/app/toast";
import {MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

function createTitle(errMsg: string, actionType: "query" | "mutation") {
	const action = actionType === "query" ? "fetch" : "update";
	return `could not ${action} data: ${errMsg ?? "error connecting to server"}`;
}


function errorHandler(title: string) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = "react-query-toast";

  if (!toast.isActive(id)) { // 중복으로 토스트창이 띄워지지 않도록
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
      onError: (error) => {
				const title = createTitle(error.message, "query")
        errorHandler(title);
      }
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
				const title = createTitle(error.message, "mutation")
        errorHandler(title);
      }
    })
});
