import { toolCategories } from "@/const"

type Props = {
  setCategory: (cat: typeof toolCategories[number]) => void
  initCategoryIdx?: number  
}

export default function Sidebar({setCategory, initCategoryIdx=0 }: Props) {
  return (
    <aside>
      {
        toolCategories.map((cat, i) => (
          <label key={cat} >
            <input 
              type="radio" 
              value={cat} 
              name="category" 
              defaultChecked={i === initCategoryIdx}
              onChange={() => setCategory(toolCategories[i])}
            />
            <span>{cat}</span>
          </label>
        ))
      }
    </aside>
  )
}

