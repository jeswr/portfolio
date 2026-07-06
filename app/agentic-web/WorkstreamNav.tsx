// AUTHORED-BY Claude Fable 5
import Link from "next/link";

import styles from "./agentic-web.module.css";

const STREAMS = [
  { key: "vision", href: "/agentic-web", label: "The vision" },
  { key: "unite", href: "/unite", label: "unite — participatory democracy" },
  { key: "solid", href: "/solid", label: "Solid — what we’ve built" },
] as const;

type StreamKey = (typeof STREAMS)[number]["key"];

/**
 * Cross-workstream nav strip shared by the three workstream pages
 * (/agentic-web, /unite, /solid). The current page is rendered as plain text
 * with an explicit "(this page)" marker.
 */
export function WorkstreamNav({ current }: { current: StreamKey }) {
  return (
    <nav aria-label="Related workstreams" className={styles.workstreamNav}>
      {STREAMS.map((stream) =>
        stream.key === current ? (
          <span
            key={stream.key}
            aria-current="page"
            className={styles.workstreamNavHere}
          >
            {stream.label} (this page)
          </span>
        ) : (
          <Link key={stream.key} href={stream.href}>
            {stream.label}
          </Link>
        ),
      )}
    </nav>
  );
}
