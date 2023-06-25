import { defineComponent } from 'vue'
import personal from '@/assets/js/personal'

const info = personal()

const AvatarBoard = defineComponent({
    render: () => (
        <div class="flex-none rounded-full overflow-clip border w-10 h-10 flex items-center justify-center">
            <h1>{info.get().name[0]}</h1>
        </div>
    )
})

export default AvatarBoard
