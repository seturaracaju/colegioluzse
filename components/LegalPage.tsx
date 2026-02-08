
import React, { useEffect } from 'react';
import { PageView } from '../types';
import { INSTITUTIONAL_DATA, LOGO_URLS } from '../constants';

interface LegalPageProps {
  view: PageView;
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ view, onBack }) => {
  // Garante que a página comece no topo sempre que a visualização mudar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  const getContent = () => {
    switch (view) {
      case PageView.PRIVACY:
        return (
          <>
            <h1 className="text-3xl md:text-5xl font-serif text-cl-blue-dark mb-10 leading-tight">Política de Privacidade</h1>
            <div className="space-y-8 text-gray-700 font-light leading-relaxed">
              <p className="text-xl font-serif italic text-cl-blue-dark/70">O Colégio Luz respeita a privacidade e a proteção dos dados pessoais de seus usuários, alunos, responsáveis e visitantes do site.</p>
              
              <section className="space-y-4">
                <p>As informações eventualmente coletadas por meio deste site, como <strong>nome, telefone e e-mail</strong>, são utilizadas exclusivamente para fins institucionais, pedagógicos ou de comunicação com as famílias.</p>
                <div className="bg-cl-blue-light/20 p-6 border-l-4 border-cl-blue-dark italic">
                  "Nossos dados nunca são comercializados ou compartilhados com terceiros, exceto quando exigido por lei."
                </div>
              </section>

              <section className="space-y-4">
                <p>O Colégio Luz adota medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acessos não autorizados, perdas ou usos indevidos em conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>.</p>
                <p>Ao utilizar este site, o usuário declara estar ciente e de acordo com esta Política de Privacidade.</p>
              </section>

              <div className="pt-8 border-t border-gray-100">
                <p className="text-sm">Para dúvidas ou solicitações relacionadas à privacidade, entre em contato: <br/> 
                <span className="font-bold text-cl-blue-dark">{INSTITUTIONAL_DATA.email}</span></p>
              </div>
            </div>
          </>
        );
      case PageView.TERMS:
        return (
          <>
            <h1 className="text-3xl md:text-5xl font-serif text-cl-blue-dark mb-10 leading-tight">Termos de Uso</h1>
            <div className="space-y-8 text-gray-700 font-light leading-relaxed">
              <p>Este site tem caráter exclusivamente institucional e informativo, com o objetivo de apresentar o Colégio Luz, sua proposta pedagógica, valores e formas de contato.</p>
              
              <div className="grid gap-6">
                <div className="p-6 bg-cl-gray-light border border-gray-100">
                  <h3 className="font-bold uppercase tracking-widest text-[10px] text-cl-blue-dark mb-3">1. Propriedade de Conteúdo</h3>
                  <p className="text-sm">Todo o conteúdo disponibilizado neste site, incluindo textos, imagens, logotipos e materiais institucionais, é de propriedade do Colégio Luz, sendo proibida sua reprodução sem autorização prevía.</p>
                </div>

                <div className="p-6 bg-cl-gray-light border border-gray-100">
                  <h3 className="font-bold uppercase tracking-widest text-[10px] text-cl-blue-dark mb-3">2. Responsabilidade</h3>
                  <p className="text-sm">O Colégio Luz não se responsabiliza por interpretações equivocadas das informações aqui apresentadas ou por eventuais indisponibilidades técnicas do site.</p>
                </div>
              </div>

              <p className="text-center font-serif italic text-cl-blue-dark/60 mt-12">Ao acessar este site, o usuário concorda com estes Termos de Uso.</p>
            </div>
          </>
        );
      case PageView.LEGAL:
        return (
          <>
            <h1 className="text-3xl md:text-5xl font-serif text-cl-blue-dark mb-10 leading-tight">Aviso Legal</h1>
            <div className="space-y-8 text-gray-700 font-light leading-relaxed">
              <p>O site <span className="text-cl-blue-dark font-medium">www.colegioluzse.com.br</span> é de titularidade do Colégio Luz, instituição de ensino de natureza educacional, regularmente constituída no Brasil.</p>
              
              <div className="bg-cl-blue-dark text-white p-10 rounded-sm shadow-xl space-y-4">
                <div>
                  <h4 className="text-cl-yellow uppercase tracking-[0.2em] text-[9px] font-bold mb-1">Razão Social</h4>
                  <p className="font-medium">{INSTITUTIONAL_DATA.name}</p>
                </div>
                <div>
                  <h4 className="text-cl-yellow uppercase tracking-[0.2em] text-[9px] font-bold mb-1">CNPJ</h4>
                  <p className="font-medium">{INSTITUTIONAL_DATA.cnpj}</p>
                </div>
                <div>
                  <h4 className="text-cl-yellow uppercase tracking-[0.2em] text-[9px] font-bold mb-1">Endereço Institucional</h4>
                  <p className="font-medium text-sm leading-relaxed">{INSTITUTIONAL_DATA.address}</p>
                </div>
              </div>

              <p className="text-sm italic text-gray-500 border-l-2 border-cl-yellow pl-4">
                As informações disponibilizadas neste site têm caráter exclusivamente institucional e educativo, não configurando qualquer tipo de oferta comercial automática.
              </p>

              <div className="text-center pt-8">
                <p className="text-xs uppercase tracking-widest text-gray-400">Para informações adicionais, entre em contato pelos canais oficiais.</p>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Compacto para Subpáginas */}
      <header className="bg-white border-b border-gray-100 py-6 px-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <img src={LOGO_URLS.color} alt="Colégio Luz" className="h-10 md:h-12" />
          <button 
            onClick={onBack}
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-cl-blue-dark hover:text-cl-yellow transition-colors flex items-center"
          >
            <span className="mr-2">←</span> Voltar ao Início
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="py-20 px-6">
        <article className="max-w-3xl mx-auto">
          {getContent()}
          
          <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center">
             <img src={LOGO_URLS.color} alt="Escudo" className="h-8 opacity-20 grayscale mb-4" />
             <p className="text-[9px] uppercase tracking-[0.3em] text-gray-300">
               Última atualização: Janeiro de 2026
             </p>
          </div>
        </article>
      </main>

      {/* Footer Minimalista */}
      <footer className="bg-cl-gray-light py-12 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {INSTITUTIONAL_DATA.name} | Aracaju - SE
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
