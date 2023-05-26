<template>
    <header class="topBar">
        <div class="px-4 py-2 flex flex-row items-center justify-between w-full gap-2">
            <!-- Web Title -->
            <Title></Title>

            <!-- Search input -->
            <SearchInput></SearchInput>

            <div class="text-right">
                <Menu as="div">
                    <MenuButton class="relative inline-flex w-10 h-10">
                        <Avatar></Avatar>
                    </MenuButton>
                    <MenuItems class="absolute right-4 flex flex-col gap-2 border rounded-md px-4 py-2 bg-white dark:bg-black">
                        <MenuItem>
                            <router-link to="/me">Account</router-link>
                        </MenuItem>

                        <md-divider></md-divider>

                        <MenuItem>
                            <router-link to="/settings">Settings</router-link>  
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>


            <!-- Settings and other buttons -->
            <!-- <Settings></Settings> -->

            <!-- Users avatar-->
            <!-- <Avatar></Avatar> -->
        </div>
    </header>
</template>

<script lang="tsx" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Avatar from '@/components/setting/lib/Avatar'
import '@material/web/divider/divider'

interface Props {
    input: string
}
const props = withDefaults(defineProps<Props>(), {
    input: ''
})
const emits = defineEmits(['setInput'])

/**
 * Component
 */
const Title = () => (
    <div class="flex flex-col flex-none">
        <h1 class="text-base">To-Do</h1>
        <p class="text-xs">Preview</p>
    </div>    
)
const SearchInput = () => (
    <div class="relative w-full flex items-center justify-center">
        <md-icon class="material-icons relative left-10 text-base">search</md-icon>
        <input
            value={props.input}
            type="text"
            placeholder="Search"
            onInput={(e) => emits('setInput', (e.target as HTMLInputElement).value)}
        />
    </div>
)
</script>
