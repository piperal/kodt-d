import Link from 'next/link'

export default function Navbar() {
    return (<>
        <div id="links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </div>


    </>)
}