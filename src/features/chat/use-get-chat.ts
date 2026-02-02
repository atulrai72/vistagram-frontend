import { getMessages } from "@/services/api-chat";
import { useQuery } from "@tanstack/react-query";

export const useGetChat = (id: number) => {
    const { data, isPending } = useQuery({
        queryKey: ["chat", id],
        queryFn: () => getMessages(id),
        enabled: !!id,
    });

    return { data, isPending };
}