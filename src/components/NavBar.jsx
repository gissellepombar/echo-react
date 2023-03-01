import { Link } from "react-router-dom"

export default function NavBar() {

    return(
        <>
            <Link to="/">Get Started</Link>
            <Link to="/decks">Decks</Link>
            <Link to="/browse">Browse</Link>
        </>
    )
}
