import type { ReactNode } from "react";

// --- Lightweight markdown renderer (headings, bold/italic, inline code,
// fenced code blocks, bullet lists and horizontal rules) ---

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  // Inline code first so formatting markers inside code are left untouched.
  return text.split(/(`[^`]+`)/g).flatMap<ReactNode>((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (/^`[^`]+`$/.test(part)) {
      return [
        <code
          key={key}
          className="rounded-md border border-cyan-300/15 bg-cyan-300/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-100"
        >
          {part.slice(1, -1)}
        </code>,
      ];
    }
    return renderBold(part, key);
  });
}

function renderBold(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).flatMap<ReactNode>((part, i) => {
    const key = `${keyPrefix}-b${i}`;
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return [
        <strong key={key} className="font-medium text-white">
          {renderItalic(part.slice(2, -2), key)}
        </strong>,
      ];
    }
    return renderItalic(part, key);
  });
}

function renderItalic(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(_[^_]+_|\*[^*]+\*)/g).flatMap<ReactNode>((part, i) => {
    const key = `${keyPrefix}-i${i}`;
    if (/^_[^_]+_$/.test(part) || /^\*[^*]+\*$/.test(part)) {
      return [
        <em key={key} className="italic">
          {part.slice(1, -1)}
        </em>,
      ];
    }
    return part ? [<span key={key}>{part}</span>] : [];
  });
}

export function MarkdownContent({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;
  let section = 0;

  const isBlockStart = (l: string) =>
    /^\s*```/.test(l) || /^\s*---+\s*$/.test(l) || /^#{1,6}\s/.test(l) || /^\s*[-•]\s+/.test(l) || /^\s*>/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (/^\s*```/.test(line)) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(
        <pre
          key={key++}
          className="overflow-x-auto rounded-2xl border border-white/10 bg-[#020817] p-5 text-sm leading-relaxed"
        >
          <code className="font-mono whitespace-pre text-slate-200">{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Horizontal rule
    if (/^\s*---+\s*$/.test(line)) {
      blocks.push(<hr key={key++} className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />);
      i++;
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      section += 1;
      blocks.push(
        <h3
          key={key++}
          className="flex items-baseline gap-4 pt-10 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-[1.85rem]"
        >
          <span className="shrink-0 font-mono text-xs font-normal tracking-[0.15em] text-tone">
            {String(section).padStart(2, "0")}
          </span>
          <span>{renderInline(heading[2], `h${key}`)}</span>
        </h3>,
      );
      i++;
      continue;
    }

    // Blockquote
    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="border-l-2 border-tone pl-5 text-lg italic text-slate-200">
          {renderInline(quote.join(" "), `q${key}`)}
        </blockquote>,
      );
      continue;
    }

    // Bullet list
    if (/^\s*[-•]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-•]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-•]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="relative pl-6 before:absolute before:left-1 before:top-[0.75em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-tone before:content-['']"
            >
              {renderInline(item, `li${key}-${idx}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph (join soft-wrapped lines until a blank line or block start)
    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++}>
        {renderInline(para.join(" "), `p${key}`)}
      </p>,
    );
  }

  return <>{blocks}</>;
}
