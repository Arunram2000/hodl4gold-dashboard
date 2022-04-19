import axios from "axios";
import moment from "moment";
import _ from "lodash";

import { IChart } from "../constants/types";
import { ethers } from "ethers";

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
        Burns: ethers.utils.formatEther(val.Burns),
        timestamp: moment(Number(val.timestamp) * 1000).format("MMM DD"),
      };
    });

    return _.uniqBy(refactoredData, "timestamp").reverse();
  } catch (error) {
    console.log(error);
    return;
  }
};
