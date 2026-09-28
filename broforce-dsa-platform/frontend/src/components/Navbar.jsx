import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-ember-600" : "text-forge-700 hover:text-forge-900"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-forge-200 bg-forge-50/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-ember-500 to-ember-600 font-display text-sm font-bold text-forge-50">
            {"</>"}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Algo<span className="text-ember-600">Forge</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/roadmap" className={navLinkClass}>
            Roadmap
          </NavLink>
          <NavLink to="/practice" className={navLinkClass}>
            Practice
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/product-roadmap" className={navLinkClass}>
            Product Roadmap
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden font-mono text-sm text-forge-700 hover:text-circuit-600 sm:inline"
              >
                {user.name.split(" ")[0]} · Lvl {user.level}
              </Link>
              <button onClick={handleLogout} className="btn-secondary !px-4 !py-2 text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary !px-4 !py-2 text-sm">
                Log in
              </Link>
              <Link to="/register" className="btn-primary !px-4 !py-2 text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
