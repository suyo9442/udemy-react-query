import { useCallback, useState } from "react";
import type { Staff } from "@shared/types";
import { filterByTreatment } from "../utils";
import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { useQuery } from "@tanstack/react-query";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  // select OPTION
  const selectFn = useCallback((staff: Staff[]) => {
    if(filter === "all") return staff;
    return filterByTreatment(staff, filter)
  }, [filter])

  // TODO: get data from server via useQuery
  const fallback: Staff[] = [];
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFn,
    staleTime: Infinity
  })

  return { staff, filter, setFilter };
}
