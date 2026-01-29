import { useEffect, useState, useRef } from "react";
import NotificationPanel from "./NotificationPanel";
import "./notchNook.css";

const API_URL = "https://repo-updates.pages.dev/get-updates.json";
const POLL_INTERVAL = 15000;

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