import { IPost } from "../IPost";

export interface SearchPostsResponse {
  totalCount: number;
  posts: IPost[];
}
