import { useState } from "react";
import { navItems } from "../../config/navigation";

export function DashboardShell({ children, navigate, onLogout, path, user }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">MYROI - DATA CENTER</div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.path}
              className={
                path.startsWith(item.path) ? "nav-item active" : "nav-item"
              }
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              type="button"
            >
              <span className="nav-dot" />
              {item.label}
            </button>
          ))}
        </nav>
        <button className="logout-button" onClick={onLogout} type="button">
          Logout
        </button>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileOpen(true)}
            type="button"
          >
            Menu
          </button>
          <div>
            <strong>System Active</strong>
            <span>Mock data mode</span>
          </div>
          <div className="user-pill">
            {user.name} · {user.role}
          </div>
        </header>
        <main className="content">{children}</main>
      </div>

      {mobileOpen && (
        <button
          className="backdrop"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
          type="button"
        />
      )}
    </div>
  );
}
