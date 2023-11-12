import FeatureBookTable from "../components/feats/FeatureBookTables"
import SpellBookTable from "../components/spells/SpellBookTables"
import {  useEffect, useState } from 'react'


function MyBook() {
  const [isEditing, setIsEditing] = useState(0)

  
  const handleBeginEdit = (num: number) => {
    setIsEditing(num)
  console.log(isEditing)
  }

  const handleEndEdit = () => {
    setIsEditing(0)
    console.log(isEditing)
  }

  useEffect( () => {
    console.log(isEditing)
  },[isEditing])

  return (
    <>
    <div>
      <div className="flex-auto max-height-800px">
      <SpellBookTable 
        handleBeginEdit={handleBeginEdit}
        handleEndEdit={handleEndEdit}
        editing={isEditing}

         />
      </div>
      <div>
      <FeatureBookTable
      handleBeginEdit={handleBeginEdit}
      handleEndEdit={handleEndEdit}
      editing={isEditing}
       />
      </div>
    </div>
    </>
  )
}

export default MyBook