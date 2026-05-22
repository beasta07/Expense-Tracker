import { useEffect, useState } from "react";
import { logout } from "../actions/auth";

type NavbarProps = {
  title?: string;
  activePage: "front" | "desk";
  onNavigate: (page: "front" | "desk") => void;
};

const Navbar = ({
  title = "को हिसाब",
  activePage,
  onNavigate,
}: NavbarProps) => {
  const [isScrolled,setIsScrolled]=useState(false);
 
  useEffect(()=>{
    const handleScroll = ()=>{
      setIsScrolled(window.scrollY>0)
    }
    window.addEventListener('scroll',handleScroll)

    handleScroll()

    return()=> window.removeEventListener('scroll',handleScroll)
  },)
  
   
  return (
    <nav className={`sticky z-20 border-b border-foreground bg-white ${isScrolled ? 'top-0':'top-10'}` }>

      <div className="mx-auto flex max-w-225 px-4  md:px-6 py-2 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate("front")}
          className="text-[14px] font-black text-foreground"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </button>

        <div className="flex flex-wrap items-center justify-end gap-3 md:gap-6">
          <button
            type="button"
            onClick={() => onNavigate("front")}
            className={`kicker ${
              activePage === "front"
                ? "text-(--color-accent)"
                : "hover:text-(--color-accent)"
            }`}
          >
            Front Page
          </button>

          <button
            type="button"
            onClick={() => onNavigate("desk")}
            className={`kicker ${
              activePage === "desk"
                ? "text-(--color-accent)"
                : "hover:text-(--color-accent)"
            }`}
          >
            Financial Desk
          </button>

          <form action={logout}>
            <button
              type="submit"
              className="kicker border border-[var(--color-ink)] px-2.5 py-1 hover:bg-[var(--color-ink)] hover:text-white"
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;