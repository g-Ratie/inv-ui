import { Grid } from '../Grid'
import { FilterTabs } from '../Common'

//////////////////////////
// Component definition //
//////////////////////////
export const Stash = () => {
  return (
    <div id="stash" className="panel panel-slide-in-right">
      <div className="panel-title">STASH</div>

      <div className="section">
        <FilterTabs />

        <Grid id="grid-stash" cols={10} rows={30} />
      </div>

      <style jsx global>{`
        #stash {
          .section {
            display: flex;
            min-height: 1px;
            flex-flow: row nowrap;
          }
        }
      `}</style>
    </div>
  )
}
