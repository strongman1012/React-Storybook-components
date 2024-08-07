const items = [
    {
        id: 0, pName: "p0",
    },
    {
        id: 1, pName: "p0", aName: "a0"
    },
    {
        id: 2, pName: "p0", aName: "a0", rName: "r0"
    },
    {
        id: 3, pName: "p1"
    },
    {
        id: 4, pName: "p0", aName: "a1"
    },
    {
        id: 5, pName: "p0", aName: "a1", rName: "r1"
    },
    {
        id: 6, pName: "p0", aName: "a1", rName: "r1", mName: "m0"
    }
];

function toDisplayValue(item: (typeof items)[number]): string {
    const vals = [item.id, item.pName, item.aName, item.rName, item.mName];
    return vals.filter((o): o is NonNullable<typeof o> => o != null).join("_");
}

function onConfirm(list: typeof items) {
    alert(JSON.stringify(list));
}

export const sampleData = {
    items,
    toDisplayValue,
    onConfirm
}
