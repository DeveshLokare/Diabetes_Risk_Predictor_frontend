
function handleClick() {
    window.location.href = "/";
}

export default function Navbar(){
    return(
        <div className="w-full h-20 flex items-center p">
            <h1 className="max-sm:text-xl max-sm:ml-4 text-3xl font-bold ml-8 text-gray-700 cursor-pointer" onClick={handleClick}>Diabetes Risk Predictor</h1>
            
        </div>
    )
}