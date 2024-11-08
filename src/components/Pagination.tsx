import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../shared/hooks/usePagination";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (paginationRange) {
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }

    const onNext = () => {
      onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
      onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
      <div className="w-full mt-4">
        <ul className="pagination-container flex justify-between">
          {/* Left navigation arrow */}
          <button
            className={classnames("pagination-item border font-bold", {
              disabled: currentPage === 1,
            })}
            onClick={onPrevious}
          >
            <i className="bx bx-left-arrow-alt mr-1 text-xl"></i>Previous
          </button>
          <div className="flex">
            {paginationRange.map((pageNumber, index) => {
              // If the pageItem is a DOT, render the DOTS unicode character
              if (pageNumber === DOTS) {
                return (
                  <li key={index} className="pagination-item dots">
                    &#8230;
                  </li>
                );
              } else if (typeof pageNumber === "number") {
                // Render our Page Pills
                return (
                  <li
                    key={index}
                    className={classnames("pagination-item", {
                      selected: pageNumber === currentPage,
                    })}
                    onClick={() => onPageChange(pageNumber)}
                  >
                    {pageNumber}
                  </li>
                );
              }
            })}
          </div>
          {/*  Right Navigation arrow */}
          <button
            className={classnames("pagination-item border font-bold", {
              disabled: currentPage === lastPage,
            })}
            onClick={onNext}
          >
            Next<i className="bx bx-right-arrow-alt ml-1 text-xl"></i>
          </button>
        </ul>
      </div>
    );
  }
};
