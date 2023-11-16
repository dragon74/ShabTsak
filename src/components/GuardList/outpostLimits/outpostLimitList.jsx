// GuardOutpostLimitList.jsx
import { useQuery } from "react-query";
import { getGuardOutpostLimitByGuardId } from "@/services/OutpostLimitService";

const GuardOutpostLimitList = ({ guardId, campId, outposts }) => {
  const {
    isLoading,
    isError,
    data: outpostLimits,
  } = useQuery({
    queryFn: () => getGuardOutpostLimitByGuardId(guardId, campId),
    queryKey: ["outpostLimits", guardId, campId],
    enabled: !!guardId && !!campId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  console.log({ outpostLimits });

  return (
    <div>
      <h2>Guard Outpost Limits</h2>
      <ul>
        {/* {outpostLimits.map((outpostLimit) => {
          const outpost = outposts.find((o) => o.id === outpostLimit.outpostId);

          return <li key={outpostLimit.id}>Name: {outpost ? outpost.name : "Unknown"}</li>;
        })} */}
      </ul>
    </div>
  );
};

export default GuardOutpostLimitList;
