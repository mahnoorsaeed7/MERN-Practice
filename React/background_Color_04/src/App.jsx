// import { useState } from "react";
// import dokja from "./assets/dokja.png";

// function App() {
//   const [color, setcolor] = useState("#171718");

//   return (
//     <div
//       className="w-full h-screen"
//       duration-100
//       style={{ backgroundColor: color }}
//     >
//       <div className="fixed left-5 top-12 flex flex-col gap-5 bg-white p-2 rounded-3xl shadow-2xl">
//         <button
//           onClick={() => setcolor("#413f40")}
//           className="outline-none shadow-lg px-2 py-1 rounded-full text-white"
//           style={{ backgroundColor: "#413f40" }}
//         >
//           Dark Grey
//         </button>
//         <button
//           onClick={() => setcolor("#6d84eb")}
//           className="outline-none shadow-lg px-2 py-1 rounded-full text-white"
//           style={{ backgroundColor: "#6d84eb" }}
//         >
//           light blue
//         </button>
//         <button
//           onClick={() => setcolor("#050a30")}
//           className="outline-none shadow-lg px-2 py-1 rounded-full text-white"
//           style={{ backgroundColor: "#050a30" }}
//         >
//           Dark blue
//         </button>
//       </div>
//       <div className="absolute inset-0 flex items-center justify-center pointer-none ">
//         <img src={dokja} alt="Dokja" />
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import dokja from "./assets/dokja.png";

function App() {
  const [color, setcolor] = useState("#171718");

  return (
    <div
      className="w-full h-screen relative transition-colors duration-100"
      style={{ backgroundColor: color }}
    >
      {/* Buttons Menu - Raised above the background image using z-10 */}
      <div className="fixed left-5 top-12 flex flex-col gap-3 bg-white p-2 rounded shadow-2xl z-10">
        <button
          onClick={() => setcolor("#413f40")}
          className="outline-none shadow-lg px-3 py-2 rounded-full text-white text-sm font-medium"
          style={{ backgroundColor: "#413f40" }}
        >
          Dark Grey
        </button>
        <button
          onClick={() => setcolor("#6d84eb")}
          className="outline-none shadow-lg px-3 py-2 rounded-full text-white text-sm font-medium"
          style={{ backgroundColor: "#6d84eb" }}
        >
          Light Blue
        </button>
        <button
          onClick={() => setcolor("#050a30")}
          className="outline-none shadow-lg px-3 py-2 rounded-full text-white text-sm font-medium"
          style={{ backgroundColor: "#050a30" }}
        >
          Dark Blue
        </button>
      </div>

      {/* Background Image Layer - Made smaller and sent to back using z-0 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src={dokja}
          alt="Dokja"
          className="max-h-[40vh] w-auto object-contain rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
}

export default App;
