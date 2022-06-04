import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

// react-qeury + react-intersection-observer

const InfiniteScroll = () => {
  const { ref, inView, entry } = useInView({});

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
    enabled: inView,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage; //  === return 값은 다음 페이지가 호출될 때의 pageParam
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "loading") return <div>is Loading.....!</div>;
  return (
    <>
      <StScrollWrapper>
        <Grid>
          {data?.pages.map((page) => {
            return page.data.map((todo: any) => {
              return (
                <Card key={todo.id}>
                  <div>{todo.id}</div>
                  <div>{todo.title}</div>
                </Card>
              );
            });
          })}
        </Grid>
        <div ref={ref} style={{ border: "1px solid red" }}>
          {isFetchingNextPage && <Loader>로딩중</Loader>}
        </div>
      </StScrollWrapper>
    </>
  );
};

export default InfiniteScroll;

const StScrollWrapper = styled.div`
  width: 500px;
  height: 400px;
  border: 1px solid blue;
  overflow-y: scroll;
`;

const Loader = styled.div`
  height: 50px;
  border: 1px solid red;
`;

const Card = styled.div`
  border: 1px teal solid;
`;

const Grid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
