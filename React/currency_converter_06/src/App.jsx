import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import bgimage from "./assets/currency-bg-forest.jpg";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bgimage})`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
  onSubmit={(e) => {
    e.preventDefault();
    convert();
  }}
>

  <div className="w-full mb-1 relative z-0">
    <InputBox
      label="From"
      amount={amount}
      currencyOptions={options}
      onCurrencyChange={(currency) => setFrom(currency)}
      selectCurrency={from}
      onAmountChange={(amount) => setAmount(amount)}
    />
  </div>


  <div className="relative w-full flex justify-center h-0">
    <button
      type="button"
      className="absolute -translate-y-1/2 z-50 border-2 border-white rounded-md bg-cyan-900 text-white px-3 py-1 font-medium hover:bg-cyan-950 transition-colors shadow-lg"
      onClick={swap}
    >
      swap
    </button>
  </div>


  <div className="w-full mt-1 mb-4 relative z-0">
    <InputBox
      label="To"
      amount={convertedAmount}
      currencyOptions={options}
      onCurrencyChange={(currency) => setTo(currency)}
      selectCurrency={to}
      amountDisable
    />
  </div>

  <button
    type="submit"
    className="w-full bg-cyan-900 hover:bg-cyan-950 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
  >
    Convert {from.toUpperCase()} to {to.toUpperCase()}
  </button>
</form>

        </div>
      </div>
    </div>
  );
}

export default App;
