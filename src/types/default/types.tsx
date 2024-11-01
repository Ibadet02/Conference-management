import { theme } from "../../data/Theme"
import { BenefitProp, ManagementBoxProp } from "./props"

type NavbarLink = {
    title: string
    path: string
    id: number
}

export type NavbarLinks = NavbarLink[]

export type Theme = typeof theme;

export type NavbarSignButton = {
    title: string
    types: {
        title: string
        path: string
        id: number
    }[]
}
export type NavbarSignButtons = {
    register: NavbarSignButton
    login: NavbarSignButton
}

export type BannerImageType = {
    img: string
    size: string
    padding: string
    id: number
}

export type BannerImagesType = BannerImageType[]

export type ManagementBoxesType = ManagementBoxProp[]

export type BenefitDataType = BenefitProp[]

export type SocialLink = {
    image: JSX.Element
    path: string
    title: string
    id: number
}

export type SocialLinksType = SocialLink[]