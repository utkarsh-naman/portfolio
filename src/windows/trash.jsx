import useWindowStore from "#store/window.js";



const Trash = () => {
    const {openWindow} = useWindowStore();
    openWindow("trash");
}




export default Trash
