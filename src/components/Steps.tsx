

type Step = {
  id: number;
  title: string;
  iconPath: string; // url relative to public root, e.g. "/icons/magnify.svg"
  alt?: string;
};

const steps: Step[] = [
  { id: 1, title: "Fill out a simple form", iconPath: "/form.svg", alt: "Form icon" },
  { id: 2, title: "Model analyzes your data", iconPath: "/model.svg", alt: "Model icon" },
  { id: 3, title: "Receive personalized results", iconPath: "/result.svg", alt: "Results icon" },
];

export default function Steps() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">    
        <h1 className="font-bold text-4xl max-sm:text-3xl text-center text-gray-700">Get Results In Just 3 Simple Steps</h1>
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
          {steps.map((s) => (
            <div key={s.id} className="flex-1 flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full border-2 border-gray-500 flex items-center justify-center shadow-sm bg-white">
                {/* Use <img> to load SVG from public folder */}
                <img
                  src={s.iconPath}
                  alt={s.alt ?? ""}
                  width={60}
                  height={60}
                  className="w-18 h-18 text-gray-700"
                  // If icon is purely decorative and alt should be ignored by screen readers, use aria-hidden instead:
                  // aria-hidden="true"
                />
              </div>

              <p className="mt-4 text-lg text-gray-700 leading-tight max-w-[12rem]">
                <span className="font-semibold mr-1 text-gray-800">{s.id}.</span>
                <span>{s.title}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
