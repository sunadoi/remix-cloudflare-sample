import type { LoaderFunction } from "remix";
import dayjs from "dayjs";
import { useLoaderData } from "remix";

type Data = {
  data: object;
  fromKV: boolean;
  diff: number;
};

export const loader: LoaderFunction = async () => {
  const startAt = dayjs(new Date());

  const cachedJson = await MY_KV.get<{ data: object }>("cache-key", "json");
  if (cachedJson) {
    const endAt = dayjs(new Date());
    return {
      data: cachedJson.data,
      fromKV: true,
      diff: endAt.diff(startAt),
    };
  }

  const data = await (
    await fetch("https://api.aoikujira.com/tenki/week.php?fmt=json&city=319")
  ).json();
  await MY_KV.put("cache-key", JSON.stringify({ data: data["319"] }), {
    expirationTtl: 60,
  });

  const endAt = dayjs(new Date());

  return {
    data: data["319"],
    fromKV: false,
    diff: endAt.diff(startAt),
  };
};

export default function Index() {
  const { data, fromKV, diff } = useLoaderData<Data>();

  return (
    <ul>
      <li>
        東京の明後日の天気: <code>{JSON.stringify(data[1])}</code>
      </li>
      <li>KVからのキャッシュ: {fromKV.toString()}</li>
      <li>データ取得経過時間: {diff}ms</li>
    </ul>
  );
}
