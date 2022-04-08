export interface Post {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  author: {
    image: [Object];
    name: string;
  };
  comments: Comment[];
  body: any[];
  categories: any[];
  description: string;
  mainImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  publishedAt: string;
  slug: {
    _type: string;
    current: string;
  };
  title: string;
}

export interface Comment {
  approved: boolean;
  comment: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
