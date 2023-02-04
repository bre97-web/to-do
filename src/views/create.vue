<template>
    <div>
        <md-dialog open fullscreen="true">
            <header slot="header">
                <h1>Create</h1>
                <h2>This will create a task.</h2>
            </header>

            <md-text-button slot="footer" label="Cancel" dialogAction="cancel" @click="back()"></md-text-button>
            <md-filled-button slot="footer" label="Commit" dialogAction="commit"></md-filled-button>

            <md-filled-text-field
                label="Enter some text"
                dialogFocus
            >
            </md-filled-text-field>

        </md-dialog>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const r = useRouter()

function push(path) {
    r.push({
        path: path
    })
}

function back() {
    setTimeout(() => {
        r.back()
    }, 200)
}
</script>


<style scoped>

</style>