import { reactive, ref, Component } from "vue"

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

const index = ref(0)
const components = reactive([
    TestComA, TestComB
])

function Tabs() {
    return (
        <div>
            <ul class="tabs">
                <li onClick={() => index.value = 0}>Overview</li>
                <li onClick={() => index.value = 1}>Overview</li>
            </ul>

            {
                components[index.value]()
            }
        </div>
    )
}

export default Tabs