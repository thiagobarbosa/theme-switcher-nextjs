import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { install } from './install'
import chalk from 'chalk'
import { existsSync } from 'fs'
import inquirer from 'inquirer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function detectProjectStructure() {
  // check for common folders that might exist in either /src or root
  const hasSrcComponents = existsSync(join(process.cwd(), 'src', 'components'))
  const hasSrcLib = existsSync(join(process.cwd(), 'src', 'lib'))
  const hasSrcApp = existsSync(join(process.cwd(), 'src', 'app'))
  const hasRootComponents = existsSync(join(process.cwd(), 'components'))
  const hasRootLib = existsSync(join(process.cwd(), 'lib'))
  const hasRootApp = existsSync(join(process.cwd(), 'app'))
  
  // if we find indicators in both places, ask the user
  if ((hasSrcComponents || hasSrcLib || hasSrcApp) &&
    (hasRootComponents || hasRootLib || hasRootApp)) {
    const { useSrc } = await inquirer.prompt([
      {
        type: 'list',
        name: 'useSrc',
        message: 'We detected files in both /src and root directories. Where would you like to install?',
        choices: [
          { name: '/src directory (recommended for new projects)', value: true },
          { name: 'Root directory', value: false }
        ]
      }
    ])
    return useSrc
  }
  
  // if we find indicators in src, use src
  if (hasSrcComponents || hasSrcLib || hasSrcApp) {
    return true
  }
  
  // otherwise if we find indicators in root, use root
  if (hasRootComponents || hasRootLib || hasRootApp) {
    return false
  }
  
  // if we don't find any indicators, ask the user
  const { useSrc } = await inquirer.prompt([
    {
      type: 'list',
      name: 'useSrc',
      message: 'Where would you like to install the components?',
      choices: [
        { name: '/src directory (recommended for new projects)', value: true },
        { name: 'Root directory', value: false }
      ]
    }
  ])
  return useSrc
}

async function runInstall() {
  try {
    const useSrc = await detectProjectStructure()
    await install(__dirname, useSrc)
  } catch (error: any) {
    console.error(chalk.red('Installation failed. Please ensure:'))
    console.log('1. You are in a Next.js project directory and Tailwind CSS is installed')
    console.log('2. You have npm/yarn installed')
    console.log('3. You have write permissions in the current directory')
    console.log('Error details:', error.message)
    process.exit(1)
  }
}

const args = process.argv.slice(2)
const command = args[0]

if (command === 'add' && args[1] === 'theme-switcher') {
  runInstall()
} else {
  console.error(chalk.red('Unknown command.'))
  console.log(chalk.blue('Available commands:'))
  console.log(chalk.gray('  npx theme-switcher-nextjs add theme-switcher'))
  process.exit(1)
}