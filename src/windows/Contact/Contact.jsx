import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControl from "#components/WindowControl.jsx";
import {
    PhoneOutgoingIcon,
    LucideMail,
    Linkedin,
    Github,
    Instagram,
    FolderGit2
} from "lucide-react";

import "./Contact.css";

const Contact = () => {
    return (
        <>
            {/* Window Header */}
            <div id="window-header">
                <WindowControl target="contact" />
                <h2>Contacts</h2>
            </div>

            {/* Content */}
            <div className="contact-container">
                {/* Top Section */}
                <div className="contact-top">
                    <img
                        className="contact-avatar"
                        src="/meimg/firing.png"   // update if needed
                        alt="Utkarsh Naman"
                    />

                    <div className="contact-main">
                        <h1 className="contact-name">Utkarsh Naman</h1>
                        <p className="contact-meta">
                            22 years old (Born: January 23, 2004)
                        </p>

                        {/* Action Icons */}
                        <div className="contact-actions">
                            <a href="tel:+917759910474" title="Call">
                                <PhoneOutgoingIcon />
                            </a>
                            <a href="mailto:utkarshnaman1@gmail.com" title="Email">
                                <LucideMail />
                            </a>
                            <a
                                href="https://linkedin.com/in/utkarsh-naman"
                                target="_blank"
                                title="LinkedIn"
                            >
                                <Linkedin />
                            </a>
                            <a
                                href="https://github.com/utkarsh-naman"
                                target="_blank"
                                title="GitHub"
                            >
                                <Github />
                            </a>
                            <a
                                href="https://instagram.com/utcurse.blink"
                                target="_blank"
                                title="Instagram"
                            >
                                <Instagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Upcoming Project */}
                <div
                    className="contact-card github-card"
                    onClick={() =>
                        window.open(
                            "https://github.com/utkarsh-naman/portfolio",
                            "_blank"
                        )
                    }
                >
                    <div className="shine-layer" />
                    <FolderGit2 />
                    <div>
                        <p className="card-title">Upcoming Project</p>
                        <p className="card-desc">
                            macOS-style interactive portfolio
                        </p>
                    </div>
                </div>

                
                <div
                    className="contact-card premium-card"
                    onClick={() =>
                        window.open(
                            "https://www.patreon.com/c/utnam/posts",
                            "_blank"
                        )
                    }
                >
                    <div className="shine-layer" />
                    <div className="premium-content">
                        <p className="card-title">Buy this portfolio project</p>
                        <p className="card-desc">
                            Get the complete macOS-style portfolio source code
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div className="contact-details">
                    <div className="detail-row">
                        <span>Phone</span>
                        <span>+91 77599 10474</span>
                    </div>

                    <div className="detail-row">
                        <span>Email</span>
                        <span>utkarshnaman1@gmail.com</span>
                    </div>

                    <div className="detail-row">
                        <span>Home</span>
                        <span>Kolkata, India</span>
                    </div>

                    <div className="detail-row">
                        <span>Work</span>
                        <span>
                            Ex-Intern @ TATA Communications <br />
                            Student @ Institute of Engineering & Management,
                            Kolkata
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;