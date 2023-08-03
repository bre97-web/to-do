<template>
    <div class="hover:elevation bg-[var(--md-sys-color-surface-container-low)] relative">
        <md-ripple></md-ripple>
        <md-elevation></md-elevation>

        <header>
            <slot name="header"></slot>
        </header>

        <slot></slot>

        <footer>
            <slot name="footer"></slot>
        </footer>

        <nav class="absolute bottom-0 right-0 p-2 w-full flex justify-end">
            <slot name="nav"></slot>
        </nav>
    </div>
</template>
