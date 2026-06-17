export default {
  common: {
    search: 'Search part name, code...',
    searchBtn: 'Search',
    loading: 'Loading parts data...',
    loadingDetail: 'Loading part details...',
    back: 'Back to List',
    home: 'Back to Home',
    reset: 'Reset Filters',
    clearFilter: 'Clear Filter',
    viewDetail: 'View Details',
    total: 'Total',
    kinds: 'kinds of parts',
    items: 'items',
    piece: 'pcs',
    skip: 'Skip navigation'
  },
  header: {
    title: 'Tengzhou Mohist Culture Exhibition Hall',
    subtitle: 'Mechanism Parts Catalog'
  },
  footer: {
    copyright: 'Tengzhou Mohist Culture Exhibition Hall © 2024',
    sub: 'Mechanism Parts Catalog · Inheriting Mohist Wisdom'
  },
  home: {
    badge: 'Mechanism Parts Catalog',
    heroTitle: 'Explore the Beauty of Mohist Mechanisms',
    heroDesc1: 'Collection of over 200 Mohist mechanism parts unearthed from Warring States tombs,',
    heroDesc2: 'Browse by three dimensions: function, material, and excavation site',
    browseByCategory: 'Browse by Category',
    allParts: 'All Parts',
    filterFormat: '{dimension}: {category} ({count} items)',
    searchFormat: 'Search: "{query}" ({count} items)',
    allFormat: 'All Parts ({count} items)',
    noResults: 'No matching parts found',
    tryOther: 'Try other categories or keywords'
  },
  dimensions: {
    function: 'Function',
    material: 'Material',
    location: 'Excavation Site',
    functionCategory: 'By Function',
    materialCategory: 'By Material',
    locationCategory: 'By Site',
    categoriesCount: '{count} types'
  },
  functions: {
    '传动': 'Transmission',
    '储能': 'Energy Storage',
    '省力': 'Force Saving',
    '起重': 'Lifting',
    '支撑': 'Support',
    '制动': 'Braking',
    '连接': 'Connection',
    '锁止': 'Locking',
    '控制': 'Control',
    '动力': 'Power',
    '感应': 'Sensing',
    '光学': 'Optics',
    '信号': 'Signal',
    '配重': 'Counterweight',
    '共鸣': 'Resonance',
    '计时': 'Timing'
  },
  materials: {
    '青铜': 'Bronze',
    '兽骨': 'Animal Bone',
    '石料': 'Stone',
    '硬木': 'Hardwood',
    '松香': 'Rosin',
    '赤陶': 'Terracotta',
    '磁石': 'Magnetite',
    '生铁': 'Pig Iron',
    '竹材': 'Bamboo',
    '皮革': 'Leather'
  },
  locations: {
    '邹城墓群': 'Zoucheng Tombs',
    '小邾国墓地': 'Xiao Zhu State Cemetery',
    '滕州一号墓': 'Tengzhou Tomb No.1',
    '滕州二号墓': 'Tengzhou Tomb No.2',
    '滕州三号墓': 'Tengzhou Tomb No.3',
    '薛国故城': 'Xue State Ancient City',
    '滕国贵族墓': 'Teng State Noble Tomb',
    '枣庄墓群': 'Zaozhuang Tombs'
  },
  eras: {
    '春秋末期': 'Late Spring and Autumn',
    '战国早期': 'Early Warring States',
    '战国中期': 'Mid Warring States',
    '战国晚期': 'Late Warring States'
  },
  conditions: {
    '完整': 'Intact',
    '轻微变形': 'Slightly Deformed',
    '轻微锈蚀': 'Slightly Rusted',
    '轻微氧化': 'Slightly Oxidized',
    '部分破损': 'Partially Damaged',
    '皮革残损': 'Leather Damaged'
  },
  detail: {
    breadcrumb: 'Parts Catalog',
    breadcrumbSeparator: '/',
    notFound: 'Part not found',
    notFoundDesc: 'This part may have been removed or the ID is incorrect',
    sketch: 'Technical Drawing',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetZoom: 'Reset',
    function: 'Function',
    material: 'Material',
    location: 'Excavation Site',
    era: 'Era',
    condition: 'Condition',
    dimensions: 'Dimensions',
    length: 'Length',
    width: 'Width',
    height: 'Height',
    diameter: 'Diameter',
    weight: 'Weight',
    dimensionFormat: '{name} {value} {unit}',
    weightFormat: 'Weight: {value} kg',
    lengthLabel: 'L',
    widthLabel: 'W',
    heightLabel: 'H',
    diameterLabel: 'Φ',
    unit: 'cm',
    assemblyTitle: 'Assembly Location'
  },
  language: {
    switch: 'Change Language',
    current: 'Current Language'
  },
  sidebar: {
    title: '{dimension} Categories',
    clearFilter: 'Clear Filter',
    selected: ', selected',
    itemCount: '{count} items',
    totalAria: '{count} kinds of parts in total',
    totalPrefix: 'Total',
    totalSuffix: 'kinds of parts'
  },
  tabs: {
    ariaLabel: 'Category dimension selector',
    categoryCount: '{count} categories',
    categorySuffix: ''
  },
  assembly: {
    title: 'Assembly Location',
    tabsLabel: 'Assembly position selection'
  },
  parts: {} as Record<string, { name: string; description: string }>
}
