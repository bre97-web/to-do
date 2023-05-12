<template>
    <div>
        <div class="w-full border-b px-4">
            <ul class="tabs">
                <li
                    v-for="(_, name, index) in components"
                    :key="index"
                    :class="{'currentTab': currentName === name}"
                    @click="currentName = name"
                >
                    {{ name }}
                </li>
            </ul>

        </div>

        <component :is="components[currentName]"></component>
    </div>
</template>

<script lang="tsx" setup>

import { reactive, ref } from "vue"

function TestComA() {
    return (
        <div>
            TestComponent 1
        </div>
    )
}
function TestComB() {
    return (
        <div>
            TestComponent 2
        </div>
    )
}

const currentName = ref<string>('Overview')
const components = reactive({
    'Overview': TestComA, 
    'Overview2': TestComB
})

</script>


export default Tabs