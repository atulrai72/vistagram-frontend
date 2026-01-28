import {
  getCurrentUserProfile,
  getTheSpecificUserDetail,
} from "@/services/api-user";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUserProfile() {
  const { isPending, data: currentUser } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUserProfile,
  });

  return { isPending, currentUser };
}

export function useOtherUserProfile(id: number) {
  const { isPending, data: otherUser } = useQuery({
    queryKey: ["other-user", id],
    queryFn: getTheSpecificUserDetail,
  });

  return { isPending, otherUser };
}
