import React from 'react'

import { styled } from 'styled-components'

import { usePagination } from 'hooks/usePagination'

const PaginationContainer = styled.ul`
  display: flex;
  padding: 0;
  list-style-type: none;`

const PaginationBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const PaginationItem = styled.li`
padding: 0 12px;
height: 32px;
text-align: center;
margin: auto 4px;
color: rgba(0, 0, 0, 0.87);
display: flex;
box-sizing: border-box;
align-items: center;
letter-spacing: 0.01071em;
border-radius: 16px;
line-height: 1.43;
font-size: 13px;
min-width: 32px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
  &.selected {
    background-color: rgba(0, 0, 0, 0.08);
  }
  &.dots:hover {
    background-color: transparent;
    cursor: default;
  }
  &.disabled {
    visibility: hidden;
  }`

const PaginationArrow = styled.div`
  &::before { 
    position: relative;
    content: '';
    display: inline-block;
    width: 0.4em;
    height: 0.4em;
    border-right: 0.12em solid rgba(0, 0, 0, 0.87);
    border-top: 0.12em solid rgba(0, 0, 0, 0.87);
  }
  &.left {
    transform: rotate(-135deg) translate(-50%);
  }
  &.right {
    transform: rotate(45deg);
  }
`

type PaginationProps = {
    onPageChange:(page:number) => void,
    totalCount:number,
    siblingCount?:number,
    currentPage:number,
    pageSize:number
}

function Pagination({onPageChange, totalCount, siblingCount = 1, currentPage, pageSize}: PaginationProps) {

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

    let lastPage = paginationRange![paginationRange!.length - 1];

    return (
        <PaginationBar>
          <PaginationContainer>
          {/* Left navigation arrow */}
          <PaginationItem
            className={currentPage === 1 ? 'disabled':''}
            onClick={onPrevious}
          >
            <PaginationArrow className="left" />
          </PaginationItem>
          {paginationRange!.map(pageNumber => {
            
            // If the pageItem is a DOT, render the DOTS unicode character
            if (Number.isNaN(pageNumber)) {
              return <PaginationItem className="dots">&#8230;</PaginationItem>
            }
            
            // Render our Page Pills
            return (
              <PaginationItem
                className={pageNumber === currentPage ? 'selected' : ''}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationItem>
            )
          })}
          {/*  Right Navigation arrow */}
          <PaginationItem
            className={currentPage === lastPage ? 'disabled':''}
            onClick={onNext}
          >
            <PaginationArrow className="right" />
          </PaginationItem>
        </PaginationContainer>
      </PaginationBar>
    )
}

export default Pagination