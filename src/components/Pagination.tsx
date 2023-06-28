import React from 'react'

import { usePagination } from 'hooks/usePagination'

type PaginationProps = {
    onPageChange:(page:number) => void,
    totalCount:number,
    siblingCount?:number,
    currentPage:number,
    pageSize:number,
    className:string
}

function Pagination({onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className}: PaginationProps) {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })

    if (currentPage === 0 || paginationRange?.length! < 2) {
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

    return (
        <div className={className}>
        <ul
        className='pagination-container'
        >
         {/* Left navigation arrow */}
        <li
          className='pagination-item'
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange!.map(pageNumber => {
           
          // If the pageItem is a DOT, render the DOTS unicode character
          if (Number.isNaN(pageNumber)) {
            return <li className="pagination-item dots">&#8230;</li>
          }
          
          // Render our Page Pills
          return (
            <li
              className='pagination-item'
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}
        {/*  Right Navigation arrow */}
        <li
          className='pagination-item'
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
      </div>
    )
}

export default Pagination