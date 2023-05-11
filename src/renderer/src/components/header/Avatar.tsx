import { defineComponent } from "vue"
import personal from '@/assets/js/personal'

const info = personal()

const AvatarBoard = defineComponent({
    render() {
        return (
            <div
                class="flex-none rounded-full overflow-clip border w-10 h-10 flex items-center justify-center bg-off-base"
            >
                <h1>{ info.get().name }</h1>
            </div>
        )
    }
})
// (e: UserName) => (

export default AvatarBoard