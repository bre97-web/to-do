<template>
    <div class="relative border rounded-md px-4 py-2">
        <nav class="absolute right-1 top-1">
            <md-text-button @click="router.back()" label="Hidden"></md-text-button>
        </nav>

        <header>
            <h1>
                Help
            </h1>
            <p>
                你将从这里学习到使用本网页的技能！
            </p>
        </header>

        <main>
            <ol class="list-decimal">
                <li><h1>创建一个任务</h1></li>
                <p>注意页面顶部的输入框，在输入框中键入Created a task（或者键入你想要的字符），键入完毕后按下输入框旁的添加按钮（或者按下键盘的Enter键）以创建一个任务。</p>

                <li><h1>完成一个任务</h1></li>
                <p>你会发现此栏目新增了一个Created a task任务。</p>
                <p>点击任务旁的方形按钮以完成此任务。当任务完成时它将出现Bin栏目，此栏目中会出现你刚才完成的任务。如果你需要取消任务的完成状态请点击Undo按钮。</p>

                <li><h1>删除一个任务</h1></li>
                <p>当你点击在任务旁的Remove按钮后，任务将立即被永久删除且无法还原。</p>

                <li><h1>置顶一个任务</h1></li>
                <p>注意任务旁的爱心形状的按钮，点击后任务将会出现在Focus栏目中置顶，当再次点击爱心形状的按钮后取消置顶。</p>
            </ol>
        </main>
    </div>
</template>

<script setup>
import {
    useRouter
} from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="css">
    li {
        @apply hover:shadow-none pt-4;
    }
    li h1 {
        @apply font-bold;
    }
</style>