export const fileSystem = {
    name: "/",
    type: "dir",
    children: {
        Users: {
            type: "dir",
            children: {
                utnam: {
                    type: "dir",
                    children: {
                        projects: {
                            type: "dir",
                            children: {}
                        },
                        skills: {
                            type: "dir",
                            children: {}
                        },
                        "about.txt": {
                            type: "file",
                            content: "Hi, I’m Utkarsh 👋"
                        }
                    }
                }
            }
        }
    }
};



// export function resolvePath(cwd, path) {
//     if (!path || path === ".") return cwd;
//
//     // normalize
//     path = path.replace(/\/+$/, ""); // remove trailing slash
//
//     if (path === "..") {
//         const parts = cwd.split("/").filter(Boolean);
//         if (parts.length <= 1) return "/";
//         parts.pop();
//         return "/" + parts.join("/");
//     }
//
//     if (path.startsWith("/")) return path;
//
//     return cwd === "/" ? `/${path}` : `${cwd}/${path}`;
// }


export function resolvePath(cwd, path) {
    if (!path || path === ".") return cwd;

    // Remove trailing slashes
    path = path.replace(/\/+$/, "");

    // Determine starting point
    let parts = path.startsWith("/")
        ? []
        : cwd.split("/").filter(Boolean);

    const segments = path.split("/").filter(Boolean);

    for (const segment of segments) {
        if (segment === ".") continue;

        if (segment === "..") {
            if (parts.length > 0) parts.pop();
            continue;
        }

        parts.push(segment);
    }

    return "/" + parts.join("/");
}

export function getNode(fs, path) {
    const parts = path.split("/").filter(Boolean);
    let current = fs;

    for (const part of parts) {
        if (!current.children || !current.children[part]) return null;
        current = current.children[part];
    }

    return current;
}