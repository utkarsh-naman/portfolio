import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControl from "#components/WindowControl.jsx";
import useWindowStore from "#store/window.js";

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    // 🔥 FIX: Destructure 'imageUrl' instead of 'src' to match index.js
    const { name, imageUrl } = data;

    return (
        <>
            {/* Header:
               - Added 'data-window-drag-handle' so WindowWrapper knows this is the drag zone.
               - Added 'select-none' so text highlighting doesn't interfere with dragging.
            */}
            <div
                id="window-header"
                data-window-drag-handle
                className="cursor-default flex items-center gap-4 select-none"
            >
                <WindowControl target={"imgfile"} />
                {/* CSS in index.css targets 'p' inside #imgfile #window-header */}
                <p className="text-sm">{name}</p>
            </div>

            {/* Body:
               - Matches .preview class in index.css
               - Removed fixed padding/margins that might fight against resizing
            */}
            <div className="preview flex items-center justify-center w-full h-full bg-gray-100 overflow-hidden relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name || "Image Preview"}
                        className="w-full h-full object-contain pointer-events-none select-none"
                        draggable={false}
                    />
                ) : (
                    <div className="p-10 text-gray-400 text-sm">Image not found</div>
                )}
            </div>
        </>
    );
};

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;