"use client";

import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function NewsContent({ content }: { content: string }) {
  return (
    <div className="mt-8 prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 mb-4 text-xl font-bold text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-lg font-semibold text-white">
              {children}
            </h3>
          ),
          p: ({ children, node }) => {
            // If paragraph contains an image, render as div to avoid invalid <p><div> nesting
            const hasImage = node?.children?.some(
              (child) => child.type === "element" && child.tagName === "img"
            );
            if (hasImage) {
              return <div className="mt-4">{children}</div>;
            }
            return (
              <p className="mt-4 text-base leading-relaxed text-white/70">
                {children}
              </p>
            );
          },
          img: ({ src, alt }) => {
            if (typeof src !== "string") return null;
            return (
              <span className="my-6 block overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={alt ?? ""}
                  width={800}
                  height={450}
                  className="w-full rounded-xl"
                />
              </span>
            );
          },
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-4 border-l-2 border-cyan-500/50 pl-4 text-white/60 italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
