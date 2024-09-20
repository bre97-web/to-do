<template>
    <div class="product-page-layout">

        <template v-if="!$slots.header">
            <Header headline="Todo">
                <template #start>
                    <md-icon-button @click="() => setNavigationDrawerOpen(!navigationDrawerOpen)">
                        <md-icon>{{ navigationDrawerOpen ? 'menu_open' : 'menu' }}</md-icon>
                    </md-icon-button>
                </template>

                <template #end>
                    <md-icon-button @click="() => setIsDark(!isDark)">
                        <md-icon>{{ isDark ? 'light_mode' : 'dark_mode' }}</md-icon>
                    </md-icon-button>
                </template>
            </Header>
        </template>
        <template v-else>
            <slot name="header"></slot>
        </template>


        <main
            class="content-view"
            :class="[navigationDrawerOpen && 'nav-open']"
        >
            <span class="content">
                <slot></slot>
            </span>

            <span class="navigation-drawer">
                <template v-if="!$slots['navigation-drawer']">
                    <NavigationDrawer
                        @scrim-click="() => setNavigationDrawerOpen(false)"
                        :modal="modal"
                        :nav-links="navigation.navLinks"
                        :open="navigationDrawerOpen"
                    ></NavigationDrawer>
                </template>
                <template v-else>
                    <slot name="navigation-drawer"></slot>
                </template>
            </span>

        </main>


    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { Header } from '../components/header/header'
import { NavigationDrawer } from '../components/navigation-drawer/navigation-drawer'
import { MaterialThemeConfigurationService, MaterialThemeConfigurationServiceSymbol } from '../services/material-theme-configuration.service'
import { MediaQueryServiceSymbol, type MediaQueryService } from '../services/media-query.service'
import { NavigationServiceSymbol, type NavigationService } from '../services/navigation.service'

const theme = inject<MaterialThemeConfigurationService>(MaterialThemeConfigurationServiceSymbol)!
const navigation = inject<NavigationService>(NavigationServiceSymbol)!
const mediaQuery = inject<MediaQueryService>(MediaQueryServiceSymbol)!

const modal = computed(() => mediaQuery.configuration.value.currentBreakpoint === 'compact')
const isDark = computed(() => theme.isDark)
const setIsDark = (isDark: boolean) => {
    theme.isDark = isDark
}
const navigationDrawerOpen = computed(() => navigation.open.value)
const setNavigationDrawerOpen = (open: boolean) => {
    navigation.open.value = open
}
</script>

<style scoped>
.product-page-layout {
    &>.content-view {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: 1fr;

        &>.content {
            grid-row: 1/2;
            grid-column: 2/3;
        }

        &>.navigation-drawer {
            grid-row: 1/2;
            grid-column: 1/2;
        }
    }
}

.product-page-layout {
    --header-height: 64px;

    min-height: 100svh;
    max-height: 100svh;
    overflow: hidden;
    position: relative;

    @apply bg-surface-container;

    &>.content-view {
        --content-view-content-margin: 0px;
        --content-view-height: calc(100svh - var(--header-height) - var(--content-view-content-margin));
        min-height: var(--content-view-height);
        max-height: var(--content-view-height);
        overflow: hidden;


        &>:is(.content, .navigation-drawer) {
            display: block;
            min-height: var(--content-view-height);
            max-height: var(--content-view-height);
        }

        &>.content {
            transition-property: background-color, color, border-radius, margin;
            overflow: auto;
            border-radius: 0px;

            @media (min-width: 600px) {
                margin-top: 0px;
                margin-bottom: var(--content-view-content-margin);
                margin-left: var(--content-view-content-margin);
                margin-right: var(--content-view-content-margin);
            }

            @media (min-width: 600px) {
                border-radius: 28px;
            }

            @apply bg-surface;
        }

        &>.navigation-drawer {
            @media (min-width: 600px) {
                margin-top: 0px;
                margin-bottom: var(--content-view-content-margin);
                margin-left: 0px;
                margin-right: 0px;
            }
        }

        &:not(.nav-open)>.content {
            @apply transition-easing-emphasized-accelerate transition-duration-emphasized-accelerate;
        }

        &.nav-open {
            --content-view-content-margin: 8px;

            &>.content {
                @apply transition-easing-emphasized-decelerate transition-duration-emphasized-decelerate;
            }
        }

        @media (min-width: 600px) {
            --content-view-content-margin: 8px;
        }
    }
}
</style>
