"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  EvaluationDayId,
  NewCommentInput,
  StoredComment,
} from "@/types/comments";
import { COMMENTS_STORAGE_PREFIX } from "@/types/comments";

function storageKey(dayId: EvaluationDayId) {
  return `${COMMENTS_STORAGE_PREFIX}${dayId}`;
}

function readComments(dayId: EvaluationDayId): StoredComment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey(dayId));
    return raw ? (JSON.parse(raw) as StoredComment[]) : [];
  } catch {
    return [];
  }
}

function writeComments(dayId: EvaluationDayId, comments: StoredComment[]) {
  localStorage.setItem(storageKey(dayId), JSON.stringify(comments));
}

export function useDayComments(dayId: EvaluationDayId) {
  const [comments, setComments] = useState<StoredComment[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setComments(readComments(dayId));
    setLoaded(true);
  }, [dayId]);

  const addComment = useCallback(
    (input: NewCommentInput) => {
      const comment: StoredComment = {
        id: Date.now(),
        ...input,
        date: new Date().toISOString().split("T")[0],
        avatar: input.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2) || "??",
      };

      setComments((prev) => {
        const next = [comment, ...prev];
        writeComments(dayId, next);
        return next;
      });
    },
    [dayId],
  );

  return { comments, addComment, loaded };
}
