import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  endItem: number
  onPageChange: (page: number) => void
  pageSize: number
  startItem: number
  totalItems: number
  totalPages: number
}

export function Pagination({
  currentPage,
  endItem,
  onPageChange,
  pageSize,
  startItem,
  totalItems,
  totalPages,
}: PaginationProps) {
  if (totalItems <= pageSize) {
    return null
  }

  return (
    <div className="pagination-bar">
      <p>
        Showing {startItem}-{endItem} of {totalItems}
      </p>

      <div className="pagination-actions">
        <button
          className="icon-button"
          type="button"
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={18} />
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="icon-button"
          type="button"
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
