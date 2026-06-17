export default {
  common: {
    search: '部品名、コードを検索...',
    searchBtn: '検索',
    loading: '部品データを読み込み中...',
    loadingDetail: '部品詳細を読み込み中...',
    back: 'リストに戻る',
    home: 'ホームに戻る',
    reset: 'フィルターをリセット',
    clearFilter: 'フィルターをクリア',
    viewDetail: '詳細を見る',
    total: '合計',
    kinds: '種類の部品',
    items: '点',
    piece: '点',
    skip: 'ナビゲーションをスキップ'
  },
  header: {
    title: '滕州墨家文化展覧館',
    subtitle: '機構部品図鑑'
  },
  footer: {
    copyright: '滕州墨家文化展覧館 © 2024',
    sub: '機構部品図鑑 · 墨家の知恵を伝承'
  },
  home: {
    badge: '機構部品図鑑',
    heroTitle: '墨家機構の美を探索する',
    heroDesc1: '戦国時代の墓から出土した200種類以上の墨家機構部品を集め、',
    heroDesc2: '機能・素材・出土地点の3つの次元で分類閲覧',
    browseByCategory: 'カテゴリーで閲覧',
    allParts: '全ての部品',
    filterFormat: '{dimension}：{category}（計 {count} 点）',
    searchFormat: '検索："{query}"（計 {count} 点）',
    allFormat: '全ての部品（計 {count} 点）',
    noResults: '一致する部品が見つかりません',
    tryOther: '他のカテゴリーやキーワードを試してください'
  },
  dimensions: {
    function: '機能',
    material: '素材',
    location: '出土地点',
    functionCategory: '機能別分類',
    materialCategory: '素材別分類',
    locationCategory: '地点別分類',
    categoriesCount: '{count}種類'
  },
  functions: {
    '传动': '伝動',
    '储能': '蓄エネ',
    '省力': '省力',
    '起重': '揚重',
    '支撑': '支持',
    '制动': '制動',
    '连接': '接続',
    '锁止': 'ロック',
    '控制': '制御',
    '动力': '動力',
    '感应': '感知',
    '光学': '光学',
    '信号': '信号',
    '配重': 'カウンターウェイト',
    '共鸣': '共鳴',
    '计时': '計時'
  },
  materials: {
    '青铜': '青銅',
    '兽骨': '獣骨',
    '石料': '石材',
    '硬木': '堅木',
    '松香': '松脂',
    '赤陶': '赤陶',
    '磁石': '磁石',
    '生铁': '銑鉄',
    '竹材': '竹材',
    '皮革': '皮革'
  },
  locations: {
    '邹城墓群': '邹城墓群',
    '小邾国墓地': '小邾国墓地',
    '滕州一号墓': '滕州一号墓',
    '滕州二号墓': '滕州二号墓',
    '滕州三号墓': '滕州三号墓',
    '薛国故城': '薛国故城',
    '滕国贵族墓': '滕国貴族墓',
    '枣庄墓群': '棗荘墓群'
  },
  eras: {
    '春秋末期': '春秋末期',
    '战国早期': '戦国早期',
    '战国中期': '戦国中期',
    '战国晚期': '戦国晚期'
  },
  conditions: {
    '完整': '完全',
    '轻微变形': '軽微な変形',
    '轻微锈蚀': '軽微な錆',
    '轻微氧化': '軽微な酸化',
    '部分破损': '一部破損',
    '皮革残损': '皮革の損傷'
  },
  detail: {
    breadcrumb: '部品図鑑',
    breadcrumbSeparator: '/',
    notFound: '部品が見つかりません',
    notFoundDesc: 'この部品は削除されたか、IDが正しくない可能性があります',
    sketch: '線稿図',
    zoomIn: '拡大',
    zoomOut: '縮小',
    resetZoom: 'リセット',
    function: '機能',
    material: '素材',
    location: '出土地点',
    era: '年代',
    condition: '保存状態',
    dimensions: '寸法パラメータ',
    length: '長さ',
    width: '幅',
    height: '高さ',
    diameter: '直径',
    weight: '重量',
    dimensionFormat: '{name} {value} {unit}',
    weightFormat: '重さ {value} kg',
    lengthLabel: '長',
    widthLabel: '幅',
    heightLabel: '高',
    diameterLabel: '直径',
    unit: 'cm',
    assemblyTitle: '組立位置図'
  },
  language: {
    switch: '言語を切り替え',
    current: '現在の言語'
  },
  sidebar: {
    title: '{dimension}分類',
    clearFilter: 'フィルターをクリア',
    selected: '、選択済み',
    itemCount: '{count}点',
    totalAria: '合計{count}種類の部品',
    totalPrefix: '合計',
    totalSuffix: '種類の部品'
  },
  tabs: {
    ariaLabel: '分類次元の選択',
    categoryCount: '{count}件の分類',
    categorySuffix: '種類'
  },
  assembly: {
    title: '組立位置図',
    tabsLabel: '組立位置の選択'
  },
  parts: {} as Record<string, { name: string; description: string }>
}
