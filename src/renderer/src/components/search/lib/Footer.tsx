import { Items } from '@/hooks/useItem'

interface ItemsInnerInterface {
    get: Items
}

const Footer = ({ get }: ItemsInnerInterface) => (
    <footer>
        <p class="text-right text-onBackground">Accumulate {get.length} results</p>
    </footer>
)

export { Footer }
