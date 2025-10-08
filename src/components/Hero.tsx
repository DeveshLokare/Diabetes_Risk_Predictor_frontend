function handleNavigate(){
    window.location.href = "/test";
}                   


export default function Hero(){
    return (
        <div className="w-full h-[75vh] flex flex-col items-center justify-center bg-[url('/src/assets/hero.jpg')] bg-cover bg-center bg-no-repeat">
            <h1 className="mt-20 text-6xl font-bold text-white">Welcome to Diabetes Risk Predictor</h1>
            <p className="mt-12 text-2xl text-white">Predict your risk of diabetes with our advanced ML model.</p>
            <button className="mt-4 py-3 px-3 text-center text-2xl bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={handleNavigate}>Check Risk Asessment</button>
        </div>
    )
}