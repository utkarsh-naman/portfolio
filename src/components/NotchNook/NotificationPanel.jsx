// // src/components/NotchNook/NotificationPanel.jsx
// import { useEffect, useState } from "react";
// import "./notchNook.css";
//
// export default function NotificationPanel({ onClose }) {
//     const [items, setItems] = useState([]);
//
//     useEffect(() => {
//         const stored =
//             JSON.parse(localStorage.getItem("notifications")) || [];
//         setItems(stored);
//     }, []);
//
//     function remove(id) {
//         const next = items.filter((n) => n.id !== id);
//         setItems(next);
//         localStorage.setItem("notifications", JSON.stringify(next));
//     }
//
//     function clearAll() {
//         localStorage.removeItem("notifications");
//         setItems([]);
//         onClose();
//     }
//
//     return (
//         <div className="notification-backdrop" onClick={onClose}>
//             <div className="notification-panel">
//                 <header>
//                     <span>Notifications</span>
//                     <button onClick={clearAll}>Clear</button>
//                 </header>
//
//                 <div className="notification-list">
//                     {items.length === 0 && (
//                         <div className="empty">No notifications</div>
//                     )}
//
//                     {items.map((n) => (
//                         <div
//                             key={n.id}
//                             className="notification"
//                             onClick={() => {
//                                 window.open(n.link, "_blank");
//                                 remove(n.id);
//                             }}
//                         >
//                             <strong>{n.title}</strong>
//                             <p>{n.message}</p>
//
//                             <button
//                                 className="close"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     remove(n.id);
//                                 }}
//                             >
//                                 ✕
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


// src/components/NotchNook/NotificationPanel.jsx
// src/components/NotchNook/NotificationPanel.jsx
// import "./notchNook.css";
//
// export default function NotificationPanel({ items, onUpdate, onClose }) {
//
//     function remove(id) {
//         const next = items.filter((n) => n.id !== id);
//         onUpdate(next);
//         if (next.length === 0) onClose();
//     }
//
//     function clearAll() {
//         onUpdate([]);
//         onClose();
//     }
//
//     return (
//         <div className="notification-backdrop" onClick={onClose}>
//             <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
//                 <header>
//                     <span>Activity</span>
//                     <button onClick={clearAll}>Clear All</button>
//                 </header>
//
//                 <div className="notification-list">
//                     {items.length === 0 ? (
//                         <div className="empty">No notifications</div>
//                     ) : (
//                         items.map((n) => (
//                             <div
//                                 key={n.id}
//                                 className="notification"
//                                 onClick={() => {
//                                     if(n.link) window.open(n.link, "_blank");
//                                     remove(n.id);
//                                 }}
//                             >
//                                 <strong>{n.title}</strong>
//                                 <p>{n.message}</p>
//                                 <button
//                                     className="close"
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         remove(n.id);
//                                     }}
//                                 >
//                                     ✕
//                                 </button>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }



// src/components/NotchNook/NotchNook.jsx
// src/components/NotchNook/NotificationPanel.jsx
import "./notchNook.css";

export default function NotificationPanel({ items, onUpdate, onClose }) {

    function remove(id) {
        const next = items.filter((n) => n.id !== id);
        onUpdate(next);
        if (next.length === 0) onClose();
    }

    function clearAll() {
        onUpdate([]);
        onClose();
    }

    return (
        <div className="notification-backdrop" onClick={onClose}>
            <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
                <header>
                    <span>Activity</span>
                    <button onClick={clearAll}>Clear All</button>
                </header>

                <div className="notification-list">
                    {items.length === 0 ? (
                        <div className="empty">No recent updates</div>
                    ) : (
                        items.map((n) => (
                            <div
                                key={n.id}
                                className="notification"
                                onClick={() => {
                                    if(n.link) window.open(n.link, "_blank");
                                    remove(n.id);
                                }}
                            >
                                <strong>{n.title}</strong>
                                <p>{n.message}</p>
                                <span style={{ fontSize: '10px', color: '#444', marginTop:'4px', display:'block'}}>
                                    {new Date(n.time).toLocaleTimeString()}
                                </span>
                                <button
                                    className="close"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        remove(n.id);
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

