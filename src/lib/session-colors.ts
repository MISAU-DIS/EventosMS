const SESSION_COLORS: Record<string, string> = {
  Protocolo: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
  Cerimónia: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  Apresentação: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  Discussão: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
  Intervalo: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
  Encerramento: "bg-gradient-to-r from-red-500 to-red-600 text-white",
  Organização: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
  Painel: "bg-gradient-to-r from-violet-500 to-violet-600 text-white",
};

export function getSessionColor(type: string): string {
  return (
    SESSION_COLORS[type] ??
    "bg-gradient-to-r from-slate-500 to-slate-600 text-white"
  );
}
