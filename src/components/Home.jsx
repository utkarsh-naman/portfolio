import {locations} from "#constants/index.js";
import clsx from "clsx";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const Home = () => {

    const projects = locations.work?.children ?? [];
    const {openWindow} = useWindowStore();
    const {setActiveLocation} = useLocationStore();
    const handleOpenWindow = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    }

    useGSAP(() => {
        Draggable.create(".folder");
    }, []);


    return (
        <section id={"home"}>
            <ul className={"homeFolderCont"}>
                {projects.map((project) => (
                    <li key={project.id} className={clsx("group folder")}
                    onClick={() => handleOpenWindow(project)}>
                        <img src={"/images/folder.png"} alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
export default Home
