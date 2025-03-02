export type Feed = {
  id: string;
  author: string;
  url: string;
  link: string;
};

export type Post = {
  feed: Feed;
  id: string;
  guid: string;
  post: string;
  title: string;
  updated: string;
  url: string;
  html: string;
  type: 'blogpost' | 'video';
};

export type SignUpForm = {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  github: {
    username: string;
    avatarUrl: string;
  };
  githubUsername: string;
  githubOwnership: boolean;
  blogUrl: string;
  channelUrl: string;
  feeds: Array<string>;
  allFeeds: Array<string>;
  blogOwnership: boolean;
  channelOwnership: boolean;
};

export type ThemeName = 'light' | 'dark';
