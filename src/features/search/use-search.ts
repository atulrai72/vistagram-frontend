import { getSearchResults } from "@/services/api-search";
import { useQuery } from "@tanstack/react-query";

export function useSearchQuery(queryString: string) {
  const { isPending, data: searchResults } = useQuery({
    queryKey: ["search-results", queryString],
    queryFn: getSearchResults,
  });

  return { isPending, searchResults };
}
