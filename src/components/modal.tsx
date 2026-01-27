/* eslint-disable react/prop-types */
// @ts-nocheck
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import * as React from "react";

const ModalContext = createContext(
    {
        openName: "",
        open: (name: string) => { },
        close: () => { }
    }
);

function Modal({ children }: { children: React.ReactNode }) {
    const [openName, setOpenName] = useState("");

    const open = (name: string) => setOpenName(name);
    const close = () => setOpenName("");

    return (
        <ModalContext.Provider value={{ openName, open, close }}>
            {children}
        </ModalContext.Provider>
    )
}

function Open({ children, opens: opensWindowName }: { children: React.ReactNode, opens: string }) {
    const { open } = useContext(ModalContext);

    return React.cloneElement(children as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
            children.props.onClick?.(e);
            open(opensWindowName)
        }
    });
}

function Window({ children, name }: { children: React.ReactNode, name: string }) {
    const { close, openName } = useContext(ModalContext);

    const ref = useOutsideClick(close, true);

    if (openName !== name) return null;

    return (
        createPortal(
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 transition-all duration-500 backdrop-blur-sm">
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-6 transition-all duration-500" ref={ref}>
                    <button onClick={close} className="absolute top-4 right-4 text-2xl hover:text-red-500">...</button>
                    <div>{cloneElement(children as React.ReactElement<any>, { onCloseModal: close } as any)}</div>
                </div>
            </div>
            ,
            document.body
        )
    )
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;


