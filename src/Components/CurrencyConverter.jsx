import { useState } from "react";

function CurrencyConvertor() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const convert = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
        );
        console.log(res);

        let data = await res.json();
        console.log(data);

        if(!data.rates[to]){
            setError("Invalid Currency Code");
        }else{
            let value = amount*data.rates[to];
            setResult(value.toFixed(2));
        }
        
    } 
    catch (error) {
      setError("Failed To fetch...");
    }
    setLoading(false);
  };

  return (
    <div className="curr-container flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen">
      <h1 className="font-bold text-4xl mb-6 text-blue-700">
        Currency Convertor
      </h1>
      <form
        className="flex flex-col gap-3 w-full max-w-sm bg-white p-5 rounded-xl shadow-md"
        onSubmit={convert}
      >
        <input
          type="number"
          className="border-2 border-gray-400 rounded p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="border-2 border-gray-400 rounded p-2"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>

        <select
          className="border-2 border-gray-400 rounded p-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded text-white font-semibold"
        >
          Convert
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {result && (
        <h3 className="mt-5 text-lg font-semibold text-green-700">
          {amount}
          {from} = {result}
          {to}
        </h3>
      )}
    </div>
  );
}

export default CurrencyConvertor;
