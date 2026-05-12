import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_PATH = path.join(process.cwd(), 'content')

export interface ModuleMetadata {
  title: string
  id: string
  description: string
  xp_reward: number
  [key: string]: unknown
}

export async function getModuleBySlug(slug: string) {
  const fullPath = path.join(CONTENT_PATH, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    metadata: data as ModuleMetadata,
    content,
  }
}

export async function getAllModules() {
  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
    const files = fs.readdirSync(dirPath)

    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else if (file.endsWith('.mdx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    })

    return arrayOfFiles
  }

  const files = getAllFiles(CONTENT_PATH)
  const modules = files.map((file) => {
    const relativePath = path.relative(CONTENT_PATH, file)
    const slug = relativePath.replace(/\\/g, '/').replace(/\.mdx$/, '')
    const fileContents = fs.readFileSync(file, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug,
      metadata: data as ModuleMetadata,
    }
  })

  return modules
}
