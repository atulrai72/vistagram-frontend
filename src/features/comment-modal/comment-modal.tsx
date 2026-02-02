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
import { useCommentPost, useGetComments, useDeleteComment } from "./use-comment";
import { Loader2 } from "lucide-react";
import { useUser } from "../authentication/use-user";
import { HiTrash } from "react-icons/hi2";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";

// Add postId to props
export function CommentDialog({
  children,
  postId,
}: {
  children: React.ReactNode;
  postId: number;
}) {
  const { user } = useUser();
  const { deleteCommentApi, isPending: isDeleting } = useDeleteComment();
  const { commentApi, isPending: isPosting } = useCommentPost();
  const { data: comments, isLoading: isLoadingComments } =
    useGetComments(postId);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
      postId: postId,
    },
  });

  function onSubmit(values: z.infer<typeof commentSchema>) {
    commentApi(
      { comment: values.comment, postId: postId },
      {
        onSuccess: () => {
          form.reset({ comment: "", postId: postId });
        },
      },
    );
  }

  function handleDeleteComment(id: number) {
    deleteCommentApi(id);
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
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                  {c.user?.avatar_url ? <img src={c.user?.avatar_url} alt={c.user?.name} className="w-8 h-8 rounded-full object-cover shrink-0" /> : c.user?.name?.[0] || "?"}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-700">
                    {c.user?.name || "User"}
                  </span>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">{c.comment}</p>
                    {user?.id === c.userId && <button onClick={() => handleDeleteComment(c.id)}><HiTrash className="hover:text-red-500 hover:cursor-pointer" /></button>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form
         id="comment-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2 border-t pt-4"
        >
          <FieldGroup>
          <Controller
                name="comment"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="comment"
                      aria-invalid={fieldState.invalid}
                      placeholder="Add a comment..."
                      disabled={isPosting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
          <Button
            type="submit"
            disabled={isPosting || !form.watch("comment")}
            size="sm"
            form="comment-form"
          >
            {isPosting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
          </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
