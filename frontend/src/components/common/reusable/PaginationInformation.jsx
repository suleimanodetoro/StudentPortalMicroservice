import PageInfo from "./PageInfo";
import Pagination from "./Pagination";

const PaginationInformation = ({
  paginationAccess = {},
  handlePageChanges = null,
}) => (
  <>
    {paginationAccess?.totalPages > 1 && (
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Pagination
          totalPages={paginationAccess.totalPages}
          totalElements={paginationAccess.totalElements}
          number={paginationAccess.number}
          onPageChange={handlePageChanges}
        />
        <PageInfo paginationAccess={paginationAccess} />
      </div>
    )}
  </>
);

export default PaginationInformation;
