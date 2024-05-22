import PropTypes from "prop-types";
import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({
  activePage,
  total,
  onPageChanged,
  pageLimit,
  isLastPage,
}) => {
  const pageCount = Math.ceil(total / pageLimit);

  const gotToNextPage = (pageNo) => {
    onPageChanged(pageNo);
  };

  const createPage = (number) => {
    return (
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => gotToNextPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  };

  const createEllipsis = () => {
    return <Pagination.Ellipsis />;
  };

  const getNumberItems = (isActivePage) => {
    const items = [];
    if (pageCount > 5) {
      if (isActivePage > pageCount - 4) {
        items.push(createPage(1));
        items.push(createEllipsis());
        items.push(createPage(pageCount - 4));
        items.push(createPage(pageCount - 3));
        items.push(createPage(pageCount - 2));
        items.push(createPage(pageCount - 1));
        items.push(createPage(pageCount));
      } else {
        if (isActivePage <= 3 || isActivePage > pageCount - 1) {
          items.push(createPage(1));
          items.push(createPage(2));
          items.push(createPage(3));
          items.push(createPage(4));
        } else {
          items.push(createPage(1));
          items.push(createEllipsis());
          items.push(createPage(isActivePage - 1));
          items.push(createPage(isActivePage));
          items.push(createPage(isActivePage + 1));
        }
        items.push(createEllipsis());
        items.push(createPage(pageCount));
      }
    } else if (pageCount > 0) {
      for (let number = 1; number <= pageCount; number++) {
        items.push(createPage(number));
      }
    }
    return items;
  };

  return (
    <>
      {pageCount && pageCount !== 0 ? (
        <>
          <Pagination size="md">
            <Pagination.Prev
              disabled={activePage <= 1}
              onClick={() => gotToNextPage(activePage - 1)}
            />
            {getNumberItems(activePage)}
            <Pagination.Next
              disabled={isLastPage}
              onClick={() => gotToNextPage(activePage + 1)}
            />
          </Pagination>
        </>
      ) : (
        ""
      )}
    </>
  );
};

PaginationComponent.propTypes = {
  total: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  activePage: PropTypes.number,
  onPageChanged: PropTypes.func,
  isLastPage: PropTypes.bool,
};

export default PaginationComponent;
