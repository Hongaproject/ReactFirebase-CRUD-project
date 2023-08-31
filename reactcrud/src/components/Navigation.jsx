import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Navigation () {

    return(
        <nav>
            <ul>
                <li>
                    <Link to ="/"><button>Home</button></Link>
                </li>
                <li>
                    <Link to ="/profile"><button>Profile</button></Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;