"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// 1. 한국어 타입 사전 및 번역 매핑 데이터 정의
const TYPE_MAP: Record<string, { ko: string; text: string; bg: string; border: string }> = {
  normal: { ko: "노말", text: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200" },
  fire: { ko: "불꽃", text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
  water: { ko: "물", text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  grass: { ko: "풀", text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  electric: { ko: "전기", text: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
  ice: { ko: "얼음", text: "text-cyan-500", bg: "bg-cyan-50", border: "border-cyan-200" },
  fighting: { ko: "격투", text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  poison: { ko: "독", text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  ground: { ko: "땅", text: "text-yellow-800", bg: "bg-yellow-50", border: "border-yellow-250" },
  flying: { ko: "비행", text: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200" },
  psychic: { ko: "에스퍼", text: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200" },
  bug: { ko: "벌레", text: "text-lime-600", bg: "bg-lime-50", border: "border-lime-200" },
  rock: { ko: "바위", text: "text-stone-600", bg: "bg-stone-100", border: "border-stone-200" },
  ghost: { ko: "고스트", text: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200" },
  dragon: { ko: "드래곤", text: "text-indigo-800", bg: "bg-indigo-50", border: "border-indigo-200" },
  steel: { ko: "강철", text: "text-zinc-500", bg: "bg-zinc-100", border: "border-zinc-300" },
  fairy: { ko: "페어리", text: "text-rose-400", bg: "bg-rose-50/70", border: "border-rose-150" },
  dark: { ko: "악", text: "text-stone-850", bg: "bg-stone-100", border: "border-stone-250" }
};

const STAT_LABELS: Record<string, { ko: string; color: string }> = {
  hp: { ko: "체력 (HP)", color: "bg-rose-500" },
  attack: { ko: "공격력", color: "bg-orange-500" },
  defense: { ko: "방어력", color: "bg-blue-500" },
  "special-attack": { ko: "특수공격", color: "bg-purple-500" },
  "special-defense": { ko: "특수방어", color: "bg-emerald-500" },
  speed: { ko: "스피드", color: "bg-amber-500" }
};

// 2. 1세대 포켓몬 151마리 한글 이름 매핑 사전 (API 속도 최적화를 위해 로컬 정의)
const POKEMON_KO_NAMES: Record<string, string> = {
  bulbasaur: "이상해씨", ivysaur: "이상해풀", venusaur: "이상해꽃",
  charmander: "파이리", charmeleon: "리자드", charizard: "리자몽",
  squirtle: "꼬부기", wartortle: "어니부기", blastoise: "거북왕",
  caterpie: "캐터피", metapod: "단데기", butterfree: "버터플",
  weedle: "뿔충이", kakuna: "딱충이", beedrill: "독침붕",
  pidgey: "구구", pidgeotto: "피전", pidgeot: "피전투",
  rattata: "꼬렛", raticate: "레트라",
  spearow: "깨비참", fearow: "깨비드릴조",
  ekans: "아보", arbok: "아보크",
  pikachu: "피카츄", raichu: "라이츄",
  sandshrew: "모래두지", sandslash: "고지",
  "nidoran-f": "니드런♀", nidorina: "니도리나", nidoqueen: "니도퀸",
  "nidoran-m": "니드런♂", nidorino: "니도리노", nidoking: "니도킹",
  clefairy: "삐삐", clefable: "픽시",
  vulpix: "식스테일", ninetales: "나인테일",
  jigglypuff: "푸린", wigglytuff: "푸크린",
  zubat: "주뱃", golbat: "골뱃",
  oddish: "뚜벅초", gloom: "냄새꼬", vileplume: "라플레시아",
  paras: "파라스", parasect: "파라섹트",
  venonat: "콘팡", venomoth: "도나리",
  diglett: "디그다", dugtrio: "닥트리오",
  meowth: "나옹", persian: "페르시온",
  psyduck: "고라파덕", golduck: "골덕",
  mankey: "망키", primeape: "성원숭",
  growlithe: "가디", arcanine: "윈디",
  poliwag: "발챙이", poliwhirl: "슈륙챙이", poliwrath: "강챙이",
  abra: "캐이시", kadabra: "윤겔라", alakazam: "후딘",
  machop: "알통몬", machoke: "근육몬", machamp: "괴력몬",
  bellsprout: "모다피", weepinbell: "우츠동", victreebel: "우츠보트",
  tentacool: "왕눈해", tentacruel: "독파리",
  geodude: "꼬마돌", graveler: "데구리", golem: "딱구리",
  ponyta: "포니타", rapidash: "날쌩마",
  slowpoke: "야돈", slowbro: "야도란",
  magnemite: "코일", magneton: "레어코일",
  farfetchd: "파오리",
  doduo: "두두", dodrio: "두트리오",
  seel: "쥬쥬", dewgong: "쥬레곤",
  grimer: "질퍽이", muk: "질뻐기",
  shellder: "셀러", cloyster: "파르셀",
  gastly: "고스", haunter: "고우스트", gengar: "팬텀",
  onix: "롱스톤",
  drowzee: "슬리프", hypno: "슬리퍼",
  krabby: "크랩", kingler: "킹크랩",
  voltorb: "찌리리공", electrode: "붐볼",
  exeggcute: "아라리", exeggutor: "나시",
  cubone: "탕구리", marowak: "텅구리",
  hitmonlee: "시라소몬", hitmonchan: "홍수몬",
  lickitung: "내루미",
  koffing: "또가스", weezing: "또도가스",
  rhyhorn: "뿔카노", rhydon: "코뿌리",
  chansey: "럭키",
  tangela: "덩쿠리",
  kangaskhan: "캥카",
  horsea: "쏘드라", seadra: "시드라",
  goldeen: "콘치", seaking: "왕콘치",
  staryu: "별가사리", starmie: "아쿠스타",
  "mr-mime": "마임맨",
  scyther: "스라크",
  jynx: "루주라",
  electabuzz: "에레브",
  magmar: "마그마",
  pinsir: "쁘사이저",
  tauros: "켄타로스",
  magikarp: "잉어킹", gyarados: "갸라도스",
  lapras: "라프라스",
  ditto: "메타몽",
  eevee: "이브이", vaporeon: "샤미드", jolteon: "쥬피썬더", flareon: "부스터",
  porygon: "폴리곤",
  omanyte: "암나이트", omastar: "암스타",
  kabuto: "투구", kabutops: "투구푸스",
  aerodactyl: "프테라",
  snorlax: "잠만보",
  articuno: "프리져", zapdos: "썬더", moltres: "파이어",
  dratini: "미뇽", dragonair: "신뇽", dragonite: "망나뇽",
  mewtwo: "뮤츠", mew: "뮤"
};

interface PokemonBase {
  name: string;
  url: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  koName: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
}

export default function DogamPage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 데이터 풀 및 필터링 상태
  const [allPokemon, setAllPokemon] = useState<PokemonBase[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonBase[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<PokemonDetail[]>([]);

  // 필터 및 페이지네이션 상태
  const [activeType, setActiveType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;

  // 상세 모달 타겟
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);

  // 로컬 캐시 (동일 포켓몬 중복 fetch 방지)
  const detailCache = useRef<Record<string, PokemonDetail>>({});

  // 1. 컴포넌트 마운트 시 전체 기본 포켓몬 목록 조회
  const fetchAllPokemonList = async () => {
    setInitialLoading(true);
    setError(null);
    try {
      // 1세대 주요 151마리 목록 타겟팅 (속도 및 정합성 최적화)
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      if (!res.ok) throw new Error("전체 포켓몬 목록을 가져오는 데 실패했습니다.");
      const data = await res.json();
      if (data && data.results) {
        setAllPokemon(data.results);
        setFilteredPokemon(data.results);
      }
    } catch (err: any) {
      setError(err.message || "서버와 연결하는 도중 오류가 발생했습니다.");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemonList();
  }, []);

  // 2. 타입 변경 필터링 로직
  const handleTypeChange = async (type: string) => {
    setActiveType(type);
    setCurrentPage(1);
    setError(null);

    if (type === "all") {
      setFilteredPokemon(allPokemon);
      return;
    }

    setLoadingDetails(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!res.ok) throw new Error(`포켓몬 타입 정보를 불러오지 못했습니다.`);
      const data = await res.json();
      
      // 타입 Endpoint에서 나온 포켓몬 리스트 매핑
      const typePokemon = data.pokemon.map((p: any) => ({
        name: p.pokemon.name,
        url: p.pokemon.url
      }));

      // 1세대 범위(151마리) 내의 포켓몬으로 교집합 필터링
      const validNames = new Set(allPokemon.map(p => p.name));
      const filtered = typePokemon.filter((p: PokemonBase) => validNames.has(p.name));

      setFilteredPokemon(filtered);
    } catch (err: any) {
      setError(err.message || "타입별 포켓몬을 가져오는 도중 오류가 발생했습니다.");
    } finally {
      setLoadingDetails(false);
    }
  };

  // 3. 현재 페이지에 노출될 24마리 상세 데이터 fetch 로직
  useEffect(() => {
    if (filteredPokemon.length === 0) {
      setDisplayedPokemon([]);
      return;
    }

    const fetchPageDetails = async () => {
      setLoadingDetails(true);
      setError(null);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageItems = filteredPokemon.slice(startIndex, endIndex);

      try {
        const details = await Promise.all(
          pageItems.map(async (item) => {
            // 캐시 확인
            if (detailCache.current[item.url]) {
              return detailCache.current[item.url];
            }

            const res = await fetch(item.url);
            if (!res.ok) throw new Error("포켓몬 상세 정보를 가져올 수 없습니다.");
            const pokemonData = await res.json();

            // 로컬 한글 매핑 사전을 활용해 지연 시간 0ms로 한글 이름 부여
            pokemonData.koName = POKEMON_KO_NAMES[pokemonData.name] || pokemonData.name;

            // 캐시에 보관
            detailCache.current[item.url] = pokemonData;
            return pokemonData;
          })
        );
        setDisplayedPokemon(details);
      } catch (err: any) {
        setError(err.message || "상세 정보 데이터를 불러오는 도중 오류가 발생했습니다.");
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchPageDetails();
  }, [filteredPokemon, currentPage]);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const formatId = (id: number) => {
    return "#" + String(id).padStart(3, "0");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-slate-50/50 font-sans select-none text-slate-800 overflow-x-hidden">
      
      {/* 배경 데코레이션 블러 서클 */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-[60%] -left-40 w-96 h-96 bg-yellow-100/40 rounded-full filter blur-3xl opacity-75 pointer-events-none" />

      {/* --- 상단 헤더 --- */}
      <header className="relative w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-white/70 backdrop-blur-md z-30">
        <Link href="/" className="flex items-center gap-2 group text-xl font-black text-slate-800 tracking-tight">
          <div className="relative w-7.5 h-7.5 rounded-full border-2.5 border-slate-800 bg-white overflow-hidden flex flex-col justify-between items-center group-hover:rotate-180 transition-transform duration-500 shadow-sm">
            <div className="w-full h-1/2 bg-blue-500 border-b border-slate-800" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.2 h-3.2 rounded-full border-2.5 border-slate-800 bg-yellow-400 z-10" />
            <div className="w-full h-1/2 bg-white" />
          </div>
          <span>포켓몬 <span className="text-blue-600">탐험대</span></span>
        </Link>
        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors duration-200">
          <span>←</span> 메인으로 돌아가기
        </Link>
      </header>

      {/* --- 본문 콘텐츠 영역 --- */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 z-10">
        
        {/* 페이지 소개 타이틀 */}
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
            <span>📖</span> 포켓몬 도감
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-2">
            다양한 능력과 타입을 가진 포켓몬 정보들을 한눈에 탐험해보세요!
          </p>
        </div>

        {/* 타입 필터 바 */}
        <div className="mb-8 bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-1">
            <span>⚡</span> 타입별 필터링
          </h3>
          <div className="flex flex-wrap gap-2">
            {/* 전체 선택 버튼 */}
            <button
              onClick={() => handleTypeChange("all")}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-2xl border transition-all duration-200 cursor-pointer ${
                activeType === "all"
                  ? "bg-slate-800 text-white border-slate-800 shadow-md shadow-slate-800/10 scale-102"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              전체
            </button>
            {/* 타입별 버튼들 */}
            {Object.keys(TYPE_MAP).map((typeKey) => {
              const typeInfo = TYPE_MAP[typeKey];
              const isActive = activeType === typeKey;
              return (
                <button
                  key={typeKey}
                  onClick={() => handleTypeChange(typeKey)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? `${typeInfo.bg} ${typeInfo.text} ${typeInfo.border} font-extrabold ring-2 ring-blue-500/20 shadow-xs scale-102`
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {typeInfo.ko}
                </button>
              );
            })}
          </div>
        </div>

        {/* 메인 리스트 뷰 및 예외 화면 */}
        {initialLoading ? (
          // 초기 전체 로딩
          <div className="w-full py-20 flex flex-col justify-center items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-extrabold text-slate-500">포켓몬 도감을 펼치고 있습니다...</p>
          </div>
        ) : error ? (
          // 에러 스크린
          <div className="w-full py-16 px-4 bg-white rounded-3xl border border-red-100 text-center flex flex-col items-center justify-center gap-4 max-w-lg mx-auto">
            <span className="text-4xl">⚠️</span>
            <h3 className="text-lg font-black text-slate-800">문제가 발생했습니다</h3>
            <p className="text-sm text-slate-500 font-medium whitespace-pre-line">{error}</p>
            <button
              onClick={fetchAllPokemonList}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-md shadow-blue-500/10"
            >
              다시 시도하기
            </button>
          </div>
        ) : filteredPokemon.length === 0 ? (
          // 포켓몬 데이터 없음
          <div className="w-full py-20 text-center bg-white rounded-3xl border border-slate-100">
            <span className="text-4xl">🔍</span>
            <p className="text-sm font-bold text-slate-500 mt-4">조건에 매칭되는 포켓몬이 존재하지 않습니다.</p>
          </div>
        ) : (
          // 도감 카드 그리드 목록
          <div className="relative">
            {loadingDetails && (
              <div className="absolute inset-0 bg-slate-50/20 backdrop-blur-[1px] z-10 rounded-3xl" />
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {loadingDetails && displayedPokemon.length === 0
                ? // 스케일링/스켈레톤 플레이스홀더 출력
                  [...Array(itemsPerPage)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[250px] sm:h-[280px] bg-white rounded-3xl border border-slate-100 p-5 flex flex-col justify-between animate-pulse"
                    >
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-12 bg-slate-200 rounded-full" />
                        <div className="h-3.5 w-3.5 bg-slate-200 rounded-full" />
                      </div>
                      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-150 rounded-full mx-auto" />
                      <div className="space-y-2 mt-2">
                        <div className="h-4 w-2/3 bg-slate-200 rounded-sm mx-auto" />
                        <div className="h-5 w-1/2 bg-slate-100 rounded-full mx-auto" />
                      </div>
                    </div>
                  ))
                : displayedPokemon.map((pokemon) => {
                    const primaryType = pokemon.types[0]?.type.name || "normal";
                    const typeTheme = TYPE_MAP[primaryType] || TYPE_MAP.normal;

                    return (
                      <div
                        key={pokemon.id}
                        onClick={() => setSelectedPokemon(pokemon)}
                        className="h-[250px] sm:h-[280px] flex flex-col justify-between p-4.5 bg-white rounded-3xl border border-slate-100 shadow-xs hover:border-blue-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
                      >
                        {/* 헤더 행 */}
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-black text-slate-400">
                            {formatId(pokemon.id)}
                          </span>
                          {/* 작은 미니 심볼 */}
                          <div className={`w-3 h-3 rounded-full border border-white ${typeTheme.bg} opacity-80`} />
                        </div>

                        {/* 이미지 영역 */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto flex items-center justify-center">
                          <Image
                            src={
                              pokemon.sprites.other["official-artwork"].front_default ||
                              pokemon.sprites.front_default ||
                              "/next.svg"
                            }
                            alt={pokemon.koName}
                            width={112}
                            height={112}
                            className="object-contain w-full h-full drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                            unoptimized // 외부 CDN 리소스 속도 및 렌더링 최적화
                          />
                        </div>

                        {/* 하단 텍스트 및 타입 정보 */}
                        <div className="text-center space-y-1.5">
                          <h4 className="text-sm sm:text-base font-black text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                            {pokemon.koName}
                          </h4>
                          {/* 타입 배지 */}
                          <div className="flex justify-center gap-1">
                            {pokemon.types.map((t) => {
                              const typeName = t.type.name;
                              const mapped = TYPE_MAP[typeName] || TYPE_MAP.normal;
                              return (
                                <span
                                  key={typeName}
                                  className={`px-2.5 py-0.5 text-[10px] font-black rounded-md border ${mapped.bg} ${mapped.text} ${mapped.border}`}
                                >
                                  {mapped.ko}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {/* --- 페이지네이션 컨트롤 --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-5 mt-10">
                <button
                  disabled={currentPage === 1 || loadingDetails}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className={`px-4.5 py-2.5 text-xs sm:text-sm font-extrabold rounded-2xl border transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    currentPage === 1 || loadingDetails
                      ? "bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed"
                      : "bg-white text-blue-600 border-blue-150 hover:bg-blue-50 active:scale-95 shadow-xs"
                  }`}
                >
                  ◀ 이전
                </button>
                <span className="text-xs sm:text-sm font-extrabold text-slate-500">
                  {currentPage} / {totalPages} 페이지
                </span>
                <button
                  disabled={currentPage === totalPages || loadingDetails}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className={`px-4.5 py-2.5 text-xs sm:text-sm font-extrabold rounded-2xl border transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    currentPage === totalPages || loadingDetails
                      ? "bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed"
                      : "bg-white text-blue-600 border-blue-150 hover:bg-blue-50 active:scale-95 shadow-xs"
                  }`}
                >
                  다음 ▶
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- 포켓몬 상세 모달창 --- */}
      {selectedPokemon && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPokemon(null)}
        >
          {/* 모달 박스 */}
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative border border-slate-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 상단 장식 타입배경 컬러 띠 */}
            <div className={`relative h-24 w-full flex items-end p-4 bg-gradient-to-r ${
              selectedPokemon.types[0]?.type.name === "fire" ? "from-rose-450 to-orange-400" :
              selectedPokemon.types[0]?.type.name === "water" ? "from-blue-450 to-cyan-400" :
              selectedPokemon.types[0]?.type.name === "grass" ? "from-emerald-450 to-teal-400" :
              selectedPokemon.types[0]?.type.name === "electric" ? "from-amber-400 to-yellow-300" :
              "from-slate-400 to-zinc-300"
            }`}>
              {/* 로고 물방울 데코 */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-4 border-white/10 flex items-center justify-center text-white/10 text-3xl font-black select-none pointer-events-none">
                Poke
              </div>

              {/* 도감 번호 */}
              <span className="text-white/80 font-black text-sm drop-shadow-xs">
                {formatId(selectedPokemon.id)}
              </span>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedPokemon(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              ✕
            </button>

            {/* 모달 바디 */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* 메인 타이틀 & 이미지 */}
              <div className="text-center space-y-3">
                <div className="relative w-36 h-36 mx-auto bg-slate-50 border border-slate-100 rounded-full p-4 flex items-center justify-center shadow-inner">
                  <Image
                    src={
                      selectedPokemon.sprites.other["official-artwork"].front_default ||
                      selectedPokemon.sprites.front_default ||
                      "/next.svg"
                    }
                    alt={selectedPokemon.koName}
                    width={128}
                    height={128}
                    className="object-contain w-full h-full drop-shadow-md animate-float"
                    style={{ animationDuration: "4s" }}
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800">
                    {selectedPokemon.koName}
                  </h3>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider mt-0.5">
                    {selectedPokemon.name}
                  </p>
                </div>

                {/* 타입 배지 */}
                <div className="flex justify-center gap-1.5">
                  {selectedPokemon.types.map((t) => {
                    const typeName = t.type.name;
                    const mapped = TYPE_MAP[typeName] || TYPE_MAP.normal;
                    return (
                      <span
                        key={typeName}
                        className={`px-3 py-1 text-xs font-extrabold rounded-full border ${mapped.bg} ${mapped.text} ${mapped.border}`}
                      >
                        {mapped.ko}
                      </span>
                    );
                  })}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 기본 스펙 (키, 몸무게) */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 block mb-0.5">키</span>
                  <span className="text-sm font-black text-slate-700">
                    {selectedPokemon.height / 10} m
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 block mb-0.5">몸무게</span>
                  <span className="text-sm font-black text-slate-700">
                    {selectedPokemon.weight / 10} kg
                  </span>
                </div>
              </div>

              {/* 능력치 그래프 리스트 */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <span>📊</span> 능력치 스펙
                </h4>
                <div className="space-y-2.5">
                  {selectedPokemon.stats.map((statObj) => {
                    const statName = statObj.stat.name;
                    const labelInfo = STAT_LABELS[statName] || { ko: statName, color: "bg-slate-500" };
                    const value = statObj.base_stat;
                    const percent = Math.min((value / 180) * 100, 100); // 180 기준으로 비율 산출

                    return (
                      <div key={statName} className="space-y-1">
                        <div className="flex justify-between text-xs font-extrabold">
                          <span className="text-slate-500">{labelInfo.ko}</span>
                          <span className="text-slate-800">{value}</span>
                        </div>
                        {/* 프로그레스 바 배경 */}
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                          <div
                            className={`h-full ${labelInfo.color} rounded-full transition-all duration-500`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- 푸터 --- */}
      <footer className="relative w-full text-center py-4 text-xs font-semibold text-slate-400 z-20 bg-white border-t border-slate-50">
        © 2026 포켓몬 탐험대. All rights reserved.
      </footer>
    </div>
  );
}
