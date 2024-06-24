export const dataLabel = [
  "第1回高2",
  "第2回高2",
  "第3回高2",
  "全統記述",
  "全統共テ",
  "高3第1回共テ",
  "高3第1回記述",
  "高3第2回共テ",
  "高3第2回記述",
  "高3第3回記述",
  "高3第3回共テ",
  "高3全統プレ",
];

const SubjectColor = {
  EnBorder: "rgb(90, 90, 90)",
  EnBackground: "rgba(90, 90, 90, 0.2)",
  MtBorder: "rgb(75, 100, 192)",
  MtBackground: "rgba(75, 100, 192, 0.2)",
  JaBorder: "rgb(255, 99, 132)",
  JaBackground: "rgba(255, 99, 132, 0.2)",
  SiBorder: "rgb(75, 192, 192)",
  SiBackground: "rgba(75, 192, 192, 0.2)",
  SoBorder: "rgb(255, 206, 86)",
  SoBackground: "rgba(255, 206, 86, 0.2)",
  InBorder: "rgb(153, 102, 255)",
  InBackground: "rgba(153, 102, 255, 0.2)",
  ComBorder: "rgb(255, 159, 64)",
  ComBackground: "rgba(255, 159, 64, 0.2)",
};

export const SubjectSets = [
  {
    name: "英語",
    id: "En",
    borderColor: SubjectColor.EnBorder,
    backgroundColor: SubjectColor.EnBackground,
  },
  {
    name: "数学",
    id: "Mt",
    borderColor: SubjectColor.MtBorder,
    backgroundColor: SubjectColor.MtBackground,
  },
  {
    name: "数学１",
    id: "Mt1",
    borderColor: SubjectColor.MtBorder,
    backgroundColor: SubjectColor.MtBackground,
  },
  {
    name: "数学２",
    id: "Mt2",
    borderColor: SubjectColor.MtBorder,
    backgroundColor: SubjectColor.MtBackground,
  },
  {
    name: "数学３",
    id: "Mt3",
    borderColor: SubjectColor.MtBorder,
    backgroundColor: SubjectColor.MtBackground,
  },
  {
    name: "国語",
    id: "Ja",
    borderColor: SubjectColor.JaBorder,
    backgroundColor: SubjectColor.JaBackground,
  },
  {
    name: "現代文",
    id: "NJa",
    borderColor: SubjectColor.JaBorder,
    backgroundColor: SubjectColor.JaBackground,
  },
  {
    name: "古文",
    id: "An",
    borderColor: SubjectColor.JaBorder,
    backgroundColor: SubjectColor.JaBackground,
  },
  {
    name: "漢文",
    id: "CJa",
    borderColor: SubjectColor.JaBorder,
    backgroundColor: SubjectColor.JaBackground,
  },
  {
    name: "現古",
    id: "AJa",
    borderColor: SubjectColor.JaBorder,
    backgroundColor: SubjectColor.JaBackground,
  },
  {
    name: "物理",
    id: "Ph",
    borderColor: SubjectColor.SiBorder,
    backgroundColor: SubjectColor.SiBackground,
  },
  {
    name: "化学",
    id: "Ch",
    borderColor: SubjectColor.SiBorder,
    backgroundColor: SubjectColor.SiBackground,
  },
  {
    name: "生物",
    id: "Bi",
    borderColor: SubjectColor.SiBorder,
    backgroundColor: SubjectColor.SiBackground,
  },
  {
    name: "物理基礎",
    id: "BPh",
    borderColor: SubjectColor.SiBorder,
    backgroundColor: SubjectColor.SiBackground,
  },
  {
    name: "化学基礎",
    id: "BCh",
    borderColor: SubjectColor.SiBorder,
    backgroundColor: SubjectColor.SiBackground,
  },
  {
    name: "生物基礎",
    id: "BBi",
    borderColor: SubjectColor.SiBorder,
    backgroundColor: SubjectColor.SiBackground,
  },
  {
    name: "世界史",
    id: "WH",
    borderColor: SubjectColor.SoBorder,
    backgroundColor: SubjectColor.SoBackground,
  },
  {
    name: "日本史",
    id: "JH",
    borderColor: SubjectColor.SoBorder,
    backgroundColor: SubjectColor.SoBackground,
  },
  {
    name: "政治経済",
    id: "PE",
    borderColor: SubjectColor.SoBorder,
    backgroundColor: SubjectColor.SoBackground,
  },
  {
    name: "地理",
    id: "Ge",
    borderColor: SubjectColor.SoBorder,
    backgroundColor: SubjectColor.SoBackground,
  },
  {
    name: "倫理",
    id: "Et",
    borderColor: SubjectColor.SoBorder,
    backgroundColor: SubjectColor.SoBackground,
  },
  {
    name: "情報",
    id: "In",
    borderColor: SubjectColor.InBorder,
    backgroundColor: SubjectColor.InBackground,
  },
  {
    name: "総合1",
    id: "Com1",
    borderColor: SubjectColor.ComBorder,
    backgroundColor: SubjectColor.ComBackground,
  },
  {
    name: "総合2",
    id: "Com2",
    borderColor: SubjectColor.ComBorder,
    backgroundColor: SubjectColor.ComBackground,
  },
  {
    name: "英数",
    id: "EnMt",
    borderColor: SubjectColor.ComBorder,
    backgroundColor: SubjectColor.ComBackground,
  },
  {
    name: "英国",
    id: "EnJa",
    borderColor: SubjectColor.ComBorder,
    backgroundColor: SubjectColor.ComBackground,
  },
];

export const dataSets = [
  { name: "name", headerName: "氏名" },
  { name: "EnScore", headerName: "英語得点" },
  { name: "EnDev", headerName: "英語偏差値" },
  { name: "LiScore", headerName: "リス得点" },
  { name: "LiDev", headerName: "リス偏差値" },
  { name: "EnLiDev", headerName: "英＋Ｌ偏差値" },
  { name: "MtScore", headerName: "数学得点" },
  { name: "MtDev", headerName: "数学偏差値" },
  { name: "Mt1Score", headerName: "数学１得点" },
  { name: "Mt1Dev", headerName: "数学１偏差値" },
  { name: "Mt2Score", headerName: "数学２得点" },
  { name: "Mt2Dev", headerName: "数学２偏差値" },
  { name: "Mt3Score", headerName: "数学３得点" },
  { name: "Mt3Dev", headerName: "数学３偏差値" },
  { name: "Mt12Dev", headerName: "数学１２偏差値" },
  { name: "NJaScore", headerName: "現代文得点" },
  { name: "NJaDev", headerName: "現代文偏差値" },
  { name: "AJaScore", headerName: "現古得点" },
  { name: "AJaDev", headerName: "現古偏差値" },
  { name: "AnScore", headerName: "古文得点" },
  { name: "AnDev", headerName: "古文偏差値" },
  { name: "CJaScore", headerName: "漢文得点" },
  { name: "CJaDev", headerName: "漢文偏差値" },
  { name: "JaScore", headerName: "現古漢得点" },
  { name: "JaDev", headerName: "現古漢偏差値" },
  { name: "JaScore", headerName: "国語得点" },
  { name: "JaDev", headerName: "国語偏差値" },
  { name: "PhScore", headerName: "物理得点" },
  { name: "PhDev", headerName: "物理偏差値" },
  { name: "ChScore", headerName: "化学得点" },
  { name: "ChDev", headerName: "化学偏差値" },
  { name: "BiScore", headerName: "生物得点" },
  { name: "BiDev", headerName: "生物偏差値" },
  { name: "BPhScore", headerName: "物理基礎得点" },
  { name: "BPhDev", headerName: "物理基礎偏差値" },
  { name: "BChScore", headerName: "化学基礎得点" },
  { name: "BChDev", headerName: "化学基礎偏差値" },
  { name: "BBiScore", headerName: "生物基礎得点" },
  { name: "BBiDev", headerName: "生物基礎偏差値" },
  { name: "WHScore", headerName: "世史得点" },
  { name: "WHDev", headerName: "世史偏差値" },
  { name: "JHScore", headerName: "日史得点" },
  { name: "JHDev", headerName: "日史偏差値" },
  { name: "GeScore", headerName: "地理得点" },
  { name: "GeDev", headerName: "地理偏差値" },
  { name: "PEScore", headerName: "政経得点" },
  { name: "PEDev", headerName: "政経偏差値" },
  { name: "EtScore", headerName: "倫理得点" },
  { name: "EtDev", headerName: "倫理偏差値" },
  { name: "InScore", headerName: "情報１得点" },
  { name: "InDev", headerName: "情報１偏差値" },
  { name: "Com1Dev", headerName: "総合１偏差値" },
  { name: "Com1Dev", headerName: "総合１偏差値" },
  { name: "Com2Dev", headerName: "総合２偏差値" },
  { name: "EnMtJaDev", headerName: "英数国偏差値" },
  { name: "EnMtDev", headerName: "英数偏差値" },
  { name: "EnJaDev", headerName: "英国偏差値" },
];