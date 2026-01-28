import {useEffect, useState} from "react";
import { fileSystem, resolvePath, getNode } from "./TerminalFSController";
import { TERMINAL_COMMANDS } from "#constants/terminal_commands";



const USERNAME = "utnam";
const HOSTNAME = "trafficUser";
const HOME_PATH = `/Users/${USERNAME}`;

const LAST_LOGIN_KEY = "terminal_last_login";
const CURRENT_LOGIN_KEY = "terminal_current_login";

function getFormattedLoginTime(timestamp) {
    const date = new Date(timestamp);
    return date.toDateString().replace(/^\w+ /, "") +
        " " +
        date.toTimeString().split(" ")[0];
}

const HISTORY_KEY = "terminal_command_history";

const UPTIME_KEY = "terminal_uptime_start";

function getUptimeSeconds() {
    let start = localStorage.getItem(UPTIME_KEY);

    if (!start) {
        start = Date.now();
        localStorage.setItem(UPTIME_KEY, start);
    }

    return Math.floor((Date.now() - Number(start)) / 1000);
}

function formatUptime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
}



const formatCwd = (cwd) =>
    cwd.startsWith(HOME_PATH)
        ? cwd.replace(HOME_PATH, "~") || "~"
        : cwd;


const makePrompt = (cwd) =>
    `${USERNAME}@${HOSTNAME}:${formatCwd(cwd)}$`;





export function useTerminalEngine() {
    const [lastLogin, setLastLogin] = useState(() => {
        return localStorage.getItem(LAST_LOGIN_KEY);
    });

    useEffect(() => {
        const now = Date.now();

        // Store previous login
        const previousLogin = localStorage.getItem(CURRENT_LOGIN_KEY);
        if (previousLogin) {
            localStorage.setItem(LAST_LOGIN_KEY, previousLogin);
            setLastLogin(previousLogin);
        }

        // Set current login
        localStorage.setItem(CURRENT_LOGIN_KEY, now);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            localStorage.getItem(UPTIME_KEY);
        }, 30000);

        return () => clearInterval(id);
    }, []);

    const [history, setHistory] = useState([]);
    const [cwd, setCwd] = useState(HOME_PATH);

    // command history (↑ ↓)
    const [commandHistory, setCommandHistory] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        } catch {
            return [];
        }
    });
    const [historyIndex, setHistoryIndex] = useState(null);

    const saveCommand = (command) => {
        if (!command.trim()) return;

        setCommandHistory(prev => {
            const last = prev[prev.length - 1];
            if (last === command) return prev;

            const updated = [...prev, command];
            localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
            return updated;
        });
    };



    function parseArgs(input) {
        const args = [];
        let current = "";
        let inQuotes = false;
        let quoteChar = "";

        for (let i = 0; i < input.length; i++) {
            const char = input[i];

            if ((char === '"' || char === "'")) {
                if (!inQuotes) {
                    inQuotes = true;
                    quoteChar = char;
                    continue;
                }

                if (char === quoteChar) {
                    inQuotes = false;
                    quoteChar = "";
                    continue;
                }
            }

            if (char === " " && !inQuotes) {
                if (current) {
                    args.push(current);
                    current = "";
                }
                continue;
            }

            current += char;
        }

        if (current) args.push(current);

        return args;
    }



    const runCommand = (input) => {
        if (!input.trim()) return;

        // Echo prompt + command
        push(`${makePrompt(cwd)} ${input}`);
        saveCommand(input);
        setHistoryIndex(null); // reset navigation after execution
        const tokens = parseArgs(input.trim());
        const command = tokens[0];
        const rawArgs = tokens.slice(1);

        // Normalize args (~ support)
        const args = rawArgs.map(arg =>
            arg === "~" ? HOME_PATH :
                arg.startsWith("~/") ? `${HOME_PATH}/${arg.slice(2)}` :
                    arg
        );

        if (!TERMINAL_COMMANDS[command]) {
            push(`zsh: command not found: ${command}`);
            push(`try: \`help\``);
            return;
        }

        switch (command) {
            case "ls": {
                const node = getNode(fileSystem, cwd);
                if (!node || node.type !== "dir") {
                    push("ls: not a directory");
                    return;
                }


                const output = Object.keys(node.children)
                    .map(name => `'${name}'`)
                    .join(" ");


                push(output);
                break;
            }

            case "cd": {
                const target = args[0] || HOME_PATH;
                const resolved = resolvePath(cwd, target);
                const node = getNode(fileSystem, resolved);

                if (!node || node.type !== "dir") {
                    push(`cd: no such file or directory: ${target}`);
                    return;
                }

                setCwd(resolved);
                break;
            }

            case "clear": {
                setHistory([]);
                return;
            }

            case "help": {
                push(Object.keys(TERMINAL_COMMANDS).join("  "));
                break;
            }

            case "pwd": {
                push(cwd);
                break;
            }

            case "whoami": {
                push("trafficUser:\t(An Online traffic on my portfolio website)");
                break;
            }

            case "cat": {
                const filename = args[0];
                if (!filename) {
                    push("cat: missing file operand");
                    return;
                }

                const node = getNode(fileSystem, `${cwd}/${filename}`);
                if (!node || node.type !== "file") {
                    push(`cat: ${filename}: No such file`);
                    return;
                }

                push(node.content || "");
                break;
            }


            case "neofetch": {
                const uptime = formatUptime(getUptimeSeconds());
                const theme = document.documentElement.dataset.theme || "light";

                push("      ██║   ██║██████║");
                push("      ██║   ██║██║\t██║");
                push("      ██║   ██║██║\t██║");
                push("       ██████  ██║\t██║");
                push("");
                push(`OS: macOS (portfolioOS 😄)`);
                push(`Host: trafficUser`);
                push(`User: ${USERNAME}`);
                push(`Browser: ${navigator.userAgent.split(")")[0]})`);
                push(`Theme: ${theme}`);
                push(`Internet: ${navigator.onLine ? "Connected" : "Offline"}`);
                push(`Uptime: ${uptime}`);
                break;
            }




        }
    };


    const push = (text) => {
        setHistory((h) => [...h, text]);
    };

    return {
        history,
        cwd,
        runCommand,
        commandHistory,
        historyIndex,
        setHistoryIndex,
        lastLogin,
    };
}



