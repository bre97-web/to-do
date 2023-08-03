
export type Navigation = {
    url: string
    label: string
    icon: string
}

export function useNavigate(url: string, label: string, icon: string) {
    return ({
        url,
        label,
        icon
    }) as Navigation
}
