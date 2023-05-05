import { useEffect, useState } from "react";

const Pagination = ({
  totalPages,
  totalElements,
  number,
  onPageChange = () => {},
  prev = "Prev",
  next = "Next",
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (totalElements && totalPages) {
      setCurrentPage(number);
    }
  }, [totalElements, totalPages, number]);

  const handlePageChange = (newPage) => {
    if (typeof onPageChange === "function") {
      onPageChange({ selected: newPage });
    }
    setCurrentPage(newPage);
  };

  return totalPages > 1 ? (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 0 && "disabled"}`}>
          <button
            className="page-link"
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {prev}
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            onClick={() => handlePageChange(index)}
            className={`page-item ${currentPage === index && "active"}`}
          >
            <button className="page-link">{index + 1}</button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages - 1 && "disabled"
          }`}
        >
          <button
            className="page-link"
            disabled={currentPage === totalPages - 1}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {next}
          </button>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default Pagination;
