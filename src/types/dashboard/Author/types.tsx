type AuthorSidebarLinkType = {
  path: string;
  title: string;
  image: JSX.Element;
  id: number;
};

export type AuthorSidebarLinksType = [
  {
    heading?: string;
    className: string;
    links: AuthorSidebarLinkType[];
    id: 0;
  },
  {
    heading?: string;
    className: string;
    links: AuthorSidebarLinkType[];
    id: 1;
  }
];

export type PaperSubmissionDataType = {
  abstract: string;
  file: File | null;
  authors: string[];
  correspondingAuthor: string;
  projectId: string;
  abstractApproved: Boolean
};
