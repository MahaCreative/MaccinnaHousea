import React from "react";

function TableLayout({ children, className }) {
    return (
        <div
            className={`${className} py-1.5 relative overflow-x-auto shadow-md sm:rounded-lg `}
        >
            {children}
        </div>
    );
}
function Table({ children, className }) {
    return (
        <table
            className={`w-full text-sm text-left rtl:text-right text-gray-500 ${className}`}
        >
            {children}
        </table>
    );
}
function Thead({ children, className }) {
    return (
        <thead
            className={`text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 ${className}`}
        >
            {children}
        </thead>
    );
}

function Th({ children, className }) {
    return (
        <th scope="col" className={`${className} px-6 py-3`}>
            {children}
        </th>
    );
}

function Td({ children, className = "w-full" }) {
    return (
        <td className={`${className} px-6 py-4 whitespace-nowrap`}>
            {children}
        </td>
    );
}
TableLayout.Table = Table;
TableLayout.Thead = Thead;
TableLayout.Th = Th;
TableLayout.Td = Td;
export default TableLayout;
