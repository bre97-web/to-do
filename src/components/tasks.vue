<script>
let id = 0

export default {
    data() {
        return {
            keyWord: '',
            // 1: A-Z
            // 2: Z-A
            sortType: '1',


            tasks: [
                {
                    id: id++,
                    text: 'click delete to remove the task',
                    done:false
                },
                {
                    id: id++,
                    text: 'input and add a task',
                    done:false
                },
                {
                    id: id++,
                    text: 'do it',
                    done:false
                }
            ]
            
       }
    },
    computed: {
        visibleTasks() {
            var e = this.tasks.filter(p => p.text.indexOf(this.keyWord) !== -1)
            this.sort(e)
            return e
        },
        doneTasks() {
            var e = this.visibleTasks.filter(p => p.done)
            
            return e
        },
        doTasks() {
            var e = this.visibleTasks.filter(p => !p.done)
            
            return e
        },
    },
    methods: {
        add() {
            if(this.keyWord === null || this.keyWord === '') {
                return
            }

            this.tasks.push({
                id: id++,
                text: this.keyWord,
                done:false
            })

            this.clearKeyWord()
        },
        remove(e) {
            this.tasks = this.tasks.filter((p) => p !== e)
            this.clearKeyWord()
        },
        done(e) {
            setTimeout(() => e.done = true, 500)
        },
        undo(e) {
            setTimeout(() => e.done = false, 500)
        },

        clearKeyWord() {
            this.keyWord = ''
        },
        sort(e) {
            if(this.sortType) {
                e.sort((a, b) => {
                    return this.sortType === '1' ? a.id - b.id : b.id - a.id
                })
            }

            return e
        },

    },
}

</script>

<template>
    <div class="fixed bottom-5 w-full z-20">
        <div class="lg:max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
            <input @keydown.enter="add"   class="outline-none rounded-md border shadow-md bg-white w-1/2 h-10 focus:ring" type="text" placeholder="Search or add a task" v-model="keyWord">
            <button @click="add"          class="font-bold rounded-md border shadow-md bg-white w-14 h-10 hover:shadow-lg focus:ring active:bg-gray-100">Add</button>
            <select v-model="sortType" class="outline-none font-medium rounded-md border w-18 h-10 hover:shadow-lg focus:ring">
                <option value="1">Earliest</option>
                <option value="2">Latest</option>
            </select>
        </div>
    </div>

    <div class="mt-10 mb-20 flex flex-col items-center justify-center gap-10">
        
        <ul class="p-5 border rounded-xl shadow-sm flex flex-col gap-4 flex-wrap font-regular w-5/6 sm:rounded-xl lg:max-w-2xl mx-auto">    
            <p class="pt-2 pl-4 font-bold text-2xl">
                Today's Tasks
            </p>
            <li v-for="e in doTasks" :key="e.id" class="relative flex items-center gap-2 m-2 ml-5 text-left ">
                <input type="radio" @click="done(e)" :name="e.id" value="1" class="flex-none w-5 h-5 border border-black">
                <p class="flex-grow font-medium">
                    {{e.text}}
                </p>
                <div class="flex-none flex gap-2 ">
                    <button @click="remove(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-red-50 active:bg-red-500 active:text-white">Delete</button>
                </div>
            </li>
            <li v-if="doTasks.length == 0 && keyWord === ''" class="pt-4 pb-4 pl-4">All did it!</li>
            <li v-else-if="keyWord !== '' && visibleTasks.length == 0" class="pt-4 pb-4 pl-4">No Result</li>
        </ul>

        <ul v-if="doneTasks.length != 0" class="p-5  border rounded-xl flex flex-col gap-4 flex-wrap font-regular w-5/6 sm:rounded-xl lg:max-w-2xl mx-auto">    
            <p class="pl-4 font-bold text-2xl">
                Is Done Events
            </p>
            <li if="tasks.length != 0" v-for="e in doneTasks" :key="e.id" class="relative flex items-center m-2 ml-5 text-left">
                <p class="line-through flex-grow">{{e.text}}</p>
                <div class="flex-none flex gap-2">
                    <button @click="remove(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-red-50 active:bg-red-500 active:text-white">Delete</button>
                    <button @click="undo(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-blue-50 active:bg-blue-500 focus:ring active:text-white">Undo</button>
                </div>
            </li>
        </ul>
    </div>

</template>
