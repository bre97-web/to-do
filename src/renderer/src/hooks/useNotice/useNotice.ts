
interface NotificationInterface {
    title: string
    option?: {
        body: string
        // 图标已被固定
        // icon: string
    }
}

function useNotice({title, option}: NotificationInterface) {
    if (!("Notification" in window) || Notification.permission !== "granted") {
        return undefined
    }
    const notification = new Notification(title, {
        body: option?.body,
        icon: './src/renderer/src/assets/img/icon.png',
    })    
}

function checkPermission() {
    if (Notification.permission !== "denied") {
        Notification.requestPermission()
    }
}


export {
    useNotice,
    checkPermission
}