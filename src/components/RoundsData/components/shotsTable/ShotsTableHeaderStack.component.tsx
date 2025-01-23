import StackTable from "@/styles/stack/StackTable.styles"
import { TypographyTablesFirstRow, TypographyTablesSecondRow } from "@/styles/typography/TypographyTable.styles"

interface IShotsTableHeaderStack {
  firstRow: string,
  secondRow: string,
}

const ShotsTableHeaderStack = ({ firstRow, secondRow }: IShotsTableHeaderStack) => {
  return (
    <StackTable secondrow={secondRow !== '' ? secondRow : ''}>
      <TypographyTablesFirstRow firstrow={firstRow} secondrow={secondRow} />
      {
        secondRow !== '' &&
        <TypographyTablesSecondRow firstrow={firstRow} secondrow={secondRow} />
      }
    </StackTable>
  )
}


export default ShotsTableHeaderStack
