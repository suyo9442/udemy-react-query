import { AxiosResponse } from "axios";

import type { User } from "@shared/types";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance, getJWTHeader } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// query function
async function getUser(userId: number, userToken: string) {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
}

export function useUser() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();
  
  const { data: user } = useQuery({
    enabled: !!userId,
    queryKey: [queryKeys.user, userId, userToken],
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity    
  })

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // TODO: update the user in the query cache
    queryClient.setQueryData(
      [queryKeys.user, userId, userToken],
      newUser
    )
  }

  // meant to be called from useAuth
  function clearUser() {
    queryClient.removeQueries({ queryKey: [queryKeys.user] })
    queryClient.removeQueries({ queryKey: [queryKeys.appointments, queryKeys.user] })
  }

  return { user, updateUser, clearUser };
}
