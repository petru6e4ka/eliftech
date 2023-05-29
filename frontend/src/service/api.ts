import { API_URL } from "../constants/env";

type TMethod = "POST" | "GET";
export interface IError {
  error: boolean;
  status: number;
  text: string;
}

const _fetch = async <Req>({
  url = "",
  baseUrl = API_URL,
  body,
  headers = {},
  method = "GET",
}: {
  url: string;
  baseUrl?: string;
  body?: Req;
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

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return { error: true, status: response.status, text: response.statusText };
};

const get = (url: string) => _fetch({ url });

export { get };
