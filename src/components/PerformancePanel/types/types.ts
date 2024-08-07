import { FilterInfo } from '../tests/performancePanelData';

export type PerformancePanelProps = {
  sections: {
    sectionId: string,
    sectionName?: string,
    filteredValues?: { [key: string]: string },
    sectionData: ({
      name: string,
      value: number | string
    } & ({ dropdownContent?: string, dialogContent?: string, dialogTitle?: string }))[]
  }[],
  filters: FilterInfo[],
  apiURL: string,
  templateScript: string,
  scriptManagerOpen: boolean,
  closeScriptManager: () => void
};