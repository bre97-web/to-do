<template>
    <ul class="flex flex-col gap-2">
        <li
            v-for="(e, index) in theme.getThemeColor()"
            :key="index"
            class="flex items-center justify-start"
        >
            <label>
                <p>{{ e }}</p>
                <md-radio
                    name="theme"
                    class="absolute right-0"
                    @click="
                        theme.set({
                            color: e
                        })
                    "
                ></md-radio>
            </label>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import useTheme from '@/hooks/useTheme'

const theme = useTheme()
</script>
