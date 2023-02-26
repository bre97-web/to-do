
const DarkStore = {
    namespaced: true,
    state: {
        isDark: JSON.parse(localStorage.getItem('dark')) || false,
    },
    getters: {
        get: (state) => state.isDark,
    },
    actions: {
        set(miniStore, value) {
            console.log(value);
            miniStore.commit('SET', value)
        },
    },
    mutations: {
        SET(state, value) {
            state.isDark = value
            localStorage.setItem('dark', JSON.stringify(state.isDark))
        },
    },
}

export default DarkStore