export type GeoCategory = 'reky' | 'mesta' | 'hory';

export const CATEGORY_LABELS: Record<GeoCategory, string> = {
  reky: 'Řeky',
  mesta: 'Města',
  hory: 'Hory',
};

export const GEO_WORDS: Record<GeoCategory, string[]> = {
  reky: [
    'VLTAVA', 'LABE', 'OHŘE', 'MORAVA', 'DYJE', 'BEROUNKA', 'SÁZAVA',
    'JIHLAVA', 'SVRATKA', 'ODRA', 'OSTRAVICE', 'OPAVA', 'BEČVA', 'OLŠE',
    'PLOUČNICE', 'NEŽÁRKA', 'MALŠE', 'BLANICE', 'OTAVA', 'ÚHLAVA',
    'ÚSLAVA', 'RADBUZA', 'MŽE', 'DOUBRAVA', 'KAMENICE', 'ŠÁZAVA',
    'CHRUDIMKA', 'CIDLINA', 'METUJE', 'ÚPA', 'BÍLINA', 'CHOMUTOVKA',
  ],
  mesta: [
    'PRAHA', 'BRNO', 'OSTRAVA', 'PLZEŇ', 'LIBEREC', 'OLOMOUC',
    'PARDUBICE', 'HAVÍŘOV', 'KLADNO', 'MOST', 'TEPLICE', 'DĚČÍN',
    'OPAVA', 'CHOMUTOV', 'JIHLAVA', 'PŘEROV', 'ZLÍN', 'KARVINÁ',
    'PROSTĚJOV', 'TŘEBÍČ', 'HODONÍN', 'ZNOJMO', 'KROMĚŘÍŽ',
    'TÁBOR', 'CHEB', 'KOLÍN', 'BENEŠOV', 'BEROUN', 'PŘÍBRAM',
    'PÍSEK', 'STRAKONICE', 'KLATOVY', 'DOMAŽLICE', 'ROKYCANY',
    'RAKOVNÍK', 'MĚLNÍK', 'NYMBURK', 'PODĚBRADY', 'KUTNÁ HORA',
    'TRUTNOV', 'NÁCHOD', 'JIČÍN', 'ŠUMPERK', 'JESENÍK', 'VSETÍN',
    'UHERSKÝ BROD', 'HODONÍN', 'VYŠKOV', 'BLANSKO', 'ZNOJMO',
  ],
  hory: [
    'SNĚŽKA', 'PRADĚD', 'LYSÁ HORA', 'RADHOŠŤ', 'JEŠTĚD',
    'MILEŠOVKA', 'ŘÍP', 'ŠERÁK', 'KEPRNÍK', 'SMRK',
    'BOUŘŇÁK', 'KLEŤ', 'JEDLOVÁ', 'BOUBÍN', 'ROKLAN',
    'POLEDNÍK', 'PLECHÝ', 'ORLÍK', 'TANEČNICE', 'ČERNÁ HORA',
    'VELKÝ ROUDNÝ', 'JEZERNÍ HORA', 'BRDO', 'VYSOKÁ',
    'VELKÁ DEŠTNÁ', 'KRÁLICKÝ SNĚŽNÍK', 'VLAŠSKÝ LES',
  ],
};

export const GEO_CATEGORIES: GeoCategory[] = ['reky', 'mesta', 'hory'];

export function getRandomGeoWord(category: GeoCategory): string {
  const words = GEO_WORDS[category];
  return words[Math.floor(Math.random() * words.length)];
}
