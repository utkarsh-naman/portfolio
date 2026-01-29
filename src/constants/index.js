import {TERMINAL_COMMANDS} from "#constants/terminal_commands.js";

const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Finder", // was "Finder"
        icon: "/applogos/finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Safari", // was "Safari"
        icon: "/applogos/safari.png",
        canOpen: true,
    },
    // {
    //     id: "photos",
    //     name: "Gallery", // was "Photos"
    //     icon: "/applogos/photos.png",
    //     canOpen: true,
    // },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "/applogos/contacts.png",
        canOpen: true,
    },
    // {
    //     id: "notes",
    //     name: "Note", // or "Get in touch"
    //     icon: "/applogos/notes.png",
    //     canOpen: true,
    // },
    {
        id: "terminal",
        name: "Terminal", // was "Terminal"
        icon: "/applogos/terminal.png",
        canOpen: true,
    },
    // {
    //     id: "settings",
    //     name: "Settings", // was "Trash"
    //     icon: "/applogos/settings.png",
    //     canOpen: true,
    // },
    {
        id: "trash",
        name: "Trash", // was "Trash"
        icon: "/applogos/trash.png",
        canOpen: true,
    },

];

const blogPosts = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
            "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/images/blog1.png",
        link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/images/blog2.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/images/blog3.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
];

const techStack = [
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript"],
    },
    {
        category: "Mobile",
        items: ["React Native", "Expo"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "Sass", "CSS"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "NestJS", "Hono"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/JavaScript-Mastery-Pro",
    },
    {
        id: 2,
        text: "Platform",
        icon: "/icons/atom.svg",
        bg: "#4bcb63",
        link: "https://jsmastery.com/",
    },
    {
        id: 3,
        text: "Twitter/X",
        icon: "/icons/twitter.svg",
        bg: "#ff866b",
        link: "https://x.com/jsmasterypro",
    },
    {
        id: 4,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/gal1.png",
    },
    {
        id: 2,
        img: "/images/gal2.png",
    },
    {
        id: 3,
        img: "/images/gal3.png",
    },
    {
        id: 4,
        img: "/images/gal4.png",
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Projects",
    icon: "/icons/work.svg",
    kind: "folder",
    changePermission: "denied",
    children: [
        // ▶ Project 1
        {
            id: 6,
            name: "Unc",
            icon: "/images/folder.png",
            kind: "folder",
            changePermission: "denied",
            // position: "top-10 left-5", // icon position inside Finder
            windowPosition: "top-[5vh] left-5", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "Unc_Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "txt",
                    // position: "top-5 left-10",
                    description: [
                        "Unc is a WASM (Web-Assembly) compatible engine-enabled Chopsticks (hand game) gamebot project built on C++. ",
                        "Unc is the project which is dearest to me cuz hell nawh I spent months understanding the game, starting with pen and paper to code, studied Graphs just to understand maps and what not.",
                        "I did not just solve it, I solved it optimally.",
                        "It is a no loss gamebot meaning you can never defeat it.",
                        "I boosted my C++ skills and cherry on top, learned the Mathematics behind the graph, limitations of MiniMax and then created my own algorithm which is self-proclaimed to be called as MaxiMax",
                    ],
                },
                {
                    id: 2,
                    name: "test-unc.site",
                    icon: "/images/safari.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "site",
                    href: "https://chopsticks.pages.dev",
                    // position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "unc.png",
                    icon: "/images/image.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "img",
                    // position: "top-52 right-80",
                    imageUrl: "/images/project-chopsticks.png",
                },
                {
                    id: 5,
                    name: "Unc.github",
                    icon: "/images/plain.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "github",
                    href: "https://github.com/utkarsh-naman/unc",
                    // position: "top-60 right-20",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 7,
            name: "utnampython",
            icon: "/images/folder.png",
            kind: "folder",
            changePermission: "denied",
            // position: "top-52 right-80",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Utnampython.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "txt",
                    // position: "top-5 right-10",
                    description: [
                        "utnampython: My own custom variant of standard python the programming language, cpython. Cuz, why not?",
                        "Includes 17+ sorting algorithms to choose from",
                        "TTE: text-to-expression that converts text expressions into python code equiavent. eg 2*pilne becomes 2*math.pi*math.ln(e)",
                        "Built on c and python",
                    ],
                },
                {
                    id: 2,
                    name: "utnampython.release",
                    icon: "/images/safari.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "site",
                    href: "https://github.com/utkarsh-naman/utnampython/releases/tag/utnampython3119",
                    // position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "utnampython.png",
                    icon: "/images/image.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "img",
                    // position: "top-52 left-80",
                    imageUrl: "/images/project-utnampython.png",
                },
                {
                    id: 5,
                    name: "utnampython.github",
                    icon: "/images/plain.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "github",
                    href: "https://github.com/utkarsh-naman/utnampython",
                    // position: "top-60 left-5",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 8,
            name: "3T",
            icon: "/images/folder.png",
            kind: "folder",
            changePermission: "denied",
            // position: "top-10 left-80",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "3T.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "txt",
                    // position: "top-5 left-10",
                    description: [
                        "3T: A tic-tac-toe WASM compatible gamebot written in golang.",
                        "Generated the complete graph of the game, reduced the symmetrical states into one canonical state",
                        "Efficient backtracking score setting using own algorithm: variant of MiniMax",
                        "It is a highly thought resource and computationally optimized tic-tac-toe bot with highly detailed ready to follow documentation that you will ever find.",
                    ],
                },
                {
                    id: 2,
                    name: "3T.site",
                    icon: "/images/safari.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "site",
                    href: "https://utkarsh-naman.github.io/3T/",
                    // position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "3T.png",
                    icon: "/images/image.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "img",
                    // position: "top-52 right-80",
                    imageUrl: "/images/project-3T.png",
                },
                {
                    id: 5,
                    name: "3T.github",
                    icon: "/images/plain.png",
                    kind: "file",
                    changePermission: "denied",
                    fileType: "github",
                    href: "https://github.com/utkarsh-naman/3T",
                    // position: "top-60 right-20",
                },
            ],
        },
    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    changePermission: "denied",
    children: [
        {
            id: 1,
            name: "firing.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-10 left-5",
            imageUrl: "/meimg/firing.png",
        },
        {
            id: 2,
            name: "me-n-friends.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-28 right-72",
            imageUrl: "/meimg/me-n-friends.png",
        },
        {
            id: 3,
            name: "crush.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-52 left-80",
            imageUrl: "/meimg/crush.jpg",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            changePermission: "denied",
            fileType: "txt",
            // position: "top-60 left-5",
            subtitle: "Yo! found me huh?",
            image: "/meimg/project-3T.png",
            description: [
                "I am Utkarsh Naman aka UtNam",
                "I solve problems that either bug me or I wonder how was it implemented.",
                "Loves optimization, especially resource optimization to improve backend health and lower the server costs",
                "Am rarely seen outside my house. ",
            ],
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    changePermission: "denied",
    children: [
        {
            id: 1,
            name: "resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            changePermission: "denied",
            fileType: "pdf",
            // you can add `href` if you want to open a hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
};


const ART_LOCATION = {
    id: 4,
    type: "art",
    name: "Art",
    icon: "/icons/edit.svg",
    kind: "folder",
    changePermission: "denied",
    children: [
        {
            id: 1,
            name: "cute-elephant.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-10 left-10",
            imageUrl: "/meimg/elephant.png",
        },
        {
            id: 2,
            name: "cat.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-40 left-80",
            imageUrl: "/meimg/neko.png",
        },

        {
            id: 5,
            name: "engineer-penguin.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-40 left-80",
            imageUrl: "/meimg/pengu.png",
        },
        {
            id: 6,
            name: "sketch.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-40 left-80",
            imageUrl: "/meimg/sk.png",
        },
        {
            id: 7,
            name: "BE.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-40 left-80",
            imageUrl: "/meimg/billie.png",
        },
    ],
};


const TRASH_LOCATION = {
    id: 5,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    changePermission: "denied",
    children: [
        {
            id: 2,
            name: "cat.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-40 left-80",
            imageUrl: "/meimg/neko.png",
        },
        {
            id: 3,
            name: "oh-dear.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-40 left-80",
            imageUrl: "/meimg/dear.png",
        },
        {
            id: 4,
            name: "peahen.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-40 left-80",
            imageUrl: "/meimg/peahen.png",
        },

        {
            id: 6,
            name: "duck.png",
            icon: "/images/image.png",
            kind: "file",
            changePermission: "denied",
            fileType: "img",
            // position: "top-40 left-80",
            imageUrl: "/meimg/duck.png",
        },
    ],
};



export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    art: ART_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    notes: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    settings: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    trash: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG, TERMINAL_COMMANDS };