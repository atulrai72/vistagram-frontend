import { getMultualUser } from "@/services/api-chat";
import { useQuery } from "@tanstack/react-query";

export function useMutualUser() {
    const { isPending, data: mutualUsers } = useQuery({
        queryKey: ["mutual-user"],
        queryFn: getMultualUser
    });

    return {
        isPending,
        mutualUsers,
    };
}