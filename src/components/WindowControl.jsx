import useWindowStore from "#store/window.js";

const WindowControl = ({target}) => {

    const {closeWindow, minimizeWindow, maximizeWindow} = useWindowStore();

    return (
        <div id={"window-controls"}>
            <div className={"close"} onClick={ () => closeWindow(target)}></div>
            <div className={"minimize"} onClick={ () => minimizeWindow(target)}></div>
            <div className={"maximize"}onClick={ () => maximizeWindow(target)}></div>
        </div>
    )
}
export default WindowControl
