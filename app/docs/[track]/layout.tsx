import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { TrackSelector } from "@/components/track-selector";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;

  // Find the sidebar root for the track
  // Match by checking if folder's children have URLs starting with our track path
  const trackNode = source.pageTree.children.find((node) => {
    if (node.type !== "folder") return false;

    // Check if this folder's children belong to our track
    if (node.children && node.children.length > 0) {
      const firstChild = node.children[0];
      const childUrl = (firstChild as any).url as string | undefined;
      return childUrl?.startsWith(`/docs/${track}`);
    }
    return false;
  });

  // If we found the folder, use its children as the sidebar tree
  // Otherwise fall back to showing all pages that match the track prefix
  const rootTree =
    trackNode && trackNode.type === "folder"
      ? { name: trackNode.name, children: trackNode.children }
      : {
          name: source.pageTree.name,
          children: source.pageTree.children.filter((node) =>
            (node as any).url?.startsWith(`/docs/${track}`)
          ),
        };

  return (
    <DocsLayout
      tree={rootTree}
      {...baseOptions()}
      sidebar={{
        banner: (
          <div className="flex flex-col gap-2 p-2">
            <TrackSelector />
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}

export function generateStaticParams() {
  return [
    { track: "llm-from-scratch" },
    { track: "slm-from-scratch" },
    { track: "transformer-from-scratch" },
    { track: "tokenizer-embeddings" },
  ];
}
