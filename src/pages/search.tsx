import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/features/search/use-search";
import { useDebounce } from "@/hooks/use-debounce";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchModal({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { searchResults } = useSearchQuery(debouncedSearchTerm);

  console.log(searchResults);

  function handleClick(userId: number) {
    navigate(`/profile/${userId}`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-[800px] h-[700px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            Search your best friends
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4 max-h-[50vh] overflow-y-auto pr-2">
          <Input
            placeholder="Enter the name"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          {searchResults ? (
            searchResults?.map((search: any) => (
              <div
                key={search?.id}
                className="flex gap-3 items-start hover:cursor-pointer hover:bg-amber-300"
              >
                {/* Avatar Placeholder */}
                <button
                  onClick={() => handleClick(search?.id)}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                    {search?.avatar ? (
                      <img
                        src={search?.avatar}
                        alt={search?.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      search.name?.[0] || "?"
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700">
                      {search?.name || "User"}
                    </span>
                  </div>
                </button>
              </div>
            ))
          ) : (
            <div>No friends found</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
