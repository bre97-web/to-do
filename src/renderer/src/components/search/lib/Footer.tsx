import { Items } from '@/hooks/useList/lib/useItem'

interface ItemsInnerInterface {
    get: Items
}

const Footer = ({get}: ItemsInnerInterface) => (
    <footer>
        <p class="text-right text-secondary">
            Accumulate { get.length } results
        </p>
    </footer>
)

export {
    Footer
}