interface NotificationInterface {
    title: string
    option?: {
        body: string
    }
}

function useNotice({ title, option }: NotificationInterface) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        return undefined
    }
    const notification = new Notification(title, {
        body: option?.body,
        // icon: '@/assets/img/to-do.png'
    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    notification.addEventListener('show', () => {})
}

function checkPermission() {
    if (Notification.permission !== 'denied') {
        Notification.requestPermission()
    }
}

export { useNotice, checkPermission }
