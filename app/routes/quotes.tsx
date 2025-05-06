// app/routes/Quotes.tsx
type QuoteData = {
    text: string;
    author: string;
  };
  
  export default function Quotes({ quote }: { quote: QuoteData | null }) {
    if (!quote) {
      return <p className="text-gray-500 text-sm">名言の取得に失敗しました。</p>;
    }
  
    return (
      <div className="text-center text-sm text-gray-800 font-corporate">
        <p className="italic mb-1">"{quote.text}"</p>
        <p className="mb-2">—{quote.author}</p>
      </div>
    );
  }
  