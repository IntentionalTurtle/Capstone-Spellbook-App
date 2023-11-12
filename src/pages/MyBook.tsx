import FeatureBookTable from "../components/feats/FeatureBookTables"
import SpellBookTable from "../components/spells/SpellBookTables"
import {  useEffect, useState } from 'react'


function MyBook() {
  const [isEditingSpells, setIsEditingSpells] = useState(false)
  const [isEditingFeatures, setIsEditingFeatures] = useState(false)
  
  const handleBeginEditSpells = () => {
    setIsEditingSpells(true)
  console.log(isEditingSpells)
  }

  const handleEndEditSpells = () => {
    setIsEditingSpells(false)
    console.log(isEditingSpells)
  }

  const handleBeginEditFeatures = () => {
    setIsEditingFeatures(true)
    console.log(isEditingFeatures)
  }

  const handleEndEditFeatures = () => {
    setIsEditingFeatures(false)
    console.log(isEditingFeatures)
  }

  useEffect( () => {
    console.log(isEditingSpells)
  },[isEditingSpells])

  useEffect( () => {
    console.log(isEditingFeatures)
  },[isEditingFeatures])

  return (
    <>
    <div>
      <div className="flex-auto max-height-800px">
      <SpellBookTable 
        handleBeginEditSpells={handleBeginEditSpells}
        handleEndEditSpells={handleEndEditSpells}
        featureEdit={isEditingFeatures}

         />
      </div>
      <div>
      <FeatureBookTable
      handleBeginEditFeatures={handleBeginEditFeatures}
      handleEndEditFeatures={handleEndEditFeatures}
      spellsEdit={isEditingSpells}
       />
      </div>
    </div>
    </>
  )
}

export default MyBook