"use client";

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const ServicesDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Focus trapping
    useEffect(() => {
        const focusableElements =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = modalRef.current;
        const firstFocusableElement = modal?.querySelectorAll<HTMLElement>(focusableElements)[0];
        const focusableContent = modal?.querySelectorAll<HTMLElement>(focusableElements);
        const lastFocusableElement = focusableContent ? focusableContent[focusableContent.length - 1] : null;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement?.focus();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement?.focus();
                }
            }
        };

        if (isOpen && firstFocusableElement) {
            firstFocusableElement.focus();
            document.addEventListener('keydown', handleTabKey);
        }

        return () => {
            document.removeEventListener('keydown', handleTabKey);
        };
    }, [isOpen]);

    // Render modal using React Portal
    const Modal = () => {
        return ReactDOM.createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
                <div
                    ref={modalRef}
                    className="rounded-lg w-80 max-w-sm mx-auto p-6 transform transition-transform duration-300 scale-95 opacity-0 animate-modalOpen"
                    role="dialog"
                    aria-modal="true"
                >
                    <ul className="space-y-4">
                        <li className="service-item delay-1">
                            <a
                                href="#"
                                className="block px-4 py-2 text-lg text-white bg-transparent rounded hover:bg-purple-800 transition-colors"
                            >
                                Website Development
                            </a>
                        </li>
                        <li className="service-item delay-2">
                            <a
                                href="#"
                                className="block px-4 py-2 text-lg text-white bg-transparent rounded hover:bg-purple-800 transition-colors"
                            >
                                Mobile Development
                            </a>
                        </li>
                        <li className="service-item delay-3">
                            <a
                                href="#"
                                className="block px-4 py-2 text-lg text-white bg-transparent rounded hover:bg-purple-800 transition-colors"
                            >
                                Search Engine Optimization
                            </a>
                        </li>
                        <li className="service-item delay-4">
                            <a
                                href="#"
                                className="block px-4 py-2 text-lg text-white bg-transparent rounded hover:bg-purple-800 transition-colors"
                            >
                                Advertisement
                            </a>
                        </li>
                    </ul>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>,
            document.body
        );
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="inline-flex justify-center items-center w-full px-6 py-3 text-base font-medium text-white bg-black border-2 border-purple-800 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                Services
                <svg
                    className={`ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && <Modal />}
        </div>
    );
};

export default ServicesDropdown;