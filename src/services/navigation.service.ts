import { ref } from 'vue'

export type NavLinkType = {
    label: string
    url: string
    iconString: string
}

export const NavigationServiceSymbol: unique symbol = Symbol("__navigation")

export interface INavigationService {

}

export class NavigationService implements INavigationService {

    public readonly navLinks: Array<NavLinkType> = [
        {
            iconString: 'home',
            label: 'Home',
            url: '/'
        },
        {
            iconString: 'settings',
            label: 'Settings',
            url: '/settings'
        },
    ]

    public readonly open = ref(false)

    constructor() {

    }
}
