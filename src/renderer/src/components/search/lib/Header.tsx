interface InputInterface {
    input: string
}

const Header = ({ input }: InputInterface) => (
    <div>
        <header class="flex flex-row items-end justify-start gap-2">
            <h1 class="text-onBackground">Search</h1>
            <h1 class="text-onBackground underline underline-offset-1">
                <mark>{input}</mark>
            </h1>
        </header>
    </div>
)

export { Header }
