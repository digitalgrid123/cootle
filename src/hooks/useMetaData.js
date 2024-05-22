"use client";

import { useEffect, useState } from "react";
import { axiosGet, axiosPost } from "../services/axiosHelper";

const useMetaData = (
  apiRoute,
  payLoad = {},
  initial = false,
  isPost = false,
  needTimeStamp = false
) => {
  // States
  const [metaData, setMetaData] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // Effects
  useEffect(() => {
    if (initial) return;
    fetchMetaData(payLoad);
  }, []);

  const fetchMetaData = async (payLoad, queryParam = "", targetParam = "") => {
    setIsFetching(true);

    try {
      const res = isPost
        ? await axiosPost(apiRoute, payLoad)
        : await axiosGet(
            queryParam ? apiRoute.replace(targetParam, queryParam) : apiRoute,
            payLoad
          );
      setIsFetching(false);
      if (res.status) {
        if (needTimeStamp) setTimeStamp(new Date());
        setMetaData(res.data);
      } else {
        if (needTimeStamp) setTimeStamp(null);
        setMetaData(null);
      }
    } catch (error) {
      setIsFetching(false);
    }
  };

  // Return
  return [metaData, isFetching, fetchMetaData, timeStamp];
};

export default useMetaData;
