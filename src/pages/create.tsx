import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, Loader2, Video } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@/features/authentication/use-user";
import { useUploadPost } from "@/features/create/use-create";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePost() {
  const { user } = useUser();
  const { upload, isPending } = useUploadPost();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));

      if (selectedFile.type.startsWith("video/")) {
        setFileType("video");
      } else {
        setFileType("image");
      }
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const clearMedia = () => {
    setFile(null);
    setPreview(null);
    setFileType(null);
  };

  const handlePost = async () => {
    if (!file) return toast.error("Please select a photo or video first");
    upload({ caption, file });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-8 w-full text-left">
        Create New Post
      </h1>

      <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">
        {/* Media Preview Area */}
        <div className="w-full bg-gray-50 min-h-[300px] relative flex flex-col items-center justify-center border-b">
          {preview ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {fileType === "video" ? (
                <video
                  src={preview}
                  controls
                  className="w-full h-auto max-h-[500px]"
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              )}

              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 rounded-full z-10 shadow-md"
                onClick={clearMedia}
              >
                <X size={20} />
              </Button>
            </div>
          ) : (
            <div
              onClick={handleSelectClick}
              className="cursor-pointer flex flex-col items-center gap-4 p-8 transition-opacity hover:opacity-70 w-full h-full justify-center py-20"
            >
              <div className="flex gap-2 text-gray-300">
                <ImagePlus size={64} />
                <Video size={64} />
              </div>
              <span className="text-gray-500 font-medium text-lg">
                Drag photos or videos here
              </span>
              <Button variant="secondary" className="pointer-events-none">
                Select from computer
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*, video/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://github.com/shadcn.png" alt="User" />
            </div>
            <span className="font-semibold text-sm mt-1">{user?.name}</span>
          </div>
          <div></div>
          <Textarea
            placeholder="Write a caption..."
            className="border-none resize-none focus-visible:ring-0 p-0 text-base min-h-[100px]"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-xs text-gray-400">
              {fileType === "video"
                ? "Video will be processed before publishing"
                : "Your post will be shared with your followers"}
            </span>
            <Button
              onClick={handlePost}
              disabled={!file || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sharing...
                </>
              ) : (
                "Share"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
