import Post from "./Post";
import User from "./User";

type Comment = {
  id: number;
  content: string;
  user: User;
  post: Post;
  createdAt: string;
};

export default Comment;
