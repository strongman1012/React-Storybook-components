import { ComparisonProps } from "../../../components/ComparisonTable/types/comparison-table-types";

type GROUPS = 'parameters' | 'performance' | 'antOpts';
type ROWS = 'altitude' | 'inclination' | 'coverage' | 'meanContacts' | 'eirp';

type Props = ComparisonProps<GROUPS, ROWS>

export const groupsDefinition: Props['groupsDefinition'] = {
    parameters: {
        groupName: 'Parameters',
        groupPosition: 0
    },
    performance: {
        groupName: 'Performance',
        groupPosition: 1
    },
    antOpts: {
        groupName: 'Antenna Options (User Burden)',
        groupPosition: 2
    }
};

export const rowsDefinition: Props['rowsDefinition'] = {
    altitude: {
        groupName: 'parameters',
        rowName: 'Altitude (km)'
    },
    inclination: {
        groupName: 'parameters',
        rowName: 'Inclination (deg)'
    },
    meanContacts: {
        groupName: 'performance',
        rowName: 'Mean Contacts per Day'
    },
    coverage: {
        groupName: 'performance',
        rowName: 'RF Coverage (min/day)'
    },
    eirp: {
        groupName: 'antOpts',
        rowName: 'EIRP (dbw)'
    }
}

export const defaultComparisonInputsEqual: Props['inputsAreEqual'] = (a, b) => {
    return a.altitude === b.altitude && a.inclination === b.inclination;
}

export const defaultComparisonSortingOptions: Props['sortingOptions'] = [
    {
        sortName: 'Best Coverage',
        compare: (a, b) => Number(a.coverage) - Number(b.coverage)
    },
    {
        sortName: 'Highest Mean Contacts',
        compare: (a, b) => Number(a.meanContacts) - Number(b.meanContacts)
    },
    {
        sortName: 'Inclination',
        compare: (a, b) => Number(a.inclination) - Number(b.inclination)
    }
];

const input0: Props['data'][number]['input'] = {
    altitude: 300,
    inclination: 30
};

const input1: Props['data'][number]['input'] = {
    altitude: 350,
    inclination: 45,
    meanContacts: 1
};

const dataItem1: Props['data'][number] = {
    input: input0,
    id: 1,
    name: 'Oregon',
    pinned: false,
    data: {
        altitude: 300,
        inclination: 30,
        meanContacts: 11,
        coverage: 230,
        eirp: 1.5
    }
};
const dataItem2: Props['data'][number] = {
    input: input0,
    id: 0,
    name: 'Ohio_0',
    pinned: true,
    data: {
        altitude: 300,
        inclination: 30,
        meanContacts: 12,
        coverage: 255,
        eirp: 2
    }
};
const dataItem3: Props['data'][number] = {
    input: input1,
    id: 3,
    name: 'Lebron_J',
    pinned: true,
    data: {
        altitude: 350,
        inclination: 45,
        meanContacts: 1,
        coverage: 240,
        eirp: -2
    }
}

export const comparisonData: Props['data'] = [
    dataItem1,
    dataItem2,
    dataItem3
];

export const comparisonData1: Props['data'] = [
    dataItem1
];
