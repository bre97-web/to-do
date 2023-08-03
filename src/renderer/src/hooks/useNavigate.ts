
export type Navigation = {
    url: string
    label: string
    icon: string
}

export function useNavigate(url: string, label: string, icon: string, showInSmallScreen = true) {
    return ({
        url,
        label,
        icon,
        showInSmallScreen,
    }) as Navigation
}
