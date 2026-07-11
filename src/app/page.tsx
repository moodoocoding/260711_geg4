"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-yellow-50/20 font-sans select-none">
      
      {/* --- 배경 장식 요소 --- */}
      {/* 왼쪽 상단 노란색 부드러운 빛 */}
      <div className="absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 bg-yellow-200/30 rounded-full filter blur-3xl opacity-75 pointer-events-none" />
      {/* 오른쪽 하단 파란색 부드러운 빛 */}
      <div className="absolute bottom-10 right-10 w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-blue-100/40 rounded-full filter blur-3xl opacity-80 pointer-events-none" />

      {/* 배경 장식 아이콘들 (번개, 별, 도트) */}
      <div className="absolute top-[18%] left-[10%] opacity-15 pointer-events-none hidden md:block">
        {/* 번개 아이콘 */}
        <svg className="w-8 h-8 text-yellow-400 fill-current animate-bounce" style={{ animationDuration: "3s" }} viewBox="0 0 24 24">
          <path d="M19 9h-6l3-7L6 13h6l-3 9z" />
        </svg>
      </div>
      <div className="absolute bottom-[25%] left-[8%] opacity-20 pointer-events-none hidden md:block">
        {/* 별/스파클 아이콘 */}
        <svg className="w-6 h-6 text-blue-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l2.56 7.88H22.8l-6.27 4.56 2.4 7.36L12 17.25l-6.93 4.55 2.4-7.36L1.2 9.88h8.24L12 2z" />
        </svg>
      </div>
      <div className="absolute top-[25%] right-[45%] opacity-20 pointer-events-none hidden lg:block">
        {/* 작은 스파클 */}
        <svg className="w-5 h-5 text-yellow-400 fill-current animate-pulse" viewBox="0 0 24 24">
          <path d="M12 2l2.56 7.88H22.8l-6.27 4.56 2.4 7.36L12 17.25l-6.93 4.55 2.4-7.36L1.2 9.88h8.24L12 2z" />
        </svg>
      </div>
      {/* 귀여운 데코 패턴 점들 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none hidden md:grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        ))}
      </div>

      {/* --- 1. 상단 메뉴 --- */}
      <header className="relative w-full max-w-7xl mx-auto px-6 py-5 sm:py-6 flex items-center justify-between z-20">
        {/* 로고 */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group text-xl sm:text-2xl font-black text-slate-800 tracking-tight transition-transform hover:scale-102"
        >
          {/* 미니 몬스터볼 모양의 로고 심볼 */}
          <div className="relative w-8 h-8 rounded-full border-3 border-slate-800 bg-white overflow-hidden flex flex-col justify-between items-center group-hover:rotate-180 transition-transform duration-500 shadow-sm">
            <div className="w-full h-1/2 bg-blue-500 border-b-2 border-slate-800" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-3 border-slate-800 bg-yellow-400 z-10" />
            <div className="w-full h-1/2 bg-white" />
          </div>
          <span>
            포켓몬 <span className="text-blue-600">탐험대</span>
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-slate-600 hover:text-blue-600 font-bold transition-colors duration-200">
            포켓몬 소개
          </Link>
          <Link href="#" className="text-slate-600 hover:text-blue-600 font-bold transition-colors duration-200">
            포켓몬 도감
          </Link>
          <Link 
            href="#" 
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-full transition-all duration-200 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            모험 시작
          </Link>
        </nav>

        {/* 모바일 메뉴 (간단히 가로 배열) */}
        <nav className="flex md:hidden items-center gap-4 text-xs font-black">
          <Link href="#" className="text-slate-600 hover:text-blue-600">
            포켓몬 소개
          </Link>
          <Link href="#" className="text-slate-600 hover:text-blue-600">
            포켓몬 도감
          </Link>
          <Link href="#" className="text-blue-600 hover:text-blue-700 font-black bg-blue-50 px-2.5 py-1.5 rounded-lg">
            모험 시작
          </Link>
        </nav>
      </header>

      {/* --- 메인 히어로 영역 --- */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 pb-10 sm:pb-16 z-10">
        
        {/* 2 & 3. 왼쪽 콘텐츠 영역 (문구, 버튼) */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-xl animate-fade-in">
          {/* 노란색 데코 배지 */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-100/90 text-yellow-800 text-xs sm:text-sm font-extrabold mb-5 sm:mb-6 animate-fade-in-delay-1 border border-yellow-200/50">
            <span>✨</span> 포켓몬과 함께하는 신나는 모험
          </div>

          {/* 메인 제목 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none mb-4 sm:mb-6 animate-fade-in-delay-1">
            오늘, 어떤 <span className="text-blue-600 relative inline-block">포켓몬<span className="absolute left-0 bottom-1 w-full h-2.5 bg-yellow-300/40 -z-10 rounded-full" /></span>을<br className="hidden sm:inline" /> 만나 볼래?
          </h1>

          {/* 설명글 */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8 max-w-lg md:max-w-md animate-fade-in-delay-2">
            서로 다른 모습과 특별한 능력을 가진 포켓몬을 만나 보세요. 새로운 포켓몬과 함께 신나는 모험을 시작해요!
          </p>

          {/* 버튼 2개 */}
          <div className="flex flex-row items-center gap-3.5 w-full justify-center md:justify-start animate-fade-in-delay-3">
            <button className="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 sm:py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black rounded-2xl shadow-md shadow-yellow-400/20 hover:shadow-lg hover:shadow-yellow-400/35 transition-all duration-300 hover:scale-105 active:scale-95">
              포켓몬 만나기
            </button>
            <button className="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-blue-600 border-2 border-blue-100 hover:border-blue-200 font-black rounded-2xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-95">
              포켓몬 알아보기
            </button>
          </div>
        </div>

        {/* 4. 오른쪽 대표 이미지 영역 */}
        <div className="flex-1 flex justify-center items-center relative animate-fade-in-delay-2 w-full max-w-[280px] sm:max-w-[340px] md:max-w-full">
          {/* 이미지 뒷배경 데코 원 */}
          <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[360px] lg:h-[360px] rounded-full bg-blue-100/30 border border-blue-200/20 -z-10 animate-pulse" style={{ animationDuration: "6s" }} />
          <div className="absolute w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] lg:w-[320px] lg:h-[320px] rounded-full bg-yellow-100/20 border-2 border-dashed border-yellow-300/30 -z-10 animate-float" style={{ animationDuration: "7s" }} />

          {/* 피카츄 대표 이미지 컨테이너 (위아래 둥둥 떠다니는 애니메이션 적용) */}
          <div className="relative animate-float w-full flex justify-center items-center">
            {/* 귀여운 데코 스파클 (좌우배치) */}
            <span className="absolute -top-4 -left-4 sm:top-2 sm:left-4 opacity-70 animate-bounce" style={{ animationDuration: "2.5s" }}>
              ✨
            </span>
            <span className="absolute -bottom-2 -right-2 sm:bottom-6 sm:right-6 opacity-70 animate-bounce" style={{ animationDuration: "3.5s" }}>
              ⚡
            </span>

            <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[360px] lg:h-[360px] flex items-center justify-center">
              <Image
                src="/pikachu.png"
                alt="포켓몬 이미지"
                width={360}
                height={360}
                className="object-contain w-full h-full drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>

      </main>

      {/* --- 푸터 / 하단 정보 --- */}
      <footer className="relative w-full text-center py-4 text-xs font-semibold text-slate-400 z-20">
        © 2026 포켓몬 탐험대. All rights reserved.
      </footer>

    </div>
  );
}
