import { Difficulty } from '@/types';

// Czech word lists by difficulty
export const WORD_LISTS: Record<Difficulty, string[]> = {
  lehka: [
    // 4-letter Czech words
    'drak', 'hora', 'kolo', 'most', 'mrak', 'nebe', 'okno', 'park',
    'pivo', 'slon', 'slza', 'voda', 'vlak', 'zima', 'dnes', 'auto',
    'bota', 'cena', 'dara', 'duch', 'fakt', 'guma', 'hvěz', 'chod',
    'idol', 'jaro', 'kino', 'koza', 'krev', 'kůže', 'list', 'lodi',
    'louk', 'luna', 'maso', 'mech', 'medu', 'mísa', 'molo', 'more',
    'muže', 'mysl', 'myší', 'nádo', 'noci', 'nora', 'nůže', 'obor',
    'ocel', 'olej', 'orel', 'oves', 'páka', 'pěna', 'plán', 'plot',
    'pluh', 'plum', 'plus', 'plže', 'plyn', 'pobr', 'pole', 'poli',
    'porc', 'pořa', 'port', 'pouk', 'použ', 'pruh', 'půda', 'rákos',
    'rána', 'ráno', 'reka', 'roba', 'role', 'ropa', 'rosa', 'roub',
    'ryba', 'rýže', 'řeka', 'řepa', 'říje', 'seno', 'sklo', 'skot',
    'sloh', 'slop', 'slov', 'sněh', 'sofa', 'sojka', 'solo', 'sort',
    'spád', 'spár', 'spěch', 'stan', 'stín', 'stoh', 'stop', 'stráž',
    'strm', 'stud', 'stůl', 'svah', 'svět', 'šáál', 'šaty', 'šéf',
    'škol', 'šnek', 'špek', 'šrot', 'štěs', 'švih', 'tedy', 'tele',
    'teze', 'tisk', 'tkáč', 'tmel', 'tofu', 'tráv', 'trik', 'trup',
    'tůně', 'tvar', 'tvor', 'ucho', 'ulič', 'únor', 'úrok', 'útes',
    'útulek', 'úvah', 'úval', 'vata', 'víno', 'vítr', 'výše', 'zcela',
    'zdar', 'zdím', 'zeď', 'zima', 'zlom', 'znak', 'zpěv', 'zvon',
    'žába', 'žena', 'žito', 'žlab',
    // More common 4-letter words
    'hrad', 'kůl', 'list', 'mrak', 'pták', 'stůl', 'šátek', 'vůně',
    'hnůj', 'chov', 'jíst', 'kůra', 'lest', 'mást', 'nárt', 'oves',
    'pást', 'ráno', 'sáňk', 'těst', 'ústa', 'vést', 'zvuk',
  ].filter((w) => w.length === 4),

  stredni: [
    // 5-letter Czech words
    'slovo', 'kniha', 'město', 'strom', 'hlava', 'světe', 'modrý',
    'černý', 'bílý', 'Praha', 'brána', 'cesta', 'dopis', 'dvůr',
    'hřibt', 'jazyk', 'kaple', 'karta', 'kávou', 'kloub', 'kočka',
    'kohút', 'koník', 'kopec', 'kosti', 'košíl', 'křest', 'křídl',
    'krůta', 'kubík', 'kutál', 'kvest', 'kvíze', 'lampa', 'lebka',
    'léčba', 'ledná', 'letec', 'levně', 'liber', 'lidsk', 'limit',
    'listí', 'liška', 'lodík', 'loket', 'lopat', 'louže', 'lovit',
    'lucen', 'lupen', 'lžíce', 'maják', 'malíř', 'mango', 'marka',
    'maslo', 'mistr', 'mlýna', 'mořsk', 'motýl', 'mouka', 'mozek',
    'mráče', 'mříže', 'musel', 'muzej', 'nabíd', 'nadej', 'naivn',
    'napít', 'nápoj', 'nářek', 'nátěr', 'nebes', 'noční', 'notes',
    'novák', 'nůžka', 'obálk', 'obchd', 'okres', 'olivo', 'opera',
    'opice', 'orloj', 'osoba', 'ovoce', 'pahýl', 'palác', 'paliv',
    'palub', 'papír', 'parku', 'pasáž', 'patron', 'pečeň', 'péčko',
    'penál', 'péro', 'pestr', 'pevno', 'piano', 'pilot', 'plast',
    'pleva', 'plout', 'plyne', 'pokoj', 'poled', 'pomoc', 'popul',
    'pořad', 'posad', 'posel', 'potok', 'pověs', 'povod', 'pozor',
    'práce', 'prach', 'prodj', 'proud', 'prsto', 'první', 'přání',
    'příle', 'psano', 'ptalo', 'půjde', 'radní', 'rakva', 'rampa',
    'rande', 'rapor', 'rýpat', 'říjen', 'řidič', 'řízek', 'sadba',
    'sazba', 'sítko', 'sklep', 'skoba', 'skoro', 'skorý', 'skunk',
    'slaný', 'slast', 'sleva', 'slina', 'sliby', 'sloup', 'sluha',
    'smola', 'smrad', 'smrék', 'smysl', 'sněhu', 'socha', 'sokol',
    'sorno', 'soud', 'spáče', 'spíže', 'sport', 'srdce', 'stání',
    'starý', 'státu', 'stává', 'stelk', 'stisk', 'stoká', 'stopa',
    'strap', 'stres', 'strop', 'strun', 'studn', 'sukno', 'suma',
    'svíce', 'svůdk', 'šediv', 'šibal', 'šifra', 'šišká', 'škola',
    'šroub', 'štěně', 'šťáva', 'šupín', 'tabák', 'tábor', 'tajně',
    'tanec', 'tapor', 'tečka', 'těsto', 'tikot', 'tišit', 'tlama',
    'toast', 'topič', 'továr', 'tráva', 'třída', 'tulák', 'tunel',
    'turba', 'tužka', 'tvorb', 'ubrse', 'uchvá', 'ujmou', 'ukázk',
    'ulice', 'uměle', 'umění', 'únava', 'úplné', 'úřadu', 'usual',
    'úsměv', 'vagon', 'válek', 'válec', 'válka', 'vampír', 'varný',
    'věcně', 'verze', 'věrný', 'větev', 'víčko', 'vidlé', 'víkend',
    'viník', 'vírku', 'vírus', 'vizen', 'vizír', 'vlajk', 'vlevo',
    'vločk', 'vnucen', 'vojna', 'volby', 'vůdce', 'výlet', 'výzva',
    'vzoru', 'xerox', 'zákon', 'zámek', 'západ', 'zápas', 'zarost',
    'závod', 'závěr', 'záznam', 'zbývá', 'zelený', 'zlato', 'zloba',
    'zmije', 'znovu', 'zpráv', 'zrada', 'zvíře', 'žalud', 'žebro',
    'živel', 'žlutý',
    // More good 5-letter Czech words
    'barva', 'beton', 'buben', 'ceník', 'chubb', 'cukrk', 'čajov',
    'četba', 'čínsk', 'čmoud', 'čoček', 'čtení', 'čtyři', 'dálka',
    'datov', 'dcera', 'deník', 'divák', 'dlažb', 'dozor', 'dráha',
    'dřevo', 'duben', 'fauna', 'fazol', 'filtr', 'firma', 'flaša',
    'flora', 'forma', 'foton', 'fráze', 'gabro', 'garáž', 'gesto',
    'gramo', 'grunt', 'gusto', 'hádka', 'harfa', 'heslo', 'hitem',
    'hloub', 'hmota', 'holka', 'horal', 'houba', 'houže', 'hrobk',
    'hroch', 'hudba', 'hyena', 'inzul', 'ironie', 'iskra',
  ].filter((w) => w.length === 5),

  tezka: [
    // 6-letter Czech words
    'branou', 'cestou', 'dívkou', 'domovu', 'energie', 'fotbal',
    'hodina', 'jazyka', 'kabátu', 'kamení', 'kapela', 'karátu',
    'klobás', 'klíčem', 'kolena', 'kostým', 'koupel', 'krájím',
    'krokem', 'kuchyň', 'kultura', 'kvituj', 'lampen', 'lenost',
    'letoun', 'levice', 'libros', 'lidsky', 'listem', 'lodní',
    'logika', 'loupež', 'lžičko', 'malíři', 'marast', 'masáže',
    'matace', 'matice', 'mazání', 'médium', 'menšin', 'mluvit',
    'mohutn', 'morálk', 'motork', 'moucha', 'mrakor', 'múzeum',
    'nabídl', 'naděje', 'nákupu', 'nalevo', 'naopak', 'nápadu',
    'nástup', 'naturk', 'návrhu', 'nebezp', 'nemocn', 'nevinně',
    'nočníc', 'norník', 'novela', 'oblasti', 'oblíbe', 'obranm',
    'ocenit', 'odděle', 'odnést', 'okamži', 'okolím', 'omluva',
    'opevně', 'oprava', 'optika', 'orchestra', 'ostrov', 'otázka',
    'ovocem', 'pahorj', 'paklíč', 'paleta', 'památek', 'paprika',
    'pasáži', 'patník', 'pečivo', 'peněži', 'perník', 'pevnost',
    'pilíře', 'pistel', 'pistol', 'pivnic', 'plachta', 'planeta',
    'plášti', 'plasty', 'plátno', 'plýtvá', 'pocesta', 'podemr',
    'podoba', 'podnik', 'pohled', 'pohost', 'pokryt', 'pomáhá',
    'popisu', 'porada', 'portál', 'poteau', 'potrestat', 'poučen',
    'pozicí', 'právem', 'pracov', 'pramen', 'pravid', 'praxí',
    'produk', 'profil', 'projekt', 'próza', 'provaz', 'průvod',
    'přelov', 'přesun', 'přijde', 'příliš', 'případ', 'přírůst',
    'příslo', 'psaník', 'půjčka', 'radost', 'razník', 'recept',
    'redakc', 'registro', 'rekord', 'remíza', 'renomé', 'rodinné',
    'rokoko', 'rovina', 'rozbor', 'rozhlé', 'rozpad', 'roztok',
    'rubrik', 'ruhova', 'rusovl', 'různý', 'rybníc', 'řídícím',
    'říznos', 'sebran', 'selský', 'sezóna', 'signat', 'sítě',
    'situac', 'sklíze', 'sladko', 'slavno', 'slečna', 'slívov',
    'slušně', 'snadný', 'snouben', 'soubor', 'souhrn', 'součás',
    'souvis', 'soused', 'správa', 'srovná', 'stanice', 'státek',
    'stávka', 'strach', 'strany', 'středn', 'střela', 'studená',
    'stydliv', 'suchar', 'svátek', 'svízel', 'svobod', 'symbol',
    'tabula', 'tajems', 'tapeta', 'tápání', 'tavaní', 'tažení',
    'techni', 'teolog', 'tepeln', 'tetova', 'tísňov', 'titulek',
    'tlumič', 'tobogán', 'topení', 'torent', 'traband', 'trávník',
    'trochu', 'trucov', 'trvání', 'tuhnou', 'tulení', 'tůmník',
    'typick', 'uhasit', 'ukázka', 'uložit', 'umístit', 'úpadek',
    'určení', 'úsilím', 'ústavu', 'útulku', 'uvolni', 'užival',
    'varianta', 'velblou', 'velkoobch', 'venkov', 'veřejn', 'vězeňsk',
    'vilajá', 'vinars', 'vítěze', 'vizitk', 'vlajkou', 'vládou',
    'vlčíma', 'volného', 'vrátil', 'vrtule', 'vstupy', 'výboru',
    'výkonu', 'výpravě', 'výrobk', 'výsledk', 'vývoji', 'výzbroj',
    'zadání', 'záhada', 'zákonů', 'záloha', 'záměra', 'závěru',
    'zdatný', 'zelenin', 'zlepšen', 'zlosyn', 'změnil', 'zmoklý',
    'zprávy', 'zřízen', 'zvláštní', 'žárovka', 'ženicha', 'životu',
    // More clean 6-letter words
    'balkon', 'barman', 'brýlím', 'budova', 'bylina', 'celkem',
    'center', 'cibule', 'dálnic', 'diskos', 'doktor', 'doleva',
    'doplnk', 'drobek', 'drobný', 'duchov', 'důstoj', 'energie',
    'farmacie', 'festen', 'figura', 'finálé', 'formátu', 'galerie',
    'garáže', 'harmon', 'hlídka', 'hodnot', 'horalé', 'hovězí',
    'hranol', 'hrdost', 'hudebník', 'humorn', 'hygiena',
  ].filter((w) => w.length === 6),
};

// Ensure we have enough valid words - add more if lists are too short
const EXTRA_4: string[] = [
  'balt', 'bárk', 'basa', 'bída', 'bití', 'blok', 'boky', 'boli',
  'boma', 'bota', 'brav', 'brko', 'brno', 'brát', 'bříz', 'bubn',
  'budu', 'buka', 'buze', 'cech', 'cela', 'cena', 'cíle', 'cípa',
  'citr', 'cola', 'cors', 'cosi', 'cukr', 'cvik', 'čelo', 'čert',
  'čísl', 'čtvr', 'dálk', 'dato', 'davu', 'dech', 'děln', 'déšť',
  'diol', 'disk', 'dítě', 'dluh', 'dole', 'domo', 'dost', 'drát',
  'drtí', 'duch', 'dupa', 'duše', 'dvůr', 'dýmk', 'ekol', 'expo',
  'fakt', 'fazl', 'fotr', 'frak', 'frem', 'furt', 'gama', 'gela',
  'glad', 'gril', 'grof', 'hádo', 'hala', 'halž', 'hamo', 'hanka',
  'hemo', 'herc', 'herka', 'hlad', 'hlíd', 'hluk', 'hmat', 'hmyz',
  'hnát', 'hodl', 'hoky', 'hold', 'holt', 'honb', 'hopk', 'horn',
  'host', 'houk', 'houz', 'hráb', 'hrát', 'hráz', 'hrst', 'huba',
  'hude', 'hunt', 'huso', 'hůlk', 'hůlm', 'hůst', 'hvíz',
];

const EXTRA_5: string[] = [
  'abces', 'abstr', 'účast', 'agóni', 'akces', 'aktiv', 'album',
  'alej', 'alias', 'alman', 'altán', 'ambit', 'ampli', 'anebo',
  'angel', 'anketa', 'aplik', 'aréna', 'armor', 'aroma', 'aspik',
  'atlas', 'audio', 'autor', 'avion', 'babka', 'balík', 'banda',
  'banka', 'básni', 'batoh', 'beach', 'běžec', 'bitev', 'blána',
  'blaze', 'blesk', 'blíže', 'bloud', 'blues', 'bolák', 'bolet',
  'borek', 'boxer', 'brada', 'bráni', 'brašn', 'bratr', 'brněn',
  'bronz', 'brusl', 'buňka', 'burza', 'bydlí', 'bytel', 'cajzl',
  'celer', 'celul', 'cícha', 'cimer', 'citát', 'couvá', 'cukrí',
  'cyklo', 'čárek', 'čáslv', 'četná', 'čínsk', 'číslo', 'čizma',
  'čmoud', 'čočka', 'čočku', 'čtemp', 'čtyřk',
];

const EXTRA_6: string[] = [
  'abrupt', 'ačkoli', 'adresa', 'agenty', 'agonie', 'agresi',
  'akcent', 'akciov', 'aktéra', 'aktovu', 'aldozu', 'alerge',
  'alfabe', 'alkohol', 'almara', 'alpaka', 'altova', 'ambice',
  'amorfn', 'analog', 'anděla', 'ankety', 'anonym', 'anténa',
  'apatie', 'apliku', 'apostol', 'apropo', 'archiv', 'arenas',
  'asfalt', 'aspiruj', 'ateliér', 'atestuj', 'atletik', 'atrium',
  'audito', 'autorka', 'avokád', 'azurov', 'babičk', 'báseňt',
  'baterie', 'bavlna', 'bazénu', 'bělost', 'bezpečn', 'bílkov',
  'blokád', 'bobule', 'bolest', 'bonbón', 'borůvk', 'bradavice',
  'branky', 'bratříčk', 'brzdou', 'brzičk', 'bublina', 'buchet',
  'bukový', 'burácen', 'bydliš', 'byrokr', 'bytost',
];

// Combine and deduplicate
function buildList(base: string[], extra: string[], len: number): string[] {
  const all = [...base, ...extra].filter((w) => w.length === len);
  const seen = new Set<string>();
  return all.filter((w) => {
    if (seen.has(w)) return false;
    seen.add(w);
    return true;
  });
}

export const WORDS_4 = buildList(WORD_LISTS.lehka, EXTRA_4, 4);
export const WORDS_5 = buildList(WORD_LISTS.stredni, EXTRA_5, 5);
export const WORDS_6 = buildList(WORD_LISTS.tezka, EXTRA_6, 6);

// Curated valid lists (these will always be the play list)
const PLAY_WORDS_4: string[] = [
  'drak', 'hora', 'kolo', 'most', 'mrak', 'nebe', 'okno', 'park',
  'pivo', 'slon', 'slza', 'voda', 'vlak', 'zima', 'auto', 'bota',
  'cena', 'duch', 'guma', 'jaro', 'kino', 'koza', 'krev', 'list',
  'luna', 'maso', 'mech', 'mísa', 'more', 'mysl', 'noci', 'nora',
  'ocel', 'olej', 'orel', 'oves', 'páka', 'pěna', 'plán', 'plot',
  'pole', 'půda', 'rána', 'ráno', 'ryba', 'rýže', 'seno', 'sklo',
  'skot', 'solo', 'sněh', 'sofa', 'stan', 'stín', 'stoh', 'stop',
  'stůl', 'svah', 'šaty', 'tele', 'teze', 'tisk', 'tmel', 'tráv',
  'trik', 'tvar', 'tvor', 'ucho', 'únor', 'úrok', 'vata', 'víno',
  'vítr', 'zdar', 'zima', 'zlom', 'znak', 'zpěv', 'zvon', 'žába',
  'žena', 'žito', 'žlab', 'hrad', 'hlad', 'hmyz', 'hnát', 'host',
  'hora', 'houk', 'hrst', 'huba', 'chov', 'kůra', 'lest', 'nůže',
  'pluh', 'pruh', 'řeka', 'řepa', 'stín', 'svět', 'šéfa', 'šnek',
  'špek', 'tůně', 'útes', 'úval',
];

const PLAY_WORDS_5: string[] = [
  'slovo', 'kniha', 'město', 'strom', 'hlava', 'brána', 'cesta',
  'barva', 'beton', 'buben', 'ceník', 'dcera', 'deník', 'divák',
  'dřevo', 'duben', 'fazol', 'filtr', 'firma', 'forma', 'fráze',
  'garáž', 'gesto', 'hádka', 'harfa', 'heslo', 'hloub', 'hmota',
  'holka', 'houba', 'hrobk', 'hroch', 'hudba', 'jazyk', 'kaple',
  'karta', 'kloub', 'kočka', 'koník', 'kopec', 'kosti', 'krůta',
  'lampa', 'lebka', 'léčba', 'letec', 'liška', 'loket', 'louže',
  'lžíce', 'maják', 'malíř', 'mango', 'maslo', 'mistr', 'motýl',
  'mouka', 'mozek', 'muzej', 'nápoj', 'nářek', 'nátěr', 'notes',
  'nůžka', 'okres', 'opera', 'opice', 'orloj', 'osoba', 'ovoce',
  'palác', 'papír', 'pasáž', 'pečeň', 'piano', 'pilot', 'plast',
  'pokoj', 'pomoc', 'pořad', 'posad', 'posel', 'potok', 'pozor',
  'práce', 'prach', 'proud', 'první', 'přání', 'radní', 'rakva',
  'rampa', 'říjen', 'řidič', 'řízek', 'sazba', 'sklep', 'skoro',
  'slaný', 'slast', 'sleva', 'sloup', 'sluha', 'smola', 'smysl',
  'socha', 'sokol', 'srdce', 'starý', 'stopa', 'stres', 'strop',
  'sukno', 'svíce', 'šifra', 'škola', 'šroub', 'štěně', 'šťáva',
  'tabák', 'tábor', 'tanec', 'tečka', 'těsto', 'tikot', 'tlama',
  'topič', 'tráva', 'třída', 'tulák', 'tunel', 'tužka', 'ulice',
  'umění', 'únava', 'úsměv', 'válka', 'větev', 'viník', 'vlajk',
  'vločk', 'vojna', 'volby', 'vůdce', 'výlet', 'výzva', 'zákon',
  'zámek', 'západ', 'zápas', 'závod', 'závěr', 'zelený', 'zlato',
  'zmije', 'znovu', 'zrada', 'zvíře', 'žalud', 'žebro', 'živel',
  'žlutý',
];

const PLAY_WORDS_6: string[] = [
  'branou', 'cestou', 'hodina', 'kabátu', 'kapela', 'klobás',
  'kolena', 'kostým', 'koupel', 'krokem', 'kuchyň', 'lampen',
  'lenost', 'letoun', 'logika', 'loupež', 'malíři', 'marast',
  'matice', 'médium', 'mluvit', 'morálk', 'motork', 'moucha',
  'múzeum', 'naděje', 'nákupu', 'naopak', 'nápadu', 'nástup',
  'novela', 'otázka', 'paprika', 'pečivo', 'perník', 'pevnost',
  'planeta', 'plátno', 'podoba', 'podnik', 'pohled', 'pohost',
  'pomáhá', 'portál', 'pozicí', 'pravid', 'produk', 'profil',
  'průvod', 'přesun', 'půjčka', 'radost', 'recept', 'rokoko',
  'rovina', 'rozpad', 'roztok', 'sezóna', 'situac', 'sladk',
  'slavno', 'slečna', 'soubor', 'souhrn', 'soused', 'správa',
  'stanice', 'stávka', 'strach', 'strany', 'střela', 'suchar',
  'svátek', 'svobod', 'symbol', 'tapeta', 'techni', 'tepeln',
  'tísňov', 'tlumič', 'topení', 'trávník', 'trochu', 'trvání',
  'typick', 'ukázka', 'uložit', 'určení', 'ústavu', 'varianta',
  'venkov', 'vítěze', 'vizitk', 'vládou', 'volného', 'vrátil',
  'vrtule', 'výboru', 'výkonu', 'výrobk', 'vývoji', 'zadání',
  'záhada', 'záloha', 'záměra', 'závěru', 'zelenin', 'zprávy',
  'balkon', 'barman', 'budova', 'bylina', 'celkem', 'cibule',
  'doktor', 'doplnk', 'drobný', 'figura', 'galerie', 'hlídka',
  'hodnot', 'hovězí', 'hranol', 'hrdost',
];

function getWordsForDifficulty(difficulty: Difficulty): string[] {
  switch (difficulty) {
    case 'lehka':
      return PLAY_WORDS_4.length > 0 ? PLAY_WORDS_4 : WORDS_4;
    case 'stredni':
      return PLAY_WORDS_5.length > 0 ? PLAY_WORDS_5 : WORDS_5;
    case 'tezka':
      return PLAY_WORDS_6.length > 0 ? PLAY_WORDS_6 : WORDS_6;
  }
}

/**
 * Deterministically picks a word for a given date and difficulty
 */
export function getWordForDate(date: Date, difficulty: Difficulty): string {
  const words = getWordsForDifficulty(difficulty);
  // Use date-based seed
  const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  // Add difficulty to hash to get different words per difficulty
  const diffHash = difficulty === 'lehka' ? 0 : difficulty === 'stredni' ? 1000 : 2000;
  const index = Math.abs((hash + diffHash) % words.length);
  return words[index];
}

/**
 * Check if a word is valid for the given difficulty.
 * Accepts any word of the correct length made of valid Czech characters.
 */
export function isValidWord(word: string, difficulty: Difficulty): boolean {
  const config = { lehka: 4, stredni: 5, tezka: 6 }[difficulty];
  if (word.length !== config) return false;
  return /^[a-záčďéěíňóřšťůúýž]+$/i.test(word);
}

export default getWordsForDifficulty;
