import { BannerImagesType } from "../../../../types/default/types"
import img1 from '../../../../assets/images/student1.jpg';
import img2 from '../../../../assets/images/student2.jpg';
import img3 from '../../../../assets/images/student3.jpg';
import img4 from '../../../../assets/images/student4.jpg';
const BannerImages: BannerImagesType = [
    {
        img: img1,
        size: '30rem',
        padding: '1rem',
        id: 0
    },
    {
        img: img2,
        size: '4rem',
        padding: '.2rem',
        id: 1
    },
    {
        img: img3,
        size: '5rem',
        padding: '.2rem',
        id: 2
    },
    {
        img: img4,
        size: '6rem',
        padding: '.2rem',
        id: 3
    },
]

export {
    BannerImages
}