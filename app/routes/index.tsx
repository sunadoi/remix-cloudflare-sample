import type { MetaFunction, LoaderFunction } from "remix";
import dayjs from "dayjs";
import { useLoaderData, json, Link } from "remix";

type Data = {
  diff: number;
};

export const loader: LoaderFunction = async () => {
  const startAt = dayjs(new Date());
  const endAt = dayjs(new Date());

  return {
    diff: endAt.diff(startAt),
  };
};

export default function Index() {
  const { diff } = useLoaderData<Data>();
  console.log(diff);

  return (
    <ul>
      <li>経過時間: {diff}ms</li>
    </ul>
  );
}
