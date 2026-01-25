import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { navIcons, navLinks } from "#constants/index.js";

const Navbar = () => {
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs());
        }, 1000); // update every second

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-normal">Utkarsh Naman</p>

                <ul>
                    {navLinks.map(({ id, name }) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img
                                src={img}
                                alt={`Navbar-Icon${id}`}
                                className="icon-hover"
                            />
                        </li>
                    ))}
                </ul>

                <time>{time.format("ddd MMM D h:mm A")}</time>
            </div>
        </nav>
    );
};

export default Navbar;
