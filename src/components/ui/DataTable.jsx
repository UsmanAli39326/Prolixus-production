"use client";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * DataTable Component
 * 
 * A reusable table component for the dashboard with support for custom columns, 
 * data rendering, and pagination UI.
 * 
 * @param {Object} props
 * @param {Array} props.columns - Configuration for table columns
 * @param {Array} props.data - Array of data objects to display
 * @param {Object} props.pagination - Pagination state and controls (optional)
 * @param {string} props.emptyMessage - Message to show when data is empty
 */
const DataTable = ({
    columns = [],
    data = [],
    pagination = null,
    emptyMessage = "No data found."
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="w-full overflow-hidden rounded-xl border border-divider bg-white dark:bg-background-dark/50 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/30 dark:bg-white/5 border-b border-divider">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={`px-3 sm:px-6 py-3 sm:py-5 text-primary text-xs uppercase tracking-wider font-bold ${column.className || ""}`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-divider">
                            {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="group hover:bg-secondary/20 dark:hover:bg-white/5 transition-colors duration-200"
                                    >
                                        {columns.map((column, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className={`px-3 sm:px-6 py-3 sm:py-5 text-sm ${column.cellClassName || ""}`}
                                            >
                                                {column.cell ? column.cell(row) : row[column.accessor]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-10 text-center text-text/50">
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-text/60 dark:text-white/60">
                        Showing <span className="font-bold text-text dark:text-white">{pagination.from}-{pagination.to}</span> of{" "}
                        <span className="font-bold text-text dark:text-white">{pagination.total}</span> entries
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={pagination.onPrev}
                            disabled={pagination.currentPage === 1}
                            className="flex size-9 items-center justify-center rounded-lg border border-divider bg-white dark:bg-white/5 text-text dark:text-white hover:bg-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaChevronLeft className="text-xs" />
                        </button>

                        {/* Pagination Numbers */}
                        {(() => {
                            const pages = [];
                            const maxPagesToShow = 5;
                            
                            if (pagination.totalPages <= maxPagesToShow) {
                                for (let i = 1; i <= pagination.totalPages; i++) {
                                    pages.push(i);
                                }
                            } else {
                                let startPage = Math.max(1, pagination.currentPage - 2);
                                let endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1);
                        
                                if (endPage - startPage + 1 < maxPagesToShow) {
                                    startPage = Math.max(1, endPage - maxPagesToShow + 1);
                                }
                        
                                for (let i = startPage; i <= endPage; i++) {
                                    pages.push(i);
                                }
                            }
                            
                            return pages.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => pagination.onPageChange(page)}
                                    className={`flex size-9 items-center justify-center rounded-lg text-sm font-bold transition-colors ${pagination.currentPage === page
                                            ? "bg-primary text-white shadow-sm shadow-primary/30"
                                            : "border border-transparent text-text/60 dark:text-white/60 hover:bg-secondary/30"
                                        }`}
                                >
                                    {page}
                                </button>
                            ));
                        })()}

                        <button
                            onClick={pagination.onNext}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className="flex size-9 items-center justify-center rounded-lg border border-divider bg-white dark:bg-white/5 text-text dark:text-white hover:bg-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaChevronRight className="text-xs" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
