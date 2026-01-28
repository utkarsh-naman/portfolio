import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControl from "#components/WindowControl.jsx";
import {PanelLeft, ChevronLeft, ChevronRight, ShieldHalf, Search, Share, Plus, Copy, CheckCircle} from "lucide-react";

import "./safari.css"
import {useEffect, useState, useRef} from "react";
import { marked } from "marked";

const renderer = new marked.Renderer();

renderer.link = function({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    return `
        <a
        href="${href}"
        target="_blank"
        rel="noopener noreferrer"
        ${title ? `title="${title}"` : ""}
        >
        ${text}
        </a>
        `;
};

function forceExternalLinks(html) {
    return html.replace(
        /<a\s+(?![^>]*target=)[^>]*href="(http[^"]+)"[^>]*>/gi,
        (match) => {
            if (match.includes("target=")) return match;
            return match.replace(
                "<a",
                '<a target="_blank" rel="noopener noreferrer"'
            );
        }
    );
}

marked.setOptions({
    gfm: true,
    breaks: true,
    renderer,
});

const Safari = () => {
    const [readmeHtml, setReadmeHtml] = useState("");
    const searchRef = useRef(null);

    // --- Toast State ---
    const [toast, setToast] = useState({ show: false, message: "" });
    const toastTimerRef = useRef(null);

    // --- Toast Helper ---
    const triggerToast = (msg) => {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

        setToast({ show: true, message: msg });

        toastTimerRef.current = setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 2000);
    };

    // --- Drag Prevention for Search Bar ---
    useEffect(() => {
        const el = searchRef.current;
        if (!el) return;

        const stopDrag = (e) => {
            e.stopPropagation();
        };

        // Stop drag events on Search Bar
        el.addEventListener("pointerdown", stopDrag);
        el.addEventListener("mousedown", stopDrag);

        return () => {
            el.removeEventListener("pointerdown", stopDrag);
            el.removeEventListener("mousedown", stopDrag);
        };
    }, []);

    // --- Fetch Markdown ---
    useEffect(() => {
        fetch("/mds/README.md")
            .then(res => res.text())
            .then(md => {
                let parsed = marked.parse(md);
                parsed = forceExternalLinks(parsed);
                setReadmeHtml(parsed);
            });
    }, []);

    // --- Handlers ---
    const handleCopyGitHub = () => {
        navigator.clipboard.writeText("https://github.com/utkarsh-naman")
            .then(() => triggerToast("Copied GitHub Profile"))
            .catch(() => triggerToast("Failed to copy"));
    };

    const handleSharePortfolio = () => {
        navigator.clipboard.writeText("https://utkarsh-naman-portfolio.pages.dev")
            .then(() => triggerToast("Link Copied to Clipboard"))
            .catch(() => triggerToast("Failed to copy"));
    };

    return (<>
        <div id={"window-header"}>
            <WindowControl target={"safari"}/>

            <div className={"flex items-center gap-1 ml-0"}>
                <PanelLeft className={"ml-10 icon"} />
                <ChevronLeft className={"icon"} />
                <ChevronRight className={"icon"} />
            </div>

            <div className={"flex items-center gap-1 ml-3 flex-1"}>
                <ShieldHalf className={"icon"}/>
                <div className={"search mr-3"} ref={searchRef}>
                    <Search className={"icon"}/>
                    <input
                        type={"text"}
                        placeholder={"https://github.com/utkarsh-naman/utkarsh-naman/blob/main/README.md"}
                        className={"flex-1 w-full bg-transparent outline-none"}
                    />
                </div>
            </div>

            {/* CRITICAL FIX: onPointerDown stopPropagation ensures these buttons click instead of dragging the window */}
            <div
                className={"flex items-center gap-5 mr-3"}
                onPointerDown={(e) => e.stopPropagation()}
            >
                <Share
                    className={"icon cursor-pointer hover:text-blue-500 active:scale-90 transition-all"}
                    onClick={handleSharePortfolio}
                />
                <Plus className={"icon"}/>
                <Copy
                    className={"icon cursor-pointer hover:text-green-500 active:scale-90 transition-all"}
                    onClick={handleCopyGitHub}
                />
            </div>
        </div>

        <div className="flex safari-body relative">
            <article
                className="readme-content"
                dangerouslySetInnerHTML={{ __html: readmeHtml }}
            />
        </div>

        {/* --- macOS Style Toast --- */}
        <div
            className={`
                absolute bottom-12 left-1/2 -translate-x-1/2
                flex items-center gap-2 px-4 py-2.5
                bg-black/30 backdrop-blur-xl 
                text-white text-sm font-medium 
                rounded-full shadow-2xl border border-white/10
                pointer-events-none z-[9999]
                transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${toast.show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
            `}
        >
            <CheckCircle size={16} className="text-green-400" />
            <span>{toast.message}</span>
        </div>
    </>);
};

const SafariWindow = WindowWrapper(Safari, 'safari');

export default SafariWindow;