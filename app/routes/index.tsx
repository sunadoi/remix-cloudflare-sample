import type { LoaderFunction } from "remix";
import dayjs from "dayjs";
import { useLoaderData } from "remix";

type Data = {
  data: any;
  diff: number;
};

export const loader: LoaderFunction = async () => {
  const startAt = dayjs(new Date());
  const data = await (
    await fetch("https://api.aoikujira.com/tenki/week.php?fmt=json&city=319")
  ).json();
  const endAt = dayjs(new Date());

  return {
    data: data["319"],
    diff: endAt.diff(startAt),
  };
};

export default function Index() {
  const { data, diff } = useLoaderData<Data>();
  console.debug(data);

  return (
    <ul>
      <li>
        天気: <code>{JSON.stringify(data[1])}</code>
      </li>
      <li>経過時間: {diff}ms</li>
    </ul>
  );
}
