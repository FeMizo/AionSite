import type { ArticleBlock } from "@/src/cms/types";

export function ArticleBlockRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              id={block.id}
              className="mt-14 first:mt-0 font-display text-2xl font-bold text-white md:text-3xl scroll-mt-28"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              id={block.id}
              className="mt-8 text-xl font-semibold text-white scroll-mt-28"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-6 border-l-2 border-blue-500 pl-5 text-slate-300 italic leading-relaxed"
            >
              {block.text}
            </blockquote>
          );
        }
        return (
          <p key={i} className="mt-4 text-slate-400 leading-[1.85]">
            {block.text}
          </p>
        );
      })}
    </>
  );
}
