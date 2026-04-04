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

const P = {
  pink:'#E4006D', pinkLight:'#FFE0EF', pinkMid:'#FF4098', pinkDark:'#A8004F',
  black:'#1A1A1A', grayDark:'#4B5563', gray:'#9CA3AF', grayLight:'#F3F4F6',
  white:'#FFFFFF', green:'#059669', greenLight:'#D1FAE5', red:'#DC2626',
  redLight:'#FEE2E2', blue:'#2563EB', blueLight:'#DBEAFE',
};

// ─── Statik OM Özet Verisi (güncel) ──────────────────────────
const omSummaryData = [
  { name: 'Derya Ozturk',          ciro: 13,  adet: -16, zs: -23, do: 18,  fba: -7  },
  { name: 'Hazel Aydemir',         ciro: 8,   adet: -19, zs: -31, do: 26,  fba: -6  },
  { name: 'İbrahim Emre Karasirt', ciro: 14,  adet: -18, zs: -29, do: 25,  fba: -7  },
];
const overallData = { ciro: 11, adet: -17, zs: -28, do: 23, fba: -7 };

// ─── BM Ham Veri (güncel) ─────────────────────────────────────
const rawBmData = `OM	BM	Ciro	Adet	ZS	DO	FBA
Derya Ozturk	Aysun Cetin	1	-24	-30	14	-5
Derya Ozturk	Buse Aksu	28	1	7	0	-5
Derya Ozturk	Deniz Uysal	11	-16	-31	27	-4
Derya Ozturk	Meliha Ilhan	9	-21	-33	24	-5
Derya Ozturk	Nur Ekici Küçük	35	2	-5	13	-5
Derya Ozturk	Ruveyda Un	-12	-34	-36	16	-11
Derya Ozturk	Taylan Yılmaz	11	-18	-21	14	-9
Hazel Aydemir	Bora Dedeoglu	-15	-39	-36	0	-4
Hazel Aydemir	Elif Sabaz	32	0	-34	59	-5
Hazel Aydemir	Fatih Sulun	0	-26	-40	33	-6
Hazel Aydemir	Mustafa Bulut	3	-26	-34	11	1
Hazel Aydemir	Pinar Beyaz	6	-26	-42	28	-1
Hazel Aydemir	Seda Urgan	12	-15	-24	24	-10
Hazel Aydemir	Umit Altunkaynak	16	-4	-13	26	-12
İbrahim Emre Karasirt	Betul Duran	13	-15	-23	10	1
İbrahim Emre Karasirt	Burcin Taskıran	-8	-30	-40	21	-4
İbrahim Emre Karasirt	Emre Topcan	21	-13	-19	20	-10
İbrahim Emre Karasirt	Esma Gul	4	-20	-21	7	-6
İbrahim Emre Karasirt	Hatice Yıldız Ertas	17	-11	-33	46	-9
İbrahim Emre Karasirt	Mehmet Sena Aydin	6	-22	-37	26	-1
İbrahim Emre Karasirt	Zehra Celik	-23	-44	-43	2	-4
İbrahim Emre Karasirt	Zeycan Ozcan	12	-21	-35	27	-5`;

// ─── Mağaza Ham Veri (güncel, tam liste) ─────────────────────
const rawStoreData = `OM	BM	Magaza	Ciro	Adet	ZS	DO	FBA
Derya Ozturk	Aysun Cetin	ANKA 365 AVM	55	16	21	7	-10
Derya Ozturk	Aysun Cetin	ANKA ANATOLIUM	-51	-63	-53	8	-27
Derya Ozturk	Aysun Cetin	ANKA ARCADIUM AVM	102	33	44	1	-9
Derya Ozturk	Aysun Cetin	ANKA ARMADA	46	1	-7	20	-9
Derya Ozturk	Aysun Cetin	ANKA BILKENT	47	38	50	12	-18
Derya Ozturk	Aysun Cetin	ANKA CEPA	10	-12	-12	9	-8
Derya Ozturk	Aysun Cetin	ANKA GORDION AVM	57	23	11	15	-3
Derya Ozturk	Aysun Cetin	ANKA KENTPARK	-1	-16	-14	9	-9
Derya Ozturk	Aysun Cetin	ANKA NATA VEGA AVM	-14	-38	-52	30	-1
Derya Ozturk	Aysun Cetin	ANKA NEXTLEVEL	110	31	23	8	-2
Derya Ozturk	Aysun Cetin	ANKA OPTIMUM	27	-10	-31	13	15
Derya Ozturk	Aysun Cetin	ANKA SINCAN CD	-29	-55	-25	-25	-19
Derya Ozturk	Aysun Cetin	ARTV ARTRIUM AVM	24	-23	-37	61	-24
Derya Ozturk	Aysun Cetin	CANK YUNUS	13	-22	-32	30	-12
Derya Ozturk	Aysun Cetin	KAST BARUT	23	-11	33	-39	10
Derya Ozturk	Aysun Cetin	KAST KASTAMALL AVM	-29	-48	-50	14	-9
Derya Ozturk	Aysun Cetin	KIRI PODIUM AVM	24	-32	-45	22	1
Derya Ozturk	Aysun Cetin	RIZE CUMHURIYET CD	13	-18	-30	14	3
Derya Ozturk	Aysun Cetin	RIZE SIMAL AVM	-25	-46	-45	1	-4
Derya Ozturk	Aysun Cetin	SIVA ISTASYON CD	9	-13	-32	20	6
Derya Ozturk	Aysun Cetin	SIVA PRIMEMALL AVM	-3	-35	-60	35	20
Derya Ozturk	Aysun Cetin	TOKA NOVADA AVM	3	-14	-18	7	-2
Derya Ozturk	Aysun Cetin	TRAB ATAPARK	-19	-29	-18	-2	-11
Derya Ozturk	Aysun Cetin	TRAB CEVAHIR OUTLET AVM	-39	-57	-45	-10	-14
Derya Ozturk	Aysun Cetin	TRAB TRABZON FR	-34	-49	-52	20	-11
Derya Ozturk	Aysun Cetin	TRAB UZUN SOKAK 2	15	-18	-18	4	-4
Derya Ozturk	Aysun Cetin	YOZG NOVADA AVM	-22	-40	-59	59	-8
Derya Ozturk	Buse Aksu	ISTA ALTIYOL CD	41	6	1	13	-7
Derya Ozturk	Buse Aksu	ISTA BAGDAT CAD	51	20	24	-2	-1
Derya Ozturk	Buse Aksu	ISTA BAHARIYE CD 2	59	50	10	19	15
Derya Ozturk	Buse Aksu	ISTA ERENKOY 2	31	-6	9	-6	-9
Derya Ozturk	Buse Aksu	ISTA HALITAGA CAD	8	1	32	-14	-12
Derya Ozturk	Buse Aksu	ISTA KOZZY	156	70	46	7	9
Derya Ozturk	Buse Aksu	ISTA MALTEPE CFR	7	-19	-37	30	-1
Derya Ozturk	Buse Aksu	ISTA MALTEPE PIAZZA AVM	-19	-33	-29	22	-22
Derya Ozturk	Buse Aksu	ISTA MARMARA ANATOLIUM AVM	20	-11	3	1	-15
Derya Ozturk	Buse Aksu	ISTA MUHURDAR CD	134	53	21	23	3
Derya Ozturk	Buse Aksu	ISTA OPTIMUM	2	-24	-39	33	-6
Derya Ozturk	Buse Aksu	ISTA PALLADIUM 2	109	75	-6	78	4
Derya Ozturk	Buse Aksu	ISTA RITIM ISTANBUL AVM	186	118	90	11	4
Derya Ozturk	Buse Aksu	ISTA SASKINBAKKAL CD	-20	-23	-47	85	-21
Derya Ozturk	Buse Aksu	ISTA YAYLADA AVM	96	40	16	7	13
Derya Ozturk	Deniz Uysal	ISTA GAZIPASA CD	5	-11	-23	38	-16
Derya Ozturk	Deniz Uysal	ISTA MALTEPE CAD	88	30	32	-14	14
Derya Ozturk	Deniz Uysal	ISTA MARINA	53	12	-30	45	10
Derya Ozturk	Deniz Uysal	ISTA NEOMARIN	24	-24	-39	35	-8
Derya Ozturk	Deniz Uysal	ISTA PENDIK 19 MAYIS CD	15	-10	-27	43	-14
Derya Ozturk	Deniz Uysal	ISTA RINGS AVM	140	70	26	14	19
Derya Ozturk	Deniz Uysal	ISTA SARIGAZI CD	35	15	34	1	-15
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI ATLAS	6	-36	-45	35	-13
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI PLATO	-64	-70	-49	-40	-2
Derya Ozturk	Deniz Uysal	ISTA TUZLA MARINA AVM	41	5	17	-14	4
Derya Ozturk	Deniz Uysal	ISTA VIAPORT	-24	-40	-42	37	-24
Derya Ozturk	Deniz Uysal	ISTA VIAPORT 2	5	-18	-45	43	4
Derya Ozturk	Deniz Uysal	KOCA GEBZECENTER	12	-20	-45	59	-9
Derya Ozturk	Deniz Uysal	KOCA OKSIJEN SHOPINN AVM	-67	-77	-67	-4	-27
Derya Ozturk	Deniz Uysal	YALO GAZIPASA CD	74	42	12	24	3
Derya Ozturk	Deniz Uysal	YALO STAR AVM	-36	-38	-36	-2	-2
Derya Ozturk	Deniz Uysal	YALO YALOVA KIPA	-47	-46	-42	2	-9
Derya Ozturk	Meliha Ilhan	AKSA EFOR	25	-11	-39	21	22
Derya Ozturk	Meliha Ilhan	ANKA ACITY	-25	-49	-55	25	-9
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL	-10	-24	-33	43	-21
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL 2	37	7	-33	53	4
Derya Ozturk	Meliha Ilhan	ANKA ANKARA FR	35	-18	-48	53	2
Derya Ozturk	Meliha Ilhan	ANKA ANTARES	0	-18	-24	13	-4
Derya Ozturk	Meliha Ilhan	ANKA ATAKULE AVM	39	-5	11	-24	14
Derya Ozturk	Meliha Ilhan	ANKA ATLANTIS	92	15	-35	76	1
Derya Ozturk	Meliha Ilhan	ANKA FTZ AVM	80	21	-8	19	10
Derya Ozturk	Meliha Ilhan	ANKA KIZLAR PINARI CD	-100	-100	-100	-100	-100
Derya Ozturk	Meliha Ilhan	ANKA KUZUEFFECT AVM	16	-35	-3	1	-34
Derya Ozturk	Meliha Ilhan	ANKA ONE TOWER AVM	83	23	19	1	3
Derya Ozturk	Meliha Ilhan	ANKA PANORA	78	32	-5	38	2
Derya Ozturk	Meliha Ilhan	ANKA PODIUM AVM	-3	-31	-41	39	-16
Derya Ozturk	Meliha Ilhan	ANKA TAURUS	0	-4	0	-6	2
Derya Ozturk	Meliha Ilhan	ANKA VEGA SUBAYEVLERI AVM	-13	-35	-45	24	-5
Derya Ozturk	Meliha Ilhan	KAYS ILDEM AVM	-20	-53	-49	18	-21
Derya Ozturk	Meliha Ilhan	KAYS KAYSERI FR	16	-26	-21	-12	6
Derya Ozturk	Meliha Ilhan	KAYS KAYSERIPARK	11	-13	-35	39	-3
Derya Ozturk	Meliha Ilhan	KAYS KUMSMALL AVM	-11	-39	-56	52	-10
Derya Ozturk	Meliha Ilhan	KAYS MEYSU AVM	-37	-51	-68	40	8
Derya Ozturk	Meliha Ilhan	NEVS KAPADOKYA FR	-35	-54	-51	-5	-1
Derya Ozturk	Meliha Ilhan	NEVS NISSARA AVM	98	24	-15	21	21
Derya Ozturk	Meliha Ilhan	NIGD NIGDE CD	-32	-46	-100	-100	-10
Derya Ozturk	Meliha Ilhan	NIGD TEMA PARK AVM	0	0	0	0	0
Derya Ozturk	Nur Ekici Küçük	ISTA AKASYA AVM	-14	-27	-16	7	-18
Derya Ozturk	Nur Ekici Küçük	ISTA AKYAKA PARK	-19	-33	-42	29	-10
Derya Ozturk	Nur Ekici Küçük	ISTA ALEMDAG CD	4	-20	-10	-1	-10
Derya Ozturk	Nur Ekici Küçük	ISTA ALEMDAG CD2	25	-11	80	-46	-10
Derya Ozturk	Nur Ekici Küçük	ISTA BRANDIUM	7	-33	7	-38	1
Derya Ozturk	Nur Ekici Küçük	ISTA BRANDIUM AVM POP-UP	0	0	0	0	0
Derya Ozturk	Nur Ekici Küçük	ISTA BUYAKA	-2	-21	-45	38	5
Derya Ozturk	Nur Ekici Küçük	ISTA CANPARK AVM	68	11	-10	16	6
Derya Ozturk	Nur Ekici Küçük	ISTA CAPITOL	91	35	18	30	-12
Derya Ozturk	Nur Ekici Küçük	ISTA EMAAR SQUARE AVM	8	-6	-32	38	-1
Derya Ozturk	Nur Ekici Küçük	ISTA ICERENKOY CFR	77	32	43	9	-16
Derya Ozturk	Nur Ekici Küçük	ISTA METROGARDEN AVM	65	19	-8	35	-4
Derya Ozturk	Nur Ekici Küçük	ISTA METROPOL AVM	56	2	-1	24	-17
Derya Ozturk	Nur Ekici Küçük	ISTA NAUTILUS	102	30	-15	41	8
Derya Ozturk	Nur Ekici Küçük	ISTA NEV CARSI AVM	64	5	-6	34	-17
Derya Ozturk	Nur Ekici Küçük	ISTA UMR MEYDAN	5	-15	-30	22	0
Derya Ozturk	Nur Ekici Küçük	ISTA WATER GARDEN AVM	93	53	27	51	-19
Derya Ozturk	Ruveyda Un	BOLU 14 BURDA AVM	-13	-23	-39	41	-10
Derya Ozturk	Ruveyda Un	BOLU CADDE AVM	50	-2	1	4	-7
Derya Ozturk	Ruveyda Un	BOLU HIGHWAY	-76	-77	-86	66	-2
Derya Ozturk	Ruveyda Un	DUZC KREMPARK	12	-19	-26	16	-7
Derya Ozturk	Ruveyda Un	KOCA 41 BURDA AVM	-27	-37	8	-32	-14
Derya Ozturk	Ruveyda Un	KOCA ARASTAPARK AVM	50	5	12	13	-17
Derya Ozturk	Ruveyda Un	KOCA HURRIYET CD	30	-2	17	-13	-3
Derya Ozturk	Ruveyda Un	KOCA ISTIKLAL CD	7	-16	-1	5	-19
Derya Ozturk	Ruveyda Un	KOCA IZMIT OUTLET CENTER	-38	-55	-65	51	-15
Derya Ozturk	Ruveyda Un	KOCA SYMBOL AVM	27	-9	-23	28	-8
Derya Ozturk	Ruveyda Un	SAKA 54 CADDE AVM	13	-23	-63	109	0
Derya Ozturk	Ruveyda Un	SAKA ADAPAZARI AGORA	44	20	-26	62	0
Derya Ozturk	Ruveyda Un	SAKA CARK CD	-11	-45	-26	-12	-16
Derya Ozturk	Ruveyda Un	SAKA KARASU CD	-46	-61	-59	15	-16
Derya Ozturk	Ruveyda Un	SAKA NG SAPANCA AVM	-50	-64	-49	-9	-22
Derya Ozturk	Ruveyda Un	SAKA SERDIVAN	-9	-37	-43	25	-13
Derya Ozturk	Ruveyda Un	SAKARYA ADA CENTER	-39	-60	-63	1	8
Derya Ozturk	Taylan Yılmaz	ANKA 7. CD	53	19	24	13	-15
Derya Ozturk	Taylan Yılmaz	ANKA CEMAL GURSEL CD	161	94	91	-10	13
Derya Ozturk	Taylan Yılmaz	ANKA IZMIR CD	50	16	50	-14	-10
Derya Ozturk	Taylan Yılmaz	ANKA KARTALTEPE AVM	-70	-82	-71	12	-46
Derya Ozturk	Taylan Yılmaz	ANKA KASMIR AVM	62	17	22	2	-6
Derya Ozturk	Taylan Yılmaz	ANKA KIZILAY 1	104	67	31	29	-1
Derya Ozturk	Taylan Yılmaz	ANKA KIZILAY MEYDAN	171	98	122	-13	2
Derya Ozturk	Taylan Yılmaz	ANKA METROMALL AVM	-20	-36	-39	34	-21
Derya Ozturk	Taylan Yılmaz	ANKA TUNALI HILMI CD 2	121	33	30	9	-7
Derya Ozturk	Taylan Yılmaz	BART BARTIN CD	56	15	-4	34	-12
Derya Ozturk	Taylan Yılmaz	ESKI DOKTORLAR CD 2	96	22	22	-9	9
Derya Ozturk	Taylan Yılmaz	ESKI ESPARK	-3	-25	-25	5	-5
Derya Ozturk	Taylan Yılmaz	ESKI VEGA OUTLET AVM	26	-13	-28	30	-7
Derya Ozturk	Taylan Yılmaz	KARA KARAMANPARK	-27	-50	-56	15	-1
Derya Ozturk	Taylan Yılmaz	KARB KARES	3	-20	-32	10	6
Derya Ozturk	Taylan Yılmaz	KONY ENNTEPE AVM	-4	-30	-34	19	-10
Derya Ozturk	Taylan Yılmaz	KONY EREGLI PARK AVM	-68	-75	-60	-34	-6
Derya Ozturk	Taylan Yılmaz	KONY KENT PLAZA	-9	-33	-39	12	-1
Derya Ozturk	Taylan Yılmaz	KONY KULESITE	18	-20	-27	23	-11
Derya Ozturk	Taylan Yılmaz	KONY M1 AVM	42	-6	-30	35	0
Derya Ozturk	Taylan Yılmaz	KONY NOVADA AVM	-54	-61	-57	11	-19
Derya Ozturk	Taylan Yılmaz	ZONG 67 BURDA AVM	-33	-56	-63	39	-15
Derya Ozturk	Taylan Yılmaz	ZONG EREGLI OZDEMIR AVM	25	-21	-31	15	-1
Derya Ozturk	Taylan Yılmaz	ZONG EREYLIN AVM	40	14	-24	70	-12
Hazel Aydemir	Bora Dedeoglu	AMAS AMASYA PARK AVM	-2	-42	-44	-15	21
Hazel Aydemir	Bora Dedeoglu	CORU AHL AVM	9	-29	-46	34	-1
Hazel Aydemir	Bora Dedeoglu	CORU GAZI CD	26	-14	-23	15	-3
Hazel Aydemir	Bora Dedeoglu	GIRE GAZI CADDESI	-31	-40	-24	-14	-8
Hazel Aydemir	Bora Dedeoglu	GIRE INONU CD	4	-32	-42	24	-4
Hazel Aydemir	Bora Dedeoglu	ORDU FATSA	-36	-54	-55	20	-14
Hazel Aydemir	Bora Dedeoglu	ORDU NOVADA AVM	-24	-45	-7	-30	-16
Hazel Aydemir	Bora Dedeoglu	ORDU SIRRIPASA CD	-31	-50	-45	-1	-8
Hazel Aydemir	Bora Dedeoglu	ORDU UNYE UNIPORT AVM	-5	-35	-46	20	1
Hazel Aydemir	Bora Dedeoglu	SAMS BAFRA CELIKPARK AVM	-40	-57	-56	7	-9
Hazel Aydemir	Bora Dedeoglu	SAMS BULVAR	18	-18	-12	-12	6
Hazel Aydemir	Bora Dedeoglu	SAMS CIFTLIK CD 2	-3	-37	-25	-5	-11
Hazel Aydemir	Bora Dedeoglu	SAMS LOVELET	-37	-43	-76	89	26
Hazel Aydemir	Bora Dedeoglu	SAMS PIAZZA	-33	-54	-54	2	-2
Hazel Aydemir	Bora Dedeoglu	SAMS YESILYURT	110	31	-2	25	7
Hazel Aydemir	Bora Dedeoglu	SINO SAKARYA CD	-26	-43	-35	17	-24
Hazel Aydemir	Elif Sabaz	ISTT AKBATI	-7	-21	-37	37	-9
Hazel Aydemir	Elif Sabaz	ISTT ATIRUS AVM	155	74	13	49	3
Hazel Aydemir	Elif Sabaz	ISTT AVENUA AVM	50	-2	15	-9	-6
Hazel Aydemir	Elif Sabaz	ISTT BEYLIKDUZU MGR	55	-16	-100	-100	-8
Hazel Aydemir	Elif Sabaz	ISTT CENNET CD 2	74	17	-100	-100	-8
Hazel Aydemir	Elif Sabaz	ISTT ESENYURT CITY CENTER AVM	50	20	-42	96	6
Hazel Aydemir	Elif Sabaz	ISTT MARMARA CAD	38	-2	-11	24	-12
Hazel Aydemir	Elif Sabaz	ISTT MARMARAPARK	-6	-20	-43	47	-5
Hazel Aydemir	Elif Sabaz	ISTT MIMAROBA DIA MARE CD	108	84	58	16	1
Hazel Aydemir	Elif Sabaz	ISTT PELICAN	-4	-33	-31	23	-21
Hazel Aydemir	Elif Sabaz	ISTT PERLAVISTA AVM	39	-3	3	2	-9
Hazel Aydemir	Elif Sabaz	ISTT SILIVRI KIP	-3	-27	-42	27	-2
Hazel Aydemir	Elif Sabaz	ISTT SILIVRI MAXI	-34	-34	-54	50	-5
Hazel Aydemir	Elif Sabaz	ISTT TORIUM	-2	-23	-20	18	-19
Hazel Aydemir	Fatih Sulun	BALI BANDIRMA LIMAN	-20	-31	-39	37	-17
Hazel Aydemir	Fatih Sulun	BILE BOZUYUK SARAR	-56	-72	-76	26	-6
Hazel Aydemir	Fatih Sulun	BURS AHMET TANER KISLALI CD	122	49	50	5	-5
Hazel Aydemir	Fatih Sulun	BURS ANATOLIUM	-14	-38	-55	37	0
Hazel Aydemir	Fatih Sulun	BURS AS OUTLET AVM	-55	-58	-85	221	-11
Hazel Aydemir	Fatih Sulun	BURS ATABULVARI CD	171	76	86	4	-9
Hazel Aydemir	Fatih Sulun	BURS DOWNTOWN AVM	-57	-68	-68	18	-17
Hazel Aydemir	Fatih Sulun	BURS GORUKLE CAD	79	30	62	-8	-12
Hazel Aydemir	Fatih Sulun	BURS INEGOL	23	-22	-35	31	-8
Hazel Aydemir	Fatih Sulun	BURS KENT MEYDANI	4	-20	-39	37	-5
Hazel Aydemir	Fatih Sulun	BURS KORUPARK	34	5	-26	41	1
Hazel Aydemir	Fatih Sulun	BURS OKSIJEN SHOPINN AVM	-22	-60	-70	25	6
Hazel Aydemir	Fatih Sulun	BURS OZDILEKPARK AVM	25	-1	-25	44	-8
Hazel Aydemir	Fatih Sulun	BURS PARKUR AVM	-38	-50	-66	43	1
Hazel Aydemir	Fatih Sulun	BURS SUR YAPI MARKA AVM	10	-15	-36	46	-8
Hazel Aydemir	Fatih Sulun	BURS ZAFER PLAZA	18	-9	-27	25	-1
Hazel Aydemir	Mustafa Bulut	ADIY ADIYAMAN PARK AVM	-3	-33	-44	0	19
Hazel Aydemir	Mustafa Bulut	BATM BATMAN PARK	7	-2	-32	14	26
Hazel Aydemir	Mustafa Bulut	BATM PETROL CITY AVM	59	-4	-17	12	3
Hazel Aydemir	Mustafa Bulut	BING KALIUM AVM	-28	-43	-32	-19	4
Hazel Aydemir	Mustafa Bulut	DIYA 75 METRE CD	43	-2	0	-4	2
Hazel Aydemir	Mustafa Bulut	DIYA CEYLANPARK AVM	-1	-28	-28	-3	4
Hazel Aydemir	Mustafa Bulut	DIYA FORUM AVM	14	-22	-34	23	-4
Hazel Aydemir	Mustafa Bulut	ELAZ ELAZIG PARK23	17	-15	-48	55	6
Hazel Aydemir	Mustafa Bulut	ELAZ ELYSIUM AVM	-16	-27	-48	41	0
Hazel Aydemir	Mustafa Bulut	GAZI G.ANTEP FR	2	-42	-47	1	9
Hazel Aydemir	Mustafa Bulut	GAZI GAZIMUHTAR	59	30	34	-13	11
Hazel Aydemir	Mustafa Bulut	GAZI M1 OUTLET	-60	-72	-69	26	-29
Hazel Aydemir	Mustafa Bulut	GAZI PRIME MALL	35	-11	-35	35	2
Hazel Aydemir	Mustafa Bulut	GAZI SANKOPARK	38	8	0	23	57
Hazel Aydemir	Mustafa Bulut	KAHR PIAZZA	-26	-48	-50	18	-12
Hazel Aydemir	Mustafa Bulut	MALA MALATYAPARK	1	-34	-36	-1	5
Hazel Aydemir	Mustafa Bulut	MARD MARDIAN MALL	-8	-22	-8	-15	0
Hazel Aydemir	Mustafa Bulut	MARD MOVAPARK	129	48	-24	59	22
Hazel Aydemir	Mustafa Bulut	SANL URFA NOVADA AVM	-11	-26	-27	1	1
Hazel Aydemir	Mustafa Bulut	SANL URFA PIAZZA	-6	-16	-50	92	-12
Hazel Aydemir	Mustafa Bulut	SANL URFACITY	67	11	-20	34	4
Hazel Aydemir	Mustafa Bulut	SIIR SIIRT PARK AVM	-27	-32	-35	13	-7
Hazel Aydemir	Mustafa Bulut	SIRN CIZRE PARK AVM	5	-31	-57	33	20
Hazel Aydemir	Pinar Beyaz	ADAN 01 BURDA AVM	-35	-54	-60	37	-16
Hazel Aydemir	Pinar Beyaz	ADAN BARAJ YOLU CAD	45	11	-16	13	17
Hazel Aydemir	Pinar Beyaz	ADAN CAKMAK CD	-1	-40	-30	14	-24
Hazel Aydemir	Pinar Beyaz	ADAN KENAN EVREN BLV	62	21	12	7	0
Hazel Aydemir	Pinar Beyaz	ADAN M1 AVM	-10	-40	-46	15	-3
Hazel Aydemir	Pinar Beyaz	ADAN OPTIMUM	-19	-43	-49	18	-5
Hazel Aydemir	Pinar Beyaz	ADAN TURKMENBASI CD	49	10	26	-8	-6
Hazel Aydemir	Pinar Beyaz	HATA ANTAKYA YUZUNCU YIL AVM	62	23	-56	202	-7
Hazel Aydemir	Pinar Beyaz	HATA ISK PRIMEMALL	-5	-36	-56	39	6
Hazel Aydemir	Pinar Beyaz	HATA ISKENDERUN PARK FORBES AV	-8	-34	-44	22	-4
Hazel Aydemir	Pinar Beyaz	MERS MERSIN CFR	54	-6	-34	35	5
Hazel Aydemir	Pinar Beyaz	MERS MERSIN FR	-7	-43	-41	6	-9
Hazel Aydemir	Pinar Beyaz	MERS NOVADA ERDEMLI AVM	-10	-34	-52	60	-14
Hazel Aydemir	Pinar Beyaz	MERS SAYAPARK AVM	67	1	-33	46	3
Hazel Aydemir	Pinar Beyaz	MERS SILIFKE CD	7	-18	-45	28	16
Hazel Aydemir	Pinar Beyaz	MERS TARSU	-16	-43	-56	19	8
Hazel Aydemir	Pinar Beyaz	OSMA 328 AVM	2	-29	-55	44	10
Hazel Aydemir	Seda Urgan	CANA 17 BURDA AVM	22	2	-21	26	2
Hazel Aydemir	Seda Urgan	CANA CANAKKALE CARSI CD	28	34	22	15	-5
Hazel Aydemir	Seda Urgan	CANA CANAKKALE KIP	45	3	-18	17	7
Hazel Aydemir	Seda Urgan	EDIR ERASTA AVM	-1	-22	-32	62	-29
Hazel Aydemir	Seda Urgan	EDIR KESAN KIPA AVM	-33	-42	-57	24	10
Hazel Aydemir	Seda Urgan	EDIR MARGI	45	5	5	20	-17
Hazel Aydemir	Seda Urgan	EDIR SARACLAR CD	-2	-38	48	-22	-46
Hazel Aydemir	Seda Urgan	KIRK 39 BURDA AVM	6	-32	-42	24	-6
Hazel Aydemir	Seda Urgan	KIRK KIRKLARELI CD	58	17	42	1	-18
Hazel Aydemir	Seda Urgan	KIRK LULEBURGAZ ISTANBUL CD	36	-1	32	10	-32
Hazel Aydemir	Seda Urgan	TEKI CERKEZKOY KIPA	13	-21	-38	26	1
Hazel Aydemir	Seda Urgan	TEKI CORLU OMURTAK CD	8	-16	-5	0	-11
Hazel Aydemir	Seda Urgan	TEKI ORION CORLU	30	-20	-25	30	-18
Hazel Aydemir	Seda Urgan	TEKI TEKIRA	25	-12	-36	33	4
Hazel Aydemir	Umit Altunkaynak	ISTT AKMERKEZ	111	114	79	7	12
Hazel Aydemir	Umit Altunkaynak	ISTT AVLU 34 AVM	11	-29	-25	-6	0
Hazel Aydemir	Umit Altunkaynak	ISTT CEVAHIR	17	10	9	14	-12
Hazel Aydemir	Umit Altunkaynak	ISTT GALATASARAY	-19	-35	-19	3	-22
Hazel Aydemir	Umit Altunkaynak	ISTT GOKTURK IST CD2	28	35	109	4	-37
Hazel Aydemir	Umit Altunkaynak	ISTT HALASKARGAZI CD	14	12	18	8	-12
Hazel Aydemir	Umit Altunkaynak	ISTT HAVALIMANI IC HATLAR	33	-5	-20	36	-12
Hazel Aydemir	Umit Altunkaynak	ISTT HISTORIA	23	-22	-6	-13	-4
Hazel Aydemir	Umit Altunkaynak	ISTT ISTIKLAL AVM	-8	-11	-29	29	-3
Hazel Aydemir	Umit Altunkaynak	ISTT ISTINYEPARK	-8	-17	-30	33	-10
Hazel Aydemir	Umit Altunkaynak	ISTT KAGITHANE AXIS AVM	65	10	-17	44	-7
Hazel Aydemir	Umit Altunkaynak	ISTT KANYON AVM	117	72	71	13	-11
Hazel Aydemir	Umit Altunkaynak	ISTT NISANTASI CD	26	27	30	16	-16
Hazel Aydemir	Umit Altunkaynak	ISTT NISANTASI CITYS AVM	23	13	-40	83	2
Hazel Aydemir	Umit Altunkaynak	ISTT ORTABAHCE CD	26	2	-100	-100	-16
Hazel Aydemir	Umit Altunkaynak	ISTT ORTAKOY CD	2	-26	9	1	-33
Hazel Aydemir	Umit Altunkaynak	ISTT OZDILEK AVM	62	40	-12	67	-5
Hazel Aydemir	Umit Altunkaynak	ISTT SARIYER CD	92	39	80	-20	-3
Hazel Aydemir	Umit Altunkaynak	ISTT SISLI CD	103	52	25	16	5
Hazel Aydemir	Umit Altunkaynak	ISTT TAKSIM CADDE	-43	-54	1	-37	-27
Hazel Aydemir	Umit Altunkaynak	ISTT TRUMP TOWERS	118	75	-100	-100	13
Hazel Aydemir	Umit Altunkaynak	ISTT VADI ISTANBUL AVM	5	-9	-20	41	-19
Hazel Aydemir	Umit Altunkaynak	ISTT VALIKONAGI CD	32	33	53	4	-16
Hazel Aydemir	Umit Altunkaynak	ISTT ZORLU AVM	52	22	-11	44	-5
Hazel Aydemir	Umit Altunkaynak	VAN VAN AVM	-16	-39	-32	-7	-4
Hazel Aydemir	Umit Altunkaynak	VAN VANMALL AVM	-35	-48	-67	97	-20
İbrahim Emre Karasirt	Betul Duran	ANTA AKDENİZ PARK AVM	40	-4	0	0	7
İbrahim Emre Karasirt	Betul Duran	ANTA ALANYA TIME CENTER	175	80	-20	25	80
İbrahim Emre Karasirt	Betul Duran	ANTA ALANYA UYGUN CENTER AVM	37	-6	58	-28	-17
İbrahim Emre Karasirt	Betul Duran	ANTA ALANYUM	51	5	-34	33	19
İbrahim Emre Karasirt	Betul Duran	ANTA ANTALYA KAS	-33	-40	-70	95	4
İbrahim Emre Karasirt	Betul Duran	ANTA ANTALYA MGR	34	3	-39	69	0
İbrahim Emre Karasirt	Betul Duran	ANTA ATATURK CD	46	0	-1	3	-3
İbrahim Emre Karasirt	Betul Duran	ANTA BOSTANCIPINARI CD	-20	-36	9	-29	-17
İbrahim Emre Karasirt	Betul Duran	ANTA ERASTA	82	20	0	23	-2
İbrahim Emre Karasirt	Betul Duran	ANTA G-MALL CARREFOURSA AVM	210	89	65	2	12
İbrahim Emre Karasirt	Betul Duran	ANTA KEMER CADDE	60	33	27	-9	15
İbrahim Emre Karasirt	Betul Duran	ANTA KUMLUCA CD	15	-20	-14	-13	7
İbrahim Emre Karasirt	Betul Duran	ANTA LAND OF LEGENDS	-13	-19	-16	-3	-1
İbrahim Emre Karasirt	Betul Duran	ANTA MALL OF ANTALYA AVM	-9	-30	-46	36	-4
İbrahim Emre Karasirt	Betul Duran	ANTA MANAVGAT NOVA MALL	-28	-45	-42	13	-15
İbrahim Emre Karasirt	Betul Duran	ANTA MARKANTALYA AVM	20	-9	-23	12	5
İbrahim Emre Karasirt	Betul Duran	ANTA OZDILEKPARK	-12	-34	-33	-1	-1
İbrahim Emre Karasirt	Betul Duran	ANTA SHEMALL	65	33	40	19	-20
İbrahim Emre Karasirt	Betul Duran	ANTA TERRACITY	16	-21	-23	-7	10
İbrahim Emre Karasirt	Burcin Taskıran	MUGL BODR CUMH.CD	20	-20	-58	45	30
İbrahim Emre Karasirt	Burcin Taskıran	MUGL BODR OASIS	-33	-43	-8	-11	-31
İbrahim Emre Karasirt	Burcin Taskıran	MUGL BODRUM AVENUE AVM	55	9	48	-21	-6
İbrahim Emre Karasirt	Burcin Taskıran	MUGL CADDE	90	13	6	3	3
İbrahim Emre Karasirt	Burcin Taskıran	MUGL DATCA CAD	-20	-48	-17	-18	-24
İbrahim Emre Karasirt	Burcin Taskıran	MUGL ERASTA AVM	-15	-38	-53	32	0
İbrahim Emre Karasirt	Burcin Taskıran	MUGL FESTIVA AVM	64	-4	-10	33	-19
İbrahim Emre Karasirt	Burcin Taskıran	MUGL FETHIYE CARSI CD	62	21	-15	24	15
İbrahim Emre Karasirt	Burcin Taskıran	MUGL FETHIYE GOCEK CD	-2	-33	-28	1	-9
İbrahim Emre Karasirt	Burcin Taskıran	MUGL MARMARIS	29	-21	5	-13	-14
İbrahim Emre Karasirt	Burcin Taskıran	MUGL MARMARIS ATATURK CD	42	-11	1	-1	-11
İbrahim Emre Karasirt	Burcin Taskıran	MUGL MIDTOWN	-33	-45	-51	19	-5
İbrahim Emre Karasirt	Burcin Taskıran	MUGL POMELON AVM	148	78	8	39	19
İbrahim Emre Karasirt	Burcin Taskıran	MUGL RUYAPARK AVM	19	-12	-26	15	4
İbrahim Emre Karasirt	Burcin Taskıran	MUGL TURGUTREIS AVM	-15	-27	-57	71	-1
İbrahim Emre Karasirt	Emre Topcan	ISTT AIRPORT AVM	100	61	14	50	-6
İbrahim Emre Karasirt	Emre Topcan	ISTT AQUA FLORYA AVM	-16	-32	-39	29	-13
İbrahim Emre Karasirt	Emre Topcan	ISTT ATAKOY A PLUS AVM	49	14	8	8	-2
İbrahim Emre Karasirt	Emre Topcan	ISTT CAPACITY	46	19	1	27	-7
İbrahim Emre Karasirt	Emre Topcan	ISTT CAROUSEL	27	-16	-7	3	-12
İbrahim Emre Karasirt	Emre Topcan	ISTT EYUP AXIS AVM	111	32	-16	47	6
İbrahim Emre Karasirt	Emre Topcan	ISTT FLYINN AVM	63	31	-57	160	18
İbrahim Emre Karasirt	Emre Topcan	ISTT GUNESLIPARK	40	-2	-30	72	-18
İbrahim Emre Karasirt	Emre Topcan	ISTT ISTANBUL FR	0	-16	-12	11	-14
İbrahim Emre Karasirt	Emre Topcan	ISTT ISTASYON CD	42	7	4	0	2
İbrahim Emre Karasirt	Emre Topcan	ISTT MARMARA FR	51	18	-12	21	11
İbrahim Emre Karasirt	Emre Topcan	ISTT METROPORT	157	64	20	20	14
İbrahim Emre Karasirt	Emre Topcan	ISTT OLIVIUM	-38	-59	-62	19	-8
İbrahim Emre Karasirt	Emre Topcan	ISTT SIRINEVLER CAD	145	77	36	16	12
İbrahim Emre Karasirt	Emre Topcan	ISTT STARCITY	-39	-56	-46	14	-28
İbrahim Emre Karasirt	Esma Gul	AFYO AFIUM	-51	-62	-61	13	-15
İbrahim Emre Karasirt	Esma Gul	AFYO AFYONPARK AVM	-23	-50	-38	-7	-14
İbrahim Emre Karasirt	Esma Gul	BURD GAZI CD	80	67	38	30	-7
İbrahim Emre Karasirt	Esma Gul	DENI AQUAMALL AVM	16	-17	-44	53	-3
İbrahim Emre Karasirt	Esma Gul	DENI CAMLIK FR	14	-3	-35	48	0
İbrahim Emre Karasirt	Esma Gul	DENI CINAR CD	42	14	2	14	-2
İbrahim Emre Karasirt	Esma Gul	DENI HORIZON AVM	-46	-46	-44	34	-28
İbrahim Emre Karasirt	Esma Gul	DENI TERASPARK	6	-32	-50	41	-3
İbrahim Emre Karasirt	Esma Gul	ISPA CARSI	32	-1	38	-18	-13
İbrahim Emre Karasirt	Esma Gul	ISPA CENTRIUM GARDEN	45	6	-5	14	-2
İbrahim Emre Karasirt	Esma Gul	ISPA IYAS	9	-21	-14	-2	-6
İbrahim Emre Karasirt	Esma Gul	ISPA MEYDAN AVM	-27	-46	-42	-7	-1
İbrahim Emre Karasirt	Esma Gul	KUTA SERA	9	-30	-34	27	-16
İbrahim Emre Karasirt	Esma Gul	USAK FESTIVA	16	-13	-37	17	17
İbrahim Emre Karasirt	Esma Gul	USAK ISMETPASA CAD	68	24	47	-2	-14
İbrahim Emre Karasirt	Esma Gul	USAK KARUN AVM	157	79	-100	-100	-6
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ERZI ERZINCANPARK AVM	-7	-37	-45	-2	17
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ERZU ERZURUMAVM	-18	-32	-28	13	-16
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ERZU MNG MALL AVM	-4	-33	-27	-5	-3
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT 212AVM	-39	-59	-63	39	-20
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT ARENAPARK	63	8	25	-5	-9
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT ARMONIPARK	83	5	0	23	-15
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT BASAKSEHIR	-30	-40	-6	-7	-32
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT BIZ CEVAHIR HALIC AVM	24	-12	17	-21	-5
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT GOP BAGLARBASI CD	81	3	3	-1	1
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT ISFANBUL AVM	-17	-39	-39	8	-7
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT MALL OF ISTANBUL	11	-13	-53	85	0
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT TEMA WORLD AVM	112	53	17	21	8
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT VEGA ISTANBUL AVM	32	4	-6	24	-11
İbrahim Emre Karasirt	Hatice Yıldız Ertas	ISTT VENEZIA MEGA OUTLET AVM	-8	-30	-38	9	5
İbrahim Emre Karasirt	Mehmet Sena Aydin	BALI AYVALIK CD	-23	-31	17	-38	-6
İbrahim Emre Karasirt	Mehmet Sena Aydin	BALI AYVALIK KIRLANGIC AVM	-34	-53	-47	-3	-7
İbrahim Emre Karasirt	Mehmet Sena Aydin	BALI BALIKESIR 10 BURDA AVM	15	-17	-26	32	-15
İbrahim Emre Karasirt	Mehmet Sena Aydin	BALI EDREMIT NOVADA AVM	-31	-57	-59	21	-14
İbrahim Emre Karasirt	Mehmet Sena Aydin	BALI MILLI KUVVETLER CD	32	8	28	0	-15
İbrahim Emre Karasirt	Mehmet Sena Aydin	BALI YASA OUTLET	-57	-71	-57	-19	-18
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI BOSTANLI CAD	161	80	118	-15	-3
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI CIGLI KIP	6	-9	-26	27	-4
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI DIKILI CAD	4	-32	-34	25	-18
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI EFESUS AVM	112	33	-11	43	4
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI HILLTOWN AVM	28	-9	-40	62	-6
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI K.YAKA CARSI CD	136	70	20	32	8
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI NOVADA MENEMEN AVM	-3	-34	-53	56	-11
İbrahim Emre Karasirt	Mehmet Sena Aydin	IZMI SAKIPAGA AVM	-34	-51	-75	50	30
İbrahim Emre Karasirt	Mehmet Sena Aydin	MANI AKHISAR NOVADA AVM	-13	-48	-48	-4	5
İbrahim Emre Karasirt	Mehmet Sena Aydin	MANI ALPHARD AVM	30	-5	-14	-2	12
İbrahim Emre Karasirt	Mehmet Sena Aydin	MANI DOGU CD	26	4	27	-9	-10
İbrahim Emre Karasirt	Mehmet Sena Aydin	MANI MAGNESIA	17	-6	-23	31	-7
İbrahim Emre Karasirt	Mehmet Sena Aydin	MANI SALIHLI KIP	7	-21	-49	44	8
İbrahim Emre Karasirt	Zehra Celik	AYDI DIDIM CD	-29	-35	-41	23	-11
İbrahim Emre Karasirt	Zehra Celik	AYDI DIDIM KIPA AVM	-42	-62	-60	-8	4
İbrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI AVM	-42	-53	-54	9	-6
İbrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI INONU BLV	14	-13	-12	-6	6
İbrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI MARINA	-5	-32	-20	11	-23
İbrahim Emre Karasirt	Zehra Celik	AYDI SOKE NOVADA	-7	-26	-17	-10	0
İbrahim Emre Karasirt	Zehra Celik	AYDI SOKE OUTLET	-78	-84	-79	-14	-11
İbrahim Emre Karasirt	Zehra Celik	IZMI ALACATI	-12	-47	-54	-13	31
İbrahim Emre Karasirt	Zehra Celik	IZMI CESME CADDE PLUS AVM	-40	-57	-39	-7	-25
İbrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM	-9	-31	-41	15	2
İbrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM 2	-33	-51	-45	-12	2
İbrahim Emre Karasirt	Zehra Celik	IZMI RENNA PARK AVM	51	-10	-6	29	-25
İbrahim Emre Karasirt	Zehra Celik	IZMI SELWAY AVM	0	-36	-37	2	1
İbrahim Emre Karasirt	Zehra Celik	IZMI SELWAY AVM 2	-1	-21	34	-44	6
İbrahim Emre Karasirt	Zehra Celik	IZMI SIRINYER CD	94	50	18	20	5
İbrahim Emre Karasirt	Zehra Celik	IZMI URLA BAMBOO AVM	60	-7	-17	15	-3
İbrahim Emre Karasirt	Zeycan Ozcan	AYDI ADNAN MENDERES BLV	85	18	6	10	1
İbrahim Emre Karasirt	Zeycan Ozcan	AYDI AYDIN FR	53	19	-43	99	4
İbrahim Emre Karasirt	Zeycan Ozcan	AYDI AYDIN KIP	16	-37	-26	9	-22
İbrahim Emre Karasirt	Zeycan Ozcan	AYDI NAZILLI BAMBOO AVM	17	-7	-16	-6	16
İbrahim Emre Karasirt	Zeycan Ozcan	AYDI OPSMALL AVM	-32	-58	-56	0	-5
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI ALSANCAK	155	110	131	26	-28
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI BALCOVA KIP	184	106	40	54	-4
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI BORNOVA CD	173	86	-100	-100	-2
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI EGE PERLA AVM	212	171	77	31	17
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI FORUM BORNOVA AVM	9	-8	-27	26	0
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI HATAY CAD	144	72	99	-8	-7
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI ISTINYEPARK AVM	17	-16	-30	20	1
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI IZMIR PARK AVM	45	3	-11	13	3
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI KIBRIS S. 3	134	62	-19	97	1
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI KONAK PIER AVM	102	11	-14	20	8
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI PARK BORNOVA AVM	-32	-59	-55	20	-25
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI POINT BORNOVA AVM	4	-32	-43	43	-16
İbrahim Emre Karasirt	Zeycan Ozcan	IZMI WESTPARK AVM	-50	-69	-49	-43	6`;

function parseRows(raw) {
  return raw.trim().split('\n').slice(1).map((line, i) => {
    const c = line.split('\t');
    const p = (v) => { const n = parseFloat((v||'').replace('%','')); return isNaN(n) ? 0 : n; };
    if (c.length >= 8) {
      return { id:`st_${i}`, om:c[0], bm:c[1], name:c[2], ciro:p(c[3]), adet:p(c[4]), zs:p(c[5]), do:p(c[6]), fba:p(c[7]) };
    }
    return { id:`bm_${i}`, om:c[0], name:c[1], ciro:p(c[2]), adet:p(c[3]), zs:p(c[4]), do:p(c[5]), fba:p(c[6]) };
  });
}

const BM_DATA    = parseRows(rawBmData);
const STORE_DATA = parseRows(rawStoreData);

const METRICS = ['ciro','adet','zs','do','fba'];
const METRIC_LABELS = { ciro:'Ciro %', adet:'Adet %', zs:'ZS %', do:'DO %', fba:'FBA %' };

function Badge({ label, diff }) {
  if (diff === undefined || isNaN(diff)) return null;
  const pos = diff >= 0;
  return (
    <span style={{ fontSize:10, display:'inline-flex', alignItems:'center', gap:2,
      color: pos ? P.green : P.red, fontWeight:600 }}>
      {label}: {pos?'▲':'▼'}{Math.abs(diff).toFixed(1)}
    </span>
  );
}

function KPICard({ title, value, baselineValue, baselineLabel, icon: Icon }) {
  const pos = value >= 0;
  const diff = baselineValue !== undefined ? value - baselineValue : null;
  return (
    <div style={{ background:P.white, borderRadius:16, padding:'20px 22px',
      boxShadow:'0 1px 4px rgba(0,0,0,0.07)', border:'1px solid #F0F0F0',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      borderLeft:`4px solid ${pos ? P.green : P.pink}` }}>
      <div>
        <p style={{ fontSize:12, color:P.gray, fontWeight:600, marginBottom:6, letterSpacing:.3 }}>{title}</p>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <h3 style={{ fontSize:30, fontWeight:800, color: pos ? P.green : P.pink, margin:0 }}>{value}%</h3>
          {pos ? <TrendingUp size={18} color={P.green}/> : <TrendingDown size={18} color={P.pink}/>}
        </div>
        {diff !== null && (
          <p style={{ margin:'6px 0 0', fontSize:11, color:P.grayDark }}>
            {baselineLabel} kıyasla:{' '}
            <strong style={{ color: diff>=0 ? P.green : P.red }}>{diff>=0?'+':''}{diff.toFixed(1)}%</strong>
          </p>
        )}
      </div>
      <div style={{ padding:14, borderRadius:12,
        background: pos ? P.greenLight : P.pinkLight, color: pos ? P.green : P.pink }}>
        <Icon size={22}/>
      </div>
    </div>
  );
}

export default function PentiDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOM, setSelectedOM] = useState(null);
  const [selectedBM, setSelectedBM] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key:null, direction:'asc' });

  const level = selectedBM ? 'STORE' : selectedOM ? 'BM' : 'OM';

  const tableDataRaw = useMemo(() => {
    if (level==='OM')    return omSummaryData;
    if (level==='BM')    return BM_DATA.filter(b => b.om === selectedOM);
    if (level==='STORE') return STORE_DATA.filter(s => s.bm === selectedBM);
    return [];
  }, [level, selectedOM, selectedBM]);

  const tableData = useMemo(() => {
    let rows = tableDataRaw.filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortConfig.key) {
      rows = [...rows].sort((a,b) => {
        const dir = sortConfig.direction==='asc' ? 1 : -1;
        return (a[sortConfig.key] - b[sortConfig.key]) * dir;
      });
    }
    return rows;
  }, [tableDataRaw, searchTerm, sortConfig]);

  const currentData = selectedBM
    ? BM_DATA.find(b => b.name===selectedBM)
    : selectedOM
      ? omSummaryData.find(o => o.name===selectedOM)
      : overallData;

  const baselineData = selectedBM
    ? omSummaryData.find(o => o.name===selectedOM)
    : selectedOM ? overallData : null;

  const baselineLabel = level==='STORE' ? selectedOM+' (OM)' : 'Penti';

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key, direction: prev.key===key && prev.direction==='asc' ? 'desc' : 'asc'
    }));
  };

  const handleRowClick = (name) => {
    if (level==='OM') { setSelectedOM(name); setSearchTerm(''); setSortConfig({key:null,direction:'asc'}); }
    if (level==='BM') { setSelectedBM(name); setSearchTerm(''); setSortConfig({key:null,direction:'asc'}); }
  };

  const handleBack = () => {
    if (level==='STORE') { setSelectedBM(null); setSearchTerm(''); }
    if (level==='BM')    { setSelectedOM(null); setSearchTerm(''); }
  };

  const mc = (v) => v>0 ? P.green : v<0 ? P.pink : P.gray;
  const tooltipStyle = { borderRadius:10, border:'none', boxShadow:'0 4px 16px rgba(0,0,0,0.12)', fontSize:12 };

  return (
    <div style={{ minHeight:'100vh', background:'#F7F7F8', fontFamily:"'Segoe UI',system-ui,sans-serif", color:P.black }}>

      {/* Header */}
      <div style={{ background:P.pink, padding:'16px 32px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        boxShadow:'0 2px 8px rgba(228,0,109,0.25)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ fontWeight:900, fontSize:22, color:P.white, letterSpacing:2,
            background:'rgba(255,255,255,0.15)', padding:'4px 14px', borderRadius:8 }}>
            PENTI
          </div>
          <div>
            <div style={{ color:P.white, fontWeight:700, fontSize:15 }}>LFL Performans Paneli</div>
          </div>
        </div>
        <div style={{ color:'rgba(255,255,255,0.8)', fontSize:12 }}>
          Penti Genel Ciro: <strong style={{ color:P.white }}>{overallData.ciro}%</strong>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'24px 16px' }}>

        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
            {[
              { label:'Penti Genel', active:level==='OM', onClick:()=>{ setSelectedOM(null); setSelectedBM(null); setSearchTerm(''); }},
              selectedOM && { label:`${selectedOM} (OM)`, active:level==='BM', onClick:()=>{ setSelectedBM(null); setSearchTerm(''); }},
              selectedBM && { label:`${selectedBM} (BM)`, active:level==='STORE', onClick:null },
            ].filter(Boolean).map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                {i>0 && <ChevronRight size={14} color={P.gray}/>}
                <button onClick={crumb.onClick||undefined} style={{
                  padding:'6px 14px', borderRadius:20, fontSize:13, fontWeight:600,
                  border: crumb.active ? 'none' : `1px solid #E0E0E0`,
                  background: crumb.active ? P.pink : P.white,
                  color: crumb.active ? P.white : P.grayDark,
                  cursor: crumb.onClick ? 'pointer' : 'default',
                }}>{crumb.label}</button>
              </React.Fragment>
            ))}
          </div>
          {level !== 'OM' && (
            <button onClick={handleBack} style={{
              display:'flex', alignItems:'center', gap:6, padding:'8px 16px',
              borderRadius:10, border:`1px solid ${P.pink}`, background:P.white,
              color:P.pink, fontSize:13, fontWeight:600, cursor:'pointer' }}>
              <ArrowLeft size={15}/> Geri Dön
            </button>
          )}
        </div>

        {/* KPI */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16, marginBottom:24 }}>
          <KPICard title="Ciro Değişimi"   value={currentData?.ciro} baselineValue={baselineData?.ciro} baselineLabel={baselineLabel} icon={ShoppingBag}/>
          <KPICard title="Adet Değişimi"   value={currentData?.adet} baselineValue={baselineData?.adet} baselineLabel={baselineLabel} icon={Store}/>
          <KPICard title="Ziyaretçi (ZS)"  value={currentData?.zs}   baselineValue={baselineData?.zs}   baselineLabel={baselineLabel} icon={Users}/>
          <KPICard title="FBA %"            value={currentData?.fba}  baselineValue={baselineData?.fba}  baselineLabel={baselineLabel} icon={Percent}/>
        </div>

        {/* Charts */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
          {[
            { title:'Ciro & Adet', metrics:[{key:'ciro',name:'Ciro %',color:P.pink},{key:'adet',name:'Adet %',color:P.pinkMid}] },
            { title:'Ziyaretçi & FBA', metrics:[{key:'zs',name:'ZS %',color:'#059669'},{key:'fba',name:'FBA %',color:P.blue}] },
          ].map(chart => (
            <div key={chart.title} style={{ background:P.white, borderRadius:16, padding:20, boxShadow:'0 1px 4px rgba(0,0,0,0.07)', border:'1px solid #F0F0F0' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                <h3 style={{ margin:0, fontSize:14, fontWeight:700 }}>{chart.title} Kıyaslaması</h3>
                <span style={{ fontSize:10, background:P.pinkLight, color:P.pinkDark, padding:'3px 10px', borderRadius:20, fontWeight:600 }}>
                  {level==='OM'?'Tüm OMs':level==='BM'?'Bağlı BMs':'Bağlı Mağazalar'}
                </span>
              </div>
              <div style={{ height:240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tableDataRaw} margin={{top:8,right:8,left:-22,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0"/>
                    <XAxis dataKey="name" axisLine={false} tickLine={false}
                      tick={{fill:P.gray,fontSize:9}}
                      tickFormatter={v=>v.length>10?v.slice(0,10)+'…':v}/>
                    <YAxis axisLine={false} tickLine={false} tick={{fill:P.gray,fontSize:10}}/>
                    <Tooltip contentStyle={tooltipStyle} cursor={{fill:'#F7F7F8'}}/>
                    <Legend wrapperStyle={{paddingTop:8,fontSize:11}}/>
                    <ReferenceLine y={0} stroke="#E0E0E0"/>
                    {chart.metrics.map(m=>(
                      <Bar key={m.key} dataKey={m.key} name={m.name} fill={m.color} radius={[4,4,0,0]} maxBarSize={36}/>
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background:P.white, borderRadius:16, boxShadow:'0 1px 4px rgba(0,0,0,0.07)', border:'1px solid #F0F0F0', overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:'1px solid #F0F0F0', background:'#FAFAFA',
            display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <h3 style={{ margin:0, fontSize:15, fontWeight:700 }}>
                {level==='OM' && 'Operasyon Müdürleri'}
                {level==='BM' && `${selectedOM} › Mağaza Müdürleri (BM)`}
                {level==='STORE' && `${selectedBM} › Mağazalar`}
              </h3>
              {level!=='STORE' && (
                <span style={{ fontSize:10, background:P.blueLight, color:P.blue, padding:'3px 10px', borderRadius:20, fontWeight:600,
                  display:'flex', alignItems:'center', gap:4 }}>
                  <MousePointerClick size={11}/> Detay için tıkla
                </span>
              )}
            </div>
            <div style={{ position:'relative' }}>
              <Search size={14} color={P.gray} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)' }}/>
              <input type="text" placeholder="İsim veya mağaza ara…" value={searchTerm}
                onChange={e=>setSearchTerm(e.target.value)}
                style={{ paddingLeft:32, paddingRight:14, paddingTop:8, paddingBottom:8,
                  border:'1px solid #E0E0E0', borderRadius:10, fontSize:13, outline:'none', width:240 }}/>
            </div>
          </div>

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:P.pinkLight }}>
                  <th style={{ padding:'12px 20px', textAlign:'left', fontWeight:700, fontSize:11, color:P.pinkDark, textTransform:'uppercase', letterSpacing:.5 }}>
                    {level==='OM'?'Operasyon Müdürü':level==='BM'?'Mağaza Müdürü':'Mağaza Adı'}
                  </th>
                  {METRICS.map(m=>(
                    <th key={m} onClick={()=>requestSort(m)}
                      style={{ padding:'12px 10px', textAlign:'center', cursor:'pointer', fontWeight:700,
                        fontSize:11, color:P.pinkDark, textTransform:'uppercase', letterSpacing:.5,
                        whiteSpace:'nowrap', userSelect:'none',
                        background: sortConfig.key===m ? 'rgba(228,0,109,0.1)' : undefined }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                        {METRIC_LABELS[m]}
                        {sortConfig.key===m
                          ? (sortConfig.direction==='asc'?<ChevronUp size={12}/>:<ChevronDown size={12}/>)
                          : <ArrowUpDown size={11} color={P.gray}/>}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row,idx)=>{
                  const oData = level==='BM'    ? omSummaryData.find(o=>o.name===selectedOM) : null;
                  const bData = level==='STORE' ? BM_DATA.find(b=>b.name===selectedBM)       : null;
                  return (
                    <tr key={row.id||row.name} onClick={()=>handleRowClick(row.name)}
                      style={{ borderBottom:'1px solid #F5F5F5',
                        background: idx%2===0 ? P.white : '#FAFAFA',
                        cursor: level!=='STORE' ? 'pointer' : 'default' }}
                      onMouseEnter={e=>{ if(level!=='STORE') e.currentTarget.style.background=P.pinkLight; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background=idx%2===0?P.white:'#FAFAFA'; }}>
                      <td style={{ padding:'12px 20px', fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
                        {row.name}
                        {level!=='STORE' && <ChevronRight size={13} color={P.pink}/>}
                      </td>
                      {METRICS.map(m=>(
                        <td key={m} style={{ padding:'10px', textAlign:'center', verticalAlign:'middle' }}>
                          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                            <span style={{ fontSize:14, fontWeight:800, color:mc(row[m]) }}>{row[m]}%</span>
                            <div style={{ display:'flex', gap:6 }}>
                              {level==='OM' && <Badge label="P" diff={row[m]-overallData[m]}/>}
                              {level==='BM' && <>
                                <Badge label="P"  diff={row[m]-overallData[m]}/>
                                <Badge label="OM" diff={oData?row[m]-oData[m]:undefined}/>
                              </>}
                              {level==='STORE' && <Badge label="BM" diff={bData?row[m]-bData[m]:undefined}/>}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {tableData.length===0 && (
                  <tr><td colSpan={6} style={{ padding:'40px', textAlign:'center', color:P.gray }}>Kayıt bulunamadı.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ padding:'10px 20px', borderTop:'1px solid #F0F0F0', background:'#FAFAFA',
            display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:11, color:P.gray }}>{tableData.length} kayıt gösteriliyor</span>
            <span style={{ fontSize:10, color:P.gray }}>P = Penti Genel · OM = Operasyon Müdürü · BM = Bölge Müdürü kıyasla fark (pp)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
