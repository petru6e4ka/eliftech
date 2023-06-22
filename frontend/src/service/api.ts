import { REACT_APP_API_URL } from "../constants/env";

type TMethod = "POST" | "GET";
export interface IError {
  error: boolean;
  status: number;
  text: string;
}

const _fetch = async <B>({
  url = "",
  baseUrl = REACT_APP_API_URL,
  body,
  headers = {},
  method = "GET",
}: {
  url: string;
  baseUrl?: string;
  body?: B;
  headers?: Record<string, string>;
  method?: TMethod;
}) => {
  const preparedBody = body ? JSON.stringify(body) : null;

  const response = await fetch(baseUrl + url, {
    body: preparedBody,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method,
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  return {
    error: true,
    status: response.status,
    text: response.statusText,
    errors: data!.errors,
  };
};

const get = (url: string) => _fetch({ url });
const post = <B>(url: string, body: B) => _fetch({ url, body, method: "POST" });

export { get, post };
