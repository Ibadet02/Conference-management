import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBook,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import { AuthorSidebarLinksType } from "../../../../../types/dashboard/Author/types";

export const reviewerSidebarLinks: AuthorSidebarLinksType = [
  {
    className: "author-sidebar__middle--main-links",
    links: [
      {
        path: "/",
        title: "Dashboard",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 0,
      },
    ],
    id: 0,
  },
  {
    heading: "ACCOUNT PAGES",
    className: "author-sidebar__middle--account-links",
    links: [
      {
        path: "/x",
        title: "Profile",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 0,
      },
      {
        path: "/x",
        title: "Settings",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 1,
      },
      {
        path: "x",
        title: "Lorem",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 2,
      },
      {
        path: "/x",
        title: "Ipsum",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 3,
      },
    ],
    id: 1,
  },
];
