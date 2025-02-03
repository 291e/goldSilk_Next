export interface CommunityPost {
  community_id: number;
  user_id: number;
  title: string;
  content: string;
  type: string;
  images?: string[];
  view_count: number;
  created_at: string;
  updated_at?: string;
}

export interface CreateCommunityRequest {
  title: string;
  content: string;
  type: string;
  images?: File[];
}

export interface UpdateCommunityRequest {
  title?: string;
  content?: string;
  type?: string;
  images?: File[];
}

export interface CommentRequest {
  content: string;
}
