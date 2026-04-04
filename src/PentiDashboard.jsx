import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from 'recharts';
import {
  TrendingUp, TrendingDown, Users, ShoppingBag, Store,
  Search, Percent, ChevronRight, ChevronUp, ChevronDown,
  ArrowUpDown, ArrowLeft, MousePointerClick
} from 'lucide-react';

// ─── Penti Brand Colors ───────────────────────────────────────
const P = {
  pink:       '#E4006D',
  pinkLight:  '#FFE0EF',
  pinkMid:    '#FF4098',
  pinkDark:   '#A8004F',
  black:      '#1A1A1A',
  grayDark:   '#4B5563',
  gray:       '#9CA3AF',
  grayLight:  '#F3F4F6',
  white:      '#FFFFFF',
  green:      '#059669',
  greenLight: '#D1FAE5',
  red:        '#DC2626',
  redLight:   '#FEE2E2',
  amber:      '#D97706',
  blue:       '#2563EB',
  blueLight:  '#DBEAFE',
};

// ─── Statik Veri ─────────────────────────────────────────────
const omSummaryData = [
  { name: 'Derya Ozturk',          ciro: -16, adet: -23, zs: 18,  do: -7,  fba: 24 },
  { name: 'Hazel Aydemir',         ciro: -19, adet: -31, zs: 26,  do: -6,  fba: 24 },
  { name: 'İbrahim Emre Karasirt', ciro: -18, adet: -29, zs: 25,  do: -7,  fba: 28 },
];

const overallData = { ciro: -17, adet: -28, zs: 23, do: -7, fba: 25 };

const rawBmSummaryData = `OM	BM	Ciro	Adet	ZS	DO	FBA	FBT	GM
Derya Ozturk	Aysun Cetin	-22	-29	15	-5	29	4	2
Derya Ozturk	Buse Aksu	3	6	4	-7	16	0	0
Derya Ozturk	Deniz Uysal	-17	-31	28	-6	23	3	2
Derya Ozturk	Meliha Ilhan	-18	-33	26	-3	35	4	2
Derya Ozturk	Nur Ekici Küçük	-1	-6	14	-7	21	3	2
Derya Ozturk	Ruveyda Un	-34	-36	15	-11	20	6	3
Derya Ozturk	Taylan Yılmaz	-13	-19	20	-10	24	3	1
Hazel Aydemir	Bora Dedeoglu	-41	-38	-2	-3	39	4	2
Hazel Aydemir	Elif Sabaz	-6	-35	57	-8	18	0	0
Hazel Aydemir	Fatih Sulun	-21	-41	43	-5	29	3	2
Hazel Aydemir	Mustafa Bulut	-26	-34	11	1	41	5	2
Hazel Aydemir	Pinar Beyaz	-24	-40	29	-2	43	7	4
Hazel Aydemir	Seda Urgan	-11	-22	28	-11	19	3	1
Hazel Aydemir	Umit Altunkaynak	-2	-10	25	-13	1	1	0
İbrahim Emre Karasirt	Betul Duran	-10	-19	11	0	34	1	1
İbrahim Emre Karasirt	Burcin Taskıran	-25	-37	26	-6	28	3	2
İbrahim Emre Karasirt	Emre Topcan	-16	-20	23	-14	22	15	7
İbrahim Emre Karasirt	Esma Gul	-19	-37	39	-8	24	0	0
İbrahim Emre Karasirt	Hatice Yıldız Ertas	-9	-32	48	-9	24	0	0
İbrahim Emre Karasirt	Mehmet Sena Aydin	-17	-30	26	-7	29	5	2
İbrahim Emre Karasirt	Zehra Celik	-43	-40	1	-6	31	11	5
İbrahim Emre Karasirt	Zeycan Ozcan	-11	-27	28	-4	38	8	4`;

const rawStoreData = `OM	BM	Cari Açıklama	Ciro %	Adet %	ZS %	DO %	FBA %	FBT %	GM %
Derya Ozturk	Aysun Cetin	ANKA 365 AVM	16	21	7	-10	20	5	3
Derya Ozturk	Aysun Cetin	ANKA ANATOLIUM	-63	-53	8	-27	-4	-6	-3
Derya Ozturk	Aysun Cetin	ANKA ARCADIUM AVM	33	44	1	-9	38	5	3
Derya Ozturk	Aysun Cetin	ANKA ARMADA	1	-7	20	-9	31	-1	0
Derya Ozturk	Aysun Cetin	ANKA BILKENT	38	50	12	-18	-13	2	1
Derya Ozturk	Aysun Cetin	ANKA CEPA	-12	-12	9	-8	15	0	0
Derya Ozturk	Aysun Cetin	ANKA GORDION AVM	23	11	15	-3	24	-5	-3
Derya Ozturk	Aysun Cetin	ANKA KENTPARK	-16	-14	9	-9	7	-4	-2
Derya Ozturk	Aysun Cetin	ANKA NATA VEGA AVM	-38	-52	30	-1	38	7	3
Derya Ozturk	Aysun Cetin	ANKA NEXTLEVEL	31	23	8	-2	58	9	5
Derya Ozturk	Aysun Cetin	ANKA OPTIMUM	-10	-31	13	15	62	5	3
Derya Ozturk	Aysun Cetin	ANKA SINCAN CD	-55	-25	-25	-19	27	31	12
Derya Ozturk	Aysun Cetin	ARTV ARTRIUM AVM	-23	-37	61	-24	22	14	7
Derya Ozturk	Aysun Cetin	CANK YUNUS	-22	-32	30	-12	27	8	5
Derya Ozturk	Aysun Cetin	KAST BARUT	-11	33	-39	10	52	22	11
Derya Ozturk	Aysun Cetin	KAST KASTAMALL AVM	-48	-50	14	-9	25	2	1
Derya Ozturk	Aysun Cetin	KIRI PODIUM AVM	-32	-45	22	1	84	2	1
Derya Ozturk	Aysun Cetin	RIZE CUMHURIYET CD	-18	-30	14	3	42	7	3
Derya Ozturk	Aysun Cetin	RIZE SIMAL AVM	-46	-45	1	-4	35	6	3
Derya Ozturk	Aysun Cetin	SIVA ISTASYON CD	-13	-32	20	6	33	4	2
Derya Ozturk	Aysun Cetin	SIVA PRIMEMALL AVM	-35	-60	35	20	79	15	7
Derya Ozturk	Aysun Cetin	TOKA NOVADA AVM	-14	-18	7	-2	18	-3	-2
Derya Ozturk	Aysun Cetin	TRAB ATAPARK	-29	-18	-2	-11	1	3	1
Derya Ozturk	Aysun Cetin	TRAB CEVAHIR OUTLET AVM	-57	-45	-10	-14	24	7	3
Derya Ozturk	Aysun Cetin	TRAB TRABZON FR	-49	-52	20	-11	15	2	1
Derya Ozturk	Aysun Cetin	TRAB UZUN SOKAK 2	-18	-18	4	-4	35	2	1
Derya Ozturk	Aysun Cetin	YOZG NOVADA AVM	-40	-59	59	-8	19	10	5
Derya Ozturk	Buse Aksu	ISTA ALTIYOL CD	6	1	13	-7	24	2	1
Derya Ozturk	Buse Aksu	ISTA BAGDAT CAD	20	24	-2	-1	24	-1	-1
Derya Ozturk	Buse Aksu	ISTA BAHARIYE CD 2	50	10	19	15	22	-2	-1
Derya Ozturk	Buse Aksu	ISTA ERENKOY 2	-6	9	-6	-9	27	-2	-1
Derya Ozturk	Buse Aksu	ISTA HALITAGA CAD	1	32	-14	-12	-5	-8	-4
Derya Ozturk	Buse Aksu	ISTA HILLTOWN KUCUKYALI 2 AVM	-2	-100	-100	-9	3	-1	-1
Derya Ozturk	Buse Aksu	ISTA KOZZY	70	46	7	9	64	5	3
Derya Ozturk	Buse Aksu	ISTA MALTEPE CFR	-19	-37	30	-1	31	7	3
Derya Ozturk	Buse Aksu	ISTA MALTEPE PIAZZA AVM	-33	-29	22	-22	-7	-4	-2
Derya Ozturk	Buse Aksu	ISTA MARMARA ANATOLIUM AVM	-11	3	1	-15	16	-2	-1
Derya Ozturk	Buse Aksu	ISTA MUHURDAR CD	53	21	23	3	58	5	3
Derya Ozturk	Buse Aksu	ISTA OPTIMUM	-24	-39	33	-6	27	-1	0
Derya Ozturk	Buse Aksu	ISTA PALLADIUM 2	75	-6	78	4	25	4	2
Derya Ozturk	Buse Aksu	ISTA RITIM ISTANBUL AVM	118	90	11	4	36	-2	-1
Derya Ozturk	Buse Aksu	ISTA SASKINBAKKAL CD	-23	-47	85	-21	-18	6	3
Derya Ozturk	Buse Aksu	ISTA YAYLADA AVM	40	16	7	13	58	6	3
Derya Ozturk	Deniz Uysal	ISTA GAZIPASA CD	-11	-23	38	-16	-1	-1	-1
Derya Ozturk	Deniz Uysal	ISTA MALTEPE CAD	30	32	-14	14	65	11	6
Derya Ozturk	Deniz Uysal	ISTA MARINA	12	-30	45	10	50	1	0
Derya Ozturk	Deniz Uysal	ISTA NEOMARIN	-24	-39	35	-8	51	7	4
Derya Ozturk	Deniz Uysal	ISTA PENDIK 19 MAYIS CD	-10	-27	43	-14	9	-4	-2
Derya Ozturk	Deniz Uysal	ISTA RINGS AVM	70	26	14	19	68	38	9
Derya Ozturk	Deniz Uysal	ISTA SARIGAZI CD	15	34	1	-15	0	-13	-7
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI ATLAS	-36	-45	35	-13	45	7	4
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI PLATO	-70	-49	-40	-2	19	38	12
Derya Ozturk	Deniz Uysal	ISTA TUZLA MARINA AVM	5	17	-14	4	40	3	1
Derya Ozturk	Deniz Uysal	ISTA TUZLAPORT AVM	43	-100	-100	-11	17	-3	-1
Derya Ozturk	Deniz Uysal	ISTA VIAPORT	-40	-42	37	-24	-4	13	6
Derya Ozturk	Deniz Uysal	ISTA VIAPORT 2	-18	-45	43	4	32	0	0
Derya Ozturk	Deniz Uysal	KOCA GEBZECENTER	-20	-45	59	-9	28	0	0
Derya Ozturk	Deniz Uysal	KOCA OKSIJEN SHOPINN AVM	-77	-67	-4	-27	5	13	7
Derya Ozturk	Deniz Uysal	YALO GAZIPASA CD	42	12	24	3	26	-2	-1
Derya Ozturk	Deniz Uysal	YALO STAR AVM	-38	-36	-2	-2	1	-6	-3
Derya Ozturk	Deniz Uysal	YALO YALOVA KIPA	-46	-42	2	-9	-11	9	5
Derya Ozturk	Meliha Ilhan	AKSA EFOR	-11	-39	21	22	70	5	3
Derya Ozturk	Meliha Ilhan	ANKA ACITY	-49	-55	25	-9	35	13	6
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL	-24	-33	43	-21	-6	2	1
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL 2	7	-33	53	4	33	-1	-1
Derya Ozturk	Meliha Ilhan	ANKA ANKARA FR	-18	-48	53	2	68	4	2
Derya Ozturk	Meliha Ilhan	ANKA ANTARES	-18	-24	13	-4	17	0	0
Derya Ozturk	Meliha Ilhan	ANKA ATAKULE AVM	-5	11	-24	14	66	4	2
Derya Ozturk	Meliha Ilhan	ANKA ATLANTIS	15	-35	76	1	67	7	4
Derya Ozturk	Meliha Ilhan	ANKA FTZ AVM	21	-8	19	10	63	6	3
Derya Ozturk	Meliha Ilhan	ANKA KIZLAR PINARI CD	-100	-100	-100	-100	-100	-100	-41
Derya Ozturk	Meliha Ilhan	ANKA KUZUEFFECT AVM	-35	-3	1	-34	17	0	0
Derya Ozturk	Meliha Ilhan	ANKA ONE TOWER AVM	23	19	1	3	52	2	1
Derya Ozturk	Meliha Ilhan	ANKA PANORA	32	-5	38	2	37	4	2
Derya Ozturk	Meliha Ilhan	ANKA PODIUM AVM	-31	-41	39	-16	18	-5	-3
Derya Ozturk	Meliha Ilhan	ANKA TAURUS	-4	0	-6	2	7	-2	-1
Derya Ozturk	Meliha Ilhan	ANKA VEGA SUBAYEVLERI AVM	-35	-45	24	-5	26	8	4
Derya Ozturk	Meliha Ilhan	KAYS ILDEM AVM	-53	-49	18	-21	34	14	7
Derya Ozturk	Meliha Ilhan	KAYS KAYSERI FR	-26	-21	-12	6	66	7	4
Derya Ozturk	Meliha Ilhan	KAYS KAYSERIPARK	-13	-35	39	-3	24	1	0
Derya Ozturk	Meliha Ilhan	KAYS KUMSMALL AVM	-39	-56	52	-10	32	13	6
Derya Ozturk	Meliha Ilhan	KAYS MEYSU AVM	-51	-68	40	8	40	-6	-3
Derya Ozturk	Meliha Ilhan	NEVS KAPADOKYA FR	-54	-51	-5	-1	40	7	4
Derya Ozturk	Meliha Ilhan	NEVS NISSARA AVM	24	-15	21	21	93	3	2
Derya Ozturk	Meliha Ilhan	NIGD NIGDE CD	-46	-100	-100	-10	12	0	0
Derya Ozturk	Nur Ekici Küçük	ISTA AKASYA AVM	-27	-16	7	-18	-3	3	2
Derya Ozturk	Nur Ekici Küçük	ISTA AKYAKA PARK	-33	-42	29	-10	8	7	4
Derya Ozturk	Nur Ekici Küçük	ISTA ALEMDAG CD	-20	-10	-1	-10	17	2	1
Derya Ozturk	Nur Ekici Küçük	ISTA BRANDIUM	-33	7	-38	1	62	64	23
Derya Ozturk	Nur Ekici Küçük	ISTA BUYAKA	-21	-45	38	5	29	-3	-2
Derya Ozturk	Nur Ekici Küçük	ISTA CANPARK AVM	11	-10	16	6	60	3	2
Derya Ozturk	Nur Ekici Küçük	ISTA CAPITOL	35	18	30	-12	24	6	3
Derya Ozturk	Nur Ekici Küçük	ISTA EMAAR SQUARE AVM	-6	-32	38	-1	15	-1	-1
Hazel Aydemir	Bora Dedeoglu	AMAS AMASYA PARK AVM	-42	-44	-15	21	106	28	13
Hazel Aydemir	Bora Dedeoglu	CORU AHL AVM	-29	-46	34	-1	51	9	4
Hazel Aydemir	Bora Dedeoglu	CORU GAZI CD	-14	-23	15	-3	42	9	4
Hazel Aydemir	Bora Dedeoglu	GIRE GAZI CADDESI	-40	-24	-14	-8	5	-5	-3
Hazel Aydemir	Bora Dedeoglu	ORDU NOVADA AVM	-45	-7	-30	-16	16	7	4
Hazel Aydemir	Bora Dedeoglu	SAMS BAFRA CELIKPARK AVM	-57	-56	7	-9	27	-4	-2
Hazel Aydemir	Bora Dedeoglu	SAMS BULVAR	-18	-12	-12	6	52	11	6
Hazel Aydemir	Bora Dedeoglu	SAMS PIAZZA	-54	-54	2	-2	43	-1	0
Hazel Aydemir	Elif Sabaz	ISTT AKBATI	-21	-37	37	-9	7	2	1
Hazel Aydemir	Elif Sabaz	ISTT ATIRUS AVM	74	13	49	3	51	3	1
Hazel Aydemir	Elif Sabaz	ISTT BEYLIKDUZU MGR	-16	-100	-100	-8	70	10	5
Hazel Aydemir	Elif Sabaz	ISTT MARMARAPARK	-20	-43	47	-5	11	-6	-4
Hazel Aydemir	Elif Sabaz	ISTT TORIUM	-23	-20	18	-19	3	-2	-1
Hazel Aydemir	Fatih Sulun	BALI BANDIRMA LIMAN	-31	-39	37	-17	-4	-3	-2
Hazel Aydemir	Fatih Sulun	BURS ANATOLIUM	-38	-55	37	0	39	-2	-1
Hazel Aydemir	Fatih Sulun	BURS DOWNTOWN AVM	-68	-68	18	-17	13	16	8
Hazel Aydemir	Fatih Sulun	BURS KENT MEYDANI	-20	-39	37	-5	24	1	1
Hazel Aydemir	Fatih Sulun	BURS SUR YAPI MARKA AVM	-15	-36	46	-8	19	-1	0
Hazel Aydemir	Mustafa Bulut	BATM PETROL CITY AVM	-4	-17	12	3	71	4	2
Hazel Aydemir	Mustafa Bulut	DIYA FORUM AVM	-22	-34	23	-4	40	0	0
Hazel Aydemir	Mustafa Bulut	GAZI SANKOPARK	8	-10	23	57	1	0	0
Hazel Aydemir	Pinar Beyaz	ADAN 01 BURDA AVM	-54	-60	37	-16	18	5	2
Hazel Aydemir	Pinar Beyaz	ADAN OPTIMUM	-43	-49	18	-5	36	6	3
Hazel Aydemir	Seda Urgan	CANA 17 BURDA AVM	2	-21	26	2	22	-4	-2
Hazel Aydemir	Seda Urgan	EDIR ERASTA AVM	-22	-32	62	-29	-10	-4	-2
Hazel Aydemir	Seda Urgan	TEKI TEKIRA	-12	-36	33	4	47	10	5
Hazel Aydemir	Umit Altunkaynak	ISTT CEVAHIR	10	9	14	-12	-6	0	0
Hazel Aydemir	Umit Altunkaynak	ISTT ISTINYEPARK	-17	-30	33	-10	-1	-5	-3
İbrahim Emre Karasirt	Betul Duran	ANTA ALANYUM	5	-34	33	19	71	6	3
İbrahim Emre Karasirt	Betul Duran	ANTA MARKANTALYA AVM	-9	-23	12	5	39	-1	-1
İbrahim Emre Karasirt	Burcin Taskıran	MUGL BODRUM AVENUE AVM	9	48	-21	-6	32	5	2
İbrahim Emre Karasirt	Burcin Taskıran	MUGL MIDTOWN	-45	-51	19	-5	15	7	4
İbrahim Emre Karasirt	Emre Topcan	ISTT AQUA FLORYA AVM	-32	-39	29	-13	7	-2	-1
İbrahim Emre Karasirt	Emre Topcan	ISTT CAPACITY	19	1	27	-7	13	-6	-3
İbrahim Emre Karasirt	Esma Gul	DENI CAMLIK FR	-3	-35	48	0	19	-6	-4
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ERZU ERZURUMAVM	-32	-28	13	-16	1	-2	-1
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT MALL OF ISTANBUL	-13	-53	85	0	27	-3	-2
İbrahim Emre Karasirt	Mehmet Sena Aydin	BALI BALIKESIR 10 BURDA AVM	-17	-26	32	-15	18	1	1
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI HILLTOWN AVM	-9	-40	62	-6	32	-3	-2
İbrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI AVM	-53	-54	9	-6	15	3	2
İbrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM	-31	-41	15	2	34	0	0
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI FORUM BORNOVA AVM	-8	-27	26	0	19	1	0
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI ISTINYEPARK AVM	-16	-30	20	1	40	0	0`;

// ─── Parse Helpers ────────────────────────────────────────────
function parseBmData(raw) {
  return raw.trim().split('\n').slice(1).map((line, i) => {
    const c = line.split('\t');
    return {
      id: `bm_${i}`, om: c[0], name: c[1],
      ciro: parseFloat(c[2]) || 0, adet: parseFloat(c[3]) || 0,
      zs:   parseFloat(c[4]) || 0, do:   parseFloat(c[5]) || 0,
      fba:  parseFloat(c[6]) || 0,
    };
  });
}

function parseStoreData(raw) {
  return raw.trim().split('\n').slice(1).map((line, i) => {
    const c = line.split('\t');
    return {
      id: `st_${i}`, om: c[0], bm: c[1], name: c[2],
      ciro: parseFloat(c[3]) || 0, adet: parseFloat(c[4]) || 0,
      zs:   parseFloat(c[5]) || 0, do:   parseFloat(c[6]) || 0,
      fba:  parseFloat(c[7]) || 0,
    };
  });
}

const BM_DATA   = parseBmData(rawBmSummaryData);
const STORE_DATA = parseStoreData(rawStoreData);

// ─── Sub-components ───────────────────────────────────────────
function Badge({ label, diff }) {
  if (diff === undefined || isNaN(diff)) return null;
  const pos = diff >= 0;
  return (
    <span style={{
      fontSize: 10, display: 'inline-flex', alignItems: 'center', gap: 2,
      color: pos ? P.green : P.red, fontWeight: 600,
    }}>
      {label}: {pos ? '▲' : '▼'}{Math.abs(diff).toFixed(1)}
    </span>
  );
}

function KPICard({ title, value, baselineValue, baselineLabel, icon: Icon }) {
  const pos = value >= 0;
  const diff = baselineValue !== undefined ? value - baselineValue : null;
  return (
    <div style={{
      background: P.white, borderRadius: 16, padding: '20px 22px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: `1px solid #F0F0F0`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderLeft: `4px solid ${pos ? P.green : P.pink}`,
      transition: 'box-shadow .2s',
    }}>
      <div>
        <p style={{ fontSize: 12, color: P.gray, fontWeight: 600, marginBottom: 6, letterSpacing: .3 }}>{title}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ fontSize: 30, fontWeight: 800, color: pos ? P.green : P.pink, margin: 0 }}>
            {value}%
          </h3>
          {pos ? <TrendingUp size={18} color={P.green} /> : <TrendingDown size={18} color={P.pink} />}
        </div>
        {diff !== null && (
          <p style={{ margin: '6px 0 0', fontSize: 11, color: P.grayDark }}>
            {baselineLabel} kıyasla:{' '}
            <strong style={{ color: diff >= 0 ? P.green : P.red }}>
              {diff >= 0 ? '+' : ''}{diff.toFixed(1)}%
            </strong>
          </p>
        )}
      </div>
      <div style={{
        padding: 14, borderRadius: 12,
        background: pos ? P.greenLight : P.pinkLight,
        color: pos ? P.green : P.pink,
      }}>
        <Icon size={22} />
      </div>
    </div>
  );
}

const METRICS = ['ciro', 'adet', 'zs', 'do', 'fba'];
const METRIC_LABELS = { ciro: 'Ciro %', adet: 'Adet %', zs: 'ZS %', do: 'DO %', fba: 'FBA %' };

// ─── Main Component ───────────────────────────────────────────
export default function PentiDashboard() {
  const [searchTerm, setSearchTerm]   = useState('');
  const [selectedOM, setSelectedOM]   = useState(null);
  const [selectedBM, setSelectedBM]   = useState(null);
  const [sortConfig, setSortConfig]   = useState({ key: null, direction: 'asc' });

  // ── Drill-down level
  const level = selectedBM ? 'STORE' : selectedOM ? 'BM' : 'OM';

  // ── BUG FIX: tableDataRaw artık düzgün memoize ediliyor
  const tableDataRaw = useMemo(() => {
    if (level === 'OM')    return omSummaryData;
    if (level === 'BM')    return BM_DATA.filter(b => b.om === selectedOM);
    if (level === 'STORE') return STORE_DATA.filter(s => s.bm === selectedBM);
    return [];
  }, [level, selectedOM, selectedBM]);

  // ── Filtrelenmiş + sıralanmış liste
  const tableData = useMemo(() => {
    let rows = tableDataRaw.filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortConfig.key) {
      rows = [...rows].sort((a, b) => {
        const dir = sortConfig.direction === 'asc' ? 1 : -1;
        return (a[sortConfig.key] - b[sortConfig.key]) * dir;
      });
    }
    return rows;
  }, [tableDataRaw, searchTerm, sortConfig]);

  // ── KPI kartı verileri
  const currentData = selectedBM
    ? BM_DATA.find(b => b.name === selectedBM)
    : selectedOM
      ? omSummaryData.find(o => o.name === selectedOM)
      : overallData;

  const baselineData = selectedBM
    ? omSummaryData.find(o => o.name === selectedOM)
    : selectedOM
      ? overallData
      : null;

  const baselineLabel = level === 'STORE' ? selectedOM + ' (OM)' : 'Penti';

  // ── Sıralama
  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // ── Navigasyon
  const handleRowClick = (name) => {
    if (level === 'OM') { setSelectedOM(name); setSearchTerm(''); setSortConfig({ key: null, direction: 'asc' }); }
    if (level === 'BM') { setSelectedBM(name); setSearchTerm(''); setSortConfig({ key: null, direction: 'asc' }); }
  };
  const handleBack = () => {
    if (level === 'STORE') { setSelectedBM(null); setSearchTerm(''); }
    if (level === 'BM')    { setSelectedOM(null); setSearchTerm(''); }
  };

  // ── Renk yardımcısı
  const metricColor = (val) => val > 0 ? P.green : val < 0 ? P.pink : P.gray;

  // ── Tooltip stili
  const tooltipStyle = {
    borderRadius: 10, border: 'none',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontSize: 12,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F8', fontFamily: "'Segoe UI', system-ui, sans-serif", color: P.black }}>

      {/* ─── Header ─── */}
      <div style={{
        background: P.pink, padding: '16px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(228,0,109,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            fontWeight: 900, fontSize: 22, color: P.white, letterSpacing: 2,
            background: 'rgba(255,255,255,0.15)', padding: '4px 14px', borderRadius: 8,
          }}>
            PENTİ
          </div>
          <div>
            <div style={{ color: P.white, fontWeight: 700, fontSize: 15 }}>LFL Performans Paneli</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>Bölgesel Satış Analizi · Canlı Görünüm</div>
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
          Penti Genel Ciro: <strong style={{ color: P.white }}>{overallData.ciro}%</strong>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>

        {/* ─── Breadcrumb ─── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {[
              { label: 'Penti Genel', active: level === 'OM', onClick: () => { setSelectedOM(null); setSelectedBM(null); setSearchTerm(''); } },
              selectedOM && { label: `${selectedOM} (OM)`, active: level === 'BM', onClick: () => { setSelectedBM(null); setSearchTerm(''); } },
              selectedBM && { label: `${selectedBM} (BM)`, active: level === 'STORE', onClick: null },
            ].filter(Boolean).map((crumb, i, arr) => (
              <React.Fragment key={crumb.label}>
                {i > 0 && <ChevronRight size={14} color={P.gray} />}
                <button
                  onClick={crumb.onClick || undefined}
                  style={{
                    padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                    border: crumb.active ? 'none' : `1px solid #E0E0E0`,
                    background: crumb.active ? P.pink : P.white,
                    color: crumb.active ? P.white : P.grayDark,
                    cursor: crumb.onClick ? 'pointer' : 'default',
                    transition: 'all .15s',
                  }}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))}
          </div>
          {level !== 'OM' && (
            <button onClick={handleBack} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              borderRadius: 10, border: `1px solid ${P.pink}`, background: P.white,
              color: P.pink, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'background .15s',
            }}>
              <ArrowLeft size={15} /> Geri Dön
            </button>
          )}
        </div>

        {/* ─── KPI Kartları ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
          <KPICard title="Ciro Değişimi"    value={currentData?.ciro} baselineValue={baselineData?.ciro} baselineLabel={baselineLabel} icon={ShoppingBag} />
          <KPICard title="Adet Değişimi"    value={currentData?.adet} baselineValue={baselineData?.adet} baselineLabel={baselineLabel} icon={Store} />
          <KPICard title="Ziyaretçi (ZS)"  value={currentData?.zs}   baselineValue={baselineData?.zs}   baselineLabel={baselineLabel} icon={Users} />
          <KPICard title="FBA %"            value={currentData?.fba}  baselineValue={baselineData?.fba}  baselineLabel={baselineLabel} icon={Percent} />
        </div>

        {/* ─── Grafikler ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { title: 'Ciro & Adet', metrics: [{ key: 'ciro', name: 'Ciro %', color: P.pink }, { key: 'adet', name: 'Adet %', color: P.pinkMid }] },
            { title: 'Ziyaretçi & FBA', metrics: [{ key: 'zs', name: 'ZS %', color: '#059669' }, { key: 'fba', name: 'FBA %', color: P.blue }] },
          ].map(chart => (
            <div key={chart.title} style={{ background: P.white, borderRadius: 16, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #F0F0F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: P.black }}>{chart.title} Kıyaslaması</h3>
                <span style={{ fontSize: 10, background: P.pinkLight, color: P.pinkDark, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                  {level === 'OM' ? 'Tüm OMs' : level === 'BM' ? 'Bağlı BMs' : 'Bağlı Mağazalar'}
                </span>
              </div>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tableDataRaw} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false}
                      tick={{ fill: P.gray, fontSize: 9 }}
                      tickFormatter={v => v.length > 10 ? v.slice(0, 10) + '…' : v} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: P.gray, fontSize: 10 }} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#F7F7F8' }} />
                    <Legend wrapperStyle={{ paddingTop: 8, fontSize: 11 }} />
                    <ReferenceLine y={0} stroke="#E0E0E0" />
                    {chart.metrics.map(m => (
                      <Bar key={m.key} dataKey={m.key} name={m.name} fill={m.color}
                        radius={[4, 4, 0, 0]} maxBarSize={36} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Tablo ─── */}
        <div style={{ background: P.white, borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #F0F0F0', overflow: 'hidden' }}>

          {/* Tablo Başlık Alanı */}
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid #F0F0F0',
            background: '#FAFAFA', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: P.black }}>
                {level === 'OM' && 'Bölge Müdürleri (OM)'}
                {level === 'BM' && `${selectedOM} › Mağaza Müdürleri (BM)`}
                {level === 'STORE' && `${selectedBM} › Mağazalar`}
              </h3>
              {level !== 'STORE' && (
                <span style={{
                  fontSize: 10, background: P.blueLight, color: P.blue,
                  padding: '3px 10px', borderRadius: 20, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <MousePointerClick size={11} /> Detay için tıkla
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={14} color={P.gray} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="İsim veya mağaza ara…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: 32, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
                  border: `1px solid #E0E0E0`, borderRadius: 10, fontSize: 13,
                  outline: 'none', width: 240, background: P.white,
                  transition: 'border-color .15s',
                }}
              />
            </div>
          </div>

          {/* Tablo */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: P.pinkLight }}>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: P.pinkDark, textTransform: 'uppercase', letterSpacing: .5 }}>
                    {level === 'OM' ? 'Bölge Müdürü' : level === 'BM' ? 'Mağaza Müdürü' : 'Mağaza Adı'}
                  </th>
                  {METRICS.map(m => (
                    <th key={m}
                      onClick={() => requestSort(m)}
                      style={{
                        padding: '12px 10px', textAlign: 'center', cursor: 'pointer',
                        fontWeight: 700, fontSize: 11, color: P.pinkDark, textTransform: 'uppercase',
                        letterSpacing: .5, whiteSpace: 'nowrap',
                        background: sortConfig.key === m ? 'rgba(228,0,109,0.1)' : undefined,
                        userSelect: 'none',
                      }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {METRIC_LABELS[m]}
                        {sortConfig.key === m
                          ? (sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
                          : <ArrowUpDown size={11} color={P.gray} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => {
                  const oData = level === 'BM'    ? omSummaryData.find(o => o.name === selectedOM) : null;
                  const bData = level === 'STORE' ? BM_DATA.find(b => b.name === selectedBM)       : null;
                  return (
                    <tr key={row.id || row.name}
                      onClick={() => handleRowClick(row.name)}
                      style={{
                        borderBottom: '1px solid #F5F5F5',
                        background: idx % 2 === 0 ? P.white : '#FAFAFA',
                        cursor: level !== 'STORE' ? 'pointer' : 'default',
                        transition: 'background .12s',
                      }}
                      onMouseEnter={e => { if (level !== 'STORE') e.currentTarget.style.background = P.pinkLight; }}
                      onMouseLeave={e => { e.currentTarget.style.background = idx % 2 === 0 ? P.white : '#FAFAFA'; }}
                    >
                      <td style={{ padding: '12px 20px', fontWeight: 600, color: P.black, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {row.name}
                        {level !== 'STORE' && <ChevronRight size={13} color={P.pink} />}
                      </td>
                      {METRICS.map(m => (
                        <td key={m} style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: metricColor(row[m]) }}>
                              {row[m]}%
                            </span>
                            <div style={{ display: 'flex', gap: 6 }}>
                              {level === 'OM' && <Badge label="P" diff={row[m] - overallData[m]} />}
                              {level === 'BM' && <>
                                <Badge label="P"  diff={row[m] - overallData[m]} />
                                <Badge label="OM" diff={oData ? row[m] - oData[m] : undefined} />
                              </>}
                              {level === 'STORE' && <Badge label="BM" diff={bData ? row[m] - bData[m] : undefined} />}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {tableData.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: P.gray }}>
                      Kayıt bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{ padding: '10px 20px', borderTop: '1px solid #F0F0F0', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: P.gray }}>
              {tableData.length} kayıt gösteriliyor
            </span>
            <span style={{ fontSize: 10, color: P.gray }}>
              P = Penti Genel · OM = Operasyon Müdürü · BM = Bölge Müdürü kıyasla fark (pp)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
