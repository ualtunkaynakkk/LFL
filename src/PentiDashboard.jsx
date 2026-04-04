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
  { name:'Derya Ozturk',          ciro:13,  adet:-16, zs:-23, do:18,  fba:-7,  fbt:24, gm:2 },
  { name:'Hazel Aydemir',         ciro:8,   adet:-19, zs:-31, do:26,  fba:-6,  fbt:24, gm:2 },
  { name:'Ibrahim Emre Karasirt', ciro:14,  adet:-18, zs:-29, do:25,  fba:-7,  fbt:28, gm:3 },
];
const overallData = { ciro:11, adet:-17, zs:-28, do:23, fba:-7, fbt:25, gm:2 };
const rawBmData = `OM	BM	Ciro	Adet	ZS	DO	FBA	FBT	GM
Derya Ozturk	Aysun Cetin	1	-24	-30	14	-5	26	3
Derya Ozturk	Buse Aksu	28	1	7	0	-5	20	1
Derya Ozturk	Deniz Uysal	11	-16	-31	27	-4	26	3
Derya Ozturk	Meliha Ilhan	9	-21	-33	24	-5	31	3
Derya Ozturk	Nur Ekici Kucuk	35	2	-5	13	-5	26	2
Derya Ozturk	Ruveyda Un	-12	-34	-36	16	-11	18	4
Derya Ozturk	Taylan Yilmaz	11	-18	-21	14	-9	23	2
Hazel Aydemir	Bora Dedeoglu	-15	-39	-36	0	-4	35	3
Hazel Aydemir	Elif Sabaz	32	0	-34	59	-5	25	0
Hazel Aydemir	Fatih Sulun	0	-26	-40	33	-6	26	3
Hazel Aydemir	Mustafa Bulut	3	-26	-34	11	1	39	3
Hazel Aydemir	Pinar Beyaz	6	-26	-42	28	-1	41	5
Hazel Aydemir	Seda Urgan	12	-15	-24	24	-10	19	2
Hazel Aydemir	Umit Altunkaynak	16	-4	-13	26	-12	6	2
Ibrahim Emre Karasirt	Betul Duran	13	-15	-23	10	1	34	2
Ibrahim Emre Karasirt	Burcin Taskiran	-8	-30	-40	21	-4	28	4
Ibrahim Emre Karasirt	Emre Topcan	21	-13	-19	20	-10	25	7
Ibrahim Emre Karasirt	Esma Gul	4	-20	-21	7	-6	23	2
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	17	-11	-33	46	-9	19	1
Ibrahim Emre Karasirt	Mehmet Sena Aydin	6	-22	-37	26	-1	34	4
Ibrahim Emre Karasirt	Zehra Celik	-23	-44	-43	2	-4	32	6
Ibrahim Emre Karasirt	Zeycan Ozcan	12	-21	-35	27	-5	35	5`;
const rawStoreData = `OM	BM	Magaza	Sira	Ciro	Adet	ZS	DO	FBA	FBT	GM
Derya Ozturk	Aysun Cetin	ANKA 365 AVM	207	55	16	21	7	-10	20	3
Derya Ozturk	Aysun Cetin	ANKA ANATOLIUM	408	-51	-63	-53	8	-27	-4	-3
Derya Ozturk	Aysun Cetin	ANKA ARCADIUM AVM	52	102	33	44	1	-9	38	3
Derya Ozturk	Aysun Cetin	ANKA ARMADA	187	46	1	-7	20	-9	31	0
Derya Ozturk	Aysun Cetin	ANKA BILKENT	185	47	38	50	12	-18	-13	1
Derya Ozturk	Aysun Cetin	ANKA CEPA	74	10	-12	-12	9	-8	15	0
Derya Ozturk	Aysun Cetin	ANKA GORDION AVM	39	57	23	11	15	-3	24	-3
Derya Ozturk	Aysun Cetin	ANKA KENTPARK	19	-1	-16	-14	9	-9	7	-2
Derya Ozturk	Aysun Cetin	ANKA NATA VEGA AVM	69	-14	-38	-52	30	-1	38	3
Derya Ozturk	Aysun Cetin	ANKA NEXTLEVEL	113	110	31	23	8	-2	58	5
Derya Ozturk	Aysun Cetin	ANKA OPTIMUM	70	27	-10	-31	13	15	62	3
Derya Ozturk	Aysun Cetin	ANKA SINCAN CD	238	-29	-55	-25	-25	-19	27	12
Derya Ozturk	Aysun Cetin	ARTV ARTRIUM AVM	379	24	-23	-37	61	-24	22	7
Derya Ozturk	Aysun Cetin	CANK YUNUS	352	13	-22	-32	30	-12	27	5
Derya Ozturk	Aysun Cetin	KAST BARUT	333	23	-11	33	-39	10	52	11
Derya Ozturk	Aysun Cetin	KAST KASTAMALL AVM	199	-29	-48	-50	14	-9	25	1
Derya Ozturk	Aysun Cetin	KIRI PODIUM AVM	143	24	-32	-45	22	1	84	1
Derya Ozturk	Aysun Cetin	RIZE CUMHURIYET CD	273	13	-18	-30	14	3	42	3
Derya Ozturk	Aysun Cetin	RIZE SIMAL AVM	133	-25	-46	-45	1	-4	35	3
Derya Ozturk	Aysun Cetin	SIVA ISTASYON CD	193	9	-13	-32	20	6	33	2
Derya Ozturk	Aysun Cetin	SIVA PRIMEMALL AVM	256	-3	-35	-60	35	20	79	7
Derya Ozturk	Aysun Cetin	TOKA NOVADA AVM	107	3	-14	-18	7	-2	18	-2
Derya Ozturk	Aysun Cetin	TRAB ATAPARK	375	-19	-29	-18	-2	-11	1	1
Derya Ozturk	Aysun Cetin	TRAB CEVAHIR OUTLET AVM	343	-39	-57	-45	-10	-14	24	3
Derya Ozturk	Aysun Cetin	TRAB TRABZON FR	43	-34	-49	-52	20	-11	15	1
Derya Ozturk	Aysun Cetin	TRAB UZUN SOKAK 2	14	15	-18	-18	4	-4	35	1
Derya Ozturk	Aysun Cetin	YOZG NOVADA AVM	280	-22	-40	-59	59	-8	19	5
Derya Ozturk	Buse Aksu	ISTA ALTIYOL CD	163	41	6	1	13	-7	24	1
Derya Ozturk	Buse Aksu	ISTA BAGDAT CAD	155	51	20	24	-2	-1	24	-1
Derya Ozturk	Buse Aksu	ISTA BAHARIYE CD 2	101	59	50	10	19	15	22	-1
Derya Ozturk	Buse Aksu	ISTA ERENKOY 2	112	31	-6	9	-6	-9	27	-1
Derya Ozturk	Buse Aksu	ISTA HALITAGA CAD	358	8	1	32	-14	-12	-5	-4
Derya Ozturk	Buse Aksu	ISTA KOZZY	138	156	70	46	7	9	64	3
Derya Ozturk	Buse Aksu	ISTA MALTEPE CFR	132	7	-19	-37	30	-1	31	3
Derya Ozturk	Buse Aksu	ISTA MALTEPE PIAZZA AVM	22	-19	-33	-29	22	-22	-7	-2
Derya Ozturk	Buse Aksu	ISTA MARMARA ANATOLIUM AVM	306	20	-11	3	1	-15	16	-1
Derya Ozturk	Buse Aksu	ISTA MUHURDAR CD	260	134	53	21	23	3	58	3
Derya Ozturk	Buse Aksu	ISTA OPTIMUM	156	2	-24	-39	33	-6	27	0
Derya Ozturk	Buse Aksu	ISTA PALLADIUM 2	97	109	75	-6	78	4	25	2
Derya Ozturk	Buse Aksu	ISTA RITIM ISTANBUL AVM	247	186	118	90	11	4	36	-1
Derya Ozturk	Buse Aksu	ISTA SASKINBAKKAL CD	386	-20	-23	-47	85	-21	-18	3
Derya Ozturk	Buse Aksu	ISTA YAYLADA AVM	243	96	40	16	7	13	58	3
Derya Ozturk	Deniz Uysal	ISTA GAZIPASA CD	186	5	-11	-23	38	-16	-1	-1
Derya Ozturk	Deniz Uysal	ISTA MALTEPE CAD	210	88	30	32	-14	14	65	6
Derya Ozturk	Deniz Uysal	ISTA MARINA	87	53	12	-30	45	10	50	0
Derya Ozturk	Deniz Uysal	ISTA NEOMARIN	227	24	-24	-39	35	-8	51	4
Derya Ozturk	Deniz Uysal	ISTA PENDIK 19 MAYIS CD	233	15	-10	-27	43	-14	9	-2
Derya Ozturk	Deniz Uysal	ISTA RINGS AVM	239	140	70	26	14	19	68	9
Derya Ozturk	Deniz Uysal	ISTA SARIGAZI CD	259	35	15	34	1	-15	0	-7
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI ATLAS	248	6	-36	-45	35	-13	45	4
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI PLATO	398	-64	-70	-49	-40	-2	19	12
Derya Ozturk	Deniz Uysal	ISTA TUZLA MARINA AVM	99	41	5	17	-14	4	40	1
Derya Ozturk	Deniz Uysal	ISTA TUZLAPORT AVM	245	88	43	-100	-100	-11	17	-1
Derya Ozturk	Deniz Uysal	ISTA VIAPORT	82	-24	-40	-42	37	-24	-4	6
Derya Ozturk	Deniz Uysal	ISTA VIAPORT 2	162	5	-18	-45	43	4	32	0
Derya Ozturk	Deniz Uysal	KOCA GEBZECENTER	34	12	-20	-45	59	-9	28	0
Derya Ozturk	Deniz Uysal	KOCA OKSIJEN SHOPINN AVM	412	-67	-77	-67	-4	-27	5	7
Derya Ozturk	Deniz Uysal	YALO GAZIPASA CD	184	74	42	12	24	3	26	-1
Derya Ozturk	Deniz Uysal	YALO STAR AVM	217	-36	-38	-36	-2	-2	1	-3
Derya Ozturk	Deniz Uysal	YALO YALOVA KIPA	390	-47	-46	-42	2	-9	-11	5
Derya Ozturk	Meliha Ilhan	AKSA EFOR	152	25	-11	-39	21	22	70	3
Derya Ozturk	Meliha Ilhan	ANKA ACITY	229	-25	-49	-55	25	-9	35	6
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL	31	-10	-24	-33	43	-21	-6	1
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL 2	18	37	7	-33	53	4	33	-1
Derya Ozturk	Meliha Ilhan	ANKA ANKARA FR	100	35	-18	-48	53	2	68	2
Derya Ozturk	Meliha Ilhan	ANKA ANTARES	63	0	-18	-24	13	-4	17	0
Derya Ozturk	Meliha Ilhan	ANKA ATAKULE AVM	181	39	-5	11	-24	14	66	2
Derya Ozturk	Meliha Ilhan	ANKA ATLANTIS	56	92	15	-35	76	1	67	4
Derya Ozturk	Meliha Ilhan	ANKA FTZ AVM	338	80	21	-8	19	10	63	3
Derya Ozturk	Meliha Ilhan	ANKA KIZLAR PINARI CD	0	-100	-100	-100	-100	-100	-100	-41
Derya Ozturk	Meliha Ilhan	ANKA KUZUEFFECT AVM	361	16	-35	-3	1	-34	17	0
Derya Ozturk	Meliha Ilhan	ANKA ONE TOWER AVM	342	83	23	19	1	3	52	1
Derya Ozturk	Meliha Ilhan	ANKA PANORA	58	78	32	-5	38	2	37	2
Derya Ozturk	Meliha Ilhan	ANKA PODIUM AVM	189	-3	-31	-41	39	-16	18	-3
Derya Ozturk	Meliha Ilhan	ANKA TAURUS	206	0	-4	0	-6	2	7	-1
Derya Ozturk	Meliha Ilhan	ANKA VEGA SUBAYEVLERI AVM	252	-13	-35	-45	24	-5	26	4
Derya Ozturk	Meliha Ilhan	KAYS ILDEM AVM	369	-20	-53	-49	18	-21	34	7
Derya Ozturk	Meliha Ilhan	KAYS KAYSERI FR	20	16	-26	-21	-12	6	66	4
Derya Ozturk	Meliha Ilhan	KAYS KAYSERIPARK	122	11	-13	-35	39	-3	24	0
Derya Ozturk	Meliha Ilhan	KAYS KUMSMALL AVM	378	-11	-39	-56	52	-10	32	6
Derya Ozturk	Meliha Ilhan	KAYS MEYSU AVM	377	-37	-51	-68	40	8	40	-3
Derya Ozturk	Meliha Ilhan	NEVS KAPADOKYA FR	348	-35	-54	-51	-5	-1	40	4
Derya Ozturk	Meliha Ilhan	NEVS NISSARA AVM	169	98	24	-15	21	21	93	2
Derya Ozturk	Meliha Ilhan	NIGD NIGDE CD	329	-32	-46	-100	-100	-10	12	0
Derya Ozturk	Nur Ekici Kucuk	ISTA AKASYA AVM	40	-14	-27	-16	7	-18	-3	2
Derya Ozturk	Nur Ekici Kucuk	ISTA AKYAKA PARK	297	-19	-33	-42	29	-10	8	4
Derya Ozturk	Nur Ekici Kucuk	ISTA ALEMDAG CD	104	4	-20	-10	-1	-10	17	1
Derya Ozturk	Nur Ekici Kucuk	ISTA ALEMDAG CD2	208	25	-11	80	-46	-10	27	4
Derya Ozturk	Nur Ekici Kucuk	ISTA BRANDIUM	168	7	-33	7	-38	1	62	23
Derya Ozturk	Nur Ekici Kucuk	ISTA BUYAKA	84	-2	-21	-45	38	5	29	-2
Derya Ozturk	Nur Ekici Kucuk	ISTA CANPARK AVM	134	68	11	-10	16	6	60	2
Derya Ozturk	Nur Ekici Kucuk	ISTA CAPITOL	91	91	35	18	30	-12	24	3
Derya Ozturk	Nur Ekici Kucuk	ISTA EMAAR SQUARE AVM	10	8	-6	-32	38	-1	15	-1
Derya Ozturk	Nur Ekici Kucuk	ISTA ICERENKOY CFR	88	77	32	43	9	-16	13	2
Derya Ozturk	Nur Ekici Kucuk	ISTA METROGARDEN AVM	48	65	19	-8	35	-4	33	3
Derya Ozturk	Nur Ekici Kucuk	ISTA METROPOL AVM	75	56	2	-1	24	-17	26	2
Derya Ozturk	Nur Ekici Kucuk	ISTA NAUTILUS	95	102	30	-15	41	8	68	8
Derya Ozturk	Nur Ekici Kucuk	ISTA NEV CARSI AVM	274	64	5	-6	34	-17	29	5
Derya Ozturk	Nur Ekici Kucuk	ISTA UMR MEYDAN	111	5	-15	-30	22	0	23	2
Derya Ozturk	Nur Ekici Kucuk	ISTA WATER GARDEN AVM	165	93	53	27	51	-19	1	4
Derya Ozturk	Ruveyda Un	BOLU 14 BURDA AVM	282	-13	-23	-39	41	-10	1	2
Derya Ozturk	Ruveyda Un	BOLU CADDE AVM	148	50	-2	1	4	-7	43	8
Derya Ozturk	Ruveyda Un	BOLU HIGHWAY	367	-76	-77	-86	66	-2	4	3
Derya Ozturk	Ruveyda Un	DUZC KREMPARK	180	12	-19	-26	16	-7	30	2
Derya Ozturk	Ruveyda Un	KOCA 41 BURDA AVM	45	-27	-37	8	-32	-14	-1	1
Derya Ozturk	Ruveyda Un	KOCA ARASTAPARK AVM	150	50	5	12	13	-17	19	0
Derya Ozturk	Ruveyda Un	KOCA HURRIYET CD	44	30	-2	17	-13	-3	28	5
Derya Ozturk	Ruveyda Un	KOCA ISTIKLAL CD	173	7	-16	-1	5	-19	3	2
Derya Ozturk	Ruveyda Un	KOCA IZMIT OUTLET CENTER	164	-38	-55	-65	51	-15	18	-1
Derya Ozturk	Ruveyda Un	KOCA SYMBOL AVM	127	27	-9	-23	28	-8	28	-6
Derya Ozturk	Ruveyda Un	SAKA 54 CADDE AVM	128	13	-23	-63	109	0	46	2
Derya Ozturk	Ruveyda Un	SAKA ADAPAZARI AGORA	308	44	20	-26	62	0	21	-1
Derya Ozturk	Ruveyda Un	SAKA CARK CD	144	-11	-45	-26	-12	-16	37	8
Derya Ozturk	Ruveyda Un	SAKA KARASU CD	355	-46	-61	-59	15	-16	15	-3
Derya Ozturk	Ruveyda Un	SAKA NG SAPANCA AVM	372	-50	-64	-49	-9	-22	8	-2
Derya Ozturk	Ruveyda Un	SAKA SERDIVAN	118	-9	-37	-43	25	-13	27	2
Derya Ozturk	Ruveyda Un	SAKARYA ADA CENTER	295	-39	-60	-63	1	8	66	18
Derya Ozturk	Taylan Yilmaz	ANKA 7. CD	62	53	19	24	13	-15	9	4
Derya Ozturk	Taylan Yilmaz	ANKA CEMAL GURSEL CD	108	161	94	91	-10	13	52	2
Derya Ozturk	Taylan Yilmaz	ANKA IZMIR CD	226	50	16	50	-14	-10	16	2
Derya Ozturk	Taylan Yilmaz	ANKA KARTALTEPE AVM	404	-70	-82	-71	12	-46	-7	11
Derya Ozturk	Taylan Yilmaz	ANKA KASMIR AVM	197	62	17	22	2	-6	30	3
Derya Ozturk	Taylan Yilmaz	ANKA KIZILAY 1	24	104	67	31	29	-1	21	-3
Derya Ozturk	Taylan Yilmaz	ANKA KIZILAY MEYDAN	46	171	98	122	-13	2	40	-2
Derya Ozturk	Taylan Yilmaz	ANKA METROMALL AVM	25	-20	-36	-39	34	-21	-3	1
Derya Ozturk	Taylan Yilmaz	ANKA TUNALI HILMI CD 2	29	121	33	30	9	-7	55	6
Derya Ozturk	Taylan Yilmaz	BART BARTIN CD	196	56	15	-4	34	-12	20	-2
Derya Ozturk	Taylan Yilmaz	ESKI DOKTORLAR CD 2	76	96	22	22	-9	9	76	6
Derya Ozturk	Taylan Yilmaz	ESKI ESPARK	17	-3	-25	-25	5	-5	24	-1
Derya Ozturk	Taylan Yilmaz	ESKI VEGA OUTLET AVM	154	26	-13	-28	30	-7	35	-2
Derya Ozturk	Taylan Yilmaz	KARA KARAMANPARK	353	-27	-50	-56	15	-1	43	6
Derya Ozturk	Taylan Yilmaz	KARB KARES	268	3	-20	-32	10	6	38	1
Derya Ozturk	Taylan Yilmaz	KONY ENNTEPE AVM	224	-4	-30	-34	19	-10	23	-2
Derya Ozturk	Taylan Yilmaz	KONY EREGLI PARK AVM	365	-68	-75	-60	-34	-6	20	0
Derya Ozturk	Taylan Yilmaz	KONY KENT PLAZA	135	-9	-33	-39	12	-1	34	-1
Derya Ozturk	Taylan Yilmaz	KONY KULESITE	126	18	-20	-27	23	-11	31	6
Derya Ozturk	Taylan Yilmaz	KONY M1 AVM	115	42	-6	-30	35	0	51	0
Derya Ozturk	Taylan Yilmaz	KONY NOVADA AVM	399	-54	-61	-57	11	-19	-3	4
Derya Ozturk	Taylan Yilmaz	ZONG 67 BURDA AVM	131	-33	-56	-63	39	-15	29	3
Derya Ozturk	Taylan Yilmaz	ZONG EREGLI OZDEMIR AVM	172	25	-21	-31	15	-1	58	0
Derya Ozturk	Taylan Yilmaz	ZONG EREYLIN AVM	349	40	14	-24	70	-12	9	-1
Hazel Aydemir	Bora Dedeoglu	AMAS AMASYA PARK AVM	264	-2	-42	-44	-15	21	106	13
Hazel Aydemir	Bora Dedeoglu	CORU AHL AVM	61	9	-29	-46	34	-1	51	4
Hazel Aydemir	Bora Dedeoglu	CORU GAZI CD	309	26	-14	-23	15	-3	42	4
Hazel Aydemir	Bora Dedeoglu	GIRE GAZI CADDESI	347	-31	-40	-24	-14	-8	5	-3
Hazel Aydemir	Bora Dedeoglu	GIRE INONU CD	195	4	-32	-42	24	-4	46	2
Hazel Aydemir	Bora Dedeoglu	ORDU FATSA	320	-36	-54	-55	20	-14	20	1
Hazel Aydemir	Bora Dedeoglu	ORDU NOVADA AVM	263	-24	-45	-7	-30	-16	16	4
Hazel Aydemir	Bora Dedeoglu	ORDU SIRRIPASA CD	171	-31	-50	-45	-1	-8	26	0
Hazel Aydemir	Bora Dedeoglu	ORDU UNYE UNIPORT AVM	296	-5	-35	-46	20	1	48	1
Hazel Aydemir	Bora Dedeoglu	SAMS BAFRA CELIKPARK AVM	303	-40	-57	-56	7	-9	27	-2
Hazel Aydemir	Bora Dedeoglu	SAMS BULVAR	94	18	-18	-12	-12	6	52	6
Hazel Aydemir	Bora Dedeoglu	SAMS CIFTLIK CD 2	223	-3	-37	-25	-5	-11	37	6
Hazel Aydemir	Bora Dedeoglu	SAMS CITYMALL AVM	0	-100	-100	0	0	-100	-100	-51
Hazel Aydemir	Bora Dedeoglu	SAMS LOVELET	272	-37	-43	-76	89	26	40	2
Hazel Aydemir	Bora Dedeoglu	SAMS PIAZZA	35	-33	-54	-54	2	-2	43	0
Hazel Aydemir	Bora Dedeoglu	SAMS YESILYURT	33	110	31	-2	25	7	71	1
Hazel Aydemir	Bora Dedeoglu	SINO SAKARYA CD	299	-26	-43	-35	17	-24	-2	0
Hazel Aydemir	Elif Sabaz	ISTT AKBATI	42	-7	-21	-37	37	-9	7	1
Hazel Aydemir	Elif Sabaz	ISTT ATIRUS AVM	307	155	74	13	49	3	51	1
Hazel Aydemir	Elif Sabaz	ISTT AVENUA AVM	158	50	-2	15	-9	-6	43	-1
Hazel Aydemir	Elif Sabaz	ISTT BEYLIKDUZU MGR	205	55	-16	-100	-100	-8	70	5
Hazel Aydemir	Elif Sabaz	ISTT CENNET CD 2	119	74	17	-100	-100	-8	36	3
Hazel Aydemir	Elif Sabaz	ISTT ESENYURT CITY CENTER AVM	220	50	20	-42	96	6	32	6
Hazel Aydemir	Elif Sabaz	ISTT MARMARA CAD	291	38	-2	-11	24	-12	24	5
Hazel Aydemir	Elif Sabaz	ISTT MARMARAPARK	4	-6	-20	-43	47	-5	11	-4
Hazel Aydemir	Elif Sabaz	ISTT MIMAROBA DIA MARE CD	98	108	84	58	16	1	14	0
Hazel Aydemir	Elif Sabaz	ISTT PELICAN	188	-4	-33	-31	23	-21	14	4
Hazel Aydemir	Elif Sabaz	ISTT PERLAVISTA AVM	345	39	-3	3	2	-9	31	4
Hazel Aydemir	Elif Sabaz	ISTT SILIVRI KIP	400	-3	-27	-42	27	-2	31	5
Hazel Aydemir	Elif Sabaz	ISTT SILIVRI MAXI	356	-34	-34	-54	50	-5	-4	-6
Hazel Aydemir	Elif Sabaz	ISTT TORIUM	167	-2	-23	-20	18	-19	3	-1
Hazel Aydemir	Fatih Sulun	BALI BANDIRMA LIMAN	137	-20	-31	-39	37	-17	-4	-2
Hazel Aydemir	Fatih Sulun	BILE BOZUYUK SARAR	294	-56	-72	-76	26	-6	46	3
Hazel Aydemir	Fatih Sulun	BURS AHMET TANER KISLALI CD	86	122	49	50	5	-5	42	4
Hazel Aydemir	Fatih Sulun	BURS ANATOLIUM	271	-14	-38	-55	37	0	39	-1
Hazel Aydemir	Fatih Sulun	BURS AS OUTLET AVM	327	-55	-58	-85	221	-11	-5	0
Hazel Aydemir	Fatih Sulun	BURS ATABULVARI CD	67	171	76	86	4	-9	41	-3
Hazel Aydemir	Fatih Sulun	BURS DOWNTOWN AVM	364	-57	-68	-68	18	-17	13	8
Hazel Aydemir	Fatih Sulun	BURS GORUKLE CAD	218	79	30	62	-8	-12	21	3
Hazel Aydemir	Fatih Sulun	BURS INEGOL	216	23	-22	-35	31	-8	46	3
Hazel Aydemir	Fatih Sulun	BURS KENT MEYDANI	81	4	-20	-39	37	-5	24	1
Hazel Aydemir	Fatih Sulun	BURS KORUPARK	11	34	5	-26	41	1	29	-1
Hazel Aydemir	Fatih Sulun	BURS OKSIJEN SHOPINN AVM	385	-22	-60	-70	25	6	106	3
Hazel Aydemir	Fatih Sulun	BURS OZDILEKPARK AVM	123	25	-1	-25	44	-8	16	2
Hazel Aydemir	Fatih Sulun	BURS PARKUR AVM	326	-38	-50	-66	43	1	27	4
Hazel Aydemir	Fatih Sulun	BURS SUR YAPI MARKA AVM	9	10	-15	-36	46	-8	19	0
Hazel Aydemir	Fatih Sulun	BURS ZAFER PLAZA	103	18	-9	-27	25	-1	29	3
Hazel Aydemir	Mustafa Bulut	ADIY ADIYAMAN PARK AVM	237	-3	-33	-44	0	19	73	3
Hazel Aydemir	Mustafa Bulut	BATM BATMAN PARK	371	7	-2	-32	14	26	38	-3
Hazel Aydemir	Mustafa Bulut	BATM PETROL CITY AVM	219	59	-4	-17	12	3	71	2
Hazel Aydemir	Mustafa Bulut	BING KALIUM AVM	389	-28	-43	-32	-19	4	31	6
Hazel Aydemir	Mustafa Bulut	DIYA 75 METRE CD	176	43	-2	0	-4	2	49	4
Hazel Aydemir	Mustafa Bulut	DIYA CEYLANPARK AVM	85	-1	-28	-28	-3	4	44	-1
Hazel Aydemir	Mustafa Bulut	DIYA FORUM AVM	83	14	-22	-34	23	-4	40	0
Hazel Aydemir	Mustafa Bulut	ELAZ ELAZIG PARK23	222	17	-15	-48	55	6	46	7
Hazel Aydemir	Mustafa Bulut	ELAZ ELYSIUM AVM	105	-16	-27	-48	41	0	16	1
Hazel Aydemir	Mustafa Bulut	GAZI G.ANTEP FR	182	2	-42	-47	1	9	92	8
Hazel Aydemir	Mustafa Bulut	GAZI GAZIMUHTAR	302	59	30	34	-13	11	35	6
Hazel Aydemir	Mustafa Bulut	GAZI M1 OUTLET	354	-60	-72	-69	26	-29	1	7
Hazel Aydemir	Mustafa Bulut	GAZI PRIME MALL	68	35	-11	-35	35	2	55	3
Hazel Aydemir	Mustafa Bulut	GAZI SANKOPARK	92	38	8	0	23	57	0	0
Hazel Aydemir	Mustafa Bulut	KAHR PIAZZA	72	-26	-48	-50	18	-12	26	2
Hazel Aydemir	Mustafa Bulut	MALA MALATYAPARK	49	1	-34	-36	-1	5	60	2
Hazel Aydemir	Mustafa Bulut	MARD MARDIAN MALL	139	-8	-22	-8	-15	0	18	1
Hazel Aydemir	Mustafa Bulut	MARD MOVAPARK	340	129	48	-24	59	22	89	-2
Hazel Aydemir	Mustafa Bulut	SANL URFA NOVADA AVM	384	-11	-26	-27	1	1	21	2
Hazel Aydemir	Mustafa Bulut	SANL URFA PIAZZA	246	-6	-16	-50	92	-12	-2	0
Hazel Aydemir	Mustafa Bulut	SANL URFACITY	242	67	11	-20	34	4	56	-3
Hazel Aydemir	Mustafa Bulut	SIIR SIIRT PARK AVM	300	-27	-32	-35	13	-7	0	-4
Hazel Aydemir	Mustafa Bulut	SIRN CIZRE PARK AVM	323	5	-31	-57	33	20	83	1
Hazel Aydemir	Pinar Beyaz	ADAN 01 BURDA AVM	278	-35	-54	-60	37	-16	18	2
Hazel Aydemir	Pinar Beyaz	ADAN BARAJ YOLU CAD	151	45	11	-16	13	17	53	7
Hazel Aydemir	Pinar Beyaz	ADAN CAKMAK CD	281	-1	-40	-30	14	-24	26	13
Hazel Aydemir	Pinar Beyaz	ADAN KENAN EVREN BLV	147	62	21	12	7	0	35	2
Hazel Aydemir	Pinar Beyaz	ADAN M1 AVM	16	-10	-40	-46	15	-3	45	4
Hazel Aydemir	Pinar Beyaz	ADAN OPTIMUM	15	-19	-43	-49	18	-5	36	3
Hazel Aydemir	Pinar Beyaz	ADAN TURKMENBASI CD	78	49	10	26	-8	-6	28	1
Hazel Aydemir	Pinar Beyaz	HATA ANTAKYA YUZUNCU YIL AVM	331	62	23	-56	202	-7	23	1
Hazel Aydemir	Pinar Beyaz	HATA ISK PRIMEMALL	30	-5	-36	-56	39	6	58	3
Hazel Aydemir	Pinar Beyaz	HATA ISKENDERUN PARK FORBES AV	177	-8	-34	-44	22	-4	33	5
Hazel Aydemir	Pinar Beyaz	MERS MERSIN CFR	106	54	-6	-34	35	5	72	3
Hazel Aydemir	Pinar Beyaz	MERS MERSIN FR	26	-7	-43	-41	6	-9	50	6
Hazel Aydemir	Pinar Beyaz	MERS NOVADA ERDEMLI AVM	212	-10	-34	-52	60	-14	17	5
Hazel Aydemir	Pinar Beyaz	MERS SAYAPARK AVM	64	67	1	-33	46	3	71	2
Hazel Aydemir	Pinar Beyaz	MERS SILIFKE CD	209	7	-18	-45	28	16	51	5
Hazel Aydemir	Pinar Beyaz	MERS TARSU	159	-16	-43	-56	19	8	59	7
Hazel Aydemir	Pinar Beyaz	OSMA 328 AVM	125	2	-29	-55	44	10	57	5
Hazel Aydemir	Seda Urgan	CANA 17 BURDA AVM	32	22	2	-21	26	2	22	-2
Hazel Aydemir	Seda Urgan	CANA CANAKKALE CARSI CD	267	28	34	22	15	-5	-9	-1
Hazel Aydemir	Seda Urgan	CANA CANAKKALE KIP	344	45	3	-18	17	7	51	1
Hazel Aydemir	Seda Urgan	EDIR ERASTA AVM	116	-1	-22	-32	62	-29	-10	-2
Hazel Aydemir	Seda Urgan	EDIR KESAN KIPA AVM	360	-33	-42	-57	24	10	26	3
Hazel Aydemir	Seda Urgan	EDIR MARGI	140	45	5	5	20	-17	15	7
Hazel Aydemir	Seda Urgan	EDIR SARACLAR CD	393	-2	-38	48	-22	-46	-15	-5
Hazel Aydemir	Seda Urgan	KIRK 39 BURDA AVM	258	6	-32	-42	24	-6	47	4
Hazel Aydemir	Seda Urgan	KIRK KIRKLARELI CD	204	58	17	42	1	-18	10	2
Hazel Aydemir	Seda Urgan	KIRK LULEBURGAZ ISTANBUL CD	322	36	-1	32	10	-32	-7	-2
Hazel Aydemir	Seda Urgan	TEKI CERKEZKOY KIPA	202	13	-21	-38	26	1	45	4
Hazel Aydemir	Seda Urgan	TEKI CORLU OMURTAK CD	325	8	-16	-5	0	-11	15	3
Hazel Aydemir	Seda Urgan	TEKI ORION CORLU	121	30	-20	-25	30	-18	33	4
Hazel Aydemir	Seda Urgan	TEKI TEKIRA	79	25	-12	-36	33	4	47	5
Hazel Aydemir	Umit Altunkaynak	ISTT AKMERKEZ	191	111	114	79	7	12	10	-1
Hazel Aydemir	Umit Altunkaynak	ISTT AVLU 34 AVM	285	11	-29	-25	-6	0	57	8
Hazel Aydemir	Umit Altunkaynak	ISTT BESIKTAS CD	0	-100	-100	-100	-100	-100	-100	-55
Hazel Aydemir	Umit Altunkaynak	ISTT CEVAHIR	1	17	10	9	14	-12	-6	0
Hazel Aydemir	Umit Altunkaynak	ISTT GALATASARAY	102	-19	-35	-19	3	-22	-2	4
Hazel Aydemir	Umit Altunkaynak	ISTT GOKTURK IST CD2	110	28	35	109	4	-37	-41	-8
Hazel Aydemir	Umit Altunkaynak	ISTT HALASKARGAZI CD	311	14	12	18	8	-12	-10	-4
Hazel Aydemir	Umit Altunkaynak	ISTT HAVALIMANI IC HATLAR	192	33	-5	-20	36	-12	22	6
Hazel Aydemir	Umit Altunkaynak	ISTT HISTORIA	160	23	-22	-6	-13	-4	50	2
Hazel Aydemir	Umit Altunkaynak	ISTT ISTIKLAL AVM	346	-8	-11	-29	29	-3	0	3
Hazel Aydemir	Umit Altunkaynak	ISTT ISTINYEPARK	2	-8	-17	-30	33	-10	-1	-3
Hazel Aydemir	Umit Altunkaynak	ISTT KAGITHANE AXIS AVM	236	65	10	-17	44	-7	38	-4
Hazel Aydemir	Umit Altunkaynak	ISTT KANYON AVM	120	117	72	71	13	-11	12	2
Hazel Aydemir	Umit Altunkaynak	ISTT NISANTASI CD	6	26	27	30	16	-16	-16	1
Hazel Aydemir	Umit Altunkaynak	ISTT NISANTASI CITYS AVM	253	23	13	-40	83	2	11	0
Hazel Aydemir	Umit Altunkaynak	ISTT ORTABAHCE CD	175	26	2	-100	-100	-16	4	-2
Hazel Aydemir	Umit Altunkaynak	ISTT ORTAKOY CD	334	2	-26	9	1	-33	-8	-1
Hazel Aydemir	Umit Altunkaynak	ISTT OZDILEK AVM	41	62	40	-12	67	-5	10	-3
Hazel Aydemir	Umit Altunkaynak	ISTT SARIYER CD	211	92	39	80	-20	-3	34	4
Hazel Aydemir	Umit Altunkaynak	ISTT SISLI CD	231	103	52	25	16	5	40	3
Hazel Aydemir	Umit Altunkaynak	ISTT TAKSIM CADDE	47	-43	-54	1	-37	-27	-10	4
Hazel Aydemir	Umit Altunkaynak	ISTT TRUMP TOWERS	145	118	75	-100	-100	13	41	1
Hazel Aydemir	Umit Altunkaynak	ISTT VADI ISTANBUL AVM	13	5	-9	-20	41	-19	-6	-2
Hazel Aydemir	Umit Altunkaynak	ISTT VALIKONAGI CD	315	32	33	53	4	-16	-17	-1
Hazel Aydemir	Umit Altunkaynak	ISTT ZORLU AVM	53	52	22	-11	44	-5	18	1
Hazel Aydemir	Umit Altunkaynak	VAN VAN AVM	170	-16	-39	-32	-7	-4	33	3
Hazel Aydemir	Umit Altunkaynak	VAN VANMALL AVM	381	-35	-48	-67	97	-20	0	4
Ibrahim Emre Karasirt	Betul Duran	ANTA AKDENIZ PARK AVM	261	40	-4	0	0	7	56	2
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYA TIME CENTER	406	175	80	-20	25	80	175	-2
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYA UYGUN CENTER AVM	114	37	-6	58	-28	-17	21	6
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYUM	136	51	5	-34	33	19	71	3
Ibrahim Emre Karasirt	Betul Duran	ANTA ANTALYA KAS	403	-33	-40	-70	95	4	17	-3
Ibrahim Emre Karasirt	Betul Duran	ANTA ANTALYA MGR	38	34	3	-39	69	0	29	1
Ibrahim Emre Karasirt	Betul Duran	ANTA ATATURK CD	149	46	0	-1	3	-3	42	2
Ibrahim Emre Karasirt	Betul Duran	ANTA BOSTANCIPINARI CD	395	-20	-36	9	-29	-17	4	-2
Ibrahim Emre Karasirt	Betul Duran	ANTA ERASTA	89	82	20	0	23	-2	48	2
Ibrahim Emre Karasirt	Betul Duran	ANTA G-MALL CARREFOURSA AVM	214	210	89	65	2	12	84	-1
Ibrahim Emre Karasirt	Betul Duran	ANTA KEMER CADDE	397	60	33	27	-9	15	39	7
Ibrahim Emre Karasirt	Betul Duran	ANTA KUMLUCA CD	332	15	-20	-14	-13	7	53	2
Ibrahim Emre Karasirt	Betul Duran	ANTA LAND OF LEGENDS	288	-13	-19	-16	-3	-1	7	2
Ibrahim Emre Karasirt	Betul Duran	ANTA MALL OF ANTALYA AVM	50	-9	-30	-46	36	-4	25	-3
Ibrahim Emre Karasirt	Betul Duran	ANTA MANAVGAT NOVA MALL	213	-28	-45	-42	13	-15	11	-4
Ibrahim Emre Karasirt	Betul Duran	ANTA MANAVGATCITY AVM	0	-100	-100	-100	-100	-100	-100	-59
Ibrahim Emre Karasirt	Betul Duran	ANTA MARKANTALYA AVM	27	20	-9	-23	12	5	39	-1
Ibrahim Emre Karasirt	Betul Duran	ANTA OZDILEKPARK	93	-12	-34	-33	-1	-1	31	5
Ibrahim Emre Karasirt	Betul Duran	ANTA SHEMALL	146	65	33	40	19	-20	-1	3
Ibrahim Emre Karasirt	Betul Duran	ANTA TERRACITY	51	16	-21	-23	-7	10	62	0
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODR CUMH.CD	407	20	-20	-58	45	30	97	-2
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODR OASIS	362	-33	-43	-8	-11	-31	-17	-1
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODRUM AVENUE AVM	183	55	9	48	-21	-6	32	2
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL CADDE	391	90	13	6	3	3	73	2
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL DATCA CAD	396	-20	-48	-17	-18	-24	18	7
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL ERASTA AVM	77	-15	-38	-53	32	0	37	2
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FESTIVA AVM	316	64	-4	-10	33	-19	38	9
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FETHIYE CARSI CD	241	62	21	-15	24	15	54	1
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FETHIYE GOCEK CD	388	-2	-33	-28	1	-9	34	-3
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MARMARIS	382	29	-21	5	-13	-14	42	6
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MARMARIS ATATURK CD	337	42	-11	1	-1	-11	42	-1
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MIDTOWN	289	-33	-45	-51	19	-5	15	4
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL POMELON AVM	234	148	78	8	39	19	65	0
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL RUYA 48 OUTLET	368	-66	-72	-100	-100	-25	-9	1
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL RUYAPARK AVM	350	19	-12	-26	15	4	40	5
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL TURGUTREIS AVM	339	-15	-27	-57	71	-1	16	2
Ibrahim Emre Karasirt	Emre Topcan	ISTT AIRPORT AVM	304	100	61	14	50	-6	16	-1
Ibrahim Emre Karasirt	Emre Topcan	ISTT AQUA FLORYA AVM	90	-16	-32	-39	29	-13	7	-1
Ibrahim Emre Karasirt	Emre Topcan	ISTT ATAKOY A PLUS AVM	257	49	14	8	8	-2	28	1
Ibrahim Emre Karasirt	Emre Topcan	ISTT CAPACITY	21	46	19	1	27	-7	13	-3
Ibrahim Emre Karasirt	Emre Topcan	ISTT CAROUSEL	301	27	-16	-7	3	-12	33	7
Ibrahim Emre Karasirt	Emre Topcan	ISTT EYUP AXIS AVM	287	111	32	-16	47	6	71	6
Ibrahim Emre Karasirt	Emre Topcan	ISTT FLYINN AVM	366	63	31	-57	160	18	47	4
Ibrahim Emre Karasirt	Emre Topcan	ISTT GUNESLIPARK	318	40	-2	-30	72	-18	17	6
Ibrahim Emre Karasirt	Emre Topcan	ISTT ISTANBUL FR	8	0	-16	-12	11	-14	2	0
Ibrahim Emre Karasirt	Emre Topcan	ISTT ISTASYON CD	73	42	7	4	0	2	36	2
Ibrahim Emre Karasirt	Emre Topcan	ISTT KALE AVM	174	-36	-74	-49	13	-55	10	72
Ibrahim Emre Karasirt	Emre Topcan	ISTT MARMARA FR	12	51	18	-12	21	11	42	-3
Ibrahim Emre Karasirt	Emre Topcan	ISTT METROPORT	117	157	64	20	20	14	79	2
Ibrahim Emre Karasirt	Emre Topcan	ISTT OLIVIUM	293	-38	-59	-62	19	-8	39	8
Ibrahim Emre Karasirt	Emre Topcan	ISTT SIRINEVLER CAD	141	145	77	36	16	12	55	-1
Ibrahim Emre Karasirt	Emre Topcan	ISTT STARCITY	203	-39	-56	-46	14	-28	0	5
Ibrahim Emre Karasirt	Esma Gul	AFYO AFIUM	221	-51	-62	-61	13	-15	11	4
Ibrahim Emre Karasirt	Esma Gul	AFYO AFYONPARK AVM	157	-23	-50	-38	-7	-14	33	2
Ibrahim Emre Karasirt	Esma Gul	BURD GAZI CD	298	80	67	38	30	-7	0	-1
Ibrahim Emre Karasirt	Esma Gul	DENI AQUAMALL AVM	269	16	-17	-44	53	-3	35	-1
Ibrahim Emre Karasirt	Esma Gul	DENI CAMLIK FR	28	14	-3	-35	48	0	19	-4
Ibrahim Emre Karasirt	Esma Gul	DENI CINAR CD	235	42	14	2	14	-2	22	-6
Ibrahim Emre Karasirt	Esma Gul	DENI HORIZON AVM	374	-46	-46	-44	34	-28	-28	-3
Ibrahim Emre Karasirt	Esma Gul	DENI TERASPARK	225	6	-32	-50	41	-3	50	5
Ibrahim Emre Karasirt	Esma Gul	ISPA CARSI	410	32	-1	38	-18	-13	16	0
Ibrahim Emre Karasirt	Esma Gul	ISPA CENTRIUM GARDEN	359	45	6	-5	14	-2	34	4
Ibrahim Emre Karasirt	Esma Gul	ISPA IYAS	109	9	-21	-14	-2	-6	31	1
Ibrahim Emre Karasirt	Esma Gul	ISPA MEYDAN AVM	240	-27	-46	-42	-7	-1	35	5
Ibrahim Emre Karasirt	Esma Gul	KUTA SERA	178	9	-30	-34	27	-16	30	0
Ibrahim Emre Karasirt	Esma Gul	USAK FESTIVA	255	16	-13	-37	17	17	56	7
Ibrahim Emre Karasirt	Esma Gul	USAK ISMETPASA CAD	312	68	24	47	-2	-14	17	0
Ibrahim Emre Karasirt	Esma Gul	USAK KARUN AVM	66	157	79	-100	-100	-6	35	-5
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZI ERZINCANPARK AVM	392	-7	-37	-45	-2	17	71	3
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZU ERZURUMAVM	394	-18	-32	-28	13	-16	1	-1
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZU MNG MALL AVM	153	-4	-33	-27	-5	-3	39	1
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT 212AVM	198	-39	-59	-63	39	-20	19	3
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ARENAPARK	57	63	8	25	-5	-9	38	5
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ARMONIPARK	161	83	5	0	23	-15	49	0
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT BASAKSEHIR	405	-30	-40	-6	-7	-32	-20	-2
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT BIZ CEVAHIR HALIC AVM	279	24	-12	17	-21	-5	34	0
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT GOP BAGLARBASI CD	215	81	3	3	-1	1	78	6
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ISFANBUL AVM	194	-17	-39	-39	8	-7	26	4
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT MALL OF ISTANBUL	5	11	-13	-53	85	0	27	-2
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT TEMA WORLD AVM	96	112	53	17	21	8	50	1
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT VEGA ISTANBUL AVM	200	32	4	-6	24	-11	13	5
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT VENEZIA MEGA OUTLET AVM	60	-8	-30	-38	9	5	38	3
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI AYVALIK CD	401	-23	-31	17	-38	-6	5	-7
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI AYVALIK KIRLANGIC AVM	336	-34	-53	-47	-3	-7	31	2
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI BALIKESIR 10 BURDA AVM	65	15	-17	-26	32	-15	18	1
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI EDREMIT NOVADA AVM	201	-31	-57	-59	21	-14	37	4
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI MILLI KUVVETLER CD	251	32	8	28	0	-15	3	2
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI YASA OUTLET	376	-57	-71	-57	-19	-18	25	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI BOSTANLI CAD	230	161	80	118	-15	-3	40	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI CIGLI KIP	380	6	-9	-26	27	-4	12	4
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI DIKILI CAD	313	4	-32	-34	25	-18	25	3
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI EFESUS AVM	228	112	33	-11	43	4	66	11
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI HILLTOWN AVM	7	28	-9	-40	62	-6	32	-2
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI K.YAKA CARSI CD	37	136	70	20	32	8	49	1
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI NOVADA MENEMEN AVM	373	-3	-34	-53	56	-11	32	3
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI SAKIPAGA AVM	290	-34	-51	-75	50	30	74	6
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI AKHISAR NOVADA AVM	275	-13	-48	-48	-4	5	76	-1
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI ALPHARD AVM	330	30	-5	-14	-2	12	54	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI DOGU CD	324	26	4	27	-9	-10	9	5
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI MAGNESIA	54	17	-6	-23	31	-7	15	0
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI SALIHLI KIP	142	7	-21	-49	44	8	46	5
Ibrahim Emre Karasirt	Zehra Celik	AYDI DIDIM CD	370	-29	-35	-41	23	-11	-3	0
Ibrahim Emre Karasirt	Zehra Celik	AYDI DIDIM KIPA AVM	413	-42	-62	-60	-8	4	60	8
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI AVM	244	-42	-53	-54	9	-6	15	2
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI INONU BLV	357	14	-13	-12	-6	6	38	-7
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI MARINA	314	-5	-32	-20	11	-23	7	-1
Ibrahim Emre Karasirt	Zehra Celik	AYDI SOKE NOVADA	317	-7	-26	-17	-10	0	25	-4
Ibrahim Emre Karasirt	Zehra Celik	AYDI SOKE OUTLET	319	-78	-84	-79	-14	-11	21	8
Ibrahim Emre Karasirt	Zehra Celik	IZMI ALACATI	409	-12	-47	-54	-13	31	120	-5
Ibrahim Emre Karasirt	Zehra Celik	IZMI CESME CADDE PLUS AVM	351	-40	-57	-39	-7	-25	6	-2
Ibrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM	80	-9	-31	-41	15	2	34	0
Ibrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM 2	59	-33	-51	-45	-12	2	37	10
Ibrahim Emre Karasirt	Zehra Celik	IZMI RENNA PARK AVM	387	51	-10	-6	29	-25	24	1
Ibrahim Emre Karasirt	Zehra Celik	IZMI SELWAY AVM	277	0	-36	-37	2	1	56	9
Ibrahim Emre Karasirt	Zehra Celik	IZMI SELWAY AVM 2	363	-1	-21	34	-44	6	32	9
Ibrahim Emre Karasirt	Zehra Celik	IZMI SIRINYER CD	179	94	50	18	20	5	36	0
Ibrahim Emre Karasirt	Zehra Celik	IZMI URLA BAMBOO AVM	130	60	-7	-17	15	-3	68	0
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI ADNAN MENDERES BLV	284	85	18	6	10	1	58	8
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI AYDIN FR	129	53	19	-43	99	4	34	1
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI AYDIN KIP	250	16	-37	-26	9	-22	43	16
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI NAZILLI BAMBOO AVM	265	17	-7	-16	-6	16	47	-1
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI OPSMALL AVM	232	-32	-58	-56	0	-5	53	11
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI ALSANCAK	292	155	110	131	26	-28	-12	2
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI BALCOVA KIP	190	184	106	40	54	-4	32	0
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI BORNOVA CD	249	173	86	-100	-100	-2	44	-3
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI EGE PERLA AVM	283	212	171	77	31	17	35	1
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI FORUM BORNOVA AVM	36	9	-8	-27	26	0	19	0
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI HATAY CAD	124	144	72	99	-8	-7	33	-3
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI ISTINYEPARK AVM	3	17	-16	-30	20	1	40	0
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI IZMIR PARK AVM	341	45	3	-11	13	3	45	0
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI KIBRIS S. 3	71	134	62	-19	97	1	46	1
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI KONAK PIER AVM	328	102	11	-14	20	8	96	1
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI PARK BORNOVA AVM	286	-32	-59	-55	20	-25	25	8
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI POINT BORNOVA AVM	270	4	-32	-43	43	-16	29	8
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI WESTPARK AVM	276	-50	-69	-49	-43	6	70	19`;


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
