
import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { INSTITUTIONAL_DATA, LOGO_URLS, HERO_IMAGES } from './constants';
import Section from './components/Section';
import LegalPage from './components/LegalPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Hero Carousel interval
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  if (currentView !== PageView.HOME) {
    return <LegalPage view={currentView} onBack={() => {
      setCurrentView(PageView.HOME);
      window.scrollTo(0, 0);
    }} />;
  }

  const openWhatsapp = () => {
    window.open(`https://wa.me/${INSTITUTIONAL_DATA.whatsapp}`, '_blank');
  };

  const openInstagram = () => {
    window.open(INSTITUTIONAL_DATA.instagram, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans antialiased text-gray-800 bg-white">
      {/* Floating WhatsApp Button */}
      <button 
        onClick={openWhatsapp}
        className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Contato via WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img 
              src={isScrolled ? LOGO_URLS.color : LOGO_URLS.white} 
              alt="Logo Colégio Luz" 
              className={`h-12 md:h-16 transition-all duration-500 ${!isScrolled ? 'animate-glow' : ''}`}
            />
          </div>
          
          <div className={`hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-[0.25em] ${isScrolled ? 'text-cl-blue-dark' : 'text-white drop-shadow-md'}`}>
            <a href="#quem-somos" onClick={(e) => { e.preventDefault(); scrollToSection('quem-somos'); }} className="hover:text-cl-yellow transition-colors">Quem Somos</a>
            <a href="#proposta" onClick={(e) => { e.preventDefault(); scrollToSection('proposta'); }} className="hover:text-cl-yellow transition-colors">Proposta Pedagógica</a>
            <a href="#segmentos" onClick={(e) => { e.preventDefault(); scrollToSection('segmentos'); }} className="hover:text-cl-yellow transition-colors">Segmentos</a>
            <a href="#contato" onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }} className="hover:text-cl-yellow transition-colors">Contato</a>
          </div>
          
          <button 
            onClick={() => scrollToSection('contato')}
            className={`px-6 py-2 text-[9px] font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${isScrolled ? 'border-cl-blue-dark text-cl-blue-dark hover:bg-cl-blue-dark hover:text-white' : 'border-white text-white hover:bg-white hover:text-cl-blue-dark drop-shadow-lg'}`}
          >
            Agendar Visita
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-screen flex items-end justify-center pb-12 md:pb-16 overflow-hidden">
        {HERO_IMAGES.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${heroIndex === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={img} 
              alt="Ambiente Colégio Luz" 
              className={`w-full h-full object-cover hero-img-enhanced ${heroIndex === idx ? 'active-hero-img' : ''}`} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        ))}

        <div className="relative z-10 w-full max-w-5xl px-6">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl py-6 md:py-8 px-10 shadow-2xl flex flex-col items-center text-center">
            <p className="text-white text-sm md:text-lg lg:text-xl font-serif italic mb-6 tracking-wide opacity-90 drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis w-full">
              "{INSTITUTIONAL_DATA.tagline}"
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-6 w-full">
              <button 
                onClick={openWhatsapp}
                className="w-full md:w-auto px-10 py-3.5 bg-cl-yellow text-cl-blue-dark font-bold tracking-[0.15em] uppercase text-[9px] hover:bg-white transition-all duration-300 shadow-xl"
              >
                Agende uma Visita
              </button>
              <a 
                href={INSTITUTIONAL_DATA.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-10 py-3.5 border border-white/20 text-white font-bold tracking-[0.15em] uppercase text-[9px] hover:bg-white hover:text-cl-blue-dark transition-all duration-300 backdrop-blur-sm"
              >
                Apresentação Oficial
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Seção Quem Somos */}
      <Section id="quem-somos" title="Quem Somos" subtitle="Fundamentados na Tradição e na Fé">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
            <p>
              O <strong>Colégio Luz</strong> nasceu de um propósito profundo de oferecer uma educação que não apenas informasse a mente, mas que formasse o caráter à luz dos princípios eternos. Somos a primeira instituição de Educação Cristã Clássica de Sergipe.
            </p>
            <p>
              Sob a liderança de nossos fundadores, <strong>{INSTITUTIONAL_DATA.founders}</strong>, resgatamos a herança pedagógica ocidental, integrando o rigor acadêmico à cosmovisão bíblica. Nossa história é escrita diariamente pelo compromisso com a verdade e o amor pelo conhecimento.
            </p>
            
            <div className="pt-4 hidden lg:block">
              <button 
                onClick={openWhatsapp}
                className="bg-cl-yellow text-cl-blue-dark px-8 py-3 font-bold uppercase tracking-widest text-xs hover:shadow-lg transition-all"
              >
                Falar com a Secretaria
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center w-full">
            <div className="relative group w-full">
              <div className="absolute -inset-4 bg-cl-blue-dark/5 rounded-[2rem] blur-2xl group-hover:bg-cl-yellow/10 transition-all duration-700"></div>
              <div className="relative bg-white p-3 md:p-4 shadow-2xl rounded-2xl border border-gray-100 transition-transform duration-500 lg:group-hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-xl bg-slate-900 leading-[0]">
                  <video 
                    controls 
                    poster={HERO_IMAGES[1]}
                    className="w-full h-auto block"
                  >
                    <source src={INSTITUTIONAL_DATA.videoUrl} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-gray-400 font-light italic">
              Assista ao nosso vídeo institucional
            </p>
            <div className="mt-10 lg:hidden w-full flex justify-center">
              <button 
                onClick={openWhatsapp}
                className="bg-cl-yellow text-cl-blue-dark px-10 py-4 font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all w-full sm:w-auto"
              >
                Falar com a Secretaria
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section id="missao" dark className="bg-gradient-to-br from-cl-blue-dark to-slate-900">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 border border-white/10 hover:border-cl-yellow/50 transition-colors">
            <h3 className="text-cl-yellow font-bold uppercase tracking-widest mb-6 text-xs">Nossa Missão</h3>
            <p className="text-cl-blue-light font-light leading-relaxed text-sm">
              Promover educação integral através das ferramentas do aprendizado clássico, conduzindo o aluno ao conhecimento de Deus e à excelência moral e intelectual.
            </p>
          </div>
          <div className="p-8 border border-white/10 hover:border-cl-yellow/50 transition-colors">
            <h3 className="text-cl-yellow font-bold uppercase tracking-widest mb-6 text-xs">Nossa Visão</h3>
            <p className="text-cl-blue-light font-light leading-relaxed text-sm">
              Ser reconhecido como o centro de excelência em educação clássica no Nordeste, transformando gerações através da cultura e da fé.
            </p>
          </div>
          <div className="p-8 border border-white/10 hover:border-cl-yellow/50 transition-colors">
            <h3 className="text-cl-yellow font-bold uppercase tracking-widest mb-6 text-xs">Nossos Valores</h3>
            <ul className="text-cl-blue-light font-light space-y-2 text-sm">
              <li>Amor a Deus e ao Próximo</li>
              <li>Busca pela Verdade e Beleza</li>
              <li>Excelência no Ensino</li>
              <li>Integridade e Transparência</li>
              <li>Amabilidade e Pureza</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Seção Proposta Pedagógica - DESIGN REFINADO COM FUNDO "LUZ" */}
      <Section id="proposta" className="bg-luz-suave overflow-hidden" title="Nossa Proposta Educacional" subtitle="Uma educação para a vida e para a eternidade">
        <div className="max-w-4xl mx-auto text-center mb-24 space-y-6 relative z-10">
          <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
            Nossa proposta é fundamentada na <strong>Educação Cristã Clássica</strong>, resgatando as ferramentas do aprendizado que formaram as mentes mais brilhantes da história ocidental. Atendemos alunos da <strong>Educação Infantil ao Ensino Fundamental I</strong>, com uma estrutura curricular unificada e rigorosa.
          </p>
        </div>
        
        <div className="space-y-16 lg:space-y-24 relative z-10">
          {/* Eixo 1: Fundamentos */}
          <div className="lg:bg-white lg:border lg:border-cl-yellow/10 lg:rounded-[3rem] lg:p-14 lg:shadow-[0_20px_50px_rgba(47,78,141,0.03)] lg:hover:shadow-[0_30px_60px_rgba(246,213,67,0.1)] transition-all duration-700">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-20 items-start">
              <div className="lg:col-span-1 lg:sticky lg:top-32 lg:pr-10 border-l-8 border-cl-blue-dark pl-8 py-2">
                <h3 className="text-cl-blue-dark font-serif text-4xl mb-6 leading-tight">Eixo Estrutural</h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.25em] leading-relaxed">
                  A base de nossa pedagogia reside no desenvolvimento cognitivo natural.
                </p>
              </div>
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                <div className="bg-cl-gray-light/50 p-10 rounded-3xl border border-white hover:bg-white hover:shadow-xl transition-all duration-500 group">
                  <div className="h-1 w-12 bg-cl-blue-dark mb-8 group-hover:w-20 transition-all"></div>
                  <h4 className="font-bold text-cl-blue-dark text-[12px] uppercase tracking-[0.2em] mb-5">O Trivium</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">Organizamos o ensino através da Gramática, Lógica e Retórica, respeitando o tempo de cada fase do desenvolvimento infantil.</p>
                </div>
                <div className="bg-cl-gray-light/50 p-10 rounded-3xl border border-white hover:bg-white hover:shadow-xl transition-all duration-500 group">
                  <div className="h-1 w-12 bg-cl-blue-dark mb-8 group-hover:w-20 transition-all"></div>
                  <h4 className="font-bold text-cl-blue-dark text-[12px] uppercase tracking-[0.2em] mb-5">História como Fio Condutor</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">O currículo é interdisciplinar e unificado pela linha do tempo histórica, conectando literatura, artes, ciência e fé.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Eixo 2: Métodos Reconhecidos */}
          <div className="lg:bg-white lg:border lg:border-cl-yellow/10 lg:rounded-[3rem] lg:p-14 lg:shadow-[0_20px_50px_rgba(47,78,141,0.03)] lg:hover:shadow-[0_30px_60px_rgba(246,213,67,0.1)] transition-all duration-700">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-20 items-start">
              <div className="lg:col-span-1 lg:sticky lg:top-32 lg:pr-10 border-l-8 border-cl-yellow pl-8 py-2">
                <h3 className="text-cl-blue-dark font-serif text-4xl mb-6 leading-tight">Métodos Científicos</h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.25em] leading-relaxed">
                  Adotamos práticas educacionais de alto desempenho global.
                </p>
              </div>
              <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
                {[
                  { title: "Método Fônico", desc: "Alfabetização sólida baseada na consciência fonológica." },
                  { title: "Matemática de Singapura", desc: "Abordagem CPA (Concreto-Pictórico-Abstrato) para resolução de problemas." },
                  { title: "Programa Bilíngue", desc: "Imersão no inglês com foco acadêmico e cultural." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-cl-gray-light/50 p-8 rounded-3xl border border-white hover:bg-white hover:shadow-xl transition-all duration-500 group flex flex-col justify-between h-full">
                    <div>
                      <h4 className="font-bold text-cl-blue-dark text-[11px] uppercase tracking-[0.2em] mb-4">{item.title}</h4>
                      <p className="text-[12px] text-gray-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-6 h-0.5 w-0 bg-cl-yellow group-hover:w-full transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Eixo 3: Formação Integral */}
          <div className="lg:bg-white lg:border lg:border-cl-yellow/10 lg:rounded-[3rem] lg:p-14 lg:shadow-[0_20px_50px_rgba(47,78,141,0.03)] lg:hover:shadow-[0_30px_60px_rgba(246,213,67,0.1)] transition-all duration-700">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-20 items-start">
              <div className="lg:col-span-1 lg:sticky lg:top-32 lg:pr-10 border-l-8 border-cl-blue-dark pl-8 py-2">
                <h3 className="text-cl-blue-dark font-serif text-4xl mb-6 leading-tight">Formação Integral</h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.25em] leading-relaxed">
                  Desenvolvimento que ultrapassa o campo puramente intelectual.
                </p>
              </div>
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                <div className="bg-cl-blue-dark text-white p-10 rounded-[2.5rem] shadow-2xl border border-cl-blue-dark hover:scale-[1.03] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                  <h4 className="font-bold text-cl-yellow text-[13px] uppercase tracking-[0.25em] mb-6 relative z-10">Quádrupla Formação</h4>
                  <p className="text-sm text-cl-blue-light font-light leading-relaxed relative z-10">Focamos no crescimento equilibrado: Intelectual (conhecimento), Moral (caráter), Espiritual (fé) e Emocional (virtudes).</p>
                </div>
                <div className="bg-cl-gray-light/50 p-10 rounded-[2.5rem] border-l-8 border-cl-yellow border-y border-r border-white hover:bg-white hover:shadow-xl transition-all duration-500">
                  <h4 className="font-bold text-cl-blue-dark text-[12px] uppercase tracking-[0.2em] mb-6">Acompanhamento e Estrutura</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">Preceptoria individualizada, turmas reduzidas para atenção real e material didático curado e livre de ideologias.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Seção Segmentos de Ensino Ampliada */}
      <Section id="segmentos" dark title="Segmentos de Ensino" subtitle="Do 1 aninho ao 5º ano • Programa Bilíngue • Manhã e Estendido">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/5 p-10 backdrop-blur-sm border border-white/10 rounded-sm hover:border-cl-yellow/30 transition-all duration-500">
            <h3 className="text-xl font-bold mb-6 text-cl-yellow font-sans uppercase tracking-[0.2em]">Educação Infantil</h3>
            <p className="text-cl-blue-light leading-relaxed mb-8 font-light text-sm">
              Fase focada no maravilhamento e na descoberta, <strong>a partir de 1 aninho</strong>. Através da música, das histórias clássicas e do brincar direcionado, cultivamos o amor pelo aprendizado e a formação de bons hábitos.
            </p>
            <ul className="text-[11px] space-y-3 text-white/90 italic font-serif border-l border-cl-yellow/40 pl-4">
              <li>• Desenvolvimento motor e sensorial</li>
              <li>• Introdução à literatura clássica</li>
              <li>• Formação de virtudes</li>
            </ul>
          </div>
          <div className="bg-white/5 p-10 backdrop-blur-sm border border-white/10 rounded-sm hover:border-cl-yellow/30 transition-all duration-500">
            <h3 className="text-xl font-bold mb-6 text-cl-yellow font-sans uppercase tracking-[0.2em]">Ensino Fundamental I</h3>
            <p className="text-cl-blue-light leading-relaxed mb-8 font-light text-sm">
              Onde o rigor acadêmico encontra a sabedoria. Focamos na fase da Gramática e Lógica, <strong>até o 5º ano</strong>, provendo as ferramentas necessárias para que o aluno domine a linguagem e o pensamento formal.
            </p>
            <ul className="text-[11px] space-y-3 text-white/90 italic font-serif border-l border-cl-yellow/40 pl-4">
              <li>• Gramática latina e portuguesa</li>
              <li>• História como eixo condutor</li>
              <li>• Belas artes e música</li>
            </ul>
          </div>
        </div>

        {/* Novo Bloco: Atividades Extracurriculares */}
        <div className="mb-20 text-center">
          <div className="inline-block px-8 py-4 bg-cl-yellow/10 border border-cl-yellow/30 rounded-full mb-8">
             <p className="text-cl-yellow font-bold uppercase tracking-[0.3em] text-[10px]">Atividades Extracurriculares</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {['Música', 'Balé', 'Judô'].map((act) => (
              <div key={act} className="flex items-center space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-cl-yellow group-hover:scale-150 transition-transform"></div>
                <span className="text-white text-lg font-serif italic tracking-wide group-hover:text-cl-yellow transition-colors">{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grade de Diferenciais Acadêmicos - ATUALIZADA PARA 3 COLUNAS */}
        <div className="border-t border-white/10 pt-16">
          <h4 className="text-center text-cl-yellow font-bold uppercase tracking-[0.4em] text-[10px] mb-12 opacity-80">Nossos Pilares Institucionais</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="h-12 w-12 mx-auto text-cl-yellow border border-cl-yellow/20 rounded-full flex items-center justify-center p-2 mb-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h5 className="text-[11px] font-bold text-white uppercase tracking-widest">Corpo Docente Qualificado</h5>
              <p className="text-[10px] text-cl-blue-light/60 font-light uppercase leading-relaxed px-4">Educadores comprometidos com a visão clássica e cristã.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 mx-auto text-cl-yellow border border-cl-yellow/20 rounded-full flex items-center justify-center p-2 mb-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h5 className="text-[11px] font-bold text-white uppercase tracking-widest">Turmas Reduzidas</h5>
              <p className="text-[10px] text-cl-blue-light/60 font-light uppercase leading-relaxed px-4">Atenção individualizada para garantir o aprendizado real.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 mx-auto text-cl-yellow border border-cl-yellow/20 rounded-full flex items-center justify-center p-2 mb-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h5 className="text-[11px] font-bold text-white uppercase tracking-widest">Parceria com a Família</h5>
              <p className="text-[10px] text-cl-blue-light/60 font-light uppercase leading-relaxed px-4">Educação integrada entre escola e o ambiente doméstico.</p>
            </div>
          </div>

          {/* Citação em Destaque: Material e Visão */}
          <div className="mt-24 max-w-4xl mx-auto text-center px-6">
            <div className="relative inline-block py-4">
              <span className="absolute -top-12 -left-8 text-cl-yellow/10 text-[120px] font-serif leading-none select-none">“</span>
              <p className="text-white font-serif italic text-lg md:text-2xl leading-relaxed relative z-10 px-4 md:px-12">
                Material cuidadosamente selecionado, alinhado à <span className="text-cl-yellow not-italic font-bold">cosmovisão cristã</span> e ao desenvolvimento integral da criança.
              </p>
              <span className="absolute -bottom-20 -right-8 text-cl-yellow/10 text-[120px] font-serif leading-none select-none">”</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Seção Contato */}
      <Section id="contato" className="bg-cl-gray-light">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-cl-blue-dark uppercase tracking-widest mb-4">Contato</h2>
              <p className="text-gray-600 font-light italic">Estamos prontos para receber sua família.</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="text-cl-blue-dark mt-1">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-gray-700 leading-relaxed font-light">{INSTITUTIONAL_DATA.address}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-cl-blue-dark">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="text-gray-700 font-light">{INSTITUTIONAL_DATA.phone}</span>
              </div>
              {/* Instagram Item */}
              <div className="flex items-center space-x-4 cursor-pointer group" onClick={openInstagram}>
                <div className="text-cl-blue-dark group-hover:text-cl-yellow transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-bold text-sm tracking-wide group-hover:text-cl-blue-dark">@colegio.luz</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-cl-blue-dark">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-gray-700 font-bold text-sm tracking-wide">{INSTITUTIONAL_DATA.email}</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] bg-slate-200 shadow-inner rounded-2xl overflow-hidden relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.15170366627!2d-37.0423!3d-10.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71ab3748259d083%3A0xe54e1957c6b5d27d!2sAv.%20M%C3%A1rio%20Jorge%20Menezes%20Vieira%2C%201000%20-%20Coroa%20do%20Meio%2C%20Aracaju%20-%20SE%2C%2049035-100!5e0!3m2!1spt-BR!2sbr!4v1690000000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Section>

      <footer className="bg-cl-blue-dark text-white py-16 px-6 border-t-8 border-cl-yellow">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <img src={LOGO_URLS.white} alt="Colégio Luz" className="h-16" />
              </div>
              <p className="text-cl-blue-light text-[10px] font-light leading-relaxed uppercase tracking-widest">
                Formando mentes e corações para a eternidade.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-widest text-cl-yellow text-[10px]">Institucional</h4>
              <ul className="text-cl-blue-light text-xs font-light space-y-2">
                <li><a href="#quem-somos" onClick={(e) => { e.preventDefault(); scrollToSection('quem-somos'); }} className="hover:text-white transition-colors">Quem Somos</a></li>
                <li><a href="#proposta" onClick={(e) => { e.preventDefault(); scrollToSection('proposta'); }} className="hover:text-white transition-colors">Proposta Pedagógica</a></li>
                <li><a href="#segmentos" onClick={(e) => { e.preventDefault(); scrollToSection('segmentos'); }} className="hover:text-white transition-colors">Segmentos</a></li>
                <li><a href="#contato" onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }} className="hover:text-white transition-colors">Fale Conosco</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-widest text-cl-yellow text-[10px]">Transparência</h4>
              <ul className="text-cl-blue-light text-xs font-light space-y-2">
                <li><button onClick={() => setCurrentView(PageView.PRIVACY)} className="hover:text-white">Política de Privacidade</button></li>
                <li><button onClick={() => setCurrentView(PageView.TERMS)} className="hover:text-white">Termos de Uso</button></li>
                <li><button onClick={() => setCurrentView(PageView.LEGAL)} className="hover:text-white">Aviso Legal</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[9px] text-cl-blue-light/60 font-light text-center md:text-left space-y-4 md:space-y-0 uppercase tracking-[0.3em]">
            <div>
              &copy; {new Date().getFullYear()} {INSTITUTIONAL_DATA.name} | CNPJ: {INSTITUTIONAL_DATA.cnpj}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
