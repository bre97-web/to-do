import { EventInterface } from '@/hooks/useEvent'

const Event = ({msg, isRollback}: EventInterface) => (
    <div class="event">
        <h1>
            { msg }
        </h1>
        <div
            class={!isRollback ? 'invisible' : ''}
        >
            <md-text-button>Undo</md-text-button>
        </div>
    </div>
)

export {
    Event
}
