import { Issue } from "./Issue";

export type IssueNormalized = Pick<Issue, "title" | "state" | "user" | "created_at" | "number" | "comments" | "id">;