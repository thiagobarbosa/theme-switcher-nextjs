import fs from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import chalk from 'chalk'

const execAsync = promisify(exec)

const REQUIRED_DEPENDENCIES = {
  '@phosphor-icons/react': 'latest',
  'clsx': 'latest',
  'tailwind-merge': 'latest'
} as const

async function checkProjectStructure() {
  // check for package.json
  await fs.access(join(process.cwd(), 'package.json')).catch(() => {
    throw new Error('Missing package.json file. Please ensure you are in the root directory of a Next.js project.')
  })

  // check for either app/layout.tsx or src/app/layout.tsx
  await Promise.any([
    fs.access(join(process.cwd(), 'app/layout.tsx')),
    fs.access(join(process.cwd(), 'src/app/layout.tsx'))
  ]).catch(() => {
    throw new Error('Missing layout.tsx file. Please ensure either app/layout.tsx or src/app/layout.tsx exists.')
  })

  // check for either tailwind.config.ts or tailwind.config.js
  await Promise.any([
    fs.access(join(process.cwd(), 'tailwind.config.ts')),
    fs.access(join(process.cwd(), 'tailwind.config.js'))
  ]).catch(() => {
    throw new Error('Missing Tailwind config file. Please ensure either tailwind.config.ts or tailwind.config.js exists.')
  })
}

async function installDependencies(): Promise<void> {
  console.log(chalk.blue('📦 Installing required dependencies...'))

  const dependencies = Object.entries(REQUIRED_DEPENDENCIES)
    .map(([pkg, version]) => `${pkg}@${version}`)

  try {
    await execAsync(`npm install ${dependencies.join(' ')}`)
    console.log(chalk.blue('✔ Dependencies installed successfully'))
  } catch (error) {
    console.error(chalk.red('Failed to install dependencies:'), error)
    throw error
  }
}

async function ensureDirectoryExists(dir: string): Promise<void> {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error
    }
  }
}

async function copyFiles(scriptDir: string, targetBaseDir: string): Promise<void> {
  const componentsDir = join(targetBaseDir, 'components')
  const libDir = join(targetBaseDir, 'lib')

  // create directories if they don't exist
  await Promise.all([
    ensureDirectoryExists(componentsDir),
    ensureDirectoryExists(libDir)
  ])

  // get source directories
  const sourceComponentsDir = join(scriptDir, 'components')

  try {
    await Promise.all([
      fs.copyFile(
        join(sourceComponentsDir, 'theme-switcher.tsx'),
        join(componentsDir, 'theme-switcher.tsx')
      ).catch(error => {
        throw new Error(`Failed to copy ThemeSwitcher.tsx: ${error.message}`)
      })
    ])

  } catch (error) {
    console.error(chalk.red('Error copying files:'), error)
    throw error
  }
}

export async function install(sourceDir: string, useSrc: boolean) {
  const targetBaseDir = useSrc ? join(process.cwd(), 'src') : process.cwd()

  console.log(chalk.blue('🚀 Starting theme switcher installation...'))

  try {
    await checkProjectStructure()
    await installDependencies()
    await copyFiles(sourceDir, targetBaseDir)

    console.log(chalk.green('✨ ThemeSwitcher installed successfully!'))
    console.log(chalk.gray(`Components installed in ${useSrc ? '/src' : 'root'} directory`))
    console.log(chalk.blue('Next steps:'))
    console.log('1. Import the ThemeSwitcher component:')
    console.log(chalk.gray('   import { ThemeSwitcher } from "@/components/ThemeSwitcher"'))
    console.log('2. Use it in your component:')
    console.log(chalk.gray('   <ThemeSwitcher />'))
  } catch (error) {
    console.error(chalk.red('❌ Installation failed:'), error)
    throw error
  }
}