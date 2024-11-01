import { ManagementBoxesType } from "../../../../types/default/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleLine } from "@fortawesome/free-solid-svg-icons";
const managementBoxes: ManagementBoxesType = [
    {
        image: <FontAwesomeIcon icon={faPeopleLine} />,
        title: 'Membership Organisations',
        description: 'Our membership management software provides full automation of membership renewals and payments',
        id: 0,
    },
    {
        image: <FontAwesomeIcon icon={faPeopleLine} />,
        title: 'Membership Organisations',
        description: 'Our membership management software provides full automation of membership renewals and payments',
        id: 1,
    },
    {
        image: <FontAwesomeIcon icon={faPeopleLine} />,
        title: 'Membership Organisations',
        description: 'Our membership management software provides full automation of membership renewals and payments',
        id: 2,
    },
]

export {
    managementBoxes
}