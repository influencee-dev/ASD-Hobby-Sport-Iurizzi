import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Componente catturato dall'ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-6 bg-red-50 border border-red-200 rounded-xl space-y-4 shadow-sm text-left">
            <div className="flex items-center space-x-3 text-red-600 mb-2">
              <span className="text-3xl">⚠️</span>
              <h1 className="font-display font-extrabold text-lg uppercase tracking-wider">
                Errore dell'Applicazione
              </h1>
            </div>
            <p className="text-sm text-gray-750 font-sans">
              Si è verificato un errore imprevisto nel browser durante la navigazione o l'inoltro dei dati. L'applicazione è stata isolata per prevenire la corruzione dei dati.
            </p>
            <div className="bg-white border border-red-150 p-3 rounded font-mono text-xs text-red-700 overflow-auto max-h-40 whitespace-pre-wrap">
              {this.state.error?.stack || this.state.error?.message}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-brand-red text-white font-display font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-brand-red-light transition-all cursor-pointer"
              >
                Ricarica Pagina
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
