export enum IconType {
  LearningPath = "LearningPath",
  Podcast = "Podcast",
  Ebook = "Ebook",
  Event = "Event",
  Stream = "Stream",
}

export type Image = {
  id: string;
  uri: string;
  blurHash: string;
  width?: number;
  height?: number;
  alt?: string;
  __typename: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: Image;
  __typename: string;
};

export type Expert = {
  id: string;
  slug: string;
  title: string;
  firstName: string;
  lastName: string;
  company: string;
  image: Image;
  userId?: string;
  updatedAt: string;
  __typename: IconType;
};

export type Podcast = {
  __typename: IconType;
  id: string;
  name: string;
  timeSpentOnByUsers: number;
  slug: string;
  length: number;
  image: Image;
  categories: Category[];
  experts: Expert[];
};

export type Ebook = {
  __typename: IconType;
  id: string;
  name: string;
  slug: string;
  readingTime: number;
  categories: Category[];
  image: Image;
  experts: Expert[];
};

export type Event = {
  __typename: IconType;
  id: string;
  name: string;
  slug: string;
  eventType: string;
  startsAt: string;
  endsAt: string;
  image: Image;
  experts: Expert[];
  categories: Category[];
  locationDisplayName: string;
  publishedAt: string;
  updatedAt: string;
};

export type Stream = {
  __typename: IconType;
  id: string;
  status: string;
  slug: string;
  name: string;
  preamble: string;
  length: number;
  videoUrl: string;
  wentLiveAt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
  categories: Category[];
  channel: string;
  experts: Expert[];
  hosts: Array<{
    expert: Expert;
    uid: string;
    accepted: boolean;
    order: number;
    isFeatured?: boolean;
    __typename: string;
  }>;
  upvoteCount: number;
  downvoteCount: number;
};

export type LearningPath = {
  id: string;
  name: string;
  slug: string;
  preamble: string;
  sortOrder: number;
  image: Image;
  categories: Category[];
  __typename: IconType;
};

export type ContentCardEdge = {
  __typename: string;
} & (Podcast | Ebook | Event | Stream | Expert | LearningPath);

export type ContentCardMeta = {
  recommendationId: string;
  total: number;
  offset: number;
  limit: number;
  __typename: string;
};

export type ContentCards = {
  edges: ContentCardEdge[];
  meta: ContentCardMeta;
  __typename: string;
};

export type GetContentCardsResponse = {
  contentCards: ContentCards;
};
