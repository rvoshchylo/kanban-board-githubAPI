import { Owner, Repository } from "./Repository";

export type OwnerNormalized = Pick<Owner, "html_url">;

export type RepositoryNormalized = Pick<Repository, "full_name" | "watchers_count" | "html_url"> & { owner: OwnerNormalized };