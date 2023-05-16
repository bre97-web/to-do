<template>
    <div class="fixed hidden lg:block left-0 pl-4 w-44 h-96">
        <div class="sidebar">
            <h1>Sidebar</h1>
            <ul>
                <li>
                    <header>
                        <h1>Set a goal to do it</h1>
                        <p>Including some steps</p>
                    </header>
                    <footer class="action">
                        <md-tonal-button
                            disabled
                            @click="createGoal"
                        >Create</md-tonal-button>
                    </footer>
                </li>

                <li>More features is coming.</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>

const createGoal = () => {

}
</script>