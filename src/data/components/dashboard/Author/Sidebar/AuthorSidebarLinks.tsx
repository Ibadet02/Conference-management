import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBook,faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { AuthorSidebarLinksType } from "../../../../../types/dashboard/Author/types";

export const authorSidebarLinks: AuthorSidebarLinksType = [
    {
        className: 'author-sidebar__middle--main-links',
        links: [
            {
                path: '/',
                title: 'My Conference',
                image: <FontAwesomeIcon icon={faHouse} />,
                id: 0,
            },
            {
                path: '/all-conferences',
                title: 'All Conferences',
                image: <FontAwesomeIcon icon={faBook} />,
                id: 1,
            },
            {
                path: '/reviewer-response',
                title: 'Results',
                image: <FontAwesomeIcon icon={faMagnifyingGlassChart} />,
                id: 2,
            },
            {
                path: '/x',
                title: 'Ipsum Lorem',
                image: <FontAwesomeIcon icon={faHouse} />,
                id: 3,
            },
        ],
        id: 0
    },
    {
        heading: 'ACCOUNT PAGES',
        className: 'author-sidebar__middle--account-links',
        links: [
            {
                path: '/x',
                title: 'Profile',
                image: <FontAwesomeIcon icon={faHouse} />,
                id: 0,
            },
            {
                path: '/x',
                title: 'Settings',
                image: <FontAwesomeIcon icon={faHouse} />,
                id: 1,
            },
            {
                path: 'x',
                title: 'Lorem',
                image: <FontAwesomeIcon icon={faHouse} />,
                id: 2,
            },
            {
                path: '/x',
                title: 'Ipsum',
                image: <FontAwesomeIcon icon={faHouse} />,
                id: 3,
            },
        ],
        id: 1
    },
]