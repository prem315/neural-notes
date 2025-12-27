import { getPageImage, source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";

export default async function Page(props: {
  params: Promise<{ track: string; slug?: string[] }>;
}) {
  const params = await props.params;

  // Construct the full slug array
  // If slug is undefined (root of track), it's just [track]
  // If slug is present, it's [track, ...slug]
  const slugs = params.slug ? [params.track, ...params.slug] : [params.track];

  const page = source.getPage(slugs);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams().map((param) => {
    // param.slug is array of strings e.g. ['llm-from-scratch', 'intro']
    // we need to split it into track and slug
    if (!param.slug || param.slug.length === 0) return {};

    const [track, ...rest] = param.slug;
    return {
      track,
      slug: rest,
    };
  });
}

export async function generateMetadata(props: {
  params: Promise<{ track: string; slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slugs = params.slug ? [params.track, ...params.slug] : [params.track];
  const page = source.getPage(slugs);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
