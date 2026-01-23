// import type { uploadSchema } from "@/schemas";
// import { signup } from "@/services/api-auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import * as z from "zod";
import toast from "react-hot-toast";
import { createPost } from "@/services/api-create";

export function useUploadPost() {
//   const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: upload, isPending } = useMutation({
    mutationFn: ( file: any) =>
      createPost(file),
    onSuccess: () => {
     toast.success("Post uploaded succesfully!")
     navigate("/dashboard");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { upload, isPending };
}
