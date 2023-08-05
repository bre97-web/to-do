interface NotificationInterface {
    title: string
    option?: {
        body?: string
        handler?: () => void
    }
}

function useNotice(e: NotificationInterface) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        return undefined
    }
    const notification = new Notification(e.title, {
        body: e.option?.body,
    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    notification.addEventListener('click', () => e.option?.handler)
}

function checkPermission() {
    if (Notification.permission !== 'denied') {
        Notification.requestPermission()
    }
}

export { useNotice, checkPermission }
