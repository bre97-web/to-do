import { Items } from '@/hooks/useList'

interface ItemsInnerInterface {
    get: Items
}

const Footer = ({get}: ItemsInnerInterface) => (
    <footer>
        <p class="text-right text-gray-500 dark:text-gray-300">
            Accumulate { get.length } results
        </p>
    </footer>
)

export {
    Footer
}