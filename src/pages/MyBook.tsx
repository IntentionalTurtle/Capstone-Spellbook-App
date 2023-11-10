import FeatureBookTable from "../components/feats/FeatureBookTables"
import SpellBookTable from "../components/spells/SpellBookTables"

function MyBook() {
  return (
    <div>
      <div className="flex-auto max-height-800px">
      <SpellBookTable />
      </div>
      <div>
      <FeatureBookTable />
      </div>
    </div>
  )
}

export default MyBook