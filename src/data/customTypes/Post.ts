import User from './User';
import School from './School';

type Post = {
    id: number;
    content: string;
    school: School | null;
    locations: number[] | string[] | null;
    user: User;
    createdAt: string;
    comments : Array<string>;
};

export default Post;