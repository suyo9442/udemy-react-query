import type { Appointment } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";

import { useLoginData } from "@/auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/constants";
import { useId } from "react";

// for when we need a query function for useQuery
async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  console.log(data)
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  const { userId, userToken } = useLoginData();

  const fallback: Appointment[] = [];
  const { data: useUserAppointments = fallback } = useQuery({
    enabled: !!userId,
    queryKey: [queryKeys.appointments, queryKeys.user, userId, userToken],
    queryFn: () => getUserAppointments(userId, userToken)
  })

  // TODO replace with React Query
  return useUserAppointments;
}
