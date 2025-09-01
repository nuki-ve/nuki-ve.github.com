import { toolCategories, toolPlatforms, toolSystems } from "@/const"
import Sidebar from "./Sidebar";
import toolsData from "@/tools.json"
import { useState } from "react";

type Props = {
  initCategoryIdx?: number
}

type Categories = typeof toolCategories[number]
type Systems = typeof toolCategories[number]
type Platforms = typeof toolCategories[number]

export default function ToolsPage({ initCategoryIdx=0 }: Props) {
  const [category, setCategory] = useState<Categories>(toolCategories[initCategoryIdx])
  const [system, setSystem] = useState<Systems[]>([])
  const [platform, setPlatform] = useState<Platforms[]>([])
  
  return (
    <>
      <Sidebar setCategory={setCategory}/>
      <header id="navWrapper">
        <nav>
          {
            toolSystems.map((sys, i) => (
              <label key={sys} >
                <input 
                  type="checkbox" 
                  value={sys} 
                  name="system" 
                  defaultChecked={true}
                  onChange={() => setSystem([])}
                />
                <span>{sys}</span>
              </label>
            ))
          }
        </nav>
        <nav>
          {
            toolPlatforms.map((sys, i) => (
              <label key={sys} >
                <input 
                  type="checkbox" 
                  value={sys} 
                  name="system" 
                  defaultChecked={true}
                  onChange={() => setSystem([])}
                />
                <span>{sys}</span>
              </label>
            ))
          }
        </nav>
      </header>
      <main id="content">{
        toolsData.filter(tools => tools.category === category).length        
        ? toolsData.map(tool => {
          if (tool.category !== category) return null

          return (
            <a href={tool.url} target="_blank" className="projectCard" key={tool.name}>
              <section className="bannerContainer">
                <img className="banner" src={tool.image} alt={tool.name}/>
              </section>

              <section className="details">
                <img className="logo" src={tool.favicon} alt={`${tool.name} logo`} />
                <span className="projectTitle">{tool.name}</span>
              </section>
              <p>{tool.description}</p>
            </a>
          )}
        )
        : <p id="noTools">No tools matching the filters.</p>
      }</main>
    </>
  )
}