import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { commentSchema } from "@/schemas";
import { useCommentPost, useGetComments } from "./use-comment";
import { Loader2 } from "lucide-react";

// Add postId to props
export function CommentDialog({
  children,
  postId,
}: {
  children: React.ReactNode;
  postId: number;
}) {
  const { commentApi, isPending: isPosting } = useCommentPost();
  const { data: comments, isLoading: isLoadingComments } =
    useGetComments(postId);
    // console.log("comments ", comments.allComments);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
      postId: postId, 
    },
  });

  function onSubmit(values: z.infer<typeof commentSchema>) {
    console.log(values);
    commentApi(
      { comment: values.comment, postId: postId },
      {
        onSuccess: () => {
          form.reset({ comment: "", postId: postId }); 
        },
      },
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4 max-h-[50vh] overflow-y-auto pr-2">
          {isLoadingComments ? (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin text-gray-400" />
            </div>
          ) : comments?.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-4">
              No comments yet. Be the first!
            </p>
          ) : (
            comments?.map((c: any, index: number) => (
              <div key={index} className="flex gap-3 items-start">
                {/* Avatar Placeholder */}
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                  {c.user?.name?.[0] || "?"}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-700">
                    {c.user?.name || "User"}
                  </span>
                  <p className="text-sm text-gray-600">{c.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2 border-t pt-4"
        >
          <Controller
            name="comment"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Add a comment..."
                disabled={isPosting}
                className="flex-1"
                autoComplete="off"
              />
            )}
          />
          <Button
            type="submit"
            disabled={isPosting || !form.watch("comment")}
            size="sm"
          >
            {isPosting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
