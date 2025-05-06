// app/routes/index.tsx

import Calender from "./calender";
import Weather from "./weather";
import Quotes from "./quotes";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";

type WeatherData = {
  weather?: { description: string; icon: string }[];
  main?: { temp: number };
};
type QuoteData = {
  text: string;
  author: string;
};

export async function loader() {

  let weatherData: WeatherData | null = null;
  let quoteData: QuoteData | null = null;

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const zipCode = process.env.OPENWEATHER_ZIP_CODE;

  if (!apiKey || !zipCode) {
    throw new Error("APIキーまたは郵便番号が定義されていません");
  }

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},jp&appid=${apiKey}&units=metric&lang=ja`;

  console.log("loader開始");
  try {
      // 天気取得
      const weatherRes = await axios.get<WeatherData>(weatherURL);
      weatherData = weatherRes.data;
    } catch (err) {
      console.error("天気の取得に失敗:", err);
    }
  
  try {
      // 名言（英語）取得
      const quoteRes = await axios.get("https://zenquotes.io/api/random");
      const quote = quoteRes.data[0]; // { q: "...", a: "..." }
      console.log("名言取得:", quoteRes.data);
      quoteData = {
        text: quote.q,
        author: quote.a,
      };
    } catch (err: any) {
      console.error("🚨 名言取得失敗:", err.message || err);
      quoteData = {
        text: "失敗は発明の母なのだ",
        author: "バカボンのパパ",
      }
    }
  
    return json({
      weatherData,
      quoteData
    });
}

export default function Index() {
  const { weatherData, quoteData } = useLoaderData<typeof loader>();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start py-4 bg-white">
      {/* カード本体：縦並び */}
      <div className="w-[640px] h-[400px] bg-white rounded flex flex-col justify-between p-4">
        
        {/* 上段：天気とカレンダーの横並び */}
        <div className="flex flex-row justify-between">
          {/* 天気 */}
          <div className="w-[300px] h-full overflow-hidden flex items-start justify-center">
            <Weather weatherData={weatherData} />
          </div>

          {/* カレンダー */}
          <div className="w-[300px] h-full overflow-hidden flex items-start justify-center">
            <Calender />
          </div>
        </div>

        {/* 下段：名言（中央寄せ） */}
        <div className="mt-4 px-4">
          <Quotes quote={quoteData} />
        </div>
      </div>
    </div>
  );
}