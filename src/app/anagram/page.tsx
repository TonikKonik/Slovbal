export default function AnagramPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 px-4 text-center">
      <div className="text-6xl">🔀</div>
      <h2 className="text-3xl font-bold text-white">Anagram</h2>
      <p className="text-text-secondary max-w-sm">
        Dostaneš zamíchané české slovo — složíš ho zpět co nejrychleji.
        Čím rychleji, tím více bodů. Různé délky slov, časový tlak.
      </p>
      <span className="text-xs bg-border-default text-text-secondary px-3 py-1.5 rounded-full uppercase tracking-wider">
        Připravujeme
      </span>
    </div>
  );
}
