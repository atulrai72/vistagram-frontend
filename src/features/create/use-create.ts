import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createPost } from "@/services/api-create";

export function useUploadPost() {
  //   const queryClient = useQueryClient();
  const navigate = useNavigate();

  // z.infer<typeof uploadPostSchema>

  const { mutate: upload, isPending } = useMutation({
    mutationFn: ({ caption, file }: any) =>
      createPost({ caption, file }),
    onSuccess: () => {
      toast.success("Post uploaded succesfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { upload, isPending };
}
