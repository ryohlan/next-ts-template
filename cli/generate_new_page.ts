const path = require('path')
const fs = require('fs')
const pathPattern = require('../router/pattern.json')

const originalPath = process.argv[2].replace(/\/$/, '')
const splited = originalPath.split('/')
if (splited[splited.length - 1].startsWith(':')) {
  splited.push('show.tsx')
} else {
  splited.push('index.tsx')
}

const pathStr = splited.filter(s => !s.startsWith(':')).join('/')
const queries = splited.filter(s => s.startsWith(':')).map(s => s.slice(1))

const queryType: { [key: string]: string } = {}
for (const q of queries) {
  queryType[q] = 'string'
}

const queryTypeStr = JSON.stringify(queryType, null, 2).replace(/"/g, '')

const PAGE_ROOT_PATH = path.resolve(__dirname, '../pages')
const LAYOUT_ROOT_PATH = path.resolve(__dirname, '../layouts')
const CONTROLLER_ROOT_PATH = path.resolve(__dirname, '../controllers')
const PAGE_TEMPLATE_PATH = path.resolve(__dirname, 'templates/page.template')
const LAYOUT_TEMPLATE_PATH = path.resolve(
  __dirname,
  'templates/layout.template'
)
const CONTROLLER_TEMPLATE_PATH = path.resolve(
  __dirname,
  'templates/controller.template'
)

function checkExists(filePath: string) {
  try {
    fs.statSync(path.resolve(filePath))
    console.error(`ERROR!! ${filePath} already exists.`)
    process.exit()
  } catch {}
}

function checkDir(filePath: string) {
  const dirPath = filePath.replace(/\/\w*\.tsx$/, '')
  try {
    fs.statSync(dirPath)
  } catch (e) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function createNewFileFromTemplate(
  filePath: string,
  rootPath: string,
  templatePath: string
) {
  const data = fs
    .readFileSync(templatePath, 'utf8')
    .replace(/__PATH__/g, filePath.replace(/(\/index|\.tsx)/g, ''))
    .replace(/__QUERY_TYPES__/g, queryTypeStr)
  fs.writeFileSync(path.resolve(rootPath, filePath), data)
}

function createNewPage() {
  console.group('create new page')

  const pagePath = path.resolve(PAGE_ROOT_PATH, pathStr)
  console.log('path: ' + pagePath)
  checkExists(pagePath)
  checkDir(pagePath)
  createNewFileFromTemplate(pathStr, PAGE_ROOT_PATH, PAGE_TEMPLATE_PATH)

  console.groupEnd()
}

function createNewController() {
  console.group('create new controller')

  const pagePath = path.resolve(CONTROLLER_ROOT_PATH, pathStr)
  console.log('path: ' + pagePath)

  checkExists(pagePath)
  checkDir(pagePath)
  createNewFileFromTemplate(
    pathStr,
    CONTROLLER_ROOT_PATH,
    CONTROLLER_TEMPLATE_PATH
  )

  console.groupEnd()
}

function createNewLayout() {
  console.group('create new layout')

  const pagePath = path.resolve(LAYOUT_ROOT_PATH, pathStr)
  console.log('path: ' + pagePath)

  checkExists(pagePath)
  checkDir(pagePath)
  createNewFileFromTemplate(pathStr, LAYOUT_ROOT_PATH, LAYOUT_TEMPLATE_PATH)

  console.groupEnd()
}

function addRoutes(pathStr: string, pattern: string) {
  console.group('create new routes')
  const name = pathStr
    .replace(/(\/index|\.tsx)/g, '')
    .split('/')
    .join('_')
  if (!!pathPattern.patterns.find((p: any) => p.name === name)) {
    console.error(`ERROR. routes\'name \"${name}\" already exists.`)
    process.exit()
  }
  const newRoute = {
    name,
    page: pathStr.replace('.tsx', ''),
    pattern: `/${pattern}`
  }
  pathPattern.patterns.push(newRoute)

  console.log('pattern: ', newRoute)
  fs.writeFileSync(
    path.resolve(__dirname, '../router/pattern.json'),
    JSON.stringify(pathPattern, null, '\t'),
    'utf8'
  )

  fs.appendFileSync(
    path.resolve(__dirname, '../router/createRoute.ts'),
    `
export const ${name} = ({${queries.join(', ')}}: ${queryTypeStr}) =>
    \`/${pattern
      .split('/')
      .map(s => (s.startsWith(':') ? `\${${s.slice(1)}\}` : s))
      .join('/')}\`
`
  )
  console.groupEnd()
}

checkDir(PAGE_ROOT_PATH)
checkDir(CONTROLLER_ROOT_PATH)
checkDir(LAYOUT_ROOT_PATH)

createNewPage()
createNewController()
createNewLayout()
addRoutes(pathStr, originalPath)
