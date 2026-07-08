// AUTHORED-BY Claude Sonnet
import styles from "./agentic-web.module.css";

/**
 * Shared draft banner for the /agentic-web, /unite and /solid routes (and the
 * companions catalogue). Wording is fixed per the maintainer's brief — do not
 * paraphrase.
 */
export function DraftBanner() {
  return (
    <div className={styles.draftBanner} role="note">
      <strong>⚠ Working draft</strong> — prepared with AI assistance (Claude
      Fable 5) and published at the maintainer’s request. Content is under
      ongoing review; expect revisions.
    </div>
  );
}
