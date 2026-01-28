import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControl from "#components/WindowControl.jsx";
import useWindowStore from "#store/window.js";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    const {
        name,
        image,
        subtitle,
        description = [],
    } = data;

    return (
        <>
            <div id="window-header">
                <WindowControl target={"txtfile"} />
                <h2>{name}</h2>
            </div>

            {/* ───── Body ───── */}
            <div className="p-6 space-y-4">
                {image ? (
                    <div className={""}>
                        <img src={image} alt={name} className={"w-full h-auto rounded"} />
                    </div>
                ): null}

                {subtitle? <h3 className={"text-lg font-semibold"}>{subtitle}</h3>: null}

                {Array.isArray(description) && description.length > 0 ? (
                    <div className={"space-y-3 leading-relaxed text-base text-gray-800"}>
                    {description.map((para, idx) => (
                        <p key={idx}>{para}</p>
                        ))}
                    </div>
                ): null}
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;