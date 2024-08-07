import { IDataResponse } from "../types/LinkBudgetTypes";

export const mockData: IDataResponse = {
    "id": 1,
    "name": "Dataset 1",
    "type": 1,
    "status": 1,
    "width": {
        "expanded": [
            "5%",
            "10%",
            "10%",
            "17.614%",
            "11.594%",
            "16.945%",
            "160"
        ],
        "collapse": [
            "7.898%",
            "28.54%",
            "36.165%",
            "39.155%",
            "24.694%",
            "null",
            "223"
        ]
    },
    "items": [
        {
            "id": "8aee8d14-8434-4429-a83f-a7aee1167a02",
            "group": "1. Constants",
            "name": "bcon",
            "title": "Boltzmanns Constant",
            "value": -228.60000610351562,
            "jsonata_exp": "-228.6",
            "user_exp": "=-228.6",
            "order": 1,
            "notes": "Constant"
        },
        {
            "id": "866bf837-da81-4c00-b689-941ef663b67c",
            "group": "2. Mission Service Parameters",
            "name": "mod",
            "title": "Modulation",
            "value": 0,
            "jsonata_exp": "$getModulation(1)",
            "user_exp": "=$getModulation(1)",
            "order": 2,
            "notes": "User or Input"
        },
        {
            "id": "02de009f-89e7-475d-adf8-6aeebb83c4fc",
            "group": "2. Mission Service Parameters",
            "name": "ct",
            "title": "Coding Type",
            "value": 0,
            "jsonata_exp": "$userCodingType",
            "user_exp": "=$userCodingType",
            "order": 3,
            "notes": "User or Input"
        }
    ]
};

export const mockStoreResponseData = {
    success: true,
    message: 'Success!'
}

export const mockDatasetNames = {
    names: [
        {
            "id": 1,
            "name": "Dataset 1",
            "updatedAt": "2024-03-08T16:13:15.860Z"
        },
        {
            "id": 2,
            "name": "Dataset 2",
            "updatedAt": "2023-05-17T17:59:03.793Z"
        },
        {
            "id": 3,
            "name": "Dataset 3",
            "updatedAt": "2023-05-11T15:32:29.393Z"
        },
    ]
}