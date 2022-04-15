import axios from "axios";
import moment from "moment";
import { IChart } from "../constants/types";

const BASE_URL =
  "https://api.thegraph.com/subgraphs/name/braj1410/hodl4goldsubgraph";

export const getChartsData = async (timestamp: string) => {
  try {
    const {
      data: {
        data: { h4Gburns },
      },
    } = await axios.post<{ data: { h4Gburns: IChart[] } }>(BASE_URL, {
      query: `{
            h4Gburns(first:1000,orderBy:timestamp,orderDirection:desc,where:{timestamp_gte:${timestamp}}) {
                id
                Burns
                timestamp
              }
            }`,
    });

    const refactoredData = h4Gburns.map((val) => {
      return {
        ...val,
        timestamp: moment(Number(val.timestamp) * 1000).format("L"),
      };
    });

    return refactoredData;
  } catch (error) {
    console.log(error);
    return;
  }
};
