const fs = require('fs')
const path = require('path')

const FUNCTIONS = [
  { name: '传动', icon: 'gear', count: 40 },
  { name: '支撑', icon: 'support', count: 30 },
  { name: '储能', icon: 'spring', count: 25 },
  { name: '动力', icon: 'power', count: 20 },
  { name: '连接', icon: 'link', count: 18 },
  { name: '控制', icon: 'control', count: 15 },
  { name: '感应', icon: 'sensor', count: 12 },
  { name: '省力', icon: 'lever', count: 10 },
  { name: '起重', icon: 'pulley', count: 8 },
  { name: '制动', icon: 'brake', count: 8 },
  { name: '锁止', icon: 'lock', count: 6 },
  { name: '光学', icon: 'mirror', count: 5 },
  { name: '信号', icon: 'signal', count: 5 },
  { name: '配重', icon: 'weight', count: 4 },
  { name: '共鸣', icon: 'resonate', count: 4 },
  { name: '计时', icon: 'timer', count: 5 },
]

const MATERIALS = ['青铜', '硬木', '磁石', '皮革', '石料', '赤陶', '竹材', '兽骨', '松香', '生铁']
const LOCATIONS = ['滕州一号墓', '滕州二号墓', '滕州三号墓', '枣庄墓群', '邹城墓群', '薛国故城', '小邾国墓地', '滕国贵族墓']
const ERAS = ['战国早期', '战国中期', '战国晚期', '春秋末期']
const CONDITIONS = ['完整', '轻微锈蚀', '部分破损', '轻微变形', '皮革残损', '轻微氧化']

const MECHANISMS = [
  { name: '连弩车', image: '/images/mechanisms/crossbow-carriage.svg' },
  { name: '木鸢飞行器', image: '/images/mechanisms/wooden-kite.svg' },
  { name: '机关木马', image: '/images/mechanisms/wooden-horse.svg' },
  { name: '机关陷阱', image: '/images/mechanisms/trap.svg' },
  { name: '吊桥机关', image: '/images/mechanisms/drawbridge.svg' },
  { name: '城门机关', image: '/images/mechanisms/city-gate.svg' },
  { name: '井中汲水器', image: '/images/mechanisms/well-pulley.svg' },
  { name: '机关宝箱', image: '/images/mechanisms/secret-box.svg' },
  { name: '刻漏计时器', image: '/images/mechanisms/water-clock.svg' },
  { name: '气动机关', image: '/images/mechanisms/pneumatic-device.svg' },
  { name: '司南指南', image: '/images/mechanisms/sinan-compass.svg' },
  { name: '自动导向车', image: '/images/mechanisms/south-pointing-chariot.svg' },
  { name: '光影机关', image: '/images/mechanisms/light-shadow.svg' },
  { name: '听瓮探测', image: '/images/mechanisms/acoustic-detector.svg' },
  { name: '日晷计时器', image: '/images/mechanisms/sundial.svg' },
]

const NAME_PREFIXES = {
  '传动': ['青铜主齿轮', '铜制从动齿轮', '曲柄连杆', '铜链传动', '差动齿轮', '转向曲柄', '蜗杆传动', '铜制凸轮', '带传动轮', '螺旋传动杆'],
  '支撑': ['铜制托架', '三脚架', '木轴铜套轴承', '车轴总成', '十字支撑架', '悬臂支架', '减震弹簧座', '回转支承', '定位支架', '导向滑座'],
  '储能': ['扭力弹簧', '涡卷弹簧', '铜制飞轮', '重锤储能器', '橡皮筋束', '气压储能罐', '液压储能腔', '板簧组'],
  '动力': ['木质活塞', '皮革风囊', '木质气缸', '重力驱动轮', '蒸汽小缸', '发条动力盒', '水力转轮', '人力脚踏曲柄'],
  '连接': ['铜合页', '铜制插销', '万向接头', '花键轴套', '快速卡扣', '燕尾槽滑块', '螺纹连接杆', '弹性联轴器'],
  '控制': ['铜制凸轮', '单向阀门', '行程挡板', '调速离心锤', '切换拨叉', '压力调节阀', '定时释放销', '方向控制阀'],
  '感应': ['磁石定向器', '振动膜片', '水银开关', '光敏竹片', '热敏双金属片', '声敏铜铃', '触须微动杆', '平衡重感应'],
  '省力': ['木质省力杠杆', '复合滑轮组', '斜面推块', '蜗杆减速器', '齿轮减速箱', '轮轴省力器', '螺旋千斤顶', '肘节增力机构'],
  '起重': ['铜制滑轮组', '手动绞车', '棘轮卷扬筒', '定滑轮支架', '动滑轮吊钩', '平衡吊臂', '齿条升降杆', '链条提升机'],
  '制动': ['铜制棘轮机构', '带式制动器', '块式刹车片', '离心限速器', '单向超越离合器', '电磁制动盘', '楔形制动块', '制动凸轮'],
  '锁止': ['自动木闩', '弹簧定位销', '偏心锁紧轮', '斜面自锁块', '卡扣锁舌', '螺旋锁紧套', '磁力锁止器', '重力锁钩'],
  '光学': ['铜制反光镜', '水晶聚光透镜', '凹面铜镜', '透光玉片', '光影光栅盘', '折射水晶柱', '反射铜棱镜', '分光竹片架'],
  '信号': ['铜制哨簧', '信号铜铃', '烟火发令管', '反光信号牌', '振动蜂鸣片', '气压信号管', '拉线信号锤', '敲击铜钟'],
  '配重': ['铜权配重', '铅块配重', '石质配重', '铁砂配重袋', '水银平衡罐', '调节重锤', '滑动配重块', '悬挂配重头'],
  '共鸣': ['铜制共鸣器', '陶制共鸣缸', '竹制共鸣管', '兽皮共鸣鼓', '铜铃共鸣腔', '石磬共鸣板', '多层共鸣盒', '薄膜共鸣器'],
  '计时': ['日晷刻度盘', '刻漏浮标', '齿轮计时链', '摆轮擒纵器', '沙漏支架', '香篆刻度盘', '水钟调节阀', '定时凸轮盘'],
}

function seededRandom(seed) {
  let s = seed
  return function() {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function pick(arr, rand) {
  return arr[Math.floor(rand() * arr.length)]
}

function generateSVG(part, variant, rand) {
  const color1 = '#5C4033'
  const color2 = '#C4A35A'
  const color3 = '#7A5A47'
  const bg = '#F9F5ED'
  const fill = '#F5F0E8'
  const fill2 = '#E8DFD0'
  
  let shapes = ''
  const cx = 100, cy = 100
  
  switch (part.iconType) {
    case 'gear': {
      const teeth = 12 + Math.floor(rand() * 12)
      const r1 = 50 + rand() * 10
      const r2 = r1 - 10
      const r3 = 15 + rand() * 10
      let gearPath = ''
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2
        const a2 = ((i + 0.3) / teeth) * Math.PI * 2
        const a3 = ((i + 0.5) / teeth) * Math.PI * 2
        const a4 = ((i + 0.8) / teeth) * Math.PI * 2
        const x1 = cx + Math.cos(a1) * r1
        const y1 = cy + Math.sin(a1) * r1
        const x2 = cx + Math.cos(a2) * (r1 + 8)
        const y2 = cy + Math.sin(a2) * (r1 + 8)
        const x3 = cx + Math.cos(a3) * (r1 + 8)
        const y3 = cy + Math.sin(a3) * (r1 + 8)
        const x4 = cx + Math.cos(a4) * r1
        const y4 = cy + Math.sin(a4) * r1
        gearPath += `L${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} L${x4.toFixed(1)},${y4.toFixed(1)} `
      }
      shapes = `
        <circle cx="${cx}" cy="${cy}" r="${r1 + 15}" stroke="${color2}" stroke-width="1" stroke-dasharray="4,3" fill="none"/>
        <path d="M${cx + r1},${cy} ${gearPath}Z" stroke="${color1}" stroke-width="2" fill="${fill}"/>
        <circle cx="${cx}" cy="${cy}" r="${r2}" stroke="${color1}" stroke-width="1.5" fill="none"/>
        <circle cx="${cx}" cy="${cy}" r="${r3}" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <circle cx="${cx}" cy="${cy}" r="${r3 * 0.4}" stroke="${color1}" stroke-width="1.5" fill="${color2}"/>
        ${[0, 60, 120, 180, 240, 300].slice(0, 3 + Math.floor(rand() * 3)).map(a => {
          const rad = a * Math.PI / 180
          const rr = (r2 + r3) / 2
          return `<circle cx="${(cx + Math.cos(rad) * rr).toFixed(1)}" cy="${(cy + Math.sin(rad) * rr).toFixed(1)}" r="${4 + rand() * 3}" stroke="${color3}" stroke-width="1" fill="${fill2}"/>`
        }).join('')}
      `
      break
    }
    case 'spring': {
      const coils = 5 + Math.floor(rand() * 5)
      let path = ''
      const amp = 25 + rand() * 10
      for (let i = 0; i <= coils * 20; i++) {
        const t = i / (coils * 20)
        const x = cx - 50 + t * 100
        const y = cy + Math.sin(t * coils * Math.PI * 2) * amp
        path += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' '
      }
      shapes = `
        <rect x="30" y="${cy - 35}" width="15" height="70" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <rect x="155" y="${cy - 35}" width="15" height="70" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <path d="${path}" stroke="${color3}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy}" r="45" stroke="${color2}" stroke-width="1" stroke-dasharray="3,3" fill="none"/>
      `
      break
    }
    case 'lever': {
      const angle = (rand() * 20 - 10) * Math.PI / 180
      const len = 80
      const pivotX = cx + Math.cos(angle) * (rand() * 20 - 10)
      const pivotY = cy + Math.sin(angle) * (rand() * 10 - 5)
      shapes = `
        <path d="M${pivotX - 15},${cy + 40} L${pivotX},${cy + 15} L${pivotX + 15},${cy + 40} Z" stroke="${color1}" stroke-width="2" fill="${color3}"/>
        <line x1="${(pivotX - len * Math.cos(angle)).toFixed(1)}" y1="${(pivotY - len * Math.sin(angle)).toFixed(1)}" x2="${(pivotX + len * Math.cos(angle)).toFixed(1)}" y2="${(pivotY + len * Math.sin(angle)).toFixed(1)}" stroke="${color1}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="${pivotX}" cy="${pivotY}" r="6" stroke="${color1}" stroke-width="2" fill="${color2}"/>
        <circle cx="${(pivotX - len * 0.8 * Math.cos(angle)).toFixed(1)}" cy="${(pivotY - len * 0.8 * Math.sin(angle) - 20).toFixed(1)}" r="10" stroke="${color3}" stroke-width="2" fill="${fill2}"/>
        <text x="${(pivotX - len * 0.8 * Math.cos(angle)).toFixed(1)}" y="${(pivotY - len * 0.8 * Math.sin(angle) - 17).toFixed(1)}" text-anchor="middle" font-size="10" fill="${color1}">重</text>
      `
      break
    }
    case 'pulley': {
      const n = 2 + Math.floor(rand() * 2)
      shapes = `<rect x="70" y="25" width="60" height="10" stroke="${color1}" stroke-width="2" fill="${color3}"/>`
      for (let i = 0; i < n; i++) {
        const px = 85 + i * 30
        shapes += `
          <line x1="${px}" y1="35" x2="${px}" y2="${cy - 25}" stroke="${color3}" stroke-width="1.5"/>
          <circle cx="${px}" cy="${cy}" r="22" stroke="${color1}" stroke-width="2" fill="${fill}"/>
          <circle cx="${px}" cy="${cy}" r="6" stroke="${color1}" stroke-width="1.5" fill="${color2}"/>
        `
      }
      if (n > 1) {
        shapes += `
          <path d="M85,78 Q100,110 115,78 Q130,110 145,78" stroke="${color3}" stroke-width="2" fill="none"/>
        `
      }
      shapes += `
        <path d="M${80 + (n - 1) * 15},${cy + 22} L${80 + (n - 1) * 15},160" stroke="${color3}" stroke-width="1.5"/>
        <path d="M${70 + (n - 1) * 15},160 L${90 + (n - 1) * 15},160 L${88 + (n - 1) * 15},175 L${72 + (n - 1) * 15},175 Z" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
      `
      break
    }
    case 'support': {
      const type = Math.floor(rand() * 3)
      if (type === 0) {
        shapes = `
          <rect x="80" y="40" width="40" height="10" stroke="${color1}" stroke-width="2" fill="${color3}"/>
          <rect x="85" y="50" width="8" height="110" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
          <rect x="107" y="50" width="8" height="110" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
          <rect x="70" y="160" width="60" height="10" stroke="${color1}" stroke-width="2" fill="${color3}"/>
          <line x1="89" y1="80" x2="111" y2="130" stroke="${color3}" stroke-width="1.5"/>
          <line x1="111" y1="80" x2="89" y2="130" stroke="${color3}" stroke-width="1.5"/>
        `
      } else if (type === 1) {
        shapes = `
          <circle cx="${cx}" cy="60" r="20" stroke="${color1}" stroke-width="2" fill="${fill}"/>
          <circle cx="${cx}" cy="60" r="8" stroke="${color1}" stroke-width="1.5" fill="${color2}"/>
          <rect x="90" y="80" width="20" height="80" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
          <line x1="70" y1="100" x2="90" y2="85" stroke="${color3}" stroke-width="2"/>
          <line x1="130" y1="100" x2="110" y2="85" stroke="${color3}" stroke-width="2"/>
          <line x1="70" y1="100" x2="70" y2="165" stroke="${color3}" stroke-width="2"/>
          <line x1="130" y1="100" x2="130" y2="165" stroke="${color3}" stroke-width="2"/>
          <line x1="55" y1="165" x2="145" y2="165" stroke="${color1}" stroke-width="2"/>
        `
      } else {
        shapes = `
          <path d="M60,160 L80,60 L100,60 L140,160 M90,100 L110,100" stroke="${color1}" stroke-width="2" fill="${fill}"/>
          <rect x="75" y="50" width="50" height="12" stroke="${color1}" stroke-width="2" fill="${color3}"/>
        `
      }
      break
    }
    case 'brake': {
      shapes = `
        <circle cx="${cx}" cy="${cy}" r="45" stroke="${color1}" stroke-width="3" fill="${fill}"/>
        <circle cx="${cx}" cy="${cy}" r="10" stroke="${color1}" stroke-width="2" fill="${color2}"/>
        <path d="M40,70 L30,60 L35,55" stroke="${color3}" stroke-width="2" fill="${fill2}"/>
        <path d="M160,70 L170,60 L165,55" stroke="${color3}" stroke-width="2" fill="${fill2}"/>
        <rect x="35" y="75" width="15" height="35" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <rect x="150" y="75" width="15" height="35" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <line x1="42" y1="110" x2="60" y2="${cy}" stroke="${color3}" stroke-width="2"/>
        <line x1="158" y1="110" x2="140" y2="${cy}" stroke="${color3}" stroke-width="2"/>
      `
      break
    }
    case 'link': {
      const type = Math.floor(rand() * 3)
      if (type === 0) {
        shapes = `
          <rect x="40" y="70" width="120" height="60" stroke="${color1}" stroke-width="1.5" fill="${fill}"/>
          <circle cx="60" cy="${cy}" r="15" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
          <circle cx="140" cy="${cy}" r="15" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
          <circle cx="60" cy="${cy}" r="5" stroke="${color1}" stroke-width="1.5" fill="${color1}"/>
          <circle cx="140" cy="${cy}" r="5" stroke="${color1}" stroke-width="1.5" fill="${color1}"/>
          <rect x="55" y="95" width="90" height="10" stroke="${color3}" stroke-width="1.5" fill="${fill2}"/>
        `
      } else if (type === 1) {
        shapes = `
          <path d="M40,60 Q100,30 160,60 Q160,90 100,90 Q40,90 40,60 Z" stroke="${color1}" stroke-width="2" fill="${fill}"/>
          <circle cx="60" cy="60" r="10" stroke="${color3}" stroke-width="1.5" fill="none"/>
          <circle cx="100" cy="60" r="10" stroke="${color3}" stroke-width="1.5" fill="none"/>
          <circle cx="140" cy="60" r="10" stroke="${color3}" stroke-width="1.5" fill="none"/>
        `
      } else {
        shapes = `
          <path d="M${cx},50 L${cx + 30},${cy} L${cx},150 L${cx - 30},${cy} Z" stroke="${color1}" stroke-width="2" fill="${fill}"/>
          <circle cx="${cx}" cy="${cy}" r="12" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
          <circle cx="${cx}" cy="${cy}" r="4" stroke="${color1}" stroke-width="1.5" fill="${color2}"/>
        `
      }
      break
    }
    case 'lock': {
      shapes = `
        <path d="M70,${cy} Q70,60 ${cx},60 Q130,60 130,${cy}" stroke="${color3}" stroke-width="4" fill="none"/>
        <rect x="50" y="${cy}" width="100" height="70" rx="5" stroke="${color1}" stroke-width="2" fill="${fill}"/>
        <circle cx="${cx}" cy="${cy + 35}" r="12" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <rect x="${cx - 3}" y="${cy + 35}" width="6" height="20" stroke="${color1}" stroke-width="1.5" fill="${color3}"/>
      `
      break
    }
    case 'control': {
      shapes = `
        <rect x="50" y="50" width="100" height="100" rx="10" stroke="${color1}" stroke-width="2" fill="${fill}"/>
        <circle cx="${cx}" cy="${cy}" r="30" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <circle cx="${cx}" cy="${cy}" r="8" stroke="${color1}" stroke-width="2" fill="${color2}"/>
        <line x1="${cx}" y1="${cy - 25}" x2="${cx}" y2="${cy - 10}" stroke="${color3}" stroke-width="2"/>
        <line x1="${cx}" y1="${cy + 10}" x2="${cx}" y2="${cy + 25}" stroke="${color3}" stroke-width="2"/>
        <line x1="${cx - 25}" y1="${cy}" x2="${cx - 10}" y2="${cy}" stroke="${color3}" stroke-width="2"/>
        <line x1="${cx + 10}" y1="${cy}" x2="${cx + 25}" y2="${cy}" stroke="${color3}" stroke-width="2"/>
        <circle cx="70" cy="70" r="5" stroke="${color1}" stroke-width="1.5" fill="${color2}"/>
        <circle cx="130" cy="70" r="5" stroke="${color1}" stroke-width="1.5" fill="${fill2}"/>
      `
      break
    }
    case 'power': {
      const type = Math.floor(rand() * 2)
      if (type === 0) {
        shapes = `
          <rect x="60" y="40" width="80" height="120" rx="10" stroke="${color1}" stroke-width="2" fill="${fill}"/>
          <circle cx="${cx}" cy="${cy}" r="25" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
          <path d="M${cx},${cy} m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0" stroke="${color3}" stroke-width="2" fill="none"/>
          <line x1="${cx}" y1="35" x2="${cx}" y2="20" stroke="${color3}" stroke-width="2"/>
          <line x1="${cx}" y1="180" x2="${cx}" y2="165" stroke="${color3}" stroke-width="2"/>
          <rect x="70" y="170" width="60" height="10" stroke="${color1}" stroke-width="2" fill="${color3}"/>
        `
      } else {
        shapes = `
          <path d="M50,50 L50,150 Q100,170 150,150 L150,50 Q100,30 50,50 Z" stroke="${color1}" stroke-width="2" fill="${fill}"/>
          <path d="M60,60 Q100,50 140,60 L140,70 Q100,80 60,70 Z" stroke="${color3}" stroke-width="1.5" fill="${fill2}"/>
          <circle cx="75" cy="${cy}" r="8" stroke="${color1}" stroke-width="2" fill="${color2}"/>
          <circle cx="125" cy="${cy}" r="8" stroke="${color1}" stroke-width="2" fill="${color2}"/>
        `
      }
      break
    }
    case 'sensor': {
      shapes = `
        <rect x="60" y="70" width="80" height="80" rx="8" stroke="${color1}" stroke-width="2" fill="${fill}"/>
        <circle cx="${cx}" cy="${cy}" r="25" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <path d="M${cx - 15},${cy} Q${cx},${cy - 20} ${cx + 15},${cy} Q${cx},${cy + 20} ${cx - 15},${cy}" stroke="${color3}" stroke-width="2" fill="none"/>
        <path d="M${cx - 8},${cy} Q${cx},${cy - 10} ${cx + 8},${cy} Q${cx},${cy + 10} ${cx - 8},${cy}" stroke="${color3}" stroke-width="1.5" fill="none"/>
        <line x1="70" y1="155" x2="60" y2="175" stroke="${color3}" stroke-width="2"/>
        <line x1="90" y1="155" x2="85" y2="180" stroke="${color3}" stroke-width="2"/>
        <line x1="110" y1="155" x2="115" y2="180" stroke="${color3}" stroke-width="2"/>
        <line x1="130" y1="155" x2="140" y2="175" stroke="${color3}" stroke-width="2"/>
      `
      break
    }
    case 'mirror': {
      shapes = `
        <ellipse cx="${cx}" cy="${cy}" rx="50" ry="55" stroke="${color1}" stroke-width="3" fill="${fill}"/>
        <ellipse cx="${cx}" cy="${cy}" rx="40" ry="45" stroke="${color2}" stroke-width="1.5" fill="${fill2}"/>
        <path d="M80,70 Q100,60 120,70" stroke="${color2}" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M75,90 Q100,80 125,90" stroke="${color2}" stroke-width="1.5" fill="none" opacity="0.5"/>
        <rect x="90" y="150" width="20" height="25" stroke="${color1}" stroke-width="2" fill="${color3}"/>
        <rect x="75" y="170" width="50" height="8" stroke="${color1}" stroke-width="2" fill="${color3}"/>
      `
      break
    }
    case 'signal': {
      shapes = `
        <rect x="80" y="80" width="40" height="60" rx="5" stroke="${color1}" stroke-width="2" fill="${fill}"/>
        <circle cx="90" cy="95" r="5" stroke="${color3}" stroke-width="1.5" fill="${color2}"/>
        <circle cx="110" cy="95" r="5" stroke="${color3}" stroke-width="1.5" fill="${fill2}"/>
        <path d="M85,110 Q100,120 115,110 L115,125 Q100,130 85,125 Z" stroke="${color1}" stroke-width="1.5" fill="${fill2}"/>
        <line x1="100" y1="140" x2="100" y2="170" stroke="${color1}" stroke-width="3"/>
        <path d="M60,170 L100,150 L140,170 Z" stroke="${color1}" stroke-width="2" fill="${color3}"/>
        <path d="M125,70 Q145,60 140,85" stroke="${color2}" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/>
        <path d="M125,85 Q150,80 145,105" stroke="${color2}" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/>
      `
      break
    }
    case 'weight': {
      shapes = `
        <rect x="65" y="60" width="70" height="15" stroke="${color1}" stroke-width="2" fill="${color3}"/>
        <path d="M70,75 L80,75 L85,150 L65,150 Z" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <path d="M130,75 L120,75 L115,150 L135,150 Z" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <rect x="60" y="150" width="80" height="25" rx="5" stroke="${color1}" stroke-width="2" fill="${fill}"/>
        <text x="${cx}" y="168" text-anchor="middle" font-size="12" font-family="SimSun, serif" fill="${color1}" font-weight="bold">权</text>
        <circle cx="${cx}" cy="68" r="5" stroke="${color1}" stroke-width="1.5" fill="none"/>
        <line x1="${cx}" y1="45" x2="${cx}" y2="63" stroke="${color3}" stroke-width="1.5"/>
      `
      break
    }
    case 'resonate': {
      shapes = `
        <path d="M50,60 L50,140 Q${cx},170 150,140 L150,60 Q${cx},50 50,60 Z" stroke="${color1}" stroke-width="2" fill="${fill}"/>
        <path d="M70,80 Q${cx},75 130,80 L130,95 Q${cx},100 70,95 Z" stroke="${color2}" stroke-width="1.5" fill="${fill2}"/>
        <circle cx="${cx}" cy="115" r="10" stroke="${color3}" stroke-width="1.5" fill="${fill2}"/>
        <circle cx="80" cy="120" r="5" stroke="${color3}" stroke-width="1" fill="none"/>
        <circle cx="120" cy="120" r="5" stroke="${color3}" stroke-width="1" fill="none"/>
        <path d="M55,145 Q60,150 65,145 Q70,150 75,145" stroke="${color3}" stroke-width="1" fill="none" opacity="0.6"/>
        <path d="M125,145 Q130,150 135,145 Q140,150 145,145" stroke="${color3}" stroke-width="1" fill="none" opacity="0.6"/>
      `
      break
    }
    case 'timer': {
      shapes = `
        <circle cx="${cx}" cy="${cy}" r="60" stroke="${color1}" stroke-width="3" fill="${fill}"/>
        <circle cx="${cx}" cy="${cy}" r="50" stroke="${color2}" stroke-width="1" fill="none"/>
        ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => {
          const rad = (a - 90) * Math.PI / 180
          const r1 = 45, r2 = 55
          return `<line x1="${(cx + Math.cos(rad) * r1).toFixed(1)}" y1="${(cy + Math.sin(rad) * r1).toFixed(1)}" x2="${(cx + Math.cos(rad) * r2).toFixed(1)}" y2="${(cy + Math.sin(rad) * r2).toFixed(1)}" stroke="${color1}" stroke-width="1.5"/>`
        }).join('')}
        <circle cx="${cx}" cy="${cy}" r="6" stroke="${color1}" stroke-width="2" fill="${color3}"/>
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 40}" stroke="${color1}" stroke-width="3" stroke-linecap="round"/>
        <line x1="${cx}" y1="${cy}" x2="${cx + 25}" y2="${cy + 10}" stroke="${color3}" stroke-width="2" stroke-linecap="round"/>
      `
      break
    }
    default: {
      shapes = `
        <rect x="55" y="55" width="90" height="90" rx="10" stroke="${color1}" stroke-width="2" fill="${fill}"/>
        <rect x="65" y="65" width="70" height="70" rx="5" stroke="${color2}" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/>
        <circle cx="${cx}" cy="${cy}" r="20" stroke="${color1}" stroke-width="2" fill="${fill2}"/>
        <circle cx="${cx}" cy="${cy}" r="8" stroke="${color1}" stroke-width="1.5" fill="${color2}"/>
      `
    }
  }
  
  const dims = part.dimensions
  let dimText = ''
  if (dims.diameter) dimText = `直径 ${dims.diameter}${dims.unit}`
  else if (dims.length && dims.width) dimText = `${dims.length}×${dims.width}${dims.unit}`
  else if (dims.length) dimText = `长 ${dims.length}${dims.unit}`
  else dimText = `${part.code}`
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <pattern id="grid-${part.id}" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(92, 64, 51, 0.05)" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="200" height="200" fill="url(#grid-${part.id})"/>
  ${shapes}
  <g stroke="${color3}" stroke-width="1" fill="${color3}" font-size="9" font-family="Consolas, monospace">
    <line x1="25" y1="185" x2="175" y2="185"/>
    <line x1="25" y1="180" x2="25" y2="190"/>
    <line x1="175" y1="180" x2="175" y2="190"/>
    <text x="${cx}" y="195" text-anchor="middle">${dimText}</text>
  </g>
  <text x="${cx}" y="172" text-anchor="middle" fill="${color1}" font-size="11" font-family="SimSun, STSong, serif" font-weight="bold">${part.name}</text>
</svg>`
}

function generateThumbnail(part) {
  const color1 = '#5C4033'
  const color2 = '#C4A35A'
  const color3 = '#7A5A47'
  const cx = 50, cy = 50
  let inner = ''
  switch (part.iconType) {
    case 'gear':
      inner = `<circle cx="${cx}" cy="${cy}" r="25" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="${cx}" cy="${cy}" r="8" stroke="${color1}" stroke-width="1" fill="${color2}"/>
        ${[0,45,90,135,180,225,270,315].map(a=>{const r=a*Math.PI/180;return`<rect x="${cx+Math.cos(r)*20-2}" y="${cy+Math.sin(r)*20-2}" width="4" height="8" fill="${color3}" transform="rotate(${a} ${cx+Math.cos(r)*20} ${cy+Math.sin(r)*20})"/>`}).join('')}`
      break
    case 'spring':
      inner = `<path d="M25,50 Q32,35 39,50 Q46,65 53,50 Q60,35 67,50 Q74,65 75,50" stroke="${color3}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <rect x="20" y="40" width="6" height="20" stroke="${color1}" stroke-width="1" fill="#F5F0E8"/>
        <rect x="74" y="40" width="6" height="20" stroke="${color1}" stroke-width="1" fill="#F5F0E8"/>`
      break
    case 'support':
      inner = `<rect x="30" y="25" width="40" height="6" stroke="${color1}" stroke-width="1" fill="${color3}"/>
        <rect x="35" y="31" width="4" height="38" stroke="${color1}" stroke-width="1" fill="#F5F0E8"/>
        <rect x="61" y="31" width="4" height="38" stroke="${color1}" stroke-width="1" fill="#F5F0E8"/>
        <rect x="25" y="69" width="50" height="6" stroke="${color1}" stroke-width="1" fill="${color3}"/>`
      break
    case 'lever':
      inner = `<line x1="20" y1="55" x2="80" y2="45" stroke="${color1}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="4" stroke="${color1}" stroke-width="1" fill="${color2}"/>
        <path d="M44,60 L50,50 L56,60 Z" stroke="${color1}" stroke-width="1" fill="${color3}"/>`
      break
    case 'pulley':
      inner = `<circle cx="38" cy="50" r="12" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="62" cy="50" r="12" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="38" cy="50" r="3" stroke="${color1}" stroke-width="1" fill="${color2}"/>
        <circle cx="62" cy="50" r="3" stroke="${color1}" stroke-width="1" fill="${color2}"/>
        <line x1="38" y1="30" x2="62" y2="30" stroke="${color3}" stroke-width="1.5"/>`
      break
    case 'brake':
      inner = `<circle cx="${cx}" cy="${cy}" r="25" stroke="${color1}" stroke-width="2" fill="#F5F0E8"/>
        <circle cx="${cx}" cy="${cy}" r="6" stroke="${color1}" stroke-width="1" fill="${color2}"/>
        <rect x="20" y="42" width="8" height="16" stroke="${color1}" stroke-width="1" fill="${color3}"/>
        <rect x="72" y="42" width="8" height="16" stroke="${color1}" stroke-width="1" fill="${color3}"/>`
      break
    case 'lock':
      inner = `<path d="M35,50 Q35,30 50,30 Q65,30 65,50" stroke="${color3}" stroke-width="2.5" fill="none"/>
        <rect x="28" y="50" width="44" height="30" rx="3" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="50" cy="65" r="6" stroke="${color1}" stroke-width="1" fill="${color2}"/>`
      break
    case 'link':
      inner = `<circle cx="30" cy="50" r="9" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="70" cy="50" r="9" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <rect x="30" y="46" width="40" height="8" stroke="${color1}" stroke-width="1" fill="#F5F0E8"/>`
      break
    case 'control':
      inner = `<rect x="25" y="25" width="50" height="50" rx="5" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="50" cy="50" r="15" stroke="${color1}" stroke-width="1" fill="${color3}" opacity="0.2"/>
        <circle cx="50" cy="50" r="5" stroke="${color1}" stroke-width="1" fill="${color2}"/>
        <line x1="50" y1="30" x2="50" y2="38" stroke="${color3}" stroke-width="1.5"/>
        <line x1="50" y1="62" x2="50" y2="70" stroke="${color3}" stroke-width="1.5"/>`
      break
    case 'power':
      inner = `<rect x="30" y="22" width="40" height="56" rx="5" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="50" cy="50" r="14" stroke="${color1}" stroke-width="1" fill="${color3}" opacity="0.3"/>
        <circle cx="50" cy="50" r="5" stroke="${color1}" stroke-width="1" fill="${color2}"/>`
      break
    case 'sensor':
      inner = `<rect x="30" y="35" width="40" height="35" rx="4" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="50" cy="50" r="12" stroke="${color1}" stroke-width="1" fill="${color3}" opacity="0.2"/>
        <path d="M42,50 Q50,40 58,50 Q50,60 42,50" stroke="${color3}" stroke-width="1.5" fill="none"/>
        <line x1="35" y1="70" x2="30" y2="80" stroke="${color3}" stroke-width="1.5"/>
        <line x1="45" y1="70" x2="43" y2="82" stroke="${color3}" stroke-width="1.5"/>
        <line x1="55" y1="70" x2="57" y2="82" stroke="${color3}" stroke-width="1.5"/>
        <line x1="65" y1="70" x2="70" y2="80" stroke="${color3}" stroke-width="1.5"/>`
      break
    case 'mirror':
      inner = `<ellipse cx="50" cy="48" rx="26" ry="28" stroke="${color1}" stroke-width="2" fill="#F5F0E8"/>
        <ellipse cx="50" cy="48" rx="18" ry="20" stroke="${color2}" stroke-width="1" fill="${color3}" opacity="0.15"/>
        <rect x="44" y="74" width="12" height="12" stroke="${color1}" stroke-width="1" fill="${color3}"/>`
      break
    case 'signal':
      inner = `<rect x="40" y="38" width="20" height="28" rx="3" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <circle cx="46" cy="46" r="3" stroke="${color3}" stroke-width="1" fill="${color2}"/>
        <circle cx="54" cy="46" r="3" stroke="${color3}" stroke-width="1" fill="${color3}"/>
        <line x1="50" y1="66" x2="50" y2="80" stroke="${color1}" stroke-width="2"/>
        <path d="M30,80 L50,68 L70,80 Z" stroke="${color1}" stroke-width="1" fill="${color3}"/>`
      break
    case 'weight':
      inner = `<rect x="33" y="30" width="34" height="7" stroke="${color1}" stroke-width="1" fill="${color3}"/>
        <path d="M35,37 L42,37 L44,72 L33,72 Z" stroke="${color1}" stroke-width="1" fill="#F5F0E8"/>
        <path d="M65,37 L58,37 L56,72 L67,72 Z" stroke="${color1}" stroke-width="1" fill="#F5F0E8"/>
        <rect x="28" y="72" width="44" height="12" rx="2" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <text x="50" y="81" text-anchor="middle" font-size="7" font-family="SimSun, serif" fill="${color1}" font-weight="bold">权</text>`
      break
    case 'resonate':
      inner = `<path d="M25,35 L25,65 Q50,78 75,65 L75,35 Q50,28 25,35 Z" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <path d="M35,45 Q50,42 65,45 L65,52 Q50,55 35,52 Z" stroke="${color2}" stroke-width="1" fill="${color3}" opacity="0.2"/>
        <circle cx="50" cy="62" r="6" stroke="${color3}" stroke-width="1" fill="${color3}" opacity="0.2"/>`
      break
    case 'timer':
      inner = `<circle cx="50" cy="50" r="30" stroke="${color1}" stroke-width="2" fill="#F5F0E8"/>
        <circle cx="50" cy="50" r="24" stroke="${color2}" stroke-width="0.8" fill="none"/>
        ${[0,90,180,270].map(a=>{const r=(a-90)*Math.PI/180;return`<line x1="${50+Math.cos(r)*22}" y1="${50+Math.sin(r)*22}" x2="${50+Math.cos(r)*27}" y2="${50+Math.sin(r)*27}" stroke="${color1}" stroke-width="1.2"/>`}).join('')}
        <circle cx="50" cy="50" r="3" stroke="${color1}" stroke-width="1" fill="${color3}"/>
        <line x1="50" y1="50" x2="50" y2="28" stroke="${color1}" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="64" y2="56" stroke="${color3}" stroke-width="1.2" stroke-linecap="round"/>`
      break
    default:
      inner = `<rect x="28" y="28" width="44" height="44" rx="5" stroke="${color1}" stroke-width="1.5" fill="#F5F0E8"/>
        <rect x="35" y="35" width="30" height="30" rx="3" stroke="${color2}" stroke-width="1" fill="none" stroke-dasharray="2,1"/>
        <circle cx="50" cy="50" r="10" stroke="${color1}" stroke-width="1.5" fill="#F9F5ED"/>
        <circle cx="50" cy="50" r="4" stroke="${color1}" stroke-width="1" fill="${color2}"/>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <pattern id="tg-${part.id}" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(92, 64, 51, 0.06)" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="100" height="100" fill="url(#tg-${part.id})"/>
  ${inner}
  <text x="50" y="94" text-anchor="middle" fill="${color3}" font-size="6" font-family="Consolas, monospace">${part.code}</text>
</svg>`
}

function main() {
  const parts = []
  const partsDir = path.join(__dirname, '..', 'public', 'images', 'parts')
  
  let idCounter = 0
  for (const func of FUNCTIONS) {
    for (let i = 0; i < func.count; i++) {
      const seed = 1000 + idCounter * 17
      const rand = seededRandom(seed)
      idCounter++
      
      const prefixes = NAME_PREFIXES[func.name] || ['零件']
      const baseName = prefixes[i % prefixes.length]
      const variant = Math.floor(i / prefixes.length)
      const name = variant > 0 ? `${baseName}${['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'][variant % 8]}` : baseName
      
      const material = pick(MATERIALS, rand)
      const location = pick(LOCATIONS, rand)
      const era = pick(ERAS, rand)
      const condition = pick(CONDITIONS, rand)
      
      const id = `${func.icon}-${String(idCounter).padStart(3, '0')}`
      const code = `MJ-${func.icon.substring(0, 2).toUpperCase()}-${String(idCounter).padStart(3, '0')}`
      
      const hasDiameter = rand() > 0.5
      const dimensions = {
        unit: 'cm',
        weight: +(0.1 + rand() * 2).toFixed(2)
      }
      if (hasDiameter) {
        dimensions.diameter = +(3 + rand() * 12).toFixed(1)
        if (rand() > 0.5) dimensions.thickness = +(0.5 + rand() * 3).toFixed(1)
      } else {
        dimensions.length = +(5 + rand() * 40).toFixed(1)
        if (rand() > 0.3) dimensions.width = +(2 + rand() * 10).toFixed(1)
        if (rand() > 0.5) dimensions.height = +(1 + rand() * 8).toFixed(1)
      }
      
      const numAssemblies = 1 + Math.floor(rand() * 3)
      const shuffled = [...MECHANISMS].sort(() => rand() - 0.5)
      const assemblies = shuffled.slice(0, numAssemblies).map(m => ({
        mechanismName: m.name,
        mechanismImage: m.image,
        position: {
          x: 20 + Math.floor(rand() * 60),
          y: 20 + Math.floor(rand() * 60)
        },
        description: `装配于${m.name}${pick(['核心部位', '传动系统', '支撑结构', '控制模块', '动力舱'], rand)}`
      }))
      
      const part = {
        id,
        name,
        code,
        description: `${name}，${material}质地，出土于${location}。${era}作品，${condition}。用于${func.name}类墨家机关。`,
        function: func.name,
        material,
        location,
        dimensions,
        sketchImage: `/images/parts/${id}.svg`,
        thumbnail: `/images/parts/${id}-thumb.svg`,
        assemblies,
        era,
        condition,
        iconType: func.icon
      }
      
      parts.push(part)
      
      const svgContent = generateSVG(part, variant, rand)
      fs.writeFileSync(path.join(partsDir, `${id}.svg`), svgContent, 'utf-8')
      
      const thumbContent = generateThumbnail(part)
      fs.writeFileSync(path.join(partsDir, `${id}-thumb.svg`), thumbContent, 'utf-8')
    }
  }
  
  const dataPath = path.join(__dirname, '..', 'public', 'data', 'parts.json')
  const output = parts.map(({ iconType, ...rest }) => rest)
  fs.writeFileSync(dataPath, JSON.stringify(output, null, 2), 'utf-8')
  
  console.log(`生成完成：共 ${parts.length} 个零件，SVG 保存在 ${partsDir}`)
}

main()
