export default {
  common: {
    search: '搜索零件名称、编号...',
    searchBtn: '搜索',
    loading: '正在加载零件数据...',
    loadingDetail: '正在加载零件详情...',
    back: '返回列表',
    home: '返回首页',
    reset: '重置筛选',
    clearFilter: '清除筛选',
    viewDetail: '查看详情',
    total: '共',
    kinds: '种零件',
    items: '件',
    piece: '件',
    skip: '跳过导航'
  },
  header: {
    title: '滕州墨家文化展览馆',
    subtitle: '机关零件图鉴'
  },
  footer: {
    copyright: '滕州墨家文化展览馆 © 2024',
    sub: '机关零件图鉴 · 传承墨家智慧'
  },
  home: {
    badge: '机关零件图鉴',
    heroTitle: '探索墨家机关之美',
    heroDesc1: '汇集战国墓群出土的两百余种墨家机关零件，',
    heroDesc2: '按功用、材质、出土地点三种维度分类浏览',
    browseByCategory: '分类浏览',
    allParts: '全部零件',
    filterFormat: '{dimension}：{category}（共 {count} 件）',
    searchFormat: '搜索："{query}"（共 {count} 件）',
    allFormat: '全部零件（共 {count} 件）',
    noResults: '未找到匹配的零件',
    tryOther: '试试其他分类或关键词'
  },
  dimensions: {
    function: '功用',
    material: '材质',
    location: '出土地点',
    functionCategory: '功用分类',
    materialCategory: '材质分类',
    locationCategory: '出土地点分类',
    categoriesCount: '{count}类'
  },
  functions: {
    '传动': '传动',
    '储能': '储能',
    '省力': '省力',
    '起重': '起重',
    '支撑': '支撑',
    '制动': '制动',
    '连接': '连接',
    '锁止': '锁止',
    '控制': '控制',
    '动力': '动力',
    '感应': '感应',
    '光学': '光学',
    '信号': '信号',
    '配重': '配重',
    '共鸣': '共鸣',
    '计时': '计时'
  },
  materials: {
    '青铜': '青铜',
    '兽骨': '兽骨',
    '石料': '石料',
    '硬木': '硬木',
    '松香': '松香',
    '赤陶': '赤陶',
    '磁石': '磁石',
    '生铁': '生铁',
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
    '滕国贵族墓': '滕国贵族墓',
    '枣庄墓群': '枣庄墓群'
  },
  eras: {
    '春秋末期': '春秋末期',
    '战国早期': '战国早期',
    '战国中期': '战国中期',
    '战国晚期': '战国晚期'
  },
  conditions: {
    '完整': '完整',
    '轻微变形': '轻微变形',
    '轻微锈蚀': '轻微锈蚀',
    '轻微氧化': '轻微氧化',
    '部分破损': '部分破损',
    '皮革残损': '皮革残损'
  },
  detail: {
    breadcrumb: '零件图鉴',
    breadcrumbSeparator: '/',
    notFound: '未找到该零件',
    notFoundDesc: '可能该零件已被移除或编号有误',
    sketch: '线稿图',
    zoomIn: '放大',
    zoomOut: '缩小',
    resetZoom: '重置',
    function: '功用',
    material: '材质',
    location: '出土地点',
    era: '年代',
    condition: '保存状态',
    dimensions: '尺寸参数',
    length: '长度',
    width: '宽度',
    height: '高度',
    diameter: '直径',
    weight: '重量',
    dimensionFormat: '{name} {value} {unit}',
    weightFormat: '重 {value} kg',
    lengthLabel: '长',
    widthLabel: '宽',
    heightLabel: '高',
    diameterLabel: '直径',
    unit: 'cm',
    assemblyTitle: '装配位置示意'
  },
  language: {
    switch: '切换语言',
    current: '当前语言'
  },
  sidebar: {
    title: '{dimension}分类',
    clearFilter: '清除筛选',
    selected: '，已选中',
    itemCount: '{count}件',
    totalAria: '共{count}种零件',
    totalPrefix: '共',
    totalSuffix: '种零件'
  },
  tabs: {
    ariaLabel: '分类维度选择',
    categoryCount: '{count}个分类',
    categorySuffix: '类'
  },
  assembly: {
    title: '装配位置示意',
    tabsLabel: '装配位置选择'
  },
  parts: {} as Record<string, { name: string; description: string }>
}
