import { useSearchParams } from "react-router-dom";
import { parse, stringify } from "query-string";

type SetMultipleParams = {
  [key: string]: string | number;
};

export const urlParams = () => {
  const [_, setSearchParams] = useSearchParams();

  const getParams = (key?: string) => {
    const parsedParams = parse(location.search);

    if (key) return parsedParams[key];

    return parsedParams;
  };

  const setParams = (key: string, value: string | number) => {
    const oldParams = (getParams() || {}) as any;
    oldParams[key] = value;

    if (!value) delete oldParams[key];

    setSearchParams(stringify(oldParams));
  };

  const getParamFromHashUrl = (key: string) => {
    const hashedParams = location.hash; 

    const regex = new RegExp(key + '=([^&?]*)');

    const result = hashedParams.match(regex);

    return result?.[1];
  };

  const setMultipleParams = (params: SetMultipleParams) => {
    setSearchParams(stringify(params));
  };

  return { getParams, getParamFromHashUrl, setParams, setMultipleParams };
};
