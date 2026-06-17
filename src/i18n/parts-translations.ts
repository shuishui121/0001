export interface PartTranslation {
  name: string
  description: string
  mechanismNames: Record<string, string>
  assemblyDescriptions: Record<string, string>
}

const mechanismBaseNames: Record<string, { zh: string; en: string; ja: string }> = {
  '气动机关': { zh: '气动机关', en: 'Pneumatic Mechanism', ja: '気動機関' },
  '日晷计时器': { zh: '日晷计时器', en: 'Sundial Timer', ja: '日時計' },
  '自动导向车': { zh: '自动导向车', en: 'Self-Guiding Chariot', ja: '自動案内車' },
  '司南指南': { zh: '司南指南', en: 'Sinan Compass', ja: '司南指南針' },
  '连弩车': { zh: '连弩车', en: 'Repeating Crossbow Chariot', ja: '連弩車' },
  '机关宝箱': { zh: '机关宝箱', en: 'Puzzle Box', ja: 'からくり箱' },
  '听瓮探测': { zh: '听瓮探测', en: 'Acoustic Detector', ja: '聴甕探知' },
  '吊桥机关': { zh: '吊桥机关', en: 'Drawbridge Mechanism', ja: 'つり橋機関' },
  '机关陷阱': { zh: '机关陷阱', en: 'Trap Mechanism', ja: '機関罠' },
  '刻漏计时器': { zh: '刻漏计时器', en: 'Water Clock', ja: '刻漏時計' },
  '城门机关': { zh: '城门机关', en: 'City Gate Mechanism', ja: '城門機関' },
  '井中汲水器': { zh: '井中汲水器', en: 'Well Pulley', ja: '井戸滑車' },
  '木鸢飞行器': { zh: '木鸢飞行器', en: 'Wooden Kite Aircraft', ja: '木鳶飛行機' },
  '光影机关': { zh: '光影机关', en: 'Light and Shadow Mechanism', ja: '光影機関' },
  '机关木马': { zh: '机关木马', en: 'Wooden Horse Mechanism', ja: '機関木馬' },
  '控制模块': { zh: '控制模块', en: 'Control Module', ja: '制御モジュール' },
  '动力舱': { zh: '动力舱', en: 'Power Compartment', ja: '動力キャビン' },
  '支撑结构': { zh: '支撑结构', en: 'Support Structure', ja: '支持構造' },
  '核心部位': { zh: '核心部位', en: 'Core Location', ja: '核心部位' },
  '传动系统': { zh: '传动系统', en: 'Transmission System', ja: '伝動システム' }
}

function generatePartName(prefix: string, num: string, variant: string, locale: 'zh' | 'en' | 'ja'): string {
  const prefixMap: Record<string, { zh: string; en: string; ja: string }> = {
    gear: { zh: '齿轮', en: 'Gear', ja: '歯車' },
    support: { zh: '支撑件', en: 'Support', ja: '支持部品' },
    spring: { zh: '弹簧件', en: 'Spring', ja: 'バネ部品' },
    power: { zh: '动力件', en: 'Power Unit', ja: '動力部品' },
    link: { zh: '连接件', en: 'Linkage', ja: '接続部品' },
    control: { zh: '控制件', en: 'Control', ja: '制御部品' },
    sensor: { zh: '感应件', en: 'Sensor', ja: '感知部品' },
    lever: { zh: '杠杆件', en: 'Lever', ja: 'てこ部品' },
    pulley: { zh: '滑轮件', en: 'Pulley', ja: '滑車部品' },
    brake: { zh: '制动件', en: 'Brake', ja: '制動部品' },
    lock: { zh: '锁止件', en: 'Lock', ja: 'ロック部品' },
    mirror: { zh: '光学件', en: 'Mirror/Optics', ja: '光学部品' },
    signal: { zh: '信号件', en: 'Signal', ja: '信号部品' },
    weight: { zh: '配重件', en: 'Weight', ja: 'カウンターウェイト' },
    resonate: { zh: '共鸣件', en: 'Resonator', ja: '共鳴部品' },
    timer: { zh: '计时件', en: 'Timer', ja: '計時部品' }
  }

  const variantMap: Record<string, { zh: string; en: string; ja: string }> = {
    '': { zh: '', en: '', ja: '' },
    '乙': { zh: '乙', en: 'B', ja: '乙' },
    '丙': { zh: '丙', en: 'C', ja: '丙' },
    '丁': { zh: '丁', en: 'D', ja: '丁' }
  }

  const p = prefixMap[prefix] || prefixMap.gear
  const v = variantMap[variant] || { zh: variant, en: variant, ja: variant }

  if (locale === 'zh') {
    return `${p.zh}${v.zh} No.${num}`
  } else if (locale === 'en') {
    return `${p.en}${v.en ? ' ' + v.en : ''} #${num}`
  } else {
    return `${p.ja}${v.ja} No.${num}`
  }
}

function generateDescription(
  prefix: string,
  variant: string,
  material: string,
  location: string,
  era: string,
  condition: string,
  func: string,
  locale: 'zh' | 'en' | 'ja'
): string {
  const materials: Record<string, { zh: string; en: string; ja: string }> = {
    '青铜': { zh: '青铜质地', en: 'Made of Bronze', ja: '青銅製' },
    '兽骨': { zh: '兽骨质地', en: 'Made of Animal Bone', ja: '獣骨製' },
    '石料': { zh: '石料质地', en: 'Made of Stone', ja: '石材製' },
    '硬木': { zh: '硬木质地', en: 'Made of Hardwood', ja: '堅木製' },
    '松香': { zh: '松香质地', en: 'Made of Rosin', ja: '松脂製' },
    '赤陶': { zh: '赤陶质地', en: 'Made of Terracotta', ja: '赤陶製' },
    '磁石': { zh: '磁石质地', en: 'Made of Magnetite', ja: '磁石製' },
    '生铁': { zh: '生铁质地', en: 'Made of Pig Iron', ja: '銑鉄製' },
    '竹材': { zh: '竹材质地', en: 'Made of Bamboo', ja: '竹材製' },
    '皮革': { zh: '皮革质地', en: 'Made of Leather', ja: '皮革製' }
  }

  const eras: Record<string, { zh: string; en: string; ja: string }> = {
    '春秋末期': { zh: '春秋末期作品', en: 'Late Spring and Autumn Period', ja: '春秋末期の作品' },
    '战国早期': { zh: '战国早期作品', en: 'Early Warring States Period', ja: '戦国早期の作品' },
    '战国中期': { zh: '战国中期作品', en: 'Mid Warring States Period', ja: '戦国中期の作品' },
    '战国晚期': { zh: '战国晚期作品', en: 'Late Warring States Period', ja: '戦国晚期の作品' }
  }

  const conditions: Record<string, { zh: string; en: string; ja: string }> = {
    '完整': { zh: '完整', en: 'Intact', ja: '完全' },
    '轻微变形': { zh: '轻微变形', en: 'Slightly Deformed', ja: '軽微な変形' },
    '轻微锈蚀': { zh: '轻微锈蚀', en: 'Slightly Rusted', ja: '軽微な錆' },
    '轻微氧化': { zh: '轻微氧化', en: 'Slightly Oxidized', ja: '軽微な酸化' },
    '部分破损': { zh: '部分破损', en: 'Partially Damaged', ja: '一部破損' },
    '皮革残损': { zh: '皮革残损', en: 'Leather Components Damaged', ja: '皮革の損傷' }
  }

  const functions: Record<string, { zh: string; en: string; ja: string }> = {
    '传动': { zh: '传动类', en: 'Transmission-type', ja: '伝動系' },
    '储能': { zh: '储能类', en: 'Energy Storage-type', ja: '蓄エネ系' },
    '省力': { zh: '省力类', en: 'Force Saving-type', ja: '省力系' },
    '起重': { zh: '起重类', en: 'Lifting-type', ja: '揚重系' },
    '支撑': { zh: '支撑类', en: 'Support-type', ja: '支持系' },
    '制动': { zh: '制动类', en: 'Braking-type', ja: '制動系' },
    '连接': { zh: '连接类', en: 'Connection-type', ja: '接続系' },
    '锁止': { zh: '锁止类', en: 'Locking-type', ja: 'ロック系' },
    '控制': { zh: '控制类', en: 'Control-type', ja: '制御系' },
    '动力': { zh: '动力类', en: 'Power-type', ja: '動力系' },
    '感应': { zh: '感应类', en: 'Sensing-type', ja: '感知系' },
    '光学': { zh: '光学类', en: 'Optics-type', ja: '光学系' },
    '信号': { zh: '信号类', en: 'Signal-type', ja: '信号系' },
    '配重': { zh: '配重类', en: 'Counterweight-type', ja: 'カウンターウェイト系' },
    '共鸣': { zh: '共鸣类', en: 'Resonance-type', ja: '共鳴系' },
    '计时': { zh: '计时类', en: 'Timing-type', ja: '計時系' }
  }

  const m = materials[material] || { zh: material, en: material, ja: material }
  const e = eras[era] || { zh: era, en: era, ja: era }
  const c = conditions[condition] || { zh: condition, en: condition, ja: condition }
  const f = functions[func] || { zh: func, en: func, ja: func }

  if (locale === 'zh') {
    return `${variant ? variant + '型，' : ''}${m.zh}，出土于${location}。${e.zh}，${c.zh}。用于${f.zh}墨家机关。`
  } else if (locale === 'en') {
    return `${variant ? variant + ' variant, ' : ''}${m.en}, unearthed at ${location}. ${e.en}, ${c.en}. Used for ${f.en} Mohist mechanisms.`
  } else {
    return `${variant ? variant + '型、' : ''}${m.ja}、${location}から出土。${e.ja}、${c.ja}。${f.ja}墨家機関に使用。`
  }
}

function getOriginalPartInfo(id: string) {
  const prefix = id.split('-')[0]
  const numStr = id.split('-')[1]
  const num = parseInt(numStr)
  const baseNum = ((num - 1) % 26) + 1
  const variantIndex = Math.floor((num - 1) / 26)
  const variants = ['', '乙', '丙', '丁']
  const variant = variants[variantIndex] || ''
  return { prefix, numStr: String(num), baseNum: String(baseNum), variant }
}

export function translatePartId(
  id: string,
  original: { name: string; description: string; function: string; material: string; location: string; era?: string; condition?: string },
  locale: 'zh-CN' | 'en-US' | 'ja-JP'
): { name: string; description: string } {
  const { prefix, numStr, variant } = getOriginalPartInfo(id)
  const loc = locale.split('-')[0] as 'zh' | 'en' | 'ja'

  return {
    name: generatePartName(prefix, numStr, variant, loc),
    description: generateDescription(
      prefix,
      variant,
      original.material,
      original.location,
      original.era || '战国早期',
      original.condition || '完整',
      original.function,
      loc
    )
  }
}

export function translateMechanismName(name: string, locale: 'zh-CN' | 'en-US' | 'ja-JP'): string {
  const loc = locale.split('-')[0] as 'zh' | 'en' | 'ja'
  if (mechanismBaseNames[name]) {
    return mechanismBaseNames[name][loc]
  }
  return name
}

export function translateAssemblyDescription(desc: string, locale: 'zh-CN' | 'en-US' | 'ja-JP'): string {
  const loc = locale.split('-')[0] as 'zh' | 'en' | 'ja'

  const patterns: { match: RegExp; replace: (m: RegExpMatchArray, loc: 'zh' | 'en' | 'ja') => string }[] = [
    {
      match: /装配于(.+?)(控制模块|动力舱|支撑结构|核心部位|传动系统)$/,
      replace: (m, l) => {
        const mech = translateMechanismName(m[1], locale)
        const partMap: Record<string, { zh: string; en: string; ja: string }> = {
          '控制模块': { zh: '控制模块', en: 'Control Module', ja: '制御モジュール' },
          '动力舱': { zh: '动力舱', en: 'Power Compartment', ja: '動力キャビン' },
          '支撑结构': { zh: '支撑结构', en: 'Support Structure', ja: '支持構造' },
          '核心部位': { zh: '核心部位', en: 'Core Component', ja: '核心部位' },
          '传动系统': { zh: '传动系统', en: 'Transmission System', ja: '伝動システム' }
        }
        const part = partMap[m[2]] || { zh: m[2], en: m[2], ja: m[2] }
        if (l === 'zh') return `装配于${mech}${part.zh}`
        if (l === 'en') return `Assembled in ${mech} ${part.en}`
        return `${mech}${part.ja}に組み立て`
      }
    }
  ]

  for (const p of patterns) {
    const match = desc.match(p.match)
    if (match) {
      return p.replace(match, loc)
    }
  }

  if (loc === 'zh') return desc
  if (loc === 'en') return `Assembled in: ${desc}`
  return `組立位置：${desc}`
}
