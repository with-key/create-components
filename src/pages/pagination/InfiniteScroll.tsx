import React, { Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";

const InfiniteScroll = () => {
  // useInfiniteQuery Fetcher function
  const fetchProjects = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
    );

    return { data, nextPage: pageParam + 1, currentPage: pageParam }; // data.page로 감
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("projects", fetchProjects, {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage; //  === return 값은 다은 페이지가 호출될 때의 pageParam
    },
  });

  console.log(data);

  // console.log("isFetchingNextPage :>> ", isFetchingNextPage);
  // console.log("data :>> ", data);

  console.log(status);

  if (status === "loading") return <div>is Loading.....!</div>;
  return (
    <>
      <button
        onClick={() => {
          fetchNextPage();
        }}
      >
        버튼
      </button>
      {data?.pages.map((page) => {
        return page.data.map((todo: any) => {
          return (
            <Fragment key={todo.id}>
              <Stack>
                <div>{todo.id}</div>
                <div>{todo.title}</div>
              </Stack>
            </Fragment>
          );
        });
      })}
    </>
  );
};

export default InfiniteScroll;

const Stack = styled.div`
  display: flex;
  gap: 24px;

  div {
    border: 1px solid #eee;
    padding: 12px;
    :nth-child(1) {
      width: 100px;
    }
  }
`;
