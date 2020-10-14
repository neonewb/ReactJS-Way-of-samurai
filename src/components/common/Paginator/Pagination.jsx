import React from 'react'
import Style from './Paginator.module.css'

const Pagination = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  return (
    <div className={Style.pages}>
      {currentPage > 1 && (
        <button
          className={Style.btnPrev}
          onClick={(e) => {
            onPageChanged(currentPage - 1, pageSize)
          }}>
          prev
        </button>
      )}
      {pages.map((page) => {
        if (
          (page <= currentPage + 5 && page >= currentPage - 5) ||
          page === 1 ||
          page === pages.length
        ) {
          return (
            <span
              className={
                page === currentPage ? Style.selectedPage : Style.pageNumber
              }
              onClick={(e) => {
                onPageChanged(page, pageSize)
              }}
              key={page}>
              {page}
            </span>
          )
        }
        return undefined
      })}
      <button
        onClick={(e) => {
          onPageChanged(currentPage + 1, pageSize)
        }}>
        next
      </button>
    </div>
  )
}

export default Pagination
