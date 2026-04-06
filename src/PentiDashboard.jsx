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
  { name:'Derya Ozturk',          ciro:5,  adet:-23, zs:-19, do:-2, fba:-3, fbt:33, gm:8 },
  { name:'Hazel Aydemir',         ciro:1,  adet:-27, zs:-28, do:5,  fba:-4, fbt:33, gm:8 },
  { name:'Ibrahim Emre Karasirt', ciro:8,  adet:-23, zs:-23, do:2,  fba:-1, fbt:38, gm:8 },
];
const overallData = { ciro:5, adet:-24, zs:-23, do:1, fba:-3, fbt:35, gm:8 };
const rawBmData = `OM	BM	Ciro	Adet	ZS	DO	FBA	FBT	GM
Derya Ozturk	Aysun Cetin	-1	-29	-25	-3	-1	36	8
Derya Ozturk	Buse Aksu	20	-8	7	-13	-2	28	7
Derya Ozturk	Deniz Uysal	9	-20	-25	5	0	38	9
Derya Ozturk	Meliha Ilhan	-1	-28	-27	2	-2	35	8
Derya Ozturk	Nur Ekici Kucuk	29	-7	-3	-4	0	38	7
Derya Ozturk	Ruveyda Un	-12	-36	-29	-4	-5	29	8
Derya Ozturk	Taylan Yilmaz	4	-25	-18	-3	-6	31	7
Hazel Aydemir	Bora Dedeoglu	-15	-41	-33	-10	-2	41	8
Hazel Aydemir	Elif Sabaz	20	-13	-32	30	-1	36	6
Hazel Aydemir	Fatih Sulun	-3	-31	-34	9	-4	34	8
Hazel Aydemir	Mustafa Bulut	0	-29	-24	-6	0	41	8
Hazel Aydemir	Pinar Beyaz	1	-32	-35	6	-1	46	10
Hazel Aydemir	Seda Urgan	2	-26	-20	-2	-6	31	8
Hazel Aydemir	Umit Altunkaynak	5	-19	-18	8	-8	19	6
Ibrahim Emre Karasirt	Betul Duran	5	-24	-18	-8	1	41	7
Ibrahim Emre Karasirt	Burcin Taskiran	-7	-32	-32	4	-3	32	7
Ibrahim Emre Karasirt	Emre Topcan	16	-18	-14	-1	-3	37	10
Ibrahim Emre Karasirt	Esma Gul	4	-25	-15	-8	-4	34	7
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	25	-10	-25	23	-2	35	7
Ibrahim Emre Karasirt	Mehmet Sena Aydin	7	-24	-29	5	2	42	8
Ibrahim Emre Karasirt	Zehra Celik	-9	-35	-30	-9	2	43	9
Ibrahim Emre Karasirt	Zeycan Ozcan	14	-20	-29	14	-1	41	8`;
const rawStoreData = `OM	BM	Magaza	Sira	Ciro	Adet	ZS	DO	FBA	FBT	GM
Derya Ozturk	Aysun Cetin	ANKA 365 AVM	215	35	9	11	-4	2	26	8
Derya Ozturk	Aysun Cetin	ANKA ANATOLIUM	370	-22	-50	-39	-13	-6	47	10
Derya Ozturk	Aysun Cetin	ANKA ARCADIUM AVM	64	52	0	11	-2	-8	39	7
Derya Ozturk	Aysun Cetin	ANKA ARMADA	193	21	-21	-21	10	-9	40	6
Derya Ozturk	Aysun Cetin	ANKA BILKENT	175	43	12	34	-10	-8	18	7
Derya Ozturk	Aysun Cetin	ANKA CEPA	69	-2	-26	-15	-5	-8	23	8
Derya Ozturk	Aysun Cetin	ANKA GORDION AVM	43	25	-3	-1	-1	-1	28	6
Derya Ozturk	Aysun Cetin	ANKA KENTPARK	10	9	-14	-11	-3	0	26	5
Derya Ozturk	Aysun Cetin	ANKA NATA VEGA AVM	50	-11	-40	-38	-4	1	50	11
Derya Ozturk	Aysun Cetin	ANKA NEXTLEVEL	163	46	-9	-6	-4	1	62	9
Derya Ozturk	Aysun Cetin	ANKA OPTIMUM	70	18	-17	-24	-3	12	60	10
Derya Ozturk	Aysun Cetin	ANKA SINCAN CD	173	-22	-50	-22	-29	-10	41	11
Derya Ozturk	Aysun Cetin	ARTV ARTRIUM AVM	399	-16	-39	-27	-11	-5	31	9
Derya Ozturk	Aysun Cetin	CANK YUNUS	377	-18	-47	-26	-16	-14	32	12
Derya Ozturk	Aysun Cetin	KAST BARUT	372	-27	-47	6	-46	-7	29	14
Derya Ozturk	Aysun Cetin	KAST KASTAMALL AVM	189	-13	-35	-34	0	-3	31	6
Derya Ozturk	Aysun Cetin	KIRI PODIUM AVM	129	12	-30	-33	6	-1	59	7
Derya Ozturk	Aysun Cetin	RIZE CUMHURIYET CD	287	-11	-34	-34	-10	10	49	12
Derya Ozturk	Aysun Cetin	RIZE SIMAL AVM	130	-23	-44	-37	-13	2	40	10
Derya Ozturk	Aysun Cetin	SIVA ISTASYON CD	225	-30	-42	-40	-3	0	22	7
Derya Ozturk	Aysun Cetin	SIVA PRIMEMALL AVM	253	-1	-31	-49	16	14	65	9
Derya Ozturk	Aysun Cetin	TOKA NOVADA AVM	118	-6	-26	-22	-10	5	33	8
Derya Ozturk	Aysun Cetin	TRAB ATAPARK	352	-9	-26	-24	-3	2	24	5
Derya Ozturk	Aysun Cetin	TRAB CEVAHIR OUTLET AVM	339	-34	-52	-41	-11	-9	25	6
Derya Ozturk	Aysun Cetin	TRAB TRABZON FR	37	-16	-38	-40	11	-7	27	6
Derya Ozturk	Aysun Cetin	TRAB UZUN SOKAK 2	40	-17	-40	-31	-7	-5	30	7
Derya Ozturk	Aysun Cetin	YOZG NOVADA AVM	280	1	-27	-37	11	5	45	10
Derya Ozturk	Buse Aksu	ISTA ALTIYOL CD	167	12	-16	-20	1	3	38	10
Derya Ozturk	Buse Aksu	ISTA BAGDAT CAD	131	5	-17	-8	-8	-1	25	8
Derya Ozturk	Buse Aksu	ISTA BAHARIYE CD 2	87	21	5	-11	11	6	22	6
Derya Ozturk	Buse Aksu	ISTA ERENKOY 2	90	20	-11	-6	-4	-2	33	6
Derya Ozturk	Buse Aksu	ISTA HALITAGA CAD	324	-3	-27	-12	-7	-10	20	4
Derya Ozturk	Buse Aksu	ISTA KOZZY	171	81	28	26	-5	7	51	7
Derya Ozturk	Buse Aksu	ISTA MALTEPE CFR	107	9	-17	-8	-6	-4	26	8
Derya Ozturk	Buse Aksu	ISTA MALTEPE PIAZZA AVM	20	-7	-26	-8	-13	-8	16	4
Derya Ozturk	Buse Aksu	ISTA MARMARA ANATOLIUM AVM	368	-5	-34	5	-28	-14	25	6
Derya Ozturk	Buse Aksu	ISTA MUHURDAR CD	241	41	3	2	-8	9	50	10
Derya Ozturk	Buse Aksu	ISTA OPTIMUM	168	-2	-24	-21	5	-8	20	6
Derya Ozturk	Buse Aksu	ISTA PALLADIUM 2	117	49	8	-17	32	-1	37	6
Derya Ozturk	Buse Aksu	ISTA RITIM ISTANBUL AVM	250	118	53	59	-11	8	54	6
Derya Ozturk	Buse Aksu	ISTA SASKINBAKKAL CD	319	32	2	-10	15	-2	26	6
Derya Ozturk	Buse Aksu	ISTA YAYLADA AVM	204	33	1	8	-6	-1	30	7
Derya Ozturk	Deniz Uysal	ISTA GAZIPASA CD	152	-15	-34	-28	-10	1	30	9
Derya Ozturk	Deniz Uysal	ISTA MALTEPE CAD	198	12	-30	-9	-18	-7	49	12
Derya Ozturk	Deniz Uysal	ISTA MARINA	77	37	6	-13	14	6	38	8
Derya Ozturk	Deniz Uysal	ISTA NEOMARIN	244	0	-31	-22	0	-11	28	12
Derya Ozturk	Deniz Uysal	ISTA PENDIK 19 MAYIS CD	223	-6	-30	-25	-6	-1	33	8
Derya Ozturk	Deniz Uysal	ISTA RINGS AVM	232	145	59	52	10	-5	46	18
Derya Ozturk	Deniz Uysal	ISTA SARIGAZI CD	277	10	-17	2	-15	-5	26	4
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI ATLAS	230	5	-31	-27	-2	-4	47	14
Derya Ozturk	Deniz Uysal	ISTA SULTANBEYLI PLATO	397	-57	-70	-42	-41	-11	24	16
Derya Ozturk	Deniz Uysal	ISTA TUZLA MARINA AVM	46	32	-2	25	-34	19	60	10
Derya Ozturk	Deniz Uysal	ISTA TUZLAPORT AVM	195	70	11	-100	-100	-9	40	7
Derya Ozturk	Deniz Uysal	ISTA VIAPORT	39	15	-15	-30	20	0	37	10
Derya Ozturk	Deniz Uysal	ISTA VIAPORT 2	113	30	-3	-24	19	8	45	8
Derya Ozturk	Deniz Uysal	KOCA GEBZECENTER	36	15	-21	-42	40	-4	40	9
Derya Ozturk	Deniz Uysal	KOCA OKSIJEN SHOPINN AVM	395	-42	-59	-54	4	-16	20	12
Derya Ozturk	Deniz Uysal	YALO GAZIPASA CD	200	2	-28	-23	0	-6	33	6
Derya Ozturk	Deniz Uysal	YALO STAR AVM	227	-23	-33	-36	2	2	17	3
Derya Ozturk	Deniz Uysal	YALO YALOVA KIPA	385	-34	-50	-43	-7	-5	24	11
Derya Ozturk	Meliha Ilhan	AKSA EFOR	206	1	-25	-35	2	13	52	11
Derya Ozturk	Meliha Ilhan	ANKA ACITY	199	-16	-38	-41	0	5	42	11
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL	34	-10	-30	-28	8	-10	16	8
Derya Ozturk	Meliha Ilhan	ANKA ANKAMALL 2	35	-7	-28	-35	12	-1	29	6
Derya Ozturk	Meliha Ilhan	ANKA ANKARA FR	124	25	-14	-27	8	8	58	7
Derya Ozturk	Meliha Ilhan	ANKA ANTARES	61	11	-21	-18	-1	-3	36	8
Derya Ozturk	Meliha Ilhan	ANKA ATAKULE AVM	177	6	-25	-6	-20	-1	40	7
Derya Ozturk	Meliha Ilhan	ANKA ATLANTIS	72	26	-16	-41	45	-3	47	10
Derya Ozturk	Meliha Ilhan	ANKA FTZ AVM	359	8	-24	-9	-16	-1	42	11
Derya Ozturk	Meliha Ilhan	ANKA KIZLAR PINARI CD	0	-100	-100	-100	-100	-100	-100	-38
Derya Ozturk	Meliha Ilhan	ANKA KUZUEFFECT AVM	350	7	-33	-5	-9	-22	24	8
Derya Ozturk	Meliha Ilhan	ANKA ONE TOWER AVM	338	13	-18	5	-13	-10	23	9
Derya Ozturk	Meliha Ilhan	ANKA PANORA	62	27	-13	-8	-3	-3	43	8
Derya Ozturk	Meliha Ilhan	ANKA PODIUM AVM	172	16	-21	-20	10	-10	32	5
Derya Ozturk	Meliha Ilhan	ANKA TAURUS	149	26	0	-5	-13	21	53	5
Derya Ozturk	Meliha Ilhan	ANKA VEGA SUBAYEVLERI AVM	265	-13	-30	-32	13	-9	12	8
Derya Ozturk	Meliha Ilhan	KAYS ILDEM AVM	378	-16	-41	-38	-5	0	42	9
Derya Ozturk	Meliha Ilhan	KAYS KAYSERI FR	25	2	-32	-25	-13	4	56	9
Derya Ozturk	Meliha Ilhan	KAYS KAYSERIPARK	108	-8	-31	-34	3	1	36	7
Derya Ozturk	Meliha Ilhan	KAYS KUMSMALL AVM	381	-27	-45	-44	3	-5	27	7
Derya Ozturk	Meliha Ilhan	KAYS MEYSU AVM	348	-5	-19	-28	17	-3	13	1
Derya Ozturk	Meliha Ilhan	NEVS KAPADOKYA FR	354	-18	-41	-37	-5	-2	36	9
Derya Ozturk	Meliha Ilhan	NEVS NISSARA AVM	235	-18	-41	-26	-10	-12	23	9
Derya Ozturk	Meliha Ilhan	NIGD NIGDE CD	358	-54	-64	-100	-100	-15	10	6
Derya Ozturk	Nur Ekici Kucuk	ISTA AKASYA AVM	27	3	-28	-15	-6	-9	29	7
Derya Ozturk	Nur Ekici Kucuk	ISTA AKYAKA PARK	311	-13	-31	-23	-5	-4	20	9
Derya Ozturk	Nur Ekici Kucuk	ISTA ALEMDAG CD	98	-5	-31	-15	-10	-9	25	12
Derya Ozturk	Nur Ekici Kucuk	ISTA ALEMDAG CD2	192	-10	-37	28	-49	-2	38	10
Derya Ozturk	Nur Ekici Kucuk	ISTA BRANDIUM	207	-15	-44	-3	-50	16	77	22
Derya Ozturk	Nur Ekici Kucuk	ISTA BUYAKA	65	12	-18	-31	13	5	44	4
Derya Ozturk	Nur Ekici Kucuk	ISTA CANPARK AVM	126	60	9	1	1	7	56	7
Derya Ozturk	Nur Ekici Kucuk	ISTA CAPITOL	109	30	-12	-4	-4	-3	42	10
Derya Ozturk	Nur Ekici Kucuk	ISTA EMAAR SQUARE AVM	8	33	1	-12	14	0	32	5
Derya Ozturk	Nur Ekici Kucuk	ISTA ICERENKOY CFR	68	78	26	41	-7	-4	35	9
Derya Ozturk	Nur Ekici Kucuk	ISTA METROGARDEN AVM	52	54	11	-1	6	5	47	9
Derya Ozturk	Nur Ekici Kucuk	ISTA METROPOL AVM	63	44	7	4	0	3	39	6
Derya Ozturk	Nur Ekici Kucuk	ISTA NAUTILUS	114	51	7	-16	24	3	46	10
Derya Ozturk	Nur Ekici Kucuk	ISTA NEV CARSI AVM	247	61	5	-7	19	-5	46	6
Derya Ozturk	Nur Ekici Kucuk	ISTA UMR MEYDAN	76	23	-10	-24	17	0	37	8
Derya Ozturk	Nur Ekici Kucuk	ISTA WATER GARDEN AVM	137	67	20	8	10	1	40	8
Derya Ozturk	Ruveyda Un	BOLU 14 BURDA AVM	252	-18	-29	-16	-8	-9	6	10
Derya Ozturk	Ruveyda Un	BOLU CADDE AVM	179	-31	-46	-29	-18	-9	17	13
Derya Ozturk	Ruveyda Un	BOLU HIGHWAY	233	-44	-52	-75	95	-3	12	6
Derya Ozturk	Ruveyda Un	DUZC KREMPARK	187	-12	-37	-31	-4	-5	33	11
Derya Ozturk	Ruveyda Un	KOCA 41 BURDA AVM	24	-10	-33	18	-39	-7	24	7
Derya Ozturk	Ruveyda Un	KOCA ARASTAPARK AVM	196	2	-20	-4	-11	-6	19	4
Derya Ozturk	Ruveyda Un	KOCA HURRIYET CD	49	12	-22	-11	-11	-2	41	8
Derya Ozturk	Ruveyda Un	KOCA ISTIKLAL CD	166	-14	-33	-22	-11	-4	24	8
Derya Ozturk	Ruveyda Un	KOCA IZMIT OUTLET CENTER	103	0	-28	-40	21	0	40	1
Derya Ozturk	Ruveyda Un	KOCA SYMBOL AVM	115	17	-17	-14	3	-7	31	4
Derya Ozturk	Ruveyda Un	SAKA 54 CADDE AVM	127	-9	-38	-43	19	-9	35	9
Derya Ozturk	Ruveyda Un	SAKA ADAPAZARI AGORA	310	5	-22	-25	9	-4	29	10
Derya Ozturk	Ruveyda Un	SAKA CARK CD	143	-23	-50	-35	-18	-7	44	13
Derya Ozturk	Ruveyda Un	SAKA KARASU CD	382	-51	-59	-55	1	-10	9	4
Derya Ozturk	Ruveyda Un	SAKA NG SAPANCA AVM	332	-24	-54	-38	-17	-11	47	7
Derya Ozturk	Ruveyda Un	SAKA SERDIVAN	106	-9	-34	-25	-10	-3	35	9
Derya Ozturk	Ruveyda Un	SAKARYA ADA CENTER	283	-6	-40	-47	10	3	61	19
Derya Ozturk	Taylan Yilmaz	ANKA 7. CD	73	38	-1	6	1	-8	28	9
Derya Ozturk	Taylan Yilmaz	ANKA CEMAL GURSEL CD	164	35	3	68	-30	-13	14	8
Derya Ozturk	Taylan Yilmaz	ANKA IZMIR CD	266	17	-14	-11	12	-14	17	7
Derya Ozturk	Taylan Yilmaz	ANKA KARTALTEPE AVM	393	-53	-72	-59	-5	-27	21	12
Derya Ozturk	Taylan Yilmaz	ANKA KASMIR AVM	151	36	-2	6	-6	-2	36	9
Derya Ozturk	Taylan Yilmaz	ANKA KIZILAY 1	55	9	-13	-3	-1	-9	13	7
Derya Ozturk	Taylan Yilmaz	ANKA KIZILAY MEYDAN	88	43	6	141	-55	-1	33	8
Derya Ozturk	Taylan Yilmaz	ANKA METROMALL AVM	18	-3	-29	-28	7	-7	27	8
Derya Ozturk	Taylan Yilmaz	ANKA TUNALI HILMI CD 2	38	50	-4	2	-3	-3	52	10
Derya Ozturk	Taylan Yilmaz	BART BARTIN CD	240	1	-22	-9	-6	-9	18	7
Derya Ozturk	Taylan Yilmaz	ESKI DOKTORLAR CD 2	120	-5	-36	-21	-18	-1	46	9
Derya Ozturk	Taylan Yilmaz	ESKI ESPARK	19	-1	-27	-21	-6	-2	33	4
Derya Ozturk	Taylan Yilmaz	ESKI VEGA OUTLET AVM	116	38	-5	-11	4	2	49	7
Derya Ozturk	Taylan Yilmaz	KARA KARAMANPARK	307	-25	-48	-38	-14	-2	41	10
Derya Ozturk	Taylan Yilmaz	KARB KARES	263	-7	-31	-19	-11	-4	29	6
Derya Ozturk	Taylan Yilmaz	KONY ENNTEPE AVM	183	3	-23	-26	8	-4	29	6
Derya Ozturk	Taylan Yilmaz	KONY EREGLI PARK AVM	365	-56	-68	-49	-31	-8	25	5
Derya Ozturk	Taylan Yilmaz	KONY KENT PLAZA	105	1	-27	-29	6	-3	35	4
Derya Ozturk	Taylan Yilmaz	KONY KULESITE	165	-6	-38	-28	-7	-8	40	9
Derya Ozturk	Taylan Yilmaz	KONY M1 AVM	110	26	-19	-27	2	8	69	8
Derya Ozturk	Taylan Yilmaz	KONY NOVADA AVM	388	-43	-58	-40	-22	-10	22	6
Derya Ozturk	Taylan Yilmaz	ZONG 67 BURDA AVM	86	-14	-42	-40	7	-10	35	7
Derya Ozturk	Taylan Yilmaz	ZONG EREGLI OZDEMIR AVM	174	-1	-38	-28	-9	-5	51	9
Derya Ozturk	Taylan Yilmaz	ZONG EREYLIN AVM	357	-3	-10	-19	18	-6	1	2
Hazel Aydemir	Bora Dedeoglu	AMAS AMASYA PARK AVM	236	-3	-42	-41	-14	14	91	13
Hazel Aydemir	Bora Dedeoglu	CORU AHL AVM	79	-3	-32	-39	13	0	42	8
Hazel Aydemir	Bora Dedeoglu	CORU GAZI CD	337	-1	-32	-31	-3	1	48	10
Hazel Aydemir	Bora Dedeoglu	GIRE GAZI CADDESI	317	-15	-36	-29	-13	2	36	4
Hazel Aydemir	Bora Dedeoglu	GIRE INONU CD	205	-3	-38	-37	8	-7	43	7
Hazel Aydemir	Bora Dedeoglu	ORDU FATSA	351	-32	-48	-46	2	-6	23	7
Hazel Aydemir	Bora Dedeoglu	ORDU NOVADA AVM	248	-25	-47	-13	-32	-11	27	11
Hazel Aydemir	Bora Dedeoglu	ORDU SIRRIPASA CD	182	-36	-52	-37	-15	-12	19	9
Hazel Aydemir	Bora Dedeoglu	ORDU UNYE UNIPORT AVM	305	-2	-31	-24	-19	12	60	7
Hazel Aydemir	Bora Dedeoglu	SAMS BAFRA CELIKPARK AVM	301	-27	-50	-48	-5	1	48	6
Hazel Aydemir	Bora Dedeoglu	SAMS BULVAR	123	3	-26	-4	-26	4	46	10
Hazel Aydemir	Bora Dedeoglu	SAMS CIFTLIK CD 2	294	-21	-44	-35	-11	-3	37	9
Hazel Aydemir	Bora Dedeoglu	SAMS CITYMALL AVM	0	-100	-100	-100	-100	-100	-100	-46
Hazel Aydemir	Bora Dedeoglu	SAMS LOVELET	289	-23	-41	-63	50	6	39	4
Hazel Aydemir	Bora Dedeoglu	SAMS PIAZZA	17	-1	-35	-39	4	2	54	7
Hazel Aydemir	Bora Dedeoglu	SAMS YESILYURT	41	62	10	3	10	-3	42	6
Hazel Aydemir	Bora Dedeoglu	SINO SAKARYA CD	302	-31	-44	-30	-6	-15	6	7
Hazel Aydemir	Elif Sabaz	ISTT AKBATI	29	14	-18	-21	13	-8	28	7
Hazel Aydemir	Elif Sabaz	ISTT ATIRUS AVM	363	27	-10	-8	5	-7	32	5
Hazel Aydemir	Elif Sabaz	ISTT AVENUA AVM	145	47	-5	2	-15	10	71	4
Hazel Aydemir	Elif Sabaz	ISTT BEYLIKDUZU MGR	180	30	-15	-100	-100	9	67	11
Hazel Aydemir	Elif Sabaz	ISTT CENNET CD 2	128	7	-20	-100	-100	6	40	7
Hazel Aydemir	Elif Sabaz	ISTT ESENYURT CITY CENTER AVM	245	27	5	-32	42	8	31	9
Hazel Aydemir	Elif Sabaz	ISTT MARMARA CAD	295	0	-27	-39	19	1	38	11
Hazel Aydemir	Elif Sabaz	ISTT MARMARAPARK	2	11	-17	-30	22	-3	29	3
Hazel Aydemir	Elif Sabaz	ISTT MIMAROBA DIA MARE CD	100	80	26	14	2	8	54	4
Hazel Aydemir	Elif Sabaz	ISTT PELICAN	221	-7	-33	-28	1	-8	28	11
Hazel Aydemir	Elif Sabaz	ISTT PERLAVISTA AVM	349	19	-13	-5	2	-10	23	10
Hazel Aydemir	Elif Sabaz	ISTT SILIVRI KIP	398	-19	-41	-46	4	4	43	13
Hazel Aydemir	Elif Sabaz	ISTT SILIVRI MAXI	340	-19	-35	-32	10	-12	9	5
Hazel Aydemir	Elif Sabaz	ISTT TORIUM	146	19	-14	1	-10	-6	31	8
Hazel Aydemir	Fatih Sulun	BALI BANDIRMA LIMAN	147	-14	-32	-25	-7	-2	24	5
Hazel Aydemir	Fatih Sulun	BILE BOZUYUK SARAR	214	-31	-52	-59	6	9	57	9
Hazel Aydemir	Fatih Sulun	BURS AHMET TANER KISLALI CD	84	14	-18	-6	-13	1	39	10
Hazel Aydemir	Fatih Sulun	BURS ANATOLIUM	229	-9	-31	-35	2	3	37	8
Hazel Aydemir	Fatih Sulun	BURS AS OUTLET AVM	222	-12	-20	-83	319	11	23	6
Hazel Aydemir	Fatih Sulun	BURS ATABULVARI CD	99	57	5	18	-4	-8	39	5
Hazel Aydemir	Fatih Sulun	BURS DOWNTOWN AVM	318	-48	-60	-54	-1	-12	16	6
Hazel Aydemir	Fatih Sulun	BURS GORUKLE CAD	262	20	-14	31	-21	-17	16	11
Hazel Aydemir	Fatih Sulun	BURS INEGOL	212	-8	-43	-40	7	-11	42	13
Hazel Aydemir	Fatih Sulun	BURS KENT MEYDANI	112	-15	-42	-37	6	-13	28	9
Hazel Aydemir	Fatih Sulun	BURS KORUPARK	22	8	-21	-28	11	-1	35	7
Hazel Aydemir	Fatih Sulun	BURS OKSIJEN SHOPINN AVM	392	-10	-41	-48	7	5	61	4
Hazel Aydemir	Fatih Sulun	BURS OZDILEKPARK AVM	121	18	-16	-12	6	-10	26	9
Hazel Aydemir	Fatih Sulun	BURS PARKUR AVM	274	-15	-39	-42	12	-6	30	7
Hazel Aydemir	Fatih Sulun	BURS SUR YAPI MARKA AVM	12	-4	-34	-29	-2	-5	38	8
Hazel Aydemir	Fatih Sulun	BURS ZAFER PLAZA	136	-7	-31	-30	1	-2	32	9
Hazel Aydemir	Mustafa Bulut	ADIY ADIYAMAN PARK AVM	211	3	-28	-33	-3	10	58	9
Hazel Aydemir	Mustafa Bulut	BATM BATMAN PARK	394	-8	-20	-36	1	23	42	7
Hazel Aydemir	Mustafa Bulut	BATM PETROL CITY AVM	224	35	-14	-21	-3	12	75	7
Hazel Aydemir	Mustafa Bulut	BING KALIUM AVM	355	-15	-38	-18	-22	-3	33	12
Hazel Aydemir	Mustafa Bulut	DIYA 75 METRE CD	219	10	-24	-17	-2	-6	37	12
Hazel Aydemir	Mustafa Bulut	DIYA CEYLANPARK AVM	82	8	-25	-27	-4	7	54	6
Hazel Aydemir	Mustafa Bulut	DIYA FORUM AVM	67	25	-16	-20	-1	6	59	7
Hazel Aydemir	Mustafa Bulut	ELAZ ELAZIG PARK23	269	-12	-39	-44	9	0	43	11
Hazel Aydemir	Mustafa Bulut	ELAZ ELYSIUM AVM	132	-18	-37	-38	3	-1	28	5
Hazel Aydemir	Mustafa Bulut	GAZI G.ANTEP FR	191	-15	-42	-36	-8	-2	45	11
Hazel Aydemir	Mustafa Bulut	GAZI GAZIMUHTAR	321	-10	-24	-2	-18	-6	11	8
Hazel Aydemir	Mustafa Bulut	GAZI M1 OUTLET	303	-33	-54	-43	2	-20	17	11
Hazel Aydemir	Mustafa Bulut	GAZI PRIME MALL	57	28	-15	-20	5	1	52	8
Hazel Aydemir	Mustafa Bulut	GAZI SANKOPARK	95	22	-5	0	6	36	0	7
Hazel Aydemir	Mustafa Bulut	KAHR PIAZZA	58	-17	-42	-38	-3	-5	37	8
Hazel Aydemir	Mustafa Bulut	MALA MALATYAPARK	60	-7	-34	-32	-6	3	47	8
Hazel Aydemir	Mustafa Bulut	MARD MARDIAN MALL	141	10	-21	-9	-16	4	45	7
Hazel Aydemir	Mustafa Bulut	MARD MOVAPARK	326	76	24	-17	13	33	88	7
Hazel Aydemir	Mustafa Bulut	SANL URFA NOVADA AVM	387	-28	-39	-30	-16	3	22	8
Hazel Aydemir	Mustafa Bulut	SANL URFA PIAZZA	201	3	-24	-35	29	-9	24	5
Hazel Aydemir	Mustafa Bulut	SANL URFACITY	279	56	-2	1	4	-6	49	5
Hazel Aydemir	Mustafa Bulut	SIIR SIIRT PARK AVM	331	-22	-40	-24	-10	-12	15	4
Hazel Aydemir	Mustafa Bulut	SIRN CIZRE PARK AVM	379	-39	-53	-44	0	-16	8	5
Hazel Aydemir	Pinar Beyaz	ADAN 01 BURDA AVM	268	-26	-50	-55	14	-2	43	10
Hazel Aydemir	Pinar Beyaz	ADAN BARAJ YOLU CAD	188	7	-23	-23	-3	4	44	12
Hazel Aydemir	Pinar Beyaz	ADAN CAKMAK CD	296	-25	-46	-37	-9	-5	31	12
Hazel Aydemir	Pinar Beyaz	ADAN KENAN EVREN BLV	218	-4	-26	-18	-9	-1	29	10
Hazel Aydemir	Pinar Beyaz	ADAN M1 AVM	21	-3	-37	-33	-4	-2	51	12
Hazel Aydemir	Pinar Beyaz	ADAN OPTIMUM	13	-13	-42	-41	2	-3	44	11
Hazel Aydemir	Pinar Beyaz	ADAN TURKMENBASI CD	89	7	-22	-11	-7	-6	30	9
Hazel Aydemir	Pinar Beyaz	HATA ANTAKYA YUZUNCU YIL AVM	341	-20	-40	-72	153	-15	14	8
Hazel Aydemir	Pinar Beyaz	HATA ISK PRIMEMALL	31	-3	-36	-49	21	5	58	9
Hazel Aydemir	Pinar Beyaz	HATA ISKENDERUN PARK FORBES AV	156	-11	-39	-36	-1	-3	41	10
Hazel Aydemir	Pinar Beyaz	MERS MERSIN CFR	83	32	-19	-24	0	5	71	9
Hazel Aydemir	Pinar Beyaz	MERS MERSIN FR	33	-12	-43	-33	-8	-6	44	11
Hazel Aydemir	Pinar Beyaz	MERS NOVADA ERDEMLI AVM	255	-18	-37	-48	12	6	40	12
Hazel Aydemir	Pinar Beyaz	MERS SAYAPARK AVM	74	22	-22	-28	11	-1	54	11
Hazel Aydemir	Pinar Beyaz	MERS SILIFKE CD	197	11	-23	-35	14	5	51	9
Hazel Aydemir	Pinar Beyaz	MERS TARSU	144	-14	-41	-44	-2	7	56	12
Hazel Aydemir	Pinar Beyaz	OSMA 328 AVM	160	-17	-43	-49	12	0	46	9
Hazel Aydemir	Seda Urgan	CANA 17 BURDA AVM	30	30	-5	-12	4	4	42	4
Hazel Aydemir	Seda Urgan	CANA CANAKKALE CARSI CD	309	-10	-24	-25	-5	7	26	7
Hazel Aydemir	Seda Urgan	CANA CANAKKALE KIP	364	8	-19	-12	-14	6	42	8
Hazel Aydemir	Seda Urgan	EDIR ERASTA AVM	122	0	-25	-23	18	-17	11	5
Hazel Aydemir	Seda Urgan	EDIR KESAN KIPA AVM	353	-23	-41	-33	-13	2	32	10
Hazel Aydemir	Seda Urgan	EDIR MARGI	135	14	-20	-13	-2	-7	33	11
Hazel Aydemir	Seda Urgan	EDIR SARACLAR CD	383	-24	-44	7	-28	-27	0	7
Hazel Aydemir	Seda Urgan	KIRK 39 BURDA AVM	251	-13	-36	-26	-7	-7	26	9
Hazel Aydemir	Seda Urgan	KIRK KIRKLARELI CD	239	-11	-35	-15	-16	-9	25	8
Hazel Aydemir	Seda Urgan	KIRK LULEBURGAZ ISTANBUL CD	336	-38	-57	-43	-2	-22	11	10
Hazel Aydemir	Seda Urgan	TEKI CERKEZKOY KIPA	237	-1	-30	-26	2	-7	30	9
Hazel Aydemir	Seda Urgan	TEKI CORLU OMURTAK CD	308	7	-20	-23	4	0	35	5
Hazel Aydemir	Seda Urgan	TEKI ORION CORLU	101	23	-24	-17	-1	-8	48	10
Hazel Aydemir	Seda Urgan	TEKI TEKIRA	81	5	-24	-24	2	-2	35	10
Hazel Aydemir	Umit Altunkaynak	ISTT AKMERKEZ	231	20	-2	22	-11	-10	11	8
Hazel Aydemir	Umit Altunkaynak	ISTT AVLU 34 AVM	290	2	-34	-11	-22	-6	46	12
Hazel Aydemir	Umit Altunkaynak	ISTT BESIKTAS CD	0	-100	-100	-100	-100	-100	-100	-48
Hazel Aydemir	Umit Altunkaynak	ISTT CEVAHIR	1	23	-3	5	-7	-1	27	5
Hazel Aydemir	Umit Altunkaynak	ISTT GALATASARAY	102	-8	-31	-10	-9	-16	11	7
Hazel Aydemir	Umit Altunkaynak	ISTT GOKTURK IST CD2	133	53	23	48	-11	-6	17	-1
Hazel Aydemir	Umit Altunkaynak	ISTT HALASKARGAZI CD	343	-20	-35	-18	-10	-12	10	8
Hazel Aydemir	Umit Altunkaynak	ISTT HAVALIMANI IC HATLAR	260	12	-15	-23	27	-14	14	7
Hazel Aydemir	Umit Altunkaynak	ISTT HISTORIA	217	2	-31	-7	-20	-7	38	9
Hazel Aydemir	Umit Altunkaynak	ISTT ISTIKLAL AVM	374	-9	-26	-13	-8	-8	14	8
Hazel Aydemir	Umit Altunkaynak	ISTT ISTINYEPARK	4	12	-16	-20	11	-5	26	3
Hazel Aydemir	Umit Altunkaynak	ISTT KAGITHANE AXIS AVM	272	13	-21	-15	0	-8	33	6
Hazel Aydemir	Umit Altunkaynak	ISTT KANYON AVM	162	33	3	-3	6	-1	29	9
Hazel Aydemir	Umit Altunkaynak	ISTT NISANTASI CD	11	2	-10	-5	5	-10	2	5
Hazel Aydemir	Umit Altunkaynak	ISTT NISANTASI CITYS AVM	312	-26	-35	-58	81	-13	-2	5
Hazel Aydemir	Umit Altunkaynak	ISTT ORTABAHCE CD	181	8	-15	-100	-100	-16	7	5
Hazel Aydemir	Umit Altunkaynak	ISTT ORTAKOY CD	346	-19	-43	-8	-14	-28	2	6
Hazel Aydemir	Umit Altunkaynak	ISTT OZDILEK AVM	45	31	7	-18	28	1	24	5
Hazel Aydemir	Umit Altunkaynak	ISTT SARIYER CD	259	1	-28	-3	-17	-10	26	9
Hazel Aydemir	Umit Altunkaynak	ISTT SISLI CD	325	-19	-33	-16	-16	-5	14	7
Hazel Aydemir	Umit Altunkaynak	ISTT TAKSIM CADDE	32	-32	-49	-9	-31	-20	8	8
Hazel Aydemir	Umit Altunkaynak	ISTT TRUMP TOWERS	184	17	-13	-100	-100	-4	30	9
Hazel Aydemir	Umit Altunkaynak	ISTT VADI ISTANBUL AVM	15	21	-4	-34	60	-8	15	3
Hazel Aydemir	Umit Altunkaynak	ISTT VALIKONAGI CD	367	-32	-33	-18	-4	-16	-14	4
Hazel Aydemir	Umit Altunkaynak	ISTT ZORLU AVM	92	15	-17	-13	8	-12	22	6
Hazel Aydemir	Umit Altunkaynak	VAN VAN AVM	161	-1	-31	-21	-13	-1	43	8
Hazel Aydemir	Umit Altunkaynak	VAN VANMALL AVM	371	-1	-27	-54	80	-11	20	9
Ibrahim Emre Karasirt	Betul Duran	ANTA AKDENIZ PARK AVM	293	11	-18	0	0	-3	32	8
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYA TIME CENTER	409	29	1	-19	2	23	57	11
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYA UYGUN CENTER AVM	142	-13	-43	-4	-29	-15	28	9
Ibrahim Emre Karasirt	Betul Duran	ANTA ALANYUM	159	30	-10	-27	10	12	61	5
Ibrahim Emre Karasirt	Betul Duran	ANTA ANTALYA KAS	412	-46	-53	-73	75	-1	12	0
Ibrahim Emre Karasirt	Betul Duran	ANTA ANTALYA MGR	54	11	-18	-28	15	-1	34	7
Ibrahim Emre Karasirt	Betul Duran	ANTA ATATURK CD	154	-3	-33	-27	-7	-1	43	7
Ibrahim Emre Karasirt	Betul Duran	ANTA BOSTANCIPINARI CD	396	-20	-36	-22	-11	-8	15	6
Ibrahim Emre Karasirt	Betul Duran	ANTA ERASTA	94	32	-15	-5	-8	-2	51	10
Ibrahim Emre Karasirt	Betul Duran	ANTA G-MALL CARREFOURSA AVM	276	48	1	10	-13	5	54	9
Ibrahim Emre Karasirt	Betul Duran	ANTA KEMER CADDE	410	-25	-32	-17	-29	14	26	4
Ibrahim Emre Karasirt	Betul Duran	ANTA KUMLUCA CD	361	-30	-52	-28	-26	-10	32	7
Ibrahim Emre Karasirt	Betul Duran	ANTA LAND OF LEGENDS	329	-32	-42	-25	-15	-10	6	5
Ibrahim Emre Karasirt	Betul Duran	ANTA MALL OF ANTALYA AVM	42	21	-15	-32	14	10	56	5
Ibrahim Emre Karasirt	Betul Duran	ANTA MANAVGAT NOVA MALL	138	6	-24	-27	-2	6	48	5
Ibrahim Emre Karasirt	Betul Duran	ANTA MANAVGATCITY AVM	0	-100	-100	-99	-100	-100	-100	-50
Ibrahim Emre Karasirt	Betul Duran	ANTA MARKANTALYA AVM	26	14	-16	-21	-4	12	51	8
Ibrahim Emre Karasirt	Betul Duran	ANTA OZDILEKPARK	85	-13	-39	-23	-14	-7	33	10
Ibrahim Emre Karasirt	Betul Duran	ANTA SHEMALL	203	4	-18	-17	-8	7	35	7
Ibrahim Emre Karasirt	Betul Duran	ANTA TERRACITY	53	13	-21	-13	-13	4	49	5
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODR CUMH.CD	408	-22	-42	-47	-1	10	49	6
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODR OASIS	320	-28	-39	-26	-2	-16	-1	4
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL BODRUM AVENUE AVM	243	-1	-27	37	-37	-15	14	7
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL CADDE	389	3	-30	-25	-2	-4	42	9
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL DATCA CAD	403	-40	-59	-33	-37	-4	43	9
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL ERASTA AVM	59	2	-23	-34	11	4	38	6
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FESTIVA AVM	299	53	0	8	-7	-1	53	7
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FETHIYE CARSI CD	304	-9	-38	-41	3	1	49	9
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL FETHIYE GOCEK CD	390	-32	-50	-43	0	-12	21	5
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MARMARIS	373	6	-33	-34	-1	4	64	11
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MARMARIS ATATURK CD	360	-3	-32	-23	-12	-1	42	7
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL MIDTOWN	249	-18	-43	-36	-1	-9	29	10
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL POMELON AVM	210	68	40	17	-5	25	50	9
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL RUYA 48 OUTLET	306	-39	-50	-100	-100	-6	14	6
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL RUYAPARK AVM	345	-14	-39	-19	-8	-18	15	12
Ibrahim Emre Karasirt	Burcin Taskiran	MUGL TURGUTREIS AVM	297	-11	-33	-43	31	-11	18	7
Ibrahim Emre Karasirt	Emre Topcan	ISTT AIRPORT AVM	328	48	6	-3	18	-7	30	8
Ibrahim Emre Karasirt	Emre Topcan	ISTT AQUA FLORYA AVM	91	-4	-27	-25	5	-7	22	5
Ibrahim Emre Karasirt	Emre Topcan	ISTT ATAKOY A PLUS AVM	264	7	-15	1	-7	-10	14	6
Ibrahim Emre Karasirt	Emre Topcan	ISTT CAPACITY	28	29	-2	-7	6	-1	30	5
Ibrahim Emre Karasirt	Emre Topcan	ISTT CAROUSEL	322	-4	-33	-23	-8	-5	35	12
Ibrahim Emre Karasirt	Emre Topcan	ISTT EYUP AXIS AVM	333	6	-25	-14	-7	-7	32	10
Ibrahim Emre Karasirt	Emre Topcan	ISTT FLYINN AVM	386	16	-9	-82	410	-1	26	10
Ibrahim Emre Karasirt	Emre Topcan	ISTT GUNESLIPARK	292	4	-27	-22	-3	-4	37	11
Ibrahim Emre Karasirt	Emre Topcan	ISTT ISTANBUL FR	5	28	-8	5	-12	-1	39	7
Ibrahim Emre Karasirt	Emre Topcan	ISTT ISTASYON CD	80	4	-22	-13	-9	-1	32	8
Ibrahim Emre Karasirt	Emre Topcan	ISTT KALE AVM	213	-16	-56	-39	5	-31	31	44
Ibrahim Emre Karasirt	Emre Topcan	ISTT MARMARA FR	9	47	13	9	-10	15	50	6
Ibrahim Emre Karasirt	Emre Topcan	ISTT METROPORT	170	22	-10	-8	-8	7	45	9
Ibrahim Emre Karasirt	Emre Topcan	ISTT OLIVIUM	254	-11	-38	-35	-2	-3	39	12
Ibrahim Emre Karasirt	Emre Topcan	ISTT SIRINEVLER CAD	220	31	-5	12	-17	3	41	5
Ibrahim Emre Karasirt	Emre Topcan	ISTT STARCITY	169	-17	-46	-29	-8	-18	27	11
Ibrahim Emre Karasirt	Esma Gul	AFYO AFIUM	125	-20	-46	-48	3	2	51	8
Ibrahim Emre Karasirt	Esma Gul	AFYO AFYONPARK AVM	157	-28	-45	-33	-14	-5	25	7
Ibrahim Emre Karasirt	Esma Gul	BURD GAZI CD	344	-12	-37	-14	-13	-16	17	12
Ibrahim Emre Karasirt	Esma Gul	DENI AQUAMALL AVM	271	17	-21	-30	25	-9	34	6
Ibrahim Emre Karasirt	Esma Gul	DENI CAMLIK FR	23	19	-12	-29	17	6	42	5
Ibrahim Emre Karasirt	Esma Gul	DENI CINAR CD	208	0	-17	-25	10	1	20	2
Ibrahim Emre Karasirt	Esma Gul	DENI HORIZON AVM	298	-18	-37	-20	-3	-19	6	11
Ibrahim Emre Karasirt	Esma Gul	DENI TERASPARK	209	-2	-31	-37	5	4	47	11
Ibrahim Emre Karasirt	Esma Gul	ISPA CARSI	407	-20	-35	2	-23	-17	1	8
Ibrahim Emre Karasirt	Esma Gul	ISPA CENTRIUM GARDEN	366	13	-20	-16	2	-7	31	7
Ibrahim Emre Karasirt	Esma Gul	ISPA IYAS	96	12	-21	1	-14	-9	29	5
Ibrahim Emre Karasirt	Esma Gul	ISPA MEYDAN AVM	194	-11	-38	-25	-18	0	44	9
Ibrahim Emre Karasirt	Esma Gul	KUTA SERA	178	-7	-39	-27	-6	-11	35	8
Ibrahim Emre Karasirt	Esma Gul	USAK FESTIVA	282	14	-16	-16	0	0	35	9
Ibrahim Emre Karasirt	Esma Gul	USAK ISMETPASA CAD	347	7	-28	-6	-14	-11	34	12
Ibrahim Emre Karasirt	Esma Gul	USAK KARUN AVM	119	101	43	106	-35	6	50	2
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZI ERZINCANPARK AVM	400	-24	-48	-40	-18	5	54	12
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZU ERZURUMAVM	376	-9	-27	-10	-16	-2	22	3
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ERZU MNG MALL AVM	158	-1	-21	-14	-8	0	26	8
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT 212AVM	111	-13	-36	-38	6	-3	32	7
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ARENAPARK	56	20	-17	-4	-13	0	43	11
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ARMONIPARK	150	73	3	6	-3	0	69	8
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT BASAKSEHIR	404	-12	-26	-6	-6	-16	-1	6
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT BIZ CEVAHIR HALIC AVM	281	16	-20	5	-24	0	46	8
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT GOP BAGLARBASI CD	226	9	-29	-24	2	-8	40	12
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT ISFANBUL AVM	140	-18	-38	-33	-4	-4	27	9
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT MALL OF ISTANBUL	3	34	0	-59	123	11	49	5
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT TEMA WORLD AVM	93	74	28	12	6	7	46	7
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT VEGA ISTANBUL AVM	216	46	1	7	-3	-3	41	10
Ibrahim Emre Karasirt	Hatice Yildiz Ertas	ISTT VENEZIA MEGA OUTLET AVM	97	-21	-42	-37	-10	1	38	9
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI AYVALIK CD	380	-17	-35	-13	-29	6	34	7
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI AYVALIK KIRLANGIC AVM	258	-1	-33	-34	5	-3	44	6
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI BALIKESIR 10 BURDA AVM	48	23	-8	-17	4	7	43	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI EDREMIT NOVADA AVM	153	-12	-44	-43	8	-9	43	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI MILLI KUVVETLER CD	278	-11	-36	-19	-14	-8	28	10
Ibrahim Emre Karasirt	Mehmet Sena Aydin	BALI YASA OUTLET	323	-27	-48	-41	-7	-5	33	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI BOSTANLI CAD	257	26	-5	10	-17	3	37	9
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI CIGLI KIP	356	22	-14	-12	-2	-1	41	13
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI DIKILI CAD	362	-28	-53	-51	-2	-1	50	7
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI EFESUS AVM	202	58	4	-14	18	3	56	13
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI HILLTOWN AVM	7	29	-7	-36	38	6	47	4
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI K.YAKA CARSI CD	47	6	-22	-22	0	1	37	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI NOVADA MENEMEN AVM	391	-39	-52	-36	-4	-21	-1	9
Ibrahim Emre Karasirt	Mehmet Sena Aydin	IZMI SAKIPAGA AVM	186	-11	-35	-46	12	7	46	6
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI AKHISAR NOVADA AVM	228	4	-32	-37	8	1	53	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI ALPHARD AVM	288	62	3	-22	-6	41	122	10
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI DOGU CD	316	-19	-37	-29	-8	-4	23	10
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI MAGNESIA	51	8	-22	-18	-2	-4	34	8
Ibrahim Emre Karasirt	Mehmet Sena Aydin	MANI SALIHLI KIP	148	-4	-36	-41	-7	16	74	12
Ibrahim Emre Karasirt	Zehra Celik	AYDI DIDIM CD	384	-45	-51	-45	-12	1	13	7
Ibrahim Emre Karasirt	Zehra Celik	AYDI DIDIM KIPA AVM	413	-24	-52	-48	-5	-1	56	10
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI AVM	155	-21	-39	-43	-3	10	42	9
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI INONU BLV	369	-3	-33	-31	-8	7	53	5
Ibrahim Emre Karasirt	Zehra Celik	AYDI KUSADASI MARINA	327	-14	-37	-22	-2	-18	13	4
Ibrahim Emre Karasirt	Zehra Celik	AYDI SOKE NOVADA	270	8	-22	3	-39	24	72	8
Ibrahim Emre Karasirt	Zehra Celik	AYDI SOKE OUTLET	176	-44	-63	-59	-12	4	55	10
Ibrahim Emre Karasirt	Zehra Celik	IZMI ALACATI	411	-20	-47	-52	-7	18	78	2
Ibrahim Emre Karasirt	Zehra Celik	IZMI CESME CADDE PLUS AVM	375	-44	-65	-50	-12	-20	30	5
Ibrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM	66	17	-18	-27	2	10	57	7
Ibrahim Emre Karasirt	Zehra Celik	IZMI OPTIMUM 2	44	-10	-34	-34	-8	7	47	10
Ibrahim Emre Karasirt	Zehra Celik	IZMI RENNA PARK AVM	402	-4	-33	-20	-9	-8	32	7
Ibrahim Emre Karasirt	Zehra Celik	IZMI SELWAY AVM	256	-7	-34	-28	-9	1	43	11
Ibrahim Emre Karasirt	Zehra Celik	IZMI SELWAY AVM 2	342	14	-7	63	-45	5	27	6
Ibrahim Emre Karasirt	Zehra Celik	IZMI SIRINYER CD	185	9	-14	-13	-4	3	30	7
Ibrahim Emre Karasirt	Zehra Celik	IZMI URLA BAMBOO AVM	139	18	-21	-21	1	0	48	7
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI ADNAN MENDERES BLV	314	-15	-33	-34	-5	7	35	11
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI AYDIN FR	104	32	-6	-44	46	14	61	10
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI AYDIN KIP	246	-3	-40	-30	-5	-10	46	12
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI NAZILLI BAMBOO AVM	242	11	-23	6	-28	1	46	9
Ibrahim Emre Karasirt	Zeycan Ozcan	AYDI OPSMALL AVM	75	35	-10	-36	83	-23	16	-1
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI ALSANCAK	334	4	-15	5	-10	-10	10	8
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI BALCOVA KIP	238	62	9	5	9	-5	41	8
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI BORNOVA CD	273	-8	-28	-100	-100	-7	18	6
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI EGE PERLA AVM	291	45	28	7	6	13	28	8
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI FORUM BORNOVA AVM	16	27	-5	-28	17	13	51	7
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI HATAY CAD	134	26	-15	10	-22	-1	47	6
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI ISTINYEPARK AVM	6	16	-18	-26	7	3	46	7
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI IZMIR PARK AVM	313	13	-10	-7	-5	2	28	10
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI KIBRIS S. 3	78	9	-23	-53	72	-5	35	8
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI KONAK PIER AVM	335	-12	-40	-25	-7	-13	26	9
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI PARK BORNOVA AVM	261	-15	-44	-32	-2	-16	29	7
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI POINT BORNOVA AVM	286	6	-26	-32	3	5	51	14
Ibrahim Emre Karasirt	Zeycan Ozcan	IZMI WESTPARK AVM	234	-11	-44	-24	-31	7	67	16`;


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
