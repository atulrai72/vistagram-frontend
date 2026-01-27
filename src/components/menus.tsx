/* eslint-disable react/prop-types */
// @ts-nocheck
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "@/hooks/use-outside-click";

const MenusContext = createContext({
    openId: "",
    close: () => { },
    open: (id: string) => { },
    position: null,
    setPosition: (position: any) => { }
});

function Menus({ children }) {
    const [openId, setOpenId] = useState("");
    const [position, setPosition] = useState(null);

    const close = () => setOpenId("");
    const open = setOpenId;

    return (
        <MenusContext.Provider
            value={{ openId, close, open, position, setPosition }}
        >
            {children}
        </MenusContext.Provider>
    );
}

function Menu({ children }) {
    return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ id }) {
    const { openId, close, open, setPosition } = useContext(MenusContext);

    function handleClick(e) {
        e.stopPropagation();
        const rect = e.target.closest("button").getBoundingClientRect();

        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });

        openId === "" || openId !== id ? open(id) : close();
    }

    return (
        <button
            onClick={handleClick}
            className="translate-x-3 rounded-sm border-none bg-none p-2 transition-all duration-200 hover:bg-gray-100"
        >
            <HiEllipsisVertical className="h-10 w-10 text-gray-700" />
        </button>
    );
}

function List({ id, children }) {
    const { openId, position, close } = useContext(MenusContext);
    const ref = useOutsideClick(close, false);

    if (openId !== id) return null;

    return createPortal(
        <ul
            ref={ref}
            style={{
                right: `${position?.x}px`,
                top: `${position?.y}px`,
            }}
            className="fixed rounded-md bg-white shadow-md z-50"
        >
            {children}
        </ul>,
        document.body
    );
}

function Button({ children, icon, onClick }) {
    const { close } = useContext(MenusContext);

    function handleClick(e) {
        onClick?.(e);
        close();
    }

    return (
        <li>
            <button
                onClick={handleClick}
                className="flex w-full items-center gap-4 border-none bg-none px-6 py-3 text-left text-[1.4rem] transition-all duration-200 hover:bg-gray-50"
            >
                {icon && (
                    <span className="h-6 w-6 text-gray-400 transition-all duration-300 [&>svg]:h-full [&>svg]:w-full">
                        {icon}
                    </span>
                )}
                <span>{children}</span>
            </button>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;