export default function MistopisPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 px-4 text-center">
      <div className="text-6xl">🗺️</div>
      <h2 className="text-3xl font-bold text-text-primary">Místopis</h2>
      <p className="text-text-secondary max-w-sm">
        Hádej česká místní jména — řeky, města, hory. Zadej písmeno, uvidíš nápovědu.
        Kdy víš celý název, řekni ho!
      </p>
      <span className="text-xs bg-border-default text-text-secondary px-3 py-1.5 rounded-full uppercase tracking-wider">
        Připravujeme
      </span>
    </div>
  );
}
