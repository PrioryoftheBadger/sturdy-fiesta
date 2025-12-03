import React from "react";

export default function App() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Team Lunch Score App</h1>

      <p className="text-slate-700 mb-6">
        First commit is live! 🎉  
        Start coding your score-sheet SPA inside <code>src/</code>.
      </p>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <p className="font-medium">Next steps:</p>
        <ul className="list-disc ml-6 mt-2 text-slate-700">
          <li>Add components for entering scores</li>
          <li>Use localStorage for persistence</li>
          <li>Create a results/summary view</li>
          <li>Push to GitHub to trigger Netlify build</li>
        </ul>
      </div>
    </div>
  );
}
