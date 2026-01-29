// // src/components/NotchNook/NotchNook.jsx
// import { useEffect, useState } from "react";
// import NotificationPanel from "./NotificationPanel";
// import "./notchNook.css";
//
// const API_URL =
//     "https://utkarsh-naman.github.io/repo-updates/get-updates.json";
//
// const POLL_INTERVAL = 15000; // testing
//
// export default function NotchNook() {
//     const [expanded, setExpanded] = useState(false);
//     const [summary, setSummary] = useState(null);
//     const [showPanel, setShowPanel] = useState(false);
//
//     useEffect(() => {
//         fetchAndProcess();
//         const id = setInterval(fetchAndProcess, POLL_INTERVAL);
//         return () => clearInterval(id);
//     }, []);
//
//     async function fetchAndProcess() {
//         try {
//             const res = await fetch(API_URL);
//             const data = await res.json();
//
//             // ✅ load repo index (source of truth)
//             const repoIndex =
//                 JSON.parse(localStorage.getItem("repoIndex")) || {};
//
//             let newRepos = 0;
//             let updates = 0;
//             let releases = 0;
//             let deployments = 0;
//
//             const notifications = {};
//
//             data.projects.forEach((proj) => {
//                 const key = proj.projectName;
//                 const saved = repoIndex[key];
//
//                 /* ---------- NEW REPO ---------- */
//                 if (!saved) {
//                     newRepos++;
//
//                     notifications[`repo-${key}`] = {
//                         id: crypto.randomUUID(),
//                         type: "repo",
//                         title: "New repository",
//                         message: proj.projectName,
//                         link: proj.repoLink,
//                         time: Date.now()
//                     };
//
//                     repoIndex[key] = {
//                         lastUpdated: proj.lastUpdated
//                     };
//                 }
//
//                 /* ---------- UPDATE ---------- */
//                 else if (
//                     new Date(proj.lastUpdated) >
//                     new Date(saved.lastUpdated)
//                 ) {
//                     updates++;
//
//                     notifications[`update-${key}`] = {
//                         id: crypto.randomUUID(),
//                         type: "update",
//                         title: "Repository updated",
//                         message: proj.projectName,
//                         link: proj.repoLink,
//                         time: Date.now()
//                     };
//
//                     repoIndex[key].lastUpdated = proj.lastUpdated;
//                 }
//
//                 /* ---------- RELEASES ---------- */
//                 (proj.newReleases || []).forEach((rel) => {
//                     releases++;
//
//                     notifications[
//                         `release-${key}-${rel.tag}`
//                         ] = {
//                         id: crypto.randomUUID(),
//                         type: "release",
//                         title: "New release",
//                         message: `${proj.projectName} · ${rel.tag}`,
//                         link: rel.releasedAt,
//                         time: Date.now()
//                     };
//                 });
//
//                 /* ---------- DEPLOYMENTS ---------- */
//                 (proj.newDeployments || []).forEach((dep) => {
//                     deployments++;
//
//                     notifications[
//                         `deploy-${key}-${dep.deployedAt}`
//                         ] = {
//                         id: crypto.randomUUID(),
//                         type: "deployment",
//                         title: "New deployment",
//                         message: proj.projectName,
//                         link: dep.deployedAt,
//                         time: Date.now()
//                     };
//                 });
//             });
//
//             if (Object.keys(notifications).length === 0) return;
//
//             // merge with existing notifications
//             const stored =
//                 JSON.parse(localStorage.getItem("notifications")) || [];
//
//             localStorage.setItem(
//                 "notifications",
//                 JSON.stringify([
//                     ...Object.values(notifications),
//                     ...stored
//                 ])
//             );
//
//             // ✅ persist repo index
//             localStorage.setItem(
//                 "repoIndex",
//                 JSON.stringify(repoIndex)
//             );
//
//             setSummary({
//                 newRepos,
//                 updates,
//                 releases,
//                 deployments
//             });
//
//             setExpanded(true);
//             setTimeout(() => setExpanded(false), 10000);
//         } catch (err) {
//             console.error("NotchNook fetch failed", err);
//         }
//     }
//
//     return (
//         <>
//             <div
//                 className={`notch-nook ${expanded ? "expanded" : ""}`}
//                 onMouseEnter={() => setExpanded(true)}
//                 onMouseLeave={() => setExpanded(false)}
//                 onClick={() => setShowPanel(true)}
//             >
//                 <div className="notch-content">
//                     {summary ? (
//                         <>
//                             {summary.newRepos > 0 && (
//                                 <span>{summary.newRepos} repos</span>
//                             )}
//                             {summary.updates > 0 && (
//                                 <span>{summary.updates} updates</span>
//                             )}
//                             {summary.releases > 0 && (
//                                 <span>{summary.releases} releases</span>
//                             )}
//                             {summary.deployments > 0 && (
//                                 <span>{summary.deployments} deployments</span>
//                             )}
//                         </>
//                     ) : (
//                         <span className="idle">GitHub</span>
//                     )}
//                 </div>
//             </div>
//
//             {showPanel && (
//                 <NotificationPanel onClose={() => setShowPanel(false)} />
//             )}
//         </>
//     );
// }



// // src/components/NotchNook/NotchNook.jsx
// import { useEffect, useState, useRef } from "react";
// import NotificationPanel from "./NotificationPanel";
// import "./notchNook.css";
//
// const API_URL = "https://utkarsh-naman.github.io/repo-updates/get-updates.json";
// const POLL_INTERVAL = 15000;
//
// export default function NotchNook() {
//     const [expanded, setExpanded] = useState(false);
//     const [showPanel, setShowPanel] = useState(false);
//
//     // The main notification list
//     const [notifications, setNotifications] = useState([]);
//
//     // Summary counts for the *latest* fetch (to show in the notch pill)
//     const [summary, setSummary] = useState(null);
//
//     // Timer ref to auto-collapse the notch
//     const collapseTimeout = useRef(null);
//
//     useEffect(() => {
//         // Load saved notifications on mount
//         const stored = JSON.parse(localStorage.getItem("notifications")) || [];
//         setNotifications(stored);
//
//         // Initial fetch
//         fetchAndProcess();
//
//         // Start polling
//         const intervalId = setInterval(fetchAndProcess, POLL_INTERVAL);
//         return () => clearInterval(intervalId);
//     }, []);
//
//     async function fetchAndProcess() {
//         try {
//             const res = await fetch(API_URL);
//             const data = await res.json();
//
//             // Load Repo Index: { "RepoName": { lastUpdated, seenReleases: [], seenDeploys: [] } }
//             const repoIndex = JSON.parse(localStorage.getItem("repoIndex")) || {};
//
//             let newNotifs = [];
//             // Counts specifically for the "New Activity" summary
//             let counts = {
//                 newRepos: 0,
//                 updates: 0,
//                 releases: 0,
//                 deployments: 0
//             };
//
//             data.projects.forEach((proj) => {
//                 const key = proj.projectName;
//                 let saved = repoIndex[key];
//
//                 // -----------------------------
//                 // 1. NEW REPOSITORY DISCOVERED
//                 // -----------------------------
//                 if (!saved) {
//                     counts.newRepos++;
//
//                     // Create notification
//                     newNotifs.push({
//                         id: crypto.randomUUID(),
//                         type: "repo",
//                         title: "New Repository",
//                         message: proj.projectName,
//                         link: proj.repoLink,
//                         time: Date.now()
//                     });
//
//                     // INITIALIZE INDEX
//                     // We save ALL current releases/deploys as "seen" so we don't spam
//                     // the user with old history for a repo they just found.
//                     repoIndex[key] = {
//                         lastUpdated: proj.lastUpdated,
//                         seenReleases: (proj.newReleases || []).map(r => r.tag),
//                         seenDeploys: (proj.newDeployments || []).map(d => d.deployedAt)
//                     };
//                 }
//                     // -----------------------------
//                     // 2. EXISTING REPOSITORY
//                 // -----------------------------
//                 else {
//                     // Check for Updates (General)
//                     if (new Date(proj.lastUpdated) > new Date(saved.lastUpdated)) {
//                         counts.updates++;
//                         newNotifs.push({
//                             id: crypto.randomUUID(),
//                             type: "update",
//                             title: "Repository Updated",
//                             message: proj.projectName,
//                             link: proj.repoLink,
//                             time: Date.now()
//                         });
//                         saved.lastUpdated = proj.lastUpdated;
//                     }
//
//                     // Check for NEW Releases
//                     // We check if the incoming tag is NOT in our seen list
//                     const incomingReleases = proj.newReleases || [];
//                     const seenReleases = new Set(saved.seenReleases || []); // Use Set for easy lookup
//
//                     incomingReleases.forEach(rel => {
//                         if (!seenReleases.has(rel.tag)) {
//                             counts.releases++;
//                             newNotifs.push({
//                                 id: crypto.randomUUID(),
//                                 type: "release",
//                                 title: "New Release",
//                                 message: `${proj.projectName} ${rel.tag}`,
//                                 link: rel.releasedAt,
//                                 time: Date.now()
//                             });
//                             seenReleases.add(rel.tag);
//                         }
//                     });
//                     saved.seenReleases = Array.from(seenReleases);
//
//                     // Check for NEW Deployments
//                     const incomingDeploys = proj.newDeployments || [];
//                     const seenDeploys = new Set(saved.seenDeploys || []);
//
//                     incomingDeploys.forEach(dep => {
//                         if (!seenDeploys.has(dep.deployedAt)) {
//                             counts.deployments++;
//                             newNotifs.push({
//                                 id: crypto.randomUUID(),
//                                 type: "deployment",
//                                 title: "New Deployment",
//                                 message: proj.projectName,
//                                 link: dep.deployedAt,
//                                 time: Date.now()
//                             });
//                             seenDeploys.add(dep.deployedAt);
//                         }
//                     });
//                     saved.seenDeploys = Array.from(seenDeploys);
//
//                     // Save back to object
//                     repoIndex[key] = saved;
//                 }
//             });
//
//             // If nothing new, STOP. Do not update state.
//             if (newNotifs.length === 0) return;
//
//             // --- SAVE EVERYTHING ---
//
//             // 1. Update Index in LocalStorage (CRITICAL to prevent loops)
//             localStorage.setItem("repoIndex", JSON.stringify(repoIndex));
//
//             // 2. Update Notifications State & Storage
//             const updatedNotifications = [...newNotifs, ...notifications]; // Newest first
//             setNotifications(updatedNotifications);
//             localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
//
//             // 3. Trigger UI Feedback (Summary + Expand)
//             setSummary(counts);
//             setExpanded(true);
//
//             // Auto-collapse after 5 seconds
//             if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
//             collapseTimeout.current = setTimeout(() => {
//                 setExpanded(false);
//                 setSummary(null); // Clear summary so it shows "Notifications" or hidden next time
//             }, 6000);
//
//         } catch (err) {
//             console.error("NotchNook Error:", err);
//         }
//     }
//
//     // Helper for Child Component to update list
//     function handleUpdate(newList) {
//         setNotifications(newList);
//         localStorage.setItem("notifications", JSON.stringify(newList));
//     }
//
//     const hasNotifications = notifications.length > 0;
//
//     return (
//         <>
//             <div
//                 className={`notch-nook ${expanded ? "expanded" : ""} ${!hasNotifications && !expanded ? "hidden" : ""}`}
//                 onMouseEnter={() => { if(hasNotifications) setExpanded(true); }}
//                 onMouseLeave={() => setExpanded(false)}
//                 onClick={() => { if(hasNotifications) setShowPanel(true); }}
//             >
//                 <div className="notch-content">
//                     {/* Case A: Just Fetched New Data (Show Breakdown) */}
//                     {summary ? (
//                         <>
//                             {summary.newRepos > 0 && <span>{summary.newRepos} New Repos</span>}
//                             {summary.updates > 0 && <span>{summary.updates} Updates</span>}
//                             {summary.releases > 0 && <span>{summary.releases} Releases</span>}
//                             {summary.deployments > 0 && <span>{summary.deployments} Deploys</span>}
//                         </>
//                     ) : (
//                         /* Case B: Idle State (Show Total Count) */
//                         hasNotifications && (
//                             <>
//                                 <span>{notifications.length}</span>
//                                 <span className="idle">Notifications</span>
//                             </>
//                         )
//                     )}
//                 </div>
//             </div>
//
//             {showPanel && (
//                 <NotificationPanel
//                     items={notifications}
//                     onUpdate={handleUpdate}
//                     onClose={() => setShowPanel(false)}
//                 />
//             )}
//         </>
//     );
// }


// src/components/NotchNook/NotchNook.jsx
// src/components/NotchNook/NotchNook.jsx
import { useEffect, useState, useRef } from "react";
import NotificationPanel from "./NotificationPanel";
import "./notchNook.css";

const API_URL = "https://utkarsh-naman.github.io/repo-updates/get-updates.json";
const POLL_INTERVAL = 60000;

export default function NotchNook() {
    // UI States
    const [expanded, setExpanded] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    // Data State
    const [notifications, setNotifications] = useState([]);

    // Timer to auto-collapse the "Pop-up" state
    const collapseTimeout = useRef(null);

    // -------------------------------------------
    // 1. INITIAL SETUP & POLLING
    // -------------------------------------------
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("notifications")) || [];
        setNotifications(stored);

        fetchAndProcess();
        const id = setInterval(fetchAndProcess, POLL_INTERVAL);
        return () => clearInterval(id);
    }, []);


    // -------------------------------------------
    // 2. FETCH & PROCESS LOGIC (Fixed for New Repos + Details)
    // -------------------------------------------
    async function fetchAndProcess() {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            const repoIndex = JSON.parse(localStorage.getItem("repoIndex")) || {};

            let newNotifs = [];
            let foundNewData = false;

            data.projects.forEach((proj) => {
                const key = proj.projectName;

                // Get saved state OR create a temporary empty state for new repos
                let saved = repoIndex[key];

                // --- CHECK 1: NEW REPO ---
                if (!saved) {
                    foundNewData = true;
                    newNotifs.push({
                        id: crypto.randomUUID(), type: "repo",
                        title: "New Repository", message: proj.projectName,
                        link: proj.repoLink, time: Date.now()
                    });

                    // CRITICAL FIX: Initialize with EMPTY seen lists so the
                    // Release/Deploy checks below will "catch" the current info.
                    saved = {
                        lastUpdated: proj.lastUpdated,
                        seenReleases: [],
                        seenDeploys: []
                    };
                }
                else if (new Date(proj.lastUpdated) > new Date(saved.lastUpdated)) {
                    // --- CHECK 2: REPO UPDATE ---
                    foundNewData = true;
                    newNotifs.push({
                        id: crypto.randomUUID(), type: "update",
                        title: "Repository Updated", message: proj.projectName,
                        link: proj.repoLink, time: Date.now()
                    });
                    saved.lastUpdated = proj.lastUpdated;
                }

                // --- CHECK 3: RELEASES ---
                const incomingReleases = proj.newReleases || [];
                const seenReleases = new Set(saved.seenReleases || []);
                incomingReleases.forEach(rel => {
                    if (!seenReleases.has(rel.tag)) {
                        foundNewData = true;
                        newNotifs.push({
                            id: crypto.randomUUID(), type: "release",
                            title: "New Release", message: `${proj.projectName} ${rel.tag}`,
                            link: rel.releasedAt, time: Date.now()
                        });
                        seenReleases.add(rel.tag);
                    }
                });
                saved.seenReleases = Array.from(seenReleases);

                // --- CHECK 4: DEPLOYMENTS ---
                const incomingDeploys = proj.newDeployments || [];
                const seenDeploys = new Set(saved.seenDeploys || []);
                incomingDeploys.forEach(dep => {
                    if (!seenDeploys.has(dep.deployedAt)) {
                        foundNewData = true;
                        newNotifs.push({
                            id: crypto.randomUUID(), type: "deployment",
                            title: "New Deployment", message: proj.projectName,
                            link: dep.deployedAt, time: Date.now()
                        });
                        seenDeploys.add(dep.deployedAt);
                    }
                });
                saved.seenDeploys = Array.from(seenDeploys);

                // Update the Master Index
                repoIndex[key] = saved;
            });

            if (!foundNewData) return;

            // Update Storage & State
            localStorage.setItem("repoIndex", JSON.stringify(repoIndex));
            const updatedList = [...newNotifs, ...notifications];
            setNotifications(updatedList);
            localStorage.setItem("notifications", JSON.stringify(updatedList));

            // MOMENTARY POP-UP
            setExpanded(true);
            if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
            collapseTimeout.current = setTimeout(() => {
                // Only collapse if the user hasn't opened the panel
                setExpanded((prev) => showPanel ? true : false);
            }, 6000);

        } catch (err) {
            console.error("NotchNook Error:", err);
        }
    }

    // -------------------------------------------
    // 3. UI HELPERS
    // -------------------------------------------

    // Calculate counts dynamically from the current list
    const counts = {
        repos: notifications.filter(n => n.type === 'repo').length,
        updates: notifications.filter(n => n.type === 'update').length,
        releases: notifications.filter(n => n.type === 'release').length,
        deploys: notifications.filter(n => n.type === 'deployment').length,
    };

    function handleUpdate(newList) {
        setNotifications(newList);
        localStorage.setItem("notifications", JSON.stringify(newList));
    }

    const hasNotifications = notifications.length > 0;

    // LOGIC FIX: Force expansion if panel is open, otherwise use hover state
    const isExpanded = expanded || showPanel;

    return (
        <>
            <div
                className={`notch-nook ${isExpanded ? "expanded" : ""} ${!hasNotifications && !isExpanded ? "hidden" : ""}`}

                /* 1. Expand on Hover */
                onMouseEnter={() => {
                    if(hasNotifications) setExpanded(true);
                }}

                /* 2. Only Shrink if Panel is CLOSED */
                onMouseLeave={() => {
                    if(!showPanel) setExpanded(false);
                }}

                /* 3. Toggle Panel on Click (and ensure expansion) */
                onClick={() => {
                    if (hasNotifications) {
                        setShowPanel(!showPanel);
                        setExpanded(true);
                    }
                }}
            >
                <div className="notch-content">
                    {/* STATE A: EXPANDED (Hover/Click) -> Show Breakdown */}
                    {isExpanded ? (
                        <>
                            {counts.repos > 0 && <span>{counts.repos} Repos</span>}
                            {counts.updates > 0 && <span>{counts.updates} Updates</span>}
                            {counts.releases > 0 && <span>{counts.releases} Releases</span>}
                            {counts.deploys > 0 && <span>{counts.deploys} Deploys</span>}
                        </>
                    ) : (
                        /* STATE B: IDLE -> Show Total Count */
                        hasNotifications && (
                            <>
                                <span style={{ fontWeight: 600 }}>{notifications.length}</span>
                                <span className="idle">Activity</span>
                            </>
                        )
                    )}
                </div>
            </div>

            {showPanel && (
                <NotificationPanel
                    items={notifications}
                    onUpdate={handleUpdate}
                    onClose={() => {
                        setShowPanel(false);
                        setExpanded(false); // Shrink when manually closing
                    }}
                />
            )}
        </>
    );
}