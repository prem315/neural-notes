"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";
import { ChevronsUpDown, Check } from "lucide-react";

export interface Track {
  name: string;
  description: string;
  param: string;
}

const tracks: Track[] = [
  {
    name: "LLM from Scratch",
    description: "Build Large Language Models from the ground up.",
    param: "llm-from-scratch",
  },
  {
    name: "Small Language Model",
    description: "Understand efficiency with Small Language Models.",
    param: "slm-from-scratch",
  },
  {
    name: "Transformer from Scratch",
    description: "Deep dive into the Transformer architecture.",
    param: "transformer-from-scratch",
  },
  {
    name: "Tokenizer & Embeddings",
    description: "Learn how text becomes numbers.",
    param: "tokenizer-embeddings",
  },
];

export function TrackSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const currentTrack = useMemo(() => {
    const segments = pathname.split("/");
    // segments[0] is empty, [1] is 'docs', [2] is the track param
    if (segments.length >= 3 && segments[1] === "docs") {
      return tracks.find((t) => t.param === segments[2]);
    }
    return undefined;
  }, [pathname]);

  const activeTrack = currentTrack || tracks[0];

  const handleSelect = (param: string) => {
    setIsOpen(false);
    router.push(`/docs/${param}`);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <span className="truncate mr-2 text-left">{activeTrack.name}</span>
        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md bg-white dark:bg-zinc-950 p-1">
          {tracks.map((track) => (
            <div
              key={track.param}
              onClick={() => handleSelect(track.param)}
              className={`
                  relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors 
                  ${activeTrack.param === track.param ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}
                `}
            >
              <div className="flex flex-col">
                <span className="font-medium">{track.name}</span>
                <span className="text-xs text-muted-foreground line-clamp-1 opacity-70">
                  {track.description}
                </span>
              </div>
              {activeTrack.param === track.param && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
