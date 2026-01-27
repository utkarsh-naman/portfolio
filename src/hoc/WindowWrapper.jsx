import useWindowStore from "#store/window.js";
import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, maximizeWindow, windows } = useWindowStore();
        const { isOpen, zIndex, isMaximized, isMinimized } = windows[windowKey];
        const ref = useRef(null);

        const isMaximizedRef = useRef(isMaximized);
        const isRestoringByDragRef = useRef(false);
        const draggableInstance = useRef(null);
        const preMaximizeState = useRef({ x: 0, y: 0, width: 0, height: 0, top: 0, left: 0 });

        useLayoutEffect(() => {
            isMaximizedRef.current = isMaximized;
        }, [isMaximized]);

        // ----------------------------------------------------
        // 1. OPENING LOGIC
        // ----------------------------------------------------
        // ----------------------------------------------------
// 1. OPENING LOGIC
// ----------------------------------------------------
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            // 🔥 FIX: bring to front on first open
            focusWindow(windowKey);

            if (!isMinimized) {
                gsap.set(el, { clearProps: "all" });
                preMaximizeState.current = {
                    x: 0, y: 0, width: 0, height: 0, top: 0, left: 0
                };
            }

            if (draggableInstance.current) {
                draggableInstance.current.enable();
            }

            el.style.display = "flex";
            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );
        }, [isOpen]);
        // ----------------------------------------------------
        // 2. DRAGGABLE LOGIC (Snap-to-Restore)
        // ----------------------------------------------------
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                trigger: el.querySelector("#window-header"),
                allowEventDefault: true,
                dragClickables: false,
                minimumMovement: 6, // 🔥 key line

                onPress: function () {
                    focusWindow(windowKey);
                    // ❌ do NOT restore here
                },

                onDragStart: function () {
                    if (!isMaximizedRef.current) return;

                    isRestoringByDragRef.current = true;
                    maximizeWindow(windowKey);

                    const restoreWidth = preMaximizeState.current.width || 800;
                    const restoreHeight = preMaximizeState.current.height || 600;

                    const newX = this.pointerX - restoreWidth / 2;

                    gsap.set(el, {
                        width: restoreWidth,
                        height: restoreHeight,
                        x: newX,
                        y: 0,
                        borderRadius: "0.75rem"
                    });

                    this.update();
                }
            });

            draggableInstance.current = instance;
            return () => instance.kill();
        }, []);
        // ----------------------------------------------------
        // 3. RESIZE LOGIC (Fixed)
        // ----------------------------------------------------
        useGSAP(() => {
            const el = ref.current;
            const handle = el?.querySelector("[data-resize-handle]");

            // If handle doesn't exist (e.g. maximized), stop here.
            if (!el || !handle) return;

            const proxy = document.createElement("div");

            const [instance] = Draggable.create(proxy, {
                trigger: handle,
                type: "x,y",
                onPress: (e) => {
                    e.stopPropagation();
                    focusWindow(windowKey);
                },
                onDrag: function () {
                    if (isMaximizedRef.current) return;

                    const bounds = el.getBoundingClientRect();
                    const newWidth = this.pointerX - bounds.left;
                    const newHeight = this.pointerY - bounds.top;

                    gsap.set(el, {
                        width: Math.max(300, newWidth),
                        height: Math.max(200, newHeight)
                    });
                }
            });

            // Cleanup is crucial here since this hook re-runs
            return () => instance.kill();

            // 🔥 FIX: Re-run this hook when isMaximized changes so we re-attach to the new handle
        }, [isMaximized]);

        // ----------------------------------------------------
        // 4. MAXIMIZE / RESTORE LOGIC (Fixed Shift)
        // ----------------------------------------------------
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            if (isMaximized) {
                // 🔥 FIX: Strict Mode Safety Check
                // If the window is already ~full width, we assume this is a re-run.
                // We DO NOT overwrite preMaximizeState, otherwise we capture "0,0" and lose the original position.
                if (el.offsetWidth < window.innerWidth - 10) {
                    preMaximizeState.current = {
                        x: gsap.getProperty(el, "x"),
                        y: gsap.getProperty(el, "y"),
                        width: el.offsetWidth,
                        height: el.offsetHeight,
                        top: gsap.getProperty(el, "top"),
                        left: gsap.getProperty(el, "left")
                    };
                }

                gsap.to(el, {
                    x: 0, y: 0, top: 0, left: 0,
                    width: "100vw", height: "100vh",
                    borderRadius: 0,
                    duration: 0.4, ease: "power3.inOut"
                });
            } else {
                if (isRestoringByDragRef.current) {
                    isRestoringByDragRef.current = false;
                    return;
                }

                if (preMaximizeState.current.width === 0) return;

                gsap.to(el, {
                    x: preMaximizeState.current.x,
                    y: preMaximizeState.current.y,
                    top: preMaximizeState.current.top,
                    left: preMaximizeState.current.left,
                    width: preMaximizeState.current.width,
                    height: preMaximizeState.current.height,
                    borderRadius: "0.75rem",
                    duration: 0.4, ease: "power3.inOut",
                    onComplete: () => {
                        if (draggableInstance.current) draggableInstance.current.enable();
                    }
                });
            }
        }, [isMaximized]);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "flex" : "none";
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className={"absolute"}>
                <Component {...props} />

                {!isMaximized && (
                    <div
                        className="absolute right-0 bottom-0 w-4 h-4 cursor-nwse-resize"
                        data-resize-handle
                    />
                )}
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
}
export default WindowWrapper;