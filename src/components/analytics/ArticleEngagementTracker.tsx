"use client";

import { useEffect } from "react";
import { trackContentInteraction } from "@/src/lib/analytics";

const READ_SCROLL_THRESHOLD = 50;
const READ_TIME_THRESHOLD_SECONDS = 30;

export function ArticleEngagementTracker({
  articleId,
  articleTitle,
}: {
  articleId: string;
  articleTitle: string;
}) {
  useEffect(() => {
    const startedAt = Date.now();
    let maxScroll = 0;
    let readTracked = false;

    const currentScrollPercent = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return 100;
      return Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));
    };

    const trackReadWhenQualified = () => {
      maxScroll = Math.max(maxScroll, currentScrollPercent());
      const readingTimeSeconds = Math.floor((Date.now() - startedAt) / 1000);

      if (
        !readTracked &&
        maxScroll >= READ_SCROLL_THRESHOLD &&
        readingTimeSeconds >= READ_TIME_THRESHOLD_SECONDS
      ) {
        readTracked = true;
        trackContentInteraction({
          content_action: "read",
          article_id: articleId,
          article_title: articleTitle,
          reading_time_seconds: readingTimeSeconds,
          max_scroll_percent: maxScroll,
        });
      }
    };

    window.addEventListener("scroll", trackReadWhenQualified, { passive: true });
    const timer = window.setInterval(trackReadWhenQualified, 5_000);

    return () => {
      window.removeEventListener("scroll", trackReadWhenQualified);
      window.clearInterval(timer);
    };
  }, [articleId, articleTitle]);

  return null;
}
