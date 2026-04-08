"use client";

import Image from "next/image";
import Markdown from "react-markdown";

function MarkdownImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt } = props;
  if (!src || typeof src !== "string") return null;
  return (
    <span className="my-6 block overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt ?? ""}
        width={800}
        height={500}
        className="w-full rounded-xl object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </span>
  );
}

export default function CaseMarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-gray max-w-none prose-img:rounded-xl prose-headings:text-gray-900">
      <Markdown
        components={{
          img: MarkdownImage,
          p: ({ children, node }) => {
            const hasImage = node?.children?.some(
              (child) => child.type === "element" && child.tagName === "img"
            );
            if (hasImage) {
              return <div className="mt-4">{children}</div>;
            }
            return <p>{children}</p>;
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
