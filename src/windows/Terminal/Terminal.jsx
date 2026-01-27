import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { useTerminalEngine } from "./useTerminalEngine";
import { useState, useRef, useEffect } from "react";
import WindowControl from "#components/WindowControl.jsx";

const Terminal = () => {
    const inputRef = useRef(null);
    const terminalBodyRef = useRef(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const {
        history,
        cwd,
        runCommand,
        commandHistory,
        historyIndex,
        setHistoryIndex,
        lastLogin,
    } = useTerminalEngine();

    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            runCommand(input);
            setInput("");
            return;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (!commandHistory.length) return;

            const newIndex =
                historyIndex === null
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);

            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === null) return;

            const newIndex = historyIndex + 1;

            if (newIndex >= commandHistory.length) {
                setHistoryIndex(null);
                setInput("");
            } else {
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        }
    };

    useEffect(() => {
        const el = terminalBodyRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [history]);

    return (
        <>
            <div id="window-header">
                <WindowControl target={"terminal"}/>
                <h2>zsh</h2>
            </div>

            <div
                ref={terminalBodyRef}
                className="terminal-body font-roboto text-sm p-4 space-y-1 cursor-text"
                onClick={focusInput}
            >
                <p>
                    Last login:{" "}
                    {lastLogin
                        ? `${new Date(Number(lastLogin)).toDateString()} ${new Date(Number(lastLogin)).toTimeString().split(" ")[0]}`
                        : "First login"}{" "}
                    on ttys000
                </p>

                {history.map((line, i) => (
                    <p key={i}>{line}</p>
                ))}

                <div className="flex">
                    <span className="font-bold">
                        {cwd === "/Users/utnam"
                            ? "utnam@trafficUser:~$"
                            : cwd.startsWith("/Users/utnam/")
                                ? `utnam@trafficUser:~${cwd.slice("/Users/utnam".length)}$`
                                : `utnam@trafficUser:${cwd}$`}
                        &nbsp;
                    </span>

                    <input
                        ref={inputRef}
                        className="bg-transparent outline-none flex-1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </div>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;