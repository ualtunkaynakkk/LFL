import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingBag, Store, Search, Percent, ChevronRight, ChevronUp, ChevronDown, ArrowUpDown, ArrowLeft, MousePointerClick, Award } from 'lucide-react';

const P = {
  pink:'#E4006D', pinkLight:'#FFE0EF', pinkMid:'#FF4098', pinkDark:'#A8004F',
  black:'#1A1A1A', grayDark:'#4B5563', gray:'#9CA3AF', grayLight:'#F3F4F6',
  white:'#FFFFFF', green:'#059669', greenLight:'#D1FAE5', red:'#DC2626',
  redLight:'#FEE2E2', blue:'#2563EB', blueLight:'#DBEAFE',
  purple:'#7C3AED', purpleLight:'#EDE9FE', amber:'#D97706', amberLight:'#FEF3C7',
};

const omSummaryData = [
  { name:'Derya Ozturk',          ciro:13,  adet:-17, zs:-17, do:4,   fba:-4,  fbt:31, gm:6 },
  { name:'Hazel Aydemir',         ciro:7,   adet:-21, zs:-27, do:13,  fba:-5,  fbt:30, gm:6 },
  { name:'Ibrahim Emre Karasirt', ciro:10,  adet:-20, zs:-25, do:10,  fba:-2,  fbt:34, gm:6 },
];
const overallData = { ciro:10, adet:-19, zs:-23, do:9, fba:-4, fbt:31, gm:6 };
const rawBmData = `OM	BM	Ciro	Adet	ZS	DO	FBA	FBT	GM
Derya Ozturk	Aysun Cetin	6	-23	-24	4	-3	34	6
Derya Ozturk	Buse Aksu	31	1	13	-8	-3	25	4
Derya Ozturk	Deniz Uysal	14	-15	-24	12	-1	34	7
Derya Ozturk	Meliha Ilhan	6	-23	-27	9	-4	33	6
Derya Ozturk	Nur Ekici Kucuk	39	2	1	2	-2	34	5
Derya Ozturk	Ruveyda Un	-6	-31	-28	4	-8	25	6
Derya Ozturk	Taylan Yilmaz	12	-19	-16	4	-7	29	6
Hazel Aydemir	Bora Dedeoglu	-9	-37	-31	-6	-2	40	6
Hazel Aydemir	Elif Sabaz	30	-4	-31	41	-2	33	4
Hazel Aydemir	Fatih Sulun	0	-26	-35	18	-4	31	6
Hazel Aydemir	Mustafa Bulut	4	-25	-26	0	0	40	6
Hazel Aydemir	Pinar Beyaz	7	-26	-35	16	-2	41	8
Hazel Aydemir	Seda Urgan	12	-18	-18	8	-7	26	6
Hazel Aydemir	Umit Altunkaynak	12	-12	-14	15	-11	13	4
Ibrahim Emre Karasirt	Betul Duran	11	-18	-19	0	1	37	5
Ibrahim Emre Karasirt	Burcin Taskiran	-7	-30	-36	11	-3	30	6
Ibrahim Emre Karasirt	Emre Topcan	23	-12	-13	8	-6	31	8
Ibrahim Emre Karasirt	Esma Gul	7	-21	-16	-1	-4	29	5
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	27	-6	-27	35	-5	28	4
Ibrahim Emre Karasirt	Mehmet Sena Aydin	9	-21	-31	14	0	38	7
Ibrahim Emre Karasirt	Zehra Celik	-14	-38	-36	-4	1	39	8
Ibrahim Emre Karasirt	Zeycan Ozcan	15	-19	-31	20	-1	40	7`;
const rawStoreData = `OM	BM	Magaza	Sira	Ciro	Adet	ZS	DO	FBA	FBT	GM
Derya Ozturk	Aysun Cetin	ANKA 365 AVM	215	50	23	20	2	1	23	7
Derya Ozturk	Aysun Cetin	ANKA ANATOLIUM	383	-16	-45	-36	-3	-12	36	5
Derya Ozturk	Aysun Cetin	ANKA ARCADIUM AVM	55	80	18	32	-2	-9	39	5
Derya Ozturk	Aysun Cetin	ANKA ARMADA	196	22	-19	-17	17	-16	26	4
Derya Ozturk	Aysun Cetin	ANKA BILKENT	183	53	26	49	-5	-11	8	6
Derya Ozturk	Aysun Cetin	ANKA CEPA	70	4	-19	-11	-1	-9	17	6
Derya Ozturk	Aysun Cetin	ANKA GORDION AVM	40	38	6	6	4	-4	26	3
Derya Ozturk	Aysun Cetin	ANKA KENTPARK	10	10	-10	-9	2	-3	19	3
Derya Ozturk	Aysun Cetin	ANKA NATA VEGA AVM	64	-13	-40	-42	5	-2	43	9
Derya Ozturk	Aysun Cetin	ANKA NEXTLEVEL	150	65	4	4	1	-1	57	8
Derya Ozturk	Aysun Cetin	ANKA OPTIMUM	65	26	-11	-26	7	13	60	8
Derya Ozturk	Aysun Cetin	ANKA SINCAN CD	195	-23	-51	-24	-28	-10	40	12
Derya Ozturk	Aysun Cetin	ARTV ARTRIUM AVM	392	-4	-33	-26	7	-16	20	8
Derya Ozturk	Aysun Cetin	CANK YUNUS	369	-3	-38	-23	-13	-7	45	9
Derya Ozturk	Aysun Cetin	KAST BARUT	373	-21	-42	24	-49	-7	26	11
Derya Ozturk	Aysun Cetin	KAST KASTAMALL AVM	181	-6	-31	-36	8	-2	35	4
Derya Ozturk	Aysun Cetin	KIRI PODIUM AVM	132	15	-29	-38	12	2	65	5
Derya Ozturk	Aysun Cetin	RIZE CUMHURIYET CD	235	32	-7	-26	2	23	73	10
Derya Ozturk	Aysun Cetin	RIZE SIMAL AVM	129	-20	-42	-40	-7	3	42	9
Derya Ozturk	Aysun Cetin	SIVA ISTASYON CD	189	-9	-26	-35	6	8	32	6
Derya Ozturk	Aysun Cetin	SIVA PRIMEMALL AVM	267	-3	-32	-51	24	12	59	7
Derya Ozturk	Aysun Cetin	TOKA NOVADA AVM	107	-2	-19	-19	-3	3	24	6
Derya Ozturk	Aysun Cetin	TRAB ATAPARK	371	-11	-27	-26	2	-4	17	4
Derya Ozturk	Aysun Cetin	TRAB CEVAHIR OUTLET AVM	351	-35	-53	-46	-4	-10	25	8
Derya Ozturk	Aysun Cetin	TRAB TRABZON FR	39	-18	-40	-44	17	-8	25	4
Derya Ozturk	Aysun Cetin	TRAB UZUN SOKAK 2	27	2	-26	-19	-4	-5	32	5
Derya Ozturk	Aysun Cetin	YOZG NOVADA AVM	290	-3	-28	-41	30	-5	27	8
Derya Ozturk	Buse Aksu	ISTA ALTIYOL CD	167	27	1	-12	13	1	28	7
Derya Ozturk	Buse Aksu	ISTA BAGDAT CAD	143	14	-10	-3	-4	-2	23	5
Derya Ozturk	Buse Aksu	ISTA BAHARIYE CD 2	86	40	23	-1	19	5	20	5
Derya Ozturk	Buse Aksu	ISTA ERENKOY 2	87	51	4	4	2	-2	43	4
Derya Ozturk	Buse Aksu	ISTA HALITAGA CAD	329	3	-20	-7	-1	-13	12	2
Derya Ozturk	Buse Aksu	ISTA KOZZY	162	110	48	30	3	10	56	5
Derya Ozturk	Buse Aksu	ISTA MALTEPE CFR	109	14	-13	-10	0	-3	27	4
Derya Ozturk	Buse Aksu	ISTA MALTEPE PIAZZA AVM	20	-6	-23	-4	-11	-9	10	2
Derya Ozturk	Buse Aksu	ISTA MARMARA ANATOLIUM AVM	365	4	-30	12	-24	-18	21	3
Derya Ozturk	Buse Aksu	ISTA MUHURDAR CD	266	40	6	8	-3	1	34	10
Derya Ozturk	Buse Aksu	ISTA OPTIMUM	153	13	-14	-17	8	-4	26	4
Derya Ozturk	Buse Aksu	ISTA PALLADIUM 2	97	87	39	-5	47	-1	33	4
Derya Ozturk	Buse Aksu	ISTA RITIM ISTANBUL AVM	231	141	70	62	-4	10	55	6
Derya Ozturk	Buse Aksu	ISTA SASKINBAKKAL CD	342	37	10	2	13	-5	19	4
Derya Ozturk	Buse Aksu	ISTA YAYLADA AVM	243	39	0	5	0	-5	32	7
Derya Ozturk	Deniz Uysal	ISTA GAZIPASA CD	165	-13	-30	-20	-8	-5	17	6
Derya Ozturk	Deniz Uysal	ISTA MALTEPE CAD	197	28	-21	3	-16	-9	48	10
Derya Ozturk	Deniz Uysal	ISTA MARINA	78	49	16	-11	22	7	37	6
Derya Ozturk	Deniz Uysal	ISTA NEOMARIN	251	9	-28	-24	10	-14	30	8
Derya Ozturk	Deniz Uysal	ISTA PENDIK 19 MAYIS CD	219	10	-15	-20	13	-5	23	4
Derya Ozturk	Deniz Uysal	ISTA RINGS AVM	225	215	121	48	21	24	77	12
Derya Ozturk	Deniz Uysal	ISTA SARIGAZI CD	256	46	10	28	-8	-6	25	-1
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI ATLAS	224	21	-26	-30	14	-7	53	11
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI PLATO	391	-55	-65	-43	-37	-5	25	13
Derya Ozturk	Deniz Uysal	ISTA TUZLA MARINA AVM	71	25	-4	16	-29	17	53	9
Derya Ozturk	Deniz Uysal	ISTA TUZLAPORT AVM	223	77	21	-100	-100	-10	31	4
Derya Ozturk	Deniz Uysal	ISTA VIAPORT	50	8	-18	-34	24	-1	31	8
Derya Ozturk	Deniz Uysal	ISTA VIAPORT 2	142	23	-5	-32	29	8	40	5
Derya Ozturk	Deniz Uysal	KOCA GEBZECENTER	38	17	-20	-36	32	-6	38	7
Derya Ozturk	Deniz Uysal	KOCA OKSIJEN SHOPINN AVM	389	-37	-57	-58	23	-17	22	11
Derya Ozturk	Deniz Uysal	YALO GAZIPASA CD	198	28	-8	-15	12	-3	34	3
Derya Ozturk	Deniz Uysal	YALO STAR AVM	228	-22	-26	-30	5	0	6	1
Derya Ozturk	Deniz Uysal	YALO YALOVA KIPA	390	-42	-51	-44	-5	-9	10	9
Derya Ozturk	Meliha Ilhan	AKSA EFOR	213	1	-22	-36	10	10	42	8
Derya Ozturk	Meliha Ilhan	ANKA ACITY	221	-15	-40	-45	5	4	49	9
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL	35	-7	-26	-27	15	-12	10	6
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL 2	31	2	-21	-33	24	-5	23	4
Derya Ozturk	Meliha Ilhan	ANKA ANKARA FR	125	28	-14	-34	26	3	54	4
Derya Ozturk	Meliha Ilhan	ANKA ANTARES	60	16	-16	-16	4	-4	33	4
Derya Ozturk	Meliha Ilhan	ANKA ATAKULE AVM	179	15	-19	-2	-17	-1	42	4
Derya Ozturk	Meliha Ilhan	ANKA ATLANTIS	68	39	-6	-40	57	0	48	9
Derya Ozturk	Meliha Ilhan	ANKA FTZ AVM	353	31	-14	-1	-8	-6	44	10
Derya Ozturk	Meliha Ilhan	ANKA KIZLAR PINARI CD	0	-100	-100	-100	-100	-100	-100	-39
Derya Ozturk	Meliha Ilhan	ANKA KUZUEFFECT AVM	358	-1	-36	-1	-10	-28	11	5
Derya Ozturk	Meliha Ilhan	ANKA ONE TOWER AVM	352	46	4	21	-6	-9	28	5
Derya Ozturk	Meliha Ilhan	ANKA PANORA	59	47	1	-5	8	-2	43	6
Derya Ozturk	Meliha Ilhan	ANKA PODIUM AVM	192	25	-18	-23	22	-13	33	3
Derya Ozturk	Meliha Ilhan	ANKA TAURUS	152	40	12	6	-7	13	42	3
Derya Ozturk	Meliha Ilhan	ANKA VEGA SUBAYEVLERI AVM	253	-5	-26	-32	22	-10	16	7
Derya Ozturk	Meliha Ilhan	KAYS ILDEM AVM	380	-14	-44	-40	3	-9	39	9
Derya Ozturk	Meliha Ilhan	KAYS KAYSERI FR	25	5	-30	-24	-11	3	55	7
Derya Ozturk	Meliha Ilhan	KAYS KAYSERIPARK	106	1	-24	-32	10	1	34	5
Derya Ozturk	Meliha Ilhan	KAYS KUMSMALL AVM	388	-34	-54	-52	6	-8	31	7
Derya Ozturk	Meliha Ilhan	KAYS MEYSU AVM	363	-16	-32	-42	22	-5	17	0
Derya Ozturk	Meliha Ilhan	NEVS KAPADOKYA FR	364	-20	-44	-37	-1	-11	27	7
Derya Ozturk	Meliha Ilhan	NEVS NISSARA AVM	211	4	-27	-19	-4	-6	34	6
Derya Ozturk	Meliha Ilhan	NIGD NIGDE CD	335	-43	-57	-100	-100	-15	12	5
Derya Ozturk	Nur Ekici Kucuk	ISTA AKASYA AVM	28	5	-21	-11	-1	-11	19	5
Derya Ozturk	Nur Ekici Kucuk	ISTA AKYAKA PARK	298	1	-26	-24	4	-6	27	7
Derya Ozturk	Nur Ekici Kucuk	ISTA ALEMDAG CD	93	12	-18	-8	-2	-9	24	8
Derya Ozturk	Nur Ekici Kucuk	ISTA ALEMDAG CD2	203	3	-24	47	-48	-1	35	8
Derya Ozturk	Nur Ekici Kucuk	ISTA BRANDIUM	209	-4	-38	3	-46	13	74	20
Derya Ozturk	Nur Ekici Kucuk	ISTA BUYAKA	75	9	-17	-32	21	2	33	2
Derya Ozturk	Nur Ekici Kucuk	ISTA CANPARK AVM	117	82	21	7	8	5	58	5
Derya Ozturk	Nur Ekici Kucuk	ISTA CAPITOL	99	48	0	5	3	-8	37	8
Derya Ozturk	Nur Ekici Kucuk	ISTA EMAAR SQUARE AVM	8	36	5	-12	20	0	29	3
Derya Ozturk	Nur Ekici Kucuk	ISTA ICERENKOY CFR	67	108	45	49	0	-3	39	6
Derya Ozturk	Nur Ekici Kucuk	ISTA METROGARDEN AVM	51	69	23	3	15	5	44	6
Derya Ozturk	Nur Ekici Kucuk	ISTA METROPOL AVM	61	67	21	10	6	3	43	4
Derya Ozturk	Nur Ekici Kucuk	ISTA NAUTILUS	108	70	21	-9	31	1	43	9
Derya Ozturk	Nur Ekici Kucuk	ISTA NEV CARSI AVM	237	70	13	-4	30	-9	37	3
Derya Ozturk	Nur Ekici Kucuk	ISTA UMR MEYDAN	83	23	-7	-28	29	0	32	6
Derya Ozturk	Nur Ekici Kucuk	ISTA WATER GARDEN AVM	140	76	33	22	12	-2	30	7
Derya Ozturk	Ruveyda Un	BOLU 14 BURDA AVM	292	-25	-31	-20	7	-19	-12	6
Derya Ozturk	Ruveyda Un	BOLU CADDE AVM	159	-3	-26	-10	-12	-8	21	11
Derya Ozturk	Ruveyda Un	BOLU HIGHWAY	307	-59	-63	-78	76	-7	5	5
Derya Ozturk	Ruveyda Un	DUZC KREMPARK	187	-2	-28	-27	9	-10	22	8
Derya Ozturk	Ruveyda Un	KOCA 41 BURDA AVM	32	-10	-32	15	-37	-7	23	5
Derya Ozturk	Ruveyda Un	KOCA ARASTAPARK AVM	182	26	-4	2	1	-6	22	2
Derya Ozturk	Ruveyda Un	KOCA HURRIYET CD	41	26	-10	2	-9	-3	36	8
Derya Ozturk	Ruveyda Un	KOCA ISTIKLAL CD	144	8	-16	-6	-5	-6	20	5
Derya Ozturk	Ruveyda Un	KOCA IZMIT OUTLET CENTER	116	-3	-32	-49	41	-5	36	-2
Derya Ozturk	Ruveyda Un	KOCA SYMBOL AVM	121	19	-11	-13	15	-11	20	1
Derya Ozturk	Ruveyda Un	SAKA 54 CADDE AVM	123	1	-31	-48	48	-10	31	7
Derya Ozturk	Ruveyda Un	SAKA ADAPAZARI AGORA	293	26	-6	-23	26	-4	30	8
Derya Ozturk	Ruveyda Un	SAKA CARK CD	134	-10	-43	-31	-12	-7	48	11
Derya Ozturk	Ruveyda Un	SAKA KARASU CD	370	-49	-61	-55	0	-12	13	3
Derya Ozturk	Ruveyda Un	SAKA NG SAPANCA AVM	344	-28	-58	-40	-18	-14	46	7
Derya Ozturk	Ruveyda Un	SAKA SERDIVAN	103	-6	-32	-27	-1	-6	31	7
Derya Ozturk	Ruveyda Un	SAKARYA ADA CENTER	299	-15	-45	-54	19	1	55	19
Derya Ozturk	Taylan Yilmaz	ANKA 7. CD	73	49	10	11	6	-7	26	8
Derya Ozturk	Taylan Yilmaz	ANKA CEMAL GURSEL CD	139	71	23	84	-24	-12	22	7
Derya Ozturk	Taylan Yilmaz	ANKA IZMIR CD	227	31	-5	14	-3	-15	18	7
Derya Ozturk	Taylan Yilmaz	ANKA KARTALTEPE AVM	401	-61	-77	-62	-7	-33	12	11
Derya Ozturk	Taylan Yilmaz	ANKA KASMIR AVM	156	51	9	9	3	-3	34	7
Derya Ozturk	Taylan Yilmaz	ANKA KIZILAY 1	45	32	5	8	8	-10	13	4
Derya Ozturk	Taylan Yilmaz	ANKA KIZILAY MEYDAN	69	85	37	142	-45	3	39	5
Derya Ozturk	Taylan Yilmaz	ANKA METROMALL AVM	19	-9	-29	-31	11	-8	19	5
Derya Ozturk	Taylan Yilmaz	ANKA TUNALI HILMI CD 2	37	70	7	9	0	-2	56	9
Derya Ozturk	Taylan Yilmaz	BART BARTIN CD	207	24	-4	-3	1	-3	26	5
Derya Ozturk	Taylan Yilmaz	ESKI DOKTORLAR CD 2	95	8	-28	-12	-16	-1	48	9
Derya Ozturk	Taylan Yilmaz	ESKI ESPARK	17	3	-24	-20	-1	-5	29	2
Derya Ozturk	Taylan Yilmaz	ESKI VEGA OUTLET AVM	115	43	0	-13	11	3	47	4
Derya Ozturk	Taylan Yilmaz	KARA KARAMANPARK	338	-31	-54	-45	-7	-10	34	8
Derya Ozturk	Taylan Yilmaz	KARB KARES	264	8	-19	-20	-3	4	39	4
Derya Ozturk	Taylan Yilmaz	KONY ENNTEPE AVM	206	5	-25	-25	10	-9	27	4
Derya Ozturk	Taylan Yilmaz	KONY EREGLI PARK AVM	354	-53	-65	-49	-30	-1	33	3
Derya Ozturk	Taylan Yilmaz	KONY KENT PLAZA	112	7	-23	-31	14	-2	35	1
Derya Ozturk	Taylan Yilmaz	KONY KULESITE	178	-5	-35	-28	-1	-8	34	7
Derya Ozturk	Taylan Yilmaz	KONY M1 AVM	113	31	-12	-24	6	10	63	5
Derya Ozturk	Taylan Yilmaz	KONY NOVADA AVM	387	-38	-54	-44	-11	-8	23	3
Derya Ozturk	Taylan Yilmaz	ZONG 67 BURDA AVM	98	-16	-44	-45	13	-10	33	6
Derya Ozturk	Taylan Yilmaz	ZONG EREGLI OZDEMIR AVM	174	11	-31	-25	-1	-7	49	8
Derya Ozturk	Taylan Yilmaz	ZONG EREYLIN AVM	357	12	4	-22	39	-4	3	1
Hazel Aydemir	Bora Dedeoglu	AMAS AMASYA PARK AVM	236	3	-35	-39	-7	15	84	11
Hazel Aydemir	Bora Dedeoglu	CORU AHL AVM	82	-2	-33	-44	22	-3	43	7
Hazel Aydemir	Bora Dedeoglu	CORU GAZI CD	336	18	-21	-24	4	0	49	7
Hazel Aydemir	Bora Dedeoglu	GIRE GAZI CADDESI	291	5	-22	-19	-8	4	41	1
Hazel Aydemir	Bora Dedeoglu	GIRE INONU CD	185	13	-28	-33	16	-8	45	6
Hazel Aydemir	Bora Dedeoglu	ORDU FATSA	337	-26	-43	-43	7	-7	21	5
Hazel Aydemir	Bora Dedeoglu	ORDU NOVADA AVM	254	-22	-44	-14	-23	-14	18	9
Hazel Aydemir	Bora Dedeoglu	ORDU SIRRIPASA CD	155	-19	-41	-27	-9	-12	21	7
Hazel Aydemir	Bora Dedeoglu	ORDU UNYE UNIPORT AVM	311	-1	-32	-26	-12	4	52	5
Hazel Aydemir	Bora Dedeoglu	SAMS BAFRA CELIKPARK AVM	296	-28	-51	-50	2	-5	40	5
Hazel Aydemir	Bora Dedeoglu	SAMS BULVAR	91	20	-15	2	-21	6	50	8
Hazel Aydemir	Bora Dedeoglu	SAMS CIFTLIK CD 2	269	-11	-39	-30	-12	-1	45	8
Hazel Aydemir	Bora Dedeoglu	SAMS CITYMALL AVM	0	-100	-100	-100	-100	-100	-100	-47
Hazel Aydemir	Bora Dedeoglu	SAMS LOVELET	287	-28	-41	-68	65	13	39	4
Hazel Aydemir	Bora Dedeoglu	SAMS PIAZZA	16	-5	-37	-41	7	1	50	5
Hazel Aydemir	Bora Dedeoglu	SAMS YESILYURT	44	66	12	0	12	0	48	4
Hazel Aydemir	Bora Dedeoglu	SINO SAKARYA CD	283	-22	-36	-23	-1	-16	3	5
Hazel Aydemir	Elif Sabaz	ISTT AKBATI	29	19	-10	-21	23	-7	23	5
Hazel Aydemir	Elif Sabaz	ISTT ATIRUS AVM	341	86	26	-3	28	1	49	2
Hazel Aydemir	Elif Sabaz	ISTT AVENUA AVM	148	76	10	13	-9	7	71	2
Hazel Aydemir	Elif Sabaz	ISTT BEYLIKDUZU MGR	172	58	-2	-100	-100	7	73	9
Hazel Aydemir	Elif Sabaz	ISTT CENNET CD 2	128	19	-11	-100	-100	3	37	6
Hazel Aydemir	Elif Sabaz	ISTT ESENYURT CITY CENTER AVM	244	27	9	-36	59	7	25	7
Hazel Aydemir	Elif Sabaz	ISTT MARMARA CAD	288	21	-15	-28	24	-5	36	8
Hazel Aydemir	Elif Sabaz	ISTT MARMARAPARK	2	17	-12	-31	31	-2	29	1
Hazel Aydemir	Elif Sabaz	ISTT MIMAROBA DIA MARE CD	101	96	42	26	8	4	43	2
Hazel Aydemir	Elif Sabaz	ISTT PELICAN	226	-4	-30	-25	4	-10	23	8
Hazel Aydemir	Elif Sabaz	ISTT PERLAVISTA AVM	346	27	-5	-2	10	-12	18	7
Hazel Aydemir	Elif Sabaz	ISTT SILIVRI KIP	395	0	-28	-43	14	10	52	11
Hazel Aydemir	Elif Sabaz	ISTT SILIVRI MAXI	345	-8	-27	-35	24	-10	14	4
Hazel Aydemir	Elif Sabaz	ISTT TORIUM	173	11	-20	-7	-2	-13	22	5
Hazel Aydemir	Fatih Sulun	BALI BANDIRMA LIMAN	146	-15	-29	-28	6	-7	12	4
Hazel Aydemir	Fatih Sulun	BILE BOZUYUK SARAR	276	-47	-62	-66	6	2	45	8
Hazel Aydemir	Fatih Sulun	BURS AHMET TANER KISLALI CD	88	34	-2	0	-3	1	38	8
Hazel Aydemir	Fatih Sulun	BURS ANATOLIUM	230	-4	-26	-39	14	6	38	5
Hazel Aydemir	Fatih Sulun	BURS AS OUTLET AVM	275	-30	-35	-78	179	5	13	3
Hazel Aydemir	Fatih Sulun	BURS ATABULVARI CD	85	94	28	37	-2	-5	44	4
Hazel Aydemir	Fatih Sulun	BURS DOWNTOWN AVM	343	-54	-64	-58	-3	-12	14	8
Hazel Aydemir	Fatih Sulun	BURS GORUKLE CAD	249	35	1	43	-11	-20	7	8
Hazel Aydemir	Fatih Sulun	BURS INEGOL	222	-3	-37	-38	9	-6	45	9
Hazel Aydemir	Fatih Sulun	BURS KENT MEYDANI	100	-4	-33	-35	15	-10	28	8
Hazel Aydemir	Fatih Sulun	BURS KORUPARK	18	12	-14	-27	21	-2	27	4
Hazel Aydemir	Fatih Sulun	BURS OKSIJEN SHOPINN AVM	394	-14	-46	-54	22	-3	54	2
Hazel Aydemir	Fatih Sulun	BURS OZDILEKPARK AVM	119	20	-12	-17	17	-10	23	7
Hazel Aydemir	Fatih Sulun	BURS PARKUR AVM	284	-21	-40	-52	30	-6	25	4
Hazel Aydemir	Fatih Sulun	BURS SUR YAPI MARKA AVM	11	2	-26	-29	8	-4	33	6
Hazel Aydemir	Fatih Sulun	BURS ZAFER PLAZA	118	9	-22	-26	7	-1	38	6
Hazel Aydemir	Mustafa Bulut	ADIY ADIYAMAN PARK AVM	218	-6	-30	-38	-1	13	52	8
Hazel Aydemir	Mustafa Bulut	BATM BATMAN PARK	397	-11	-23	-35	3	14	31	3
Hazel Aydemir	Mustafa Bulut	BATM PETROL CITY AVM	200	75	12	-15	5	25	95	4
Hazel Aydemir	Mustafa Bulut	BING KALIUM AVM	377	-28	-45	-24	-23	-5	24	12
Hazel Aydemir	Mustafa Bulut	DIYA 75 METRE CD	190	23	-15	-8	0	-8	35	12
Hazel Aydemir	Mustafa Bulut	DIYA CEYLANPARK AVM	94	-1	-28	-27	-5	4	42	3
Hazel Aydemir	Mustafa Bulut	DIYA FORUM AVM	80	22	-17	-22	6	0	47	6
Hazel Aydemir	Mustafa Bulut	ELAZ ELAZIG PARK23	263	-9	-34	-47	20	5	45	10
Hazel Aydemir	Mustafa Bulut	ELAZ ELYSIUM AVM	120	-13	-31	-40	13	2	29	4
Hazel Aydemir	Mustafa Bulut	GAZI G.ANTEP FR	191	-7	-39	-35	-8	0	55	10
Hazel Aydemir	Mustafa Bulut	GAZI GAZIMUHTAR	304	9	-8	13	-9	-11	5	6
Hazel Aydemir	Mustafa Bulut	GAZI M1 OUTLET	330	-41	-58	-55	16	-20	12	11
Hazel Aydemir	Mustafa Bulut	GAZI PRIME MALL	57	39	-7	-20	17	0	49	7
Hazel Aydemir	Mustafa Bulut	GAZI SANKOPARK	89	32	2	0	6	36	0	5
Hazel Aydemir	Mustafa Bulut	KAHR PIAZZA	58	-15	-41	-42	6	-4	38	6
Hazel Aydemir	Mustafa Bulut	MALA MALATYAPARK	52	1	-30	-32	0	3	49	6
Hazel Aydemir	Mustafa Bulut	MARD MARDIAN MALL	130	18	-14	-6	-14	7	47	5
Hazel Aydemir	Mustafa Bulut	MARD MOVAPARK	319	98	41	-17	38	23	73	4
Hazel Aydemir	Mustafa Bulut	SANL URFA NOVADA AVM	385	-25	-35	-23	-14	-2	14	6
Hazel Aydemir	Mustafa Bulut	SANL URFA PIAZZA	205	13	-17	-39	41	-3	32	3
Hazel Aydemir	Mustafa Bulut	SANL URFACITY	268	70	1	1	8	-8	55	3
Hazel Aydemir	Mustafa Bulut	SIIR SIIRT PARK AVM	349	-26	-40	-27	-5	-14	6	1
Hazel Aydemir	Mustafa Bulut	SIRN CIZRE PARK AVM	367	-35	-54	-50	11	-17	17	4
Hazel Aydemir	Pinar Beyaz	ADAN 01 BURDA AVM	255	-19	-47	-53	26	-10	37	8
Hazel Aydemir	Pinar Beyaz	ADAN BARAJ YOLU CAD	171	23	-8	-16	7	3	37	10
Hazel Aydemir	Pinar Beyaz	ADAN CAKMAK CD	277	-19	-40	-31	-4	-10	21	11
Hazel Aydemir	Pinar Beyaz	ADAN KENAN EVREN BLV	170	26	-2	-1	-2	1	30	8
Hazel Aydemir	Pinar Beyaz	ADAN M1 AVM	21	-4	-37	-38	5	-4	46	11
Hazel Aydemir	Pinar Beyaz	ADAN OPTIMUM	13	-15	-41	-43	9	-6	36	9
Hazel Aydemir	Pinar Beyaz	ADAN TURKMENBASI CD	72	36	1	12	0	-9	21	7
Hazel Aydemir	Pinar Beyaz	HATA ANTAKYA YUZUNCU YIL AVM	320	4	-23	-67	185	-19	10	6
Hazel Aydemir	Pinar Beyaz	HATA ISK PRIMEMALL	30	0	-34	-52	30	5	60	8
Hazel Aydemir	Pinar Beyaz	HATA ISKENDERUN PARK FORBES AV	176	-9	-32	-37	7	1	36	8
Hazel Aydemir	Pinar Beyaz	MERS MERSIN CFR	90	38	-16	-27	10	5	72	8
Hazel Aydemir	Pinar Beyaz	MERS MERSIN FR	33	-13	-44	-37	0	-11	39	9
Hazel Aydemir	Pinar Beyaz	MERS NOVADA ERDEMLI AVM	241	-12	-33	-48	31	-1	31	11
Hazel Aydemir	Pinar Beyaz	MERS SAYAPARK AVM	77	28	-15	-29	25	-4	44	9
Hazel Aydemir	Pinar Beyaz	MERS SILIFKE CD	201	23	-8	-33	22	13	51	7
Hazel Aydemir	Pinar Beyaz	MERS TARSU	141	-9	-36	-47	7	13	60	11
Hazel Aydemir	Pinar Beyaz	OSMA 328 AVM	180	-18	-42	-52	21	0	42	6
Hazel Aydemir	Seda Urgan	CANA 17 BURDA AVM	34	26	-3	-17	13	3	35	2
Hazel Aydemir	Seda Urgan	CANA CANAKKALE CARSI CD	289	15	-3	-14	3	10	30	4
Hazel Aydemir	Seda Urgan	CANA CANAKKALE KIP	359	29	-8	-11	-7	12	56	7
Hazel Aydemir	Seda Urgan	EDIR ERASTA AVM	122	4	-19	-20	29	-22	1	2
Hazel Aydemir	Seda Urgan	EDIR KESAN KIPA AVM	356	-20	-38	-40	3	0	29	7
Hazel Aydemir	Seda Urgan	EDIR MARGI	138	31	-7	-5	9	-11	26	9
Hazel Aydemir	Seda Urgan	EDIR SARACLAR CD	376	-12	-37	15	-22	-30	-2	4
Hazel Aydemir	Seda Urgan	KIRK 39 BURDA AVM	245	0	-28	-25	4	-7	28	7
Hazel Aydemir	Seda Urgan	KIRK KIRKLARELI CD	216	10	-20	0	-8	-13	20	7
Hazel Aydemir	Seda Urgan	KIRK LULEBURGAZ ISTANBUL CD	328	-23	-46	-24	-8	-22	11	8
Hazel Aydemir	Seda Urgan	TEKI CERKEZKOY KIPA	239	3	-23	-31	20	-6	26	6
Hazel Aydemir	Seda Urgan	TEKI CORLU OMURTAK CD	324	12	-14	-16	4	-2	29	4
Hazel Aydemir	Seda Urgan	TEKI ORION CORLU	111	31	-17	-11	2	-9	45	8
Hazel Aydemir	Seda Urgan	TEKI TEKIRA	79	16	-13	-24	16	-2	31	8
Hazel Aydemir	Umit Altunkaynak	ISTT AKMERKEZ	212	55	30	38	-4	-2	18	5
Hazel Aydemir	Umit Altunkaynak	ISTT AVLU 34 AVM	313	-4	-40	-17	-23	-7	49	11
Hazel Aydemir	Umit Altunkaynak	ISTT BESIKTAS CD	0	-100	-100	-100	-100	-100	-100	-50
Hazel Aydemir	Umit Altunkaynak	ISTT CEVAHIR	1	32	6	12	-1	-4	19	3
Hazel Aydemir	Umit Altunkaynak	ISTT GALATASARAY	104	-11	-31	-12	0	-21	2	5
Hazel Aydemir	Umit Altunkaynak	ISTT GOKTURK IST CD2	131	60	37	54	3	-14	1	-3
Hazel Aydemir	Umit Altunkaynak	ISTT HALASKARGAZI CD	317	0	-20	-10	4	-15	7	6
Hazel Aydemir	Umit Altunkaynak	ISTT HAVALIMANI IC HATLAR	247	13	-10	-18	22	-10	13	5
Hazel Aydemir	Umit Altunkaynak	ISTT HISTORIA	188	12	-26	2	-18	-11	35	7
Hazel Aydemir	Umit Altunkaynak	ISTT ISTIKLAL AVM	375	-12	-23	-16	7	-15	-2	7
Hazel Aydemir	Umit Altunkaynak	ISTT ISTINYEPARK	3	17	-9	-19	18	-5	22	1
Hazel Aydemir	Umit Altunkaynak	ISTT KAGITHANE AXIS AVM	273	18	-17	-15	15	-16	20	3
Hazel Aydemir	Umit Altunkaynak	ISTT KANYON AVM	149	57	18	13	8	-3	29	8
Hazel Aydemir	Umit Altunkaynak	ISTT NISANTASI CD	9	12	3	8	10	-13	-6	4
Hazel Aydemir	Umit Altunkaynak	ISTT NISANTASI CITYS AVM	305	-23	-31	-54	85	-18	-9	4
Hazel Aydemir	Umit Altunkaynak	ISTT ORTABAHCE CD	157	29	0	-100	-100	-15	9	3
Hazel Aydemir	Umit Altunkaynak	ISTT ORTAKOY CD	323	-7	-34	-1	-6	-30	0	4
Hazel Aydemir	Umit Altunkaynak	ISTT OZDILEK AVM	43	40	16	-12	35	-3	17	2
Hazel Aydemir	Umit Altunkaynak	ISTT SARIYER CD	232	14	-19	9	-13	-14	20	8
Hazel Aydemir	Umit Altunkaynak	ISTT SISLI CD	297	0	-18	-7	-6	-7	14	7
Hazel Aydemir	Umit Altunkaynak	ISTT TAKSIM CADDE	36	-36	-51	-7	-31	-23	-1	7
Hazel Aydemir	Umit Altunkaynak	ISTT TRUMP TOWERS	161	42	5	-100	-100	-3	30	8
Hazel Aydemir	Umit Altunkaynak	ISTT VADI ISTANBUL AVM	15	19	-4	-37	73	-12	9	1
Hazel Aydemir	Umit Altunkaynak	ISTT VALIKONAGI CD	347	-10	-13	0	7	-19	-15	4
Hazel Aydemir	Umit Altunkaynak	ISTT ZORLU AVM	81	23	-6	-9	18	-13	14	5
Hazel Aydemir	Umit Altunkaynak	VAN VAN AVM	145	3	-29	-23	-8	0	45	6
Hazel Aydemir	Umit Altunkaynak	VAN VANMALL AVM	366	0	-24	-61	120	-12	16	8
Ibrahim Emre Karasirt	Betul Duran	ANTA AKDENIZ PARK AVM	302	21	-8	0	0	-2	28	4
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYA TIME CENTER	411	31	1	-21	8	19	53	7
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYA UYGUN CENTER AVM	133	-2	-37	3	-27	-16	30	8
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYUM	164	29	-7	-30	21	10	53	4
Ibrahim Emre Karasirt	Betul Duran	ANTA ANTALYA KAS	413	-54	-56	-67	37	-4	1	1
Ibrahim Emre Karasirt	Betul Duran	ANTA ANTALYA MGR	46	24	-7	-29	31	0	34	4
Ibrahim Emre Karasirt	Betul Duran	ANTA ATATURK CD	169	-1	-33	-33	5	-4	41	6
Ibrahim Emre Karasirt	Betul Duran	ANTA BOSTANCIPINARI CD	393	-23	-40	-30	-8	-6	20	3
Ibrahim Emre Karasirt	Betul Duran	ANTA ERASTA	105	38	-6	-3	0	-3	43	7
Ibrahim Emre Karasirt	Betul Duran	ANTA G-MALL CARREFOURSA AVM	248	98	29	35	-9	5	62	8
Ibrahim Emre Karasirt	Betul Duran	ANTA KEMER CADDE	407	0	-5	2	-20	16	23	5
Ibrahim Emre Karasirt	Betul Duran	ANTA KUMLUCA CD	331	-18	-42	-23	-14	-13	24	5
Ibrahim Emre Karasirt	Betul Duran	ANTA LAND OF LEGENDS	348	-40	-47	-33	-11	-12	1	3
Ibrahim Emre Karasirt	Betul Duran	ANTA MALL OF ANTALYA AVM	47	19	-12	-35	26	9	46	3
Ibrahim Emre Karasirt	Betul Duran	ANTA MANAVGAT NOVA MALL	147	10	-18	-28	10	3	39	2
Ibrahim Emre Karasirt	Betul Duran	ANTA MANAVGATCITY AVM	0	-100	-100	-100	-100	-100	-100	-53
Ibrahim Emre Karasirt	Betul Duran	ANTA MARKANTALYA AVM	26	23	-7	-21	6	12	48	6
Ibrahim Emre Karasirt	Betul Duran	ANTA OZDILEKPARK	84	-10	-35	-26	-9	-4	34	8
Ibrahim Emre Karasirt	Betul Duran	ANTA SHEMALL	193	11	-8	-3	-6	1	22	6
Ibrahim Emre Karasirt	Betul Duran	ANTA TERRACITY	49	19	-18	-14	-9	5	52	3
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODR CUMH.CD	408	-18	-41	-60	19	25	74	5
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODR OASIS	339	-32	-39	-28	0	-15	-6	1
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODRUM AVENUE AVM	229	19	-8	42	-29	-8	18	4
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL CADDE	381	21	-17	-15	2	-4	39	9
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL DATCA CAD	400	-36	-57	-31	-33	-7	37	9
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL ERASTA AVM	62	2	-22	-38	22	2	34	4
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FESTIVA AVM	300	56	5	2	11	-8	38	6
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FETHIYE CARSI CD	308	-10	-38	-45	18	-4	39	8
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FETHIYE GOCEK CD	403	-48	-60	-54	6	-18	7	3
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MARMARIS	374	4	-36	-38	-2	5	71	10
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MARMARIS ATATURK CD	361	4	-28	-26	-8	6	54	3
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MIDTOWN	252	-15	-41	-38	9	-14	25	8
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL POMELON AVM	210	61	33	7	-2	27	54	8
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL RUYA 48 OUTLET	334	-49	-55	-100	-100	-2	12	4
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL RUYAPARK AVM	321	2	-27	-15	0	-15	20	12
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL TURGUTREIS AVM	316	-21	-39	-56	51	-9	18	7
Ibrahim Emre Karasirt	Emre Topcan	ISTT AIRPORT AVM	309	83	32	7	30	-5	32	6
Ibrahim Emre Karasirt	Emre Topcan	ISTT AQUA FLORYA AVM	102	-11	-29	-27	12	-14	8	3
Ibrahim Emre Karasirt	Emre Topcan	ISTT ATAKOY A PLUS AVM	262	21	-4	7	-1	-10	14	3
Ibrahim Emre Karasirt	Emre Topcan	ISTT CAPACITY	24	44	10	1	11	-1	30	3
Ibrahim Emre Karasirt	Emre Topcan	ISTT CAROUSEL	312	14	-22	-18	6	-10	31	11
Ibrahim Emre Karasirt	Emre Topcan	ISTT EYUP AXIS AVM	326	22	-13	-12	4	-4	34	6
Ibrahim Emre Karasirt	Emre Topcan	ISTT FLYINN AVM	378	31	12	-77	374	2	19	7
Ibrahim Emre Karasirt	Emre Topcan	ISTT GUNESLIPARK	310	10	-21	-25	13	-6	30	9
Ibrahim Emre Karasirt	Emre Topcan	ISTT ISTANBUL FR	6	26	-7	3	-5	-5	29	4
Ibrahim Emre Karasirt	Emre Topcan	ISTT ISTASYON CD	76	22	-7	-5	-2	0	32	6
Ibrahim Emre Karasirt	Emre Topcan	ISTT KALE AVM	204	-15	-59	-41	13	-39	28	51
Ibrahim Emre Karasirt	Emre Topcan	ISTT MARMARA FR	12	50	22	6	1	14	40	3
Ibrahim Emre Karasirt	Emre Topcan	ISTT METROPORT	151	52	10	-1	3	8	48	7
Ibrahim Emre Karasirt	Emre Topcan	ISTT OLIVIUM	271	-16	-43	-42	2	-5	42	13
Ibrahim Emre Karasirt	Emre Topcan	ISTT SIRINEVLER CAD	194	74	24	20	-3	7	50	3
Ibrahim Emre Karasirt	Emre Topcan	ISTT STARCITY	184	-15	-42	-28	1	-21	17	9
Ibrahim Emre Karasirt	Esma Gul	AFYO AFIUM	137	-27	-47	-53	10	1	40	7
Ibrahim Emre Karasirt	Esma Gul	AFYO AFYONPARK AVM	158	-29	-45	-34	-14	-4	24	6
Ibrahim Emre Karasirt	Esma Gul	BURD GAZI CD	314	12	-17	6	-5	-17	11	10
Ibrahim Emre Karasirt	Esma Gul	DENI AQUAMALL AVM	279	18	-21	-31	30	-13	30	3
Ibrahim Emre Karasirt	Esma Gul	DENI CAMLIK FR	22	28	1	-27	30	7	35	3
Ibrahim Emre Karasirt	Esma Gul	DENI CINAR CD	202	-1	-14	-24	14	0	15	-1
Ibrahim Emre Karasirt	Esma Gul	DENI HORIZON AVM	327	-23	-39	-33	11	-19	3	9
Ibrahim Emre Karasirt	Esma Gul	DENI TERASPARK	199	10	-26	-38	13	6	57	9
Ibrahim Emre Karasirt	Esma Gul	ISPA CARSI	405	-3	-23	15	-18	-19	3	7
Ibrahim Emre Karasirt	Esma Gul	ISPA CENTRIUM GARDEN	368	11	-22	-11	4	-15	21	6
Ibrahim Emre Karasirt	Esma Gul	ISPA IYAS	96	10	-20	-1	-12	-8	26	4
Ibrahim Emre Karasirt	Esma Gul	ISPA MEYDAN AVM	208	-11	-35	-27	-14	4	43	7
Ibrahim Emre Karasirt	Esma Gul	KUTA SERA	186	-3	-36	-30	8	-15	29	5
Ibrahim Emre Karasirt	Esma Gul	USAK FESTIVA	303	6	-19	-28	13	0	30	9
Ibrahim Emre Karasirt	Esma Gul	USAK ISMETPASA CAD	315	36	-5	12	-10	-7	34	9
Ibrahim Emre Karasirt	Esma Gul	USAK KARUN AVM	110	107	47	112	-29	-3	38	-1
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZI ERZINCANPARK AVM	399	-21	-47	-39	-14	0	50	8
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZU ERZURUMAVM	384	-18	-30	-17	-12	-4	12	3
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZU MNG MALL AVM	160	-4	-23	-12	-9	-3	20	5
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT 212AVM	127	-15	-40	-46	19	-7	31	7
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ARENAPARK	56	42	0	5	-4	-1	41	8
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ARMONIPARK	166	71	8	5	7	-3	53	5
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT BASAKSEHIR	398	-12	-27	-3	-6	-20	-4	4
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT BIZ CEVAHIR HALIC AVM	270	27	-15	7	-16	-6	41	6
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT GOP BAGLARBASI CD	214	35	-12	-16	9	-4	47	9
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ISFANBUL AVM	163	-21	-37	-37	6	-5	19	8
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT MALL OF ISTANBUL	5	33	3	-57	121	9	40	2
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT TEMA WORLD AVM	114	70	24	-1	19	6	44	4
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT VEGA ISTANBUL AVM	233	36	-3	5	4	-11	24	8
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT VENEZIA MEGA OUTLET AVM	92	-14	-35	-36	-1	3	36	7
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI AYVALIK CD	379	-22	-35	-10	-29	2	21	5
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI AYVALIK KIRLANGIC AVM	282	-10	-37	-44	12	0	43	5
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI BALIKESIR 10 BURDA AVM	53	27	-6	-20	10	7	44	5
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI EDREMIT NOVADA AVM	175	-21	-49	-50	15	-12	36	7
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI MILLI KUVVETLER CD	238	6	-21	-10	-5	-8	23	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI YASA OUTLET	340	-34	-52	-44	-7	-9	26	9
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI BOSTANLI CAD	234	50	15	12	-4	7	40	9
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI CIGLI KIP	362	32	3	-11	8	6	37	10
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI DIKILI CAD	360	-27	-52	-50	6	-9	37	5
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI EFESUS AVM	217	70	12	-14	28	2	55	12
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI HILLTOWN AVM	7	32	-3	-37	45	5	43	3
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI K.YAKA CARSI CD	42	23	-7	-18	11	3	35	6
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI NOVADA MENEMEN AVM	396	-37	-48	-46	11	-13	5	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI SAKIPAGA AVM	258	-31	-47	-63	23	19	54	6
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI AKHISAR NOVADA AVM	265	-14	-44	-44	4	-4	48	7
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI ALPHARD AVM	286	69	13	-26	8	42	112	9
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI DOGU CD	322	-10	-28	-23	1	-7	16	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI MAGNESIA	54	20	-12	-18	15	-7	28	6
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI SALIHLI KIP	154	-2	-30	-42	5	14	60	9
Ibrahim Emre Karasirt	Zehra Celik	AYDI DIDIM CD	386	-52	-54	-51	1	-7	-4	5
Ibrahim Emre Karasirt	Zehra Celik	AYDI DIDIM KIPA AVM	412	-23	-54	-56	8	-2	63	9
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI AVM	220	-40	-52	-56	5	4	31	8
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI INONU BLV	355	3	-27	-35	1	10	56	3
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI MARINA	350	-20	-41	-36	6	-12	19	3
Ibrahim Emre Karasirt	Zehra Celik	AYDI SOKE NOVADA	281	0	-26	-20	-25	24	68	5
Ibrahim Emre Karasirt	Zehra Celik	AYDI SOKE OUTLET	246	-61	-73	-70	-16	5	56	10
Ibrahim Emre Karasirt	Zehra Celik	IZMI ALACATI	410	-20	-46	-53	-4	20	77	0
Ibrahim Emre Karasirt	Zehra Celik	IZMI CESME CADDE PLUS AVM	372	-45	-65	-50	-17	-15	34	3
Ibrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM	63	21	-10	-28	16	8	46	3
Ibrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM 2	48	-12	-34	-33	-6	4	39	8
Ibrahim Emre Karasirt	Zehra Celik	IZMI RENNA PARK AVM	406	-6	-36	-22	-3	-16	23	4
Ibrahim Emre Karasirt	Zehra Celik	IZMI SELWAY AVM	261	-11	-37	-42	1	7	51	11
Ibrahim Emre Karasirt	Zehra Celik	IZMI SELWAY AVM 2	382	-21	-32	33	-47	-4	12	3
Ibrahim Emre Karasirt	Zehra Celik	IZMI SIRINYER CD	177	30	4	-8	5	8	35	5
Ibrahim Emre Karasirt	Zehra Celik	IZMI URLA BAMBOO AVM	135	41	-8	-18	7	6	62	6
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI ADNAN MENDERES BLV	301	-6	-27	-29	-2	4	34	8
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI AYDIN FR	126	30	-5	-48	65	12	52	7
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI AYDIN KIP	240	-3	-42	-29	-5	-14	44	12
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI NAZILLI BAMBOO AVM	257	9	-24	-8	-20	3	47	7
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI OPSMALL AVM	124	2	-35	-44	53	-23	20	1
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI ALSANCAK	306	28	5	16	1	-10	9	7
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI BALCOVA KIP	250	75	27	11	23	-7	29	6
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI BORNOVA CD	259	19	-5	-100	-100	-4	21	5
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI EGE PERLA AVM	280	47	29	17	7	3	17	9
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI FORUM BORNOVA AVM	23	16	-10	-36	26	11	43	5
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI HATAY CAD	136	39	-8	12	-17	-1	51	4
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI ISTINYEPARK AVM	4	24	-11	-25	11	6	48	5
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI IZMIR PARK AVM	333	12	-8	-11	4	-1	21	7
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI KIBRIS S. 3	74	17	-18	-53	82	-4	36	6
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI KONAK PIER AVM	332	-11	-39	-30	-1	-13	27	7
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI PARK BORNOVA AVM	278	-18	-48	-42	6	-16	32	8
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI POINT BORNOVA AVM	294	6	-26	-35	16	-1	41	12
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI WESTPARK AVM	242	-17	-47	-29	-34	13	78	16`;


const METRICS = ['ciro','adet','zs','do','fba','fbt','gm'];
const METRIC_LABELS = { ciro:'Ciro %', adet:'Adet %', zs:'ZS %', do:'DO %', fba:'FBA %', fbt:'FBT %', gm:'GM %' };

function parseBm(raw) {
  return raw.trim().split('\n').slice(1).map((line,i) => {
    const c = line.split('\t');
    const p = v => { const n=parseFloat((v||'').replace(/%/g,'')); return isNaN(n)?0:n; };
    return { id:`bm_${i}`, om:c[0], name:c[1], ciro:p(c[2]), adet:p(c[3]), zs:p(c[4]), do:p(c[5]), fba:p(c[6]), fbt:p(c[7]), gm:p(c[8]) };
  });
}
function parseStore(raw) {
  return raw.trim().split('\n').slice(1).map((line,i) => {
    const c = line.split('\t');
    const p = v => { const n=parseFloat((v||'').replace(/%/g,'')); return isNaN(n)?0:n; };
    const sira = parseInt(c[3])||0;
    return { id:`st_${i}`, om:c[0], bm:c[1], name:c[2], sira, ciro:p(c[4]), adet:p(c[5]), zs:p(c[6]), do:p(c[7]), fba:p(c[8]), fbt:p(c[9]), gm:p(c[10]) };
  });
}

const BM_DATA    = parseBm(rawBmData);
const STORE_DATA = parseStore(rawStoreData);

function Badge({ label, diff }) {
  if (diff === undefined || isNaN(diff)) return null;
  const pos = diff >= 0;
  return (
    <span style={{ fontSize:9, display:'inline-flex', alignItems:'center', gap:1,
      color: pos ? P.green : P.red, fontWeight:700 }}>
      {label}:{pos?'▲':'▼'}{Math.abs(diff).toFixed(1)}
    </span>
  );
}

function KPICard({ title, value, baselineValue, baselineLabel, icon: Icon }) {
  const pos = value >= 0;
  const diff = baselineValue !== undefined ? value - baselineValue : null;
  return (
    <div style={{ background:P.white, borderRadius:16, padding:'18px 20px',
      boxShadow:'0 1px 4px rgba(0,0,0,0.07)', border:'1px solid #F0F0F0',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      borderLeft:`4px solid ${pos ? P.green : P.pink}` }}>
      <div>
        <p style={{ fontSize:11, color:P.gray, fontWeight:600, marginBottom:6, letterSpacing:.3 }}>{title}</p>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <h3 style={{ fontSize:28, fontWeight:800, color: pos ? P.green : P.pink, margin:0 }}>{value}%</h3>
          {pos ? <TrendingUp size={16} color={P.green}/> : <TrendingDown size={16} color={P.pink}/>}
        </div>
        {diff !== null && (
          <p style={{ margin:'4px 0 0', fontSize:10, color:P.grayDark }}>
            {baselineLabel}:{' '}
            <strong style={{ color: diff>=0 ? P.green : P.red }}>{diff>=0?'+':''}{diff.toFixed(1)}%</strong>
          </p>
        )}
      </div>
      <div style={{ padding:12, borderRadius:12,
        background: pos ? P.greenLight : P.pinkLight, color: pos ? P.green : P.pink }}>
        <Icon size={20}/>
      </div>
    </div>
  );
}

function RankBadge({ value }) {
  if (!value) return <span style={{ color:P.gray, fontSize:11 }}>–</span>;
  const color = value <= 50 ? P.green : value <= 150 ? P.amber : value <= 300 ? P.grayDark : P.red;
  const bg = value <= 50 ? P.greenLight : value <= 150 ? P.amberLight : value <= 300 ? P.grayLight : P.redLight;
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:4,
      background:bg, color, fontSize:12, fontWeight:800,
      padding:'2px 10px', borderRadius:20 }}>
      <Award size={11}/> {value}
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
        if (sortConfig.key === 'sira') {
          const av = a.sira || 999999, bv = b.sira || 999999;
          return (av - bv) * dir;
        }
        return (a[sortConfig.key] - b[sortConfig.key]) * dir;
      });
    }
    return rows;
  }, [tableDataRaw, searchTerm, sortConfig]);

  const currentData = selectedBM
    ? BM_DATA.find(b => b.name===selectedBM)
    : selectedOM ? omSummaryData.find(o => o.name===selectedOM) : overallData;
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

  const SortHeader = ({ label, sortKey, small }) => {
    const active = sortConfig.key === sortKey;
    return (
      <th onClick={() => requestSort(sortKey)}
        style={{ padding:'12px 8px', textAlign:'center', cursor:'pointer', fontWeight:700,
          fontSize:10, color:P.pinkDark, textTransform:'uppercase', letterSpacing:.5,
          whiteSpace:'nowrap', userSelect:'none',
          background: active ? 'rgba(228,0,109,0.1)' : undefined }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:3 }}>
          {label}
          {active ? (sortConfig.direction==='asc'?<ChevronUp size={11}/>:<ChevronDown size={11}/>)
                  : <ArrowUpDown size={10} color={P.gray}/>}
        </span>
      </th>
    );
  };

  return (
    <div style={{ minHeight:'100vh', background:'#F7F7F8', fontFamily:"'Segoe UI',system-ui,sans-serif", color:P.black }}>

      <div style={{ background:P.pink, padding:'14px 28px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        boxShadow:'0 2px 8px rgba(228,0,109,0.25)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ fontWeight:900, fontSize:22, color:P.white, letterSpacing:2,
            background:'rgba(255,255,255,0.15)', padding:'4px 14px', borderRadius:8 }}>PENTI</div>
          <div style={{ color:P.white, fontWeight:700, fontSize:15 }}>LFL Performans Paneli</div>
        </div>
        <div style={{ color:'rgba(255,255,255,0.85)', fontSize:12 }}>
          Penti Genel: <strong style={{ color:P.white }}>Ciro {overallData.ciro}% · FBT {overallData.fbt}% · GM {overallData.gm}%</strong>
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:'0 auto', padding:'20px 16px' }}>

        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18, flexWrap:'wrap', gap:10 }}>
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
                  border: crumb.active ? 'none' : '1px solid #E0E0E0',
                  background: crumb.active ? P.pink : P.white,
                  color: crumb.active ? P.white : P.grayDark,
                  cursor: crumb.onClick ? 'pointer' : 'default',
                }}>{crumb.label}</button>
              </React.Fragment>
            ))}
          </div>
          {level !== 'OM' && (
            <button onClick={handleBack} style={{
              display:'flex', alignItems:'center', gap:6, padding:'7px 16px',
              borderRadius:10, border:`1px solid ${P.pink}`, background:P.white,
              color:P.pink, fontSize:13, fontWeight:600, cursor:'pointer' }}>
              <ArrowLeft size={15}/> Geri Dön
            </button>
          )}
        </div>

        {/* KPI */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:14, marginBottom:20 }}>
          <KPICard title="Ciro"   value={currentData?.ciro} baselineValue={baselineData?.ciro} baselineLabel={baselineLabel} icon={ShoppingBag}/>
          <KPICard title="Adet"   value={currentData?.adet} baselineValue={baselineData?.adet} baselineLabel={baselineLabel} icon={Store}/>
          <KPICard title="ZS"     value={currentData?.zs}   baselineValue={baselineData?.zs}   baselineLabel={baselineLabel} icon={Users}/>
          <KPICard title="FBA %"  value={currentData?.fba}  baselineValue={baselineData?.fba}  baselineLabel={baselineLabel} icon={Percent}/>
          <KPICard title="FBT %"  value={currentData?.fbt}  baselineValue={baselineData?.fbt}  baselineLabel={baselineLabel} icon={TrendingUp}/>
          <KPICard title="GM %"   value={currentData?.gm}   baselineValue={baselineData?.gm}   baselineLabel={baselineLabel} icon={Award}/>
        </div>

        {/* Charts */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:20 }}>
          {[
            { title:'Ciro & Adet', metrics:[{key:'ciro',name:'Ciro %',color:P.pink},{key:'adet',name:'Adet %',color:P.pinkMid}] },
            { title:'ZS & FBA',    metrics:[{key:'zs',name:'ZS %',color:'#059669'},{key:'fba',name:'FBA %',color:P.blue}] },
            { title:'FBT & GM',    metrics:[{key:'fbt',name:'FBT %',color:P.purple},{key:'gm',name:'GM %',color:P.amber}] },
          ].map(chart => (
            <div key={chart.title} style={{ background:P.white, borderRadius:16, padding:18, boxShadow:'0 1px 4px rgba(0,0,0,0.07)', border:'1px solid #F0F0F0' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                <h3 style={{ margin:0, fontSize:13, fontWeight:700 }}>{chart.title}</h3>
                <span style={{ fontSize:9, background:P.pinkLight, color:P.pinkDark, padding:'2px 8px', borderRadius:20, fontWeight:600 }}>
                  {level==='OM'?'OM':'level'==='BM'?'BM':'Mağaza'}
                </span>
              </div>
              <div style={{ height:200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tableDataRaw} margin={{top:5,right:5,left:-25,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0"/>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:P.gray,fontSize:8}}
                      tickFormatter={v=>v.length>8?v.slice(0,8)+'…':v}/>
                    <YAxis axisLine={false} tickLine={false} tick={{fill:P.gray,fontSize:9}}/>
                    <Tooltip contentStyle={tooltipStyle} cursor={{fill:'#F7F7F8'}}/>
                    <Legend wrapperStyle={{paddingTop:6,fontSize:10}}/>
                    <ReferenceLine y={0} stroke="#E0E0E0"/>
                    {chart.metrics.map(m=>(
                      <Bar key={m.key} dataKey={m.key} name={m.name} fill={m.color} radius={[3,3,0,0]} maxBarSize={30}/>
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background:P.white, borderRadius:16, boxShadow:'0 1px 4px rgba(0,0,0,0.07)', border:'1px solid #F0F0F0', overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F0F0F0', background:'#FAFAFA',
            display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <h3 style={{ margin:0, fontSize:14, fontWeight:700 }}>
                {level==='OM' && 'Operasyon Müdürleri'}
                {level==='BM' && `${selectedOM} › Mağaza Müdürleri`}
                {level==='STORE' && `${selectedBM} › Mağazalar`}
              </h3>
              {level!=='STORE' && (
                <span style={{ fontSize:10, background:P.blueLight, color:P.blue, padding:'2px 10px', borderRadius:20, fontWeight:600,
                  display:'flex', alignItems:'center', gap:4 }}>
                  <MousePointerClick size={10}/> Detay için tıkla
                </span>
              )}
            </div>
            <div style={{ position:'relative' }}>
              <Search size={13} color={P.gray} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)' }}/>
              <input type="text" placeholder="İsim veya mağaza ara…" value={searchTerm}
                onChange={e=>setSearchTerm(e.target.value)}
                style={{ paddingLeft:30, paddingRight:14, paddingTop:7, paddingBottom:7,
                  border:'1px solid #E0E0E0', borderRadius:10, fontSize:12, outline:'none', width:220 }}/>
            </div>
          </div>

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr style={{ background:P.pinkLight }}>
                  <th style={{ padding:'11px 18px', textAlign:'left', fontWeight:700, fontSize:10, color:P.pinkDark, textTransform:'uppercase', letterSpacing:.5 }}>
                    {level==='OM'?'Operasyon Müdürü':level==='BM'?'Mağaza Müdürü':'Mağaza Adı'}
                  </th>
                  {level==='STORE' && <SortHeader label="TR Sıra" sortKey="sira"/>}
                  {METRICS.map(m=><SortHeader key={m} label={METRIC_LABELS[m]} sortKey={m}/>)}
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
                      <td style={{ padding:'10px 18px', fontWeight:600, whiteSpace:'nowrap' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                          {row.name}
                          {level!=='STORE' && <ChevronRight size={12} color={P.pink}/>}
                        </div>
                      </td>
                      {level==='STORE' && (
                        <td style={{ padding:'8px', textAlign:'center', verticalAlign:'middle' }}>
                          <RankBadge value={row.sira}/>
                        </td>
                      )}
                      {METRICS.map(m=>(
                        <td key={m} style={{ padding:'8px', textAlign:'center', verticalAlign:'middle' }}>
                          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                            <span style={{ fontSize:13, fontWeight:800, color:mc(row[m]) }}>{row[m]}%</span>
                            <div style={{ display:'flex', gap:4 }}>
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
                  <tr><td colSpan={level==='STORE'?10:9} style={{ padding:'40px', textAlign:'center', color:P.gray }}>Kayıt bulunamadı.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ padding:'9px 18px', borderTop:'1px solid #F0F0F0', background:'#FAFAFA',
            display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:11, color:P.gray }}>{tableData.length} kayıt</span>
            <span style={{ fontSize:10, color:P.gray }}>
              {level==='STORE' ? 'TR Sıra: Türkiye ciro sıralaması · ' : ''}
              P = Penti · OM = Op. Müd. · BM = Bölge Müd. kıyasla fark (pp)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
