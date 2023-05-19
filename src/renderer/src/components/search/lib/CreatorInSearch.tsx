import { useTasks } from '@/hooks/useTasks'

interface InputInterface {
    input: string
}

/**
 * 创建TASKS元素，add方法仅仅接收一个title参数，它在创建TASK元素时不会提供除了title以外的任何参数
 */
const tasks = useTasks()
const add = (title: string) => {
    tasks.get().taskList.push({
        title: title,
        subtitle: '',
        tags: [],
        note: '',
        steps: [{
            text: '',
            done: false
        }],
        type: 'task',
    })
}


const CreatorInSearch = ({input}: InputInterface) => (
    <div>
        <header class="text-right">
            <h1>{ input } is not found</h1>
        </header>

        <main class="flex justify-end">
            <div class="flex items-center gap-2">
                <md-tonal-button
                    onClick={() => add(input)}
                >Create</md-tonal-button>
            </div>
        </main>
    </div>
)


export {
    CreatorInSearch
}
