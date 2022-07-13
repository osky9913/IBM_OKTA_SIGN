import axios from "axios";
import { useState } from "react";
import { REQUEST_URL, headers } from "./apiConstants";
import { initialStateWikiResponse } from "./types/wikiTypes";
import { useHistory } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: REQUEST_URL,
  headers: headers.basic,
});

type Request = {
  isError: Boolean;
  isLoading: Boolean;
  isSuccess: Boolean;
  submitRequest: Function;
};

export const GetEvents = (date: Date | null, setResult: Function): Request => {
  const history = useHistory();
  const [isError, setError] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [isSuccess, setSuccess] = useState<Boolean>(false);

  const submitRequest = async () => {
    setLoading(true);
    setError(false);

    if (date !== null) {
      axiosInstance
        .get((date.getMonth() + 1).toString() + "/" + date.getDate().toString())
        .then((response) => {
          setResult(response.data);
          setLoading(false);
          setError(false);
          setSuccess(true);
        })
        .catch((_error) => {
          setError(true);
          setResult(initialStateWikiResponse);
          setLoading(false);
          history.push("/logged");
        });
    }
  };

  return { isError, isLoading, isSuccess, submitRequest };
};
