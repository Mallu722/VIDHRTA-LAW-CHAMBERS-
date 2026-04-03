import { useState, useEffect } from "react";

const DISCLAIMER_KEY = "vidhrta_disclaimer_shown";

const DisclaimerModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(DISCLAIMER_KEY);
    if (!alreadyShown) {
      // Mark as shown immediately so reload won't show it again
      sessionStorage.setItem(DISCLAIMER_KEY, "true");
      setVisible(true);
    }
  }, []);

  const handleAgree = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.72)",
        backdropFilter: "blur(4px)",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f0e8",
          maxWidth: "680px",
          width: "100%",
          borderRadius: "4px",
          padding: "clamp(1.1rem, 5vw, 2.5rem) clamp(1rem, 5vw, 2.5rem) clamp(1rem, 4vw, 2rem)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          fontFamily: "'Georgia', serif",
          position: "relative",
          maxHeight: "90dvh",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1rem, 4vw, 1.25rem)",
            fontWeight: "700",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            marginBottom: "1.25rem",
            fontFamily: "'Georgia', serif",
          }}
        >
          Disclaimer
        </h2>

        {/* Divider */}
        <hr style={{ borderColor: "#c9b99a", marginBottom: "1.25rem" }} />

        {/* Body Text */}
        <div
          style={{
            fontSize: "clamp(0.78rem, 3.2vw, 0.875rem)",
            lineHeight: "1.75",
            color: "#2a2a2a",
          }}
        >
          <p style={{ marginBottom: "1rem" }}>
            As per the rules of Bar Council of India, Indian law firms are not
            permitted to solicit work and advertise. The contents of this website
            are solely for the purposes of information and by clicking on
            &lsquo;Agree&rsquo; below, you acknowledge the following:
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 1.25rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <li style={{ paddingLeft: "0.75rem", borderLeft: "2px solid #8b7355" }}>
              The information provided under this website is solely available at your
              request for information purposes only, and the user visit to our website
              is voluntarily made in connection with finding out more about our areas
              of practice.
            </li>
            <li style={{ paddingLeft: "0.75rem", borderLeft: "2px solid #8b7355" }}>
              There has been no advertisement, solicitation, personal communication or
              invitation from us or any of our members to solicit any work through the
              website.
            </li>
            <li style={{ paddingLeft: "0.75rem", borderLeft: "2px solid #8b7355" }}>
              Any information obtained or materials downloaded from this website is
              completely at the user&rsquo;s volition and any transmission, receipt or
              use of this site would not create any lawyer-client relationship.
            </li>
          </ul>

          <p style={{ marginBottom: "1.5rem" }}>
            We are not liable for any consequence of any action taken by the user
            relying on material/information provided under this website. For all legal
            issues, the user must seek independent legal advice.
          </p>
        </div>

        {/* Agree Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleAgree}
            style={{
              backgroundColor: "#1e3a5f",
              color: "#ffffff",
              border: "none",
              padding: "0.7rem 2.25rem",
              fontSize: "clamp(0.75rem, 3vw, 0.8rem)",
              fontWeight: "700",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "2px",
              transition: "background-color 0.2s ease",
              fontFamily: "'Georgia', serif",
              width: "min(100%, 200px)",
              minHeight: "44px",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#2c5282")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#1e3a5f")
            }
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
