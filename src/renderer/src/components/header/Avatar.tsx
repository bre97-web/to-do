import { defineComponent, reactive } from "vue"

const info = reactive(JSON.parse(localStorage.getItem('bre97-web-todo-personal-info') as string) || {
    name: 'Click me to edit your info',
})

const AvatarBoard = defineComponent({
    render() {
        return (
            <div
                class="flex-none rounded-full overflow-clip border w-10 h-10 flex items-center justify-center bg-off-base"
            >
                <h1>{ info.name }</h1>
            </div>
        )
    }
})
// (e: UserName) => (

export default AvatarBoard