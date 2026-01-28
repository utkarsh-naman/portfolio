function locationItemToFSNode(item) {
    if (item.kind === "folder") {
        const children = {};

        (item.children || []).forEach(child => {
            children[child.name] = locationItemToFSNode(child);
        });

        return {
            type: "dir",
            meta: item,          // 👈 keep reference for Finder / opening
            children
        };
    }

    // file
    return {
        type: "file",
        meta: item,              // 👈 VERY important
        content: item.description?.join("\n") || "",
    };
}

export function locationsToFileSystem(locations) {
    const userChildren = {};

    Object.values(locations).forEach(location => {
        userChildren[location.name] = locationItemToFSNode(location);
    });

    return {
        name: "/",
        type: "dir",
        children: {
            Users: {
                type: "dir",
                children: {
                    utnam: {
                        type: "dir",
                        children: userChildren
                    }
                }
            }
        }
    };
}