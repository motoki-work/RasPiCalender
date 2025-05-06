// app/routes/weather.tsx

type WeatherData = {
  weather?: { description: string; icon: string }[];
  main?: { temp: number };
};


// フロント側
export default function Weather({ weatherData }: { weatherData: WeatherData | null }) {
  const getReiwaYear = (year: number) => {
    if (year >= 2019) {
      return `令和${year - 2018}年`;
    } else {
      return "平成以前";
    }
  };

  const weatherIconMap: Record<string, string> = {
    '01d': 'wi-day-sunny.svg',
    '01n': 'wi-night-clear.svg',
    '02d': 'wi-day-cloudy.svg',
    '02n': 'wi-night-alt-cloudy.svg',
    '03d': 'wi-cloud.svg',
    '03n': 'wi-cloud.svg',
    '04d': 'wi-cloudy.svg',
    '04n': 'wi-cloudy.svg',
    '09d': 'wi-showers.svg',
    '09n': 'wi-showers.svg',
    '10d': 'wi-day-rain.svg',
    '10n': 'wi-night-alt-rain.svg',
    '11d': 'wi-thunderstorm.svg',
    '11n': 'wi-thunderstorm.svg',
    '13d': 'wi-snow.svg',
    '13n': 'wi-snow.svg',
    '50d': 'wi-fog.svg',
    '50n': 'wi-fog.svg'
  };

  const iconCode = weatherData?.weather?.[0]?.icon;
  const description = weatherData?.weather?.[0]?.description;
  const temp = weatherData?.main?.temp;
  if (!weatherData || !iconCode || !description || temp === undefined) {
    return <p className="text-gray-500 font-corporate">天気情報の取得に失敗しました。</p>;
  }
  console.log(temp);
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <h2 className="text-2xl font-bold font-corporate">
        {getReiwaYear(new Date().getFullYear())}
      </h2>

      <div className="bg-white rounded-lg px-6 py-4 text-center">
        <p className="text-xl mb-1 font-corporate">{description}</p>

        <img
          src={`/assets/icons/${weatherIconMap[iconCode] || 'wi-nazo.svg'}`}
          alt="天気アイコン"
          className="w-36 h-36 mx-auto"
        />

        <p className="text-xl font-corporate">
          気温:{temp.toFixed(1)}℃
        </p>
      </div>
    </div>
  );
}
