import bgimage from '../assets/currency-bg-forest.jpg'; 

import { useId } from 'react';



function InputBox({ 
    label, 
    amount, 
    onAmountChange, 
    onCurrencyChange, 
    currencyOptions = [], 
    selectCurrency = "usd", 
    amountDisable = false, 
    currencyDisable = false, 
    className = "", 
}) { 
    const amountInputId = useId();  // unique value

    return ( 
        <div 
            className={`p-4 rounded-xl text-sm flex items-center bg-cover bg-center backdrop-blur-md bg-white/20 border border-white/20 shadow-lg ${className}`} 
            style={{ backgroundImage: `url(${bgimage})` }} 
        > 
            <div className="w-1/2"> 
                <label htmlFor={amountInputId} 
                className="text-white/70 mb-2 inline-block font-medium"> 
                {label} 
                </label> 
                <input 
                    id={amountInputId} 
                    className="outline-none w-full bg-white/60 backdrop-blur-sm rounded-lg px-2 py-1.5 text-gray-900 placeholder-gray-500 font-semibold focus:ring-2 focus:ring-amber-500/50 transition-all" 
                    type="number" 
                    placeholder="Amount" 
                    disabled={amountDisable} 
                    value={amount === 0 ? "" : amount} 
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))
                            } 
                /> 
            </div> 
            <div className="w-1/2 flex flex-wrap justify-end text-right"> 
                <p className="text-white/70 mb-2 w-full font-medium">Currency Type</p> 
                    <select 
                        className="rounded-lg px-2 py-1.5 bg-slate-800/80 text-white cursor-pointer outline-none border border-white/10 hover:bg-slate-700/80 transition-colors font-semibold" 
                        disabled={currencyDisable}
                        value={selectCurrency}
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    > 
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>

            </div> 
        </div> 
    ); 
} 

export default Inputbox;
