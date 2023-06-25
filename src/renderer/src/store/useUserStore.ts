import { defineStore } from 'pinia'

const useUserStore = defineStore('user_store', {
    state: () => ({
        name: 'Lily' as string
    }),
    getters: {
        getName: (state): string => state.name
    },
    actions: {
        setName(name: string) {
            this.name = name
        }
    },
    persist: true
})

export { useUserStore }
