import { useEffect, useRef, useState } from 'react';

const ReelItem = ({ data }: any) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!videoRef.current) return;

                if (entry.isIntersecting) {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                setIsPlaying(true);
                            })
                            .catch((error) => {
                                console.log("Autoplay prevented:", error);
                                setIsPlaying(false);
                            });
                    }
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.6 }
        );

        if (videoRef.current) observer.observe(videoRef.current);

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    const handleVideoClick = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="flex h-full snap-start relative justify-center ">
            <video
                ref={videoRef}
                src={data.file_url}
                className="h-full w-200 object-cover cursor-pointer"
                loop
                playsInline
                muted={isMuted}
                onClick={handleVideoClick}
            />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                }}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 rounded-full text-white"
            >
                {isMuted ? "🔇" : "🔊"}
            </button>

        </div>
    );
};

export default ReelItem;