import { useMutation } from "react-query";

import { create } from "./apiRequests";

// ===== MUTATES ===== //
export const useCreateRoom = () => {
  const { mutate, isLoading } = useMutation(create);

  return { create: mutate, isLoading };
};

// ===== QUERIES ===== //
// export const useGetProfile = () => {
//   const getQueryKey = () => [PROFILE];

//   const { data, refetch, isLoading } = useQuery(getQueryKey(), getProfile);

//   if(data && data.image_url.length) data.image_url += `?${new Date().getTime()}`;

//   return { getQueryKey, refetch, data, isLoading };
// };
