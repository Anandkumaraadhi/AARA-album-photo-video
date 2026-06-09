

import { Link } from "react-router-dom";

const navItems = [
    { label: "Dashboard", icon: "📊", href: "/dashboard" },
    { label: "Create Albums", icon: "📁", href: "/create-album" },
    { label: "Upload", icon: "📈", href: "/upload" },
    { label: "My Albums", icon: "📁", href: "/albums" },
    { label: "Scanner", icon: "📷", href: "/scanner" },
    { label: "Videos", icon: "🎬", href: "#videos" },
    { label: "Settings", icon: "⚙️", href: "#settings" },
];

export default function Sidebar({
    collapsed,
    onToggle,
    mobileOpen,
    setMobileOpen,
}: {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    setMobileOpen: (value: boolean) => void;
}) {

    return (
        <>
            {mobileOpen && (
                <div
                    className="
        fixed inset-0 z-40
        bg-black/50
        lg:hidden
      "
                    onClick={() => setMobileOpen(false)}
                />
            )}


            <aside
                className={`
    fixed lg:relative
    top-0 left-0
    z-50
    h-screen
    lg:h-auto

    flex flex-col justify-between

    rounded-none lg:rounded-3xl
    border border-slate-200
    bg-white
    p-4

    shadow-lg shadow-slate-200/60

    transition-all duration-300 ease-in-out

    ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }

    ${collapsed ? "w-20" : "w-64"}
  `}
            >
                {/* Logo + Toggle */}
                <div>
                    <div className="flex items-center justify-between px-2 py-2">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-base font-black text-white shadow-lg shadow-violet-300/40">
                                L
                            </div>
                            {!collapsed && (
                                <div className="whitespace-nowrap">
                                    <p className="text-[15px] font-bold text-slate-900">LiveLens</p>
                                    <p className="text-[10px] font-medium text-slate-400">
                                        Photo-to-video
                                    </p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onToggle}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <svg
                                className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="mt-6 space-y-1">
                        {navItems.map((item) => {
                            const isActive =
                                location.pathname === item.href;

                            return (
                                <Link
                                    to={item.href}
                                    key={item.label}
                                    onClick={() => {
                                        setMobileOpen(false);
                                    }}
                                    className={`
                                            group relative flex items-center gap-3
                                            rounded-2xl px-3 py-2.5
                                            text-sm font-medium
                                            transition-all duration-200

                                            ${isActive
                                            ? "bg-violet-50 text-violet-700"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                        }

                                            ${collapsed ? "justify-center" : ""}
                                        `}
                                    title={
                                        collapsed
                                            ? item.label
                                            : undefined
                                    }
                                >
                                    {isActive && (
                                        <span
                                            className="
                                                absolute left-0 top-1/2
                                                h-6 w-1
                                                -translate-y-1/2
                                                rounded-r-full
                                                bg-violet-500
                                            "
                                        />
                                    )}

                                    <span className="text-base">
                                        {item.icon}
                                    </span>

                                    {!collapsed && (
                                        <span>{item.label}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom CTA */}
                <div className={`${collapsed ? "px-1" : ""}`}>
                    {collapsed ? (
                        <button className="flex w-full items-center justify-center rounded-2xl bg-violet-50 p-3 text-violet-600 transition hover:bg-violet-100">
                            <span className="text-base">✨</span>
                        </button>
                    ) : (
                        <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 p-4">
                          
                         
                    
                            <button className="mt-3 w-full rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 hover:shadow-lg">
                                Profile
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
