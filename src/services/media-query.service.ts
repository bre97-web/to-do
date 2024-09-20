import { ref, type Ref } from 'vue'

export const MediaQueryServiceSymbol: unique symbol = Symbol("__media-query")

type MediaQueryType = {
    min: number | -1
    max: number | -1
}

export interface IMediaQueryService {
    configuration: Ref
}

export class MediaQueryService implements IMediaQueryService {
    public static readonly breakpoints: Record<string, MediaQueryType> = {
        compact: {
            min: -1,
            max: 600
        },
        medium: {
            min: 600,
            max: 840
        },
        expanded: {
            min: 840,
            max: 1200
        },
        large: {
            min: 1200,
            max: 1600
        },
        'extra-large': {
            min: 1600,
            max: -1
        }
    }

    public readonly configuration = ref({
        currentWidth: 0 as number,
        currentBreakpoint: 'compact',
    })

    public onWindowResize = (window: Window, target: HTMLElement) => {
        this.configuration.value.currentWidth = window.innerWidth

        Object.entries(MediaQueryService.breakpoints).forEach(([k, v]) => {
            if ((v.min === -1 || this.configuration.value.currentWidth >= v.min) && (v.max === -1 || this.configuration.value.currentWidth < v.max)) {
                this.configuration.value.currentBreakpoint = k
            }
        })

        target.classList.remove(...Object.keys(MediaQueryService.breakpoints).filter(e => e !== this.configuration.value.currentBreakpoint))
        if (!target.classList.contains(this.configuration.value.currentBreakpoint)) {
            target.classList.add(this.configuration.value.currentBreakpoint)
        }
    }
}
