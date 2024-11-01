import { NavbarSignButton, SocialLink } from "./types";
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
export type SignButtonProps = {
    type: NavbarSignButton
}

export type PrimaryLinkProps = {
    path: string
    title: string
    arrow?: IconDefinition
}

type FooterLink = {
    title: string
    path: string
    id: number
}

export type FooterLinks = {
    title: string
    className: string
    links: FooterLink[]
    id: number
}[]

export type SocialLinks = SocialLink[]

export type FooterComponentsProps = {
    paperPlaneIcon: JSX.Element
    footerLinks: FooterLinks
    socialLinks: SocialLinks
}

export type ManagementBoxProp = {
    image: JSX.Element
    title: string
    description: string
    id: number
}

export type BenefitProp = {
    image: string
    title: string
    description: string
    flexDirection: string
    path: string
    id: number
}