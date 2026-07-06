// AUTHORED-BY Claude Sonnet
import styles from "./agentic-web.module.css";

/**
 * Shared draft banner for the /agentic-web routes. Wording is fixed verbatim
 * per the maintainer's brief — do not paraphrase.
 */
export function DraftBanner() {
  return (
    <div className={styles.draftBanner} role="note">
      <strong>⚠ DRAFT</strong> — This page was built by Claude Sonnet because
      Claude Fable 5 (the preferred author/reviewer) is temporarily offline. It
      will be reviewed by Fable 5 once access is restored. Published early at
      the maintainer’s request; treat as a working draft, not a final document.
    </div>
  );
}
