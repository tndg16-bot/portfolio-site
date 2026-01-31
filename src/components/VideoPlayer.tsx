interface VideoPlayerProps {
  videoId: string;
  lessonId: string;
  onProgressUpdate: (position: number) => Promise<void>;
  onComplete: () => Promise<void>;
}

export default function VideoPlayer({ videoId, lessonId, onProgressUpdate, onComplete }: VideoPlayerProps) {
    return (
        <div className="aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 relative group">
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-teal-500 border-b-[10px] border-b-transparent ml-1" />
                    </div>
                    <p className="text-zinc-500 text-sm">Video Host (Mock)</p>
                    <p className="text-zinc-300 font-bold mt-2">Video ID: {videoId}</p>
                </div>
            </div>

            {/* Mock Controls */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                <div className="h-full w-1/3 bg-teal-500 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                </div>
            </div>
        </div>
    );
}
