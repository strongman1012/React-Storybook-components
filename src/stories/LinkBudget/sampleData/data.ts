export const Row = {
    "id": "8aee8d14-8434-4429-a83f-a7aee1167a02",
    "group": "1. Constants",
    "name": "bcon",
    "title": "Boltzmanns Constant",
    "value": -228.66,
    "jsonata_exp": "-228.66",
    "user_exp": "=-228.66",
    "order": 1,
    "notes": "Constant"
}
export const dataSource =
    [
        {
            "id": "8aee8d14-8434-4429-a83f-a7aee1167a02",
            "group": "1. Constants",
            "name": "bcon",
            "title": "Boltzmanns Constant",
            "value": -228.66,
            "jsonata_exp": "-228.66",
            "user_exp": "=-228.66",
            "order": 1,
            "notes": "Constant"
        },
        {
            "id": "866bf837-da81-4c00-b689-941ef663b67c",
            "group": "1. Constants",
            "name": "mod",
            "title": "Modulation",
            "value": "BPSK",
            "jsonata_exp": "$getModulation(1)",
            "user_exp": "=$getModulation(1)",
            "order": 2,
            "notes": "User or Input"
        },
        {
            "id": "fd654147-52ae-4aa2-a1f6-6fd269e38fb6",
            "group": "2. Mission Service Parameters",
            "name": "uEIRP",
            "title": "User EIRP (dBW)",
            "value": 10,
            "jsonata_exp": "$usatEIRP",
            "user_exp": "=$usatEIRP",
            "order": 3,
            "notes": "User Input"
        },
        {
            "id": "a500e8f4-38f8-42cd-ad70-b34b80d5dbee",
            "group": "2. Mission Service Parameters",
            "name": "cr",
            "title": "Coding Rate",
            "value": "Rate 1/2",
            "jsonata_exp": "$getCodingRate(1)",
            "user_exp": "=$getCodingRate(1)",
            "order": 4,
            "notes": "User or Input"
        },
        {
            "id": "b2af756a-1b6f-4892-851d-bff696796ebd",
            "group": "2. Mission Service Parameters",
            "name": "dr",
            "title": "Data Rate (kbps)",
            "value": 5000,
            "jsonata_exp": "$getDataRate(1)",
            "user_exp": "=$getDataRate(1)",
            "order": 5,
            "notes": "User or Input"
        },
        {
            "id": "c41617aa-8c30-44c0-971f-a38223549493",
            "group": "3. Space to Ground Link",
            "name": "fsl",
            "title": "Free Space Loss (dB)",
            "value": 113.45372772216797,
            "jsonata_exp": "32.45+20*$log(10,items[name=\"sglF\"].value)+20*$log(10,items[name=\"dsat\"].value)",
            "user_exp": "=32.45+20*$log(10,sglF)+20*$log(10,dsat)",
            "order": 6,
            "notes": "Calculated"
        },
        {
            "id": "efb699e4-fe9b-4317-a76d-bf330e0f4ebd",
            "group": "3. Space to Ground Link",
            "name": "sglF",
            "title": "SGL Frequency (MHz) asasas",
            "value": 2245,
            "jsonata_exp": "$getFrequency(1)",
            "user_exp": "=$getFrequency(1)",
            "order": 7,
            "notes": "Input"
        },
        {
            "id": "70d2dcec-225c-4e44-911b-87400ed2c6db",
            "group": "3. Space to Ground Link",
            "name": "Test",
            "title": "test",
            "value": 14,
            "jsonata_exp": "14",
            "user_exp": "=14",
            "order": 8,
            "notes": "Test"
        },
        {
            "id": "aefb8336-ee5f-429b-8fb2-0b24d826f1e2",
            "group": "3. Space to Ground Link",
            "name": "dsat",
            "title": "Distance to sat (km)",
            "value": 5,
            "jsonata_exp": "$getSlantRange(1,$userAltitude)",
            "user_exp": "=$getSlantRange(1,$userAltitude)",
            "order": 9,
            "notes": "Calculated"
        },
        {
            "id": "ea192a9d-e810-46f7-a4d0-658839c00558",
            "group": "3. Space to Ground Link",
            "name": "mL",
            "title": "Multipath Loss (dB)",
            "value": 0,
            "jsonata_exp": "0",
            "user_exp": "=0",
            "order": 10,
            "notes": "Assumpiton"
        },
        {
            "id": "14be9b26-ed9e-49be-bf31-aacdbcd27b5f",
            "group": "3. Space to Ground Link",
            "name": "pL",
            "title": "Polarization Loss (dB)",
            "value": 4,
            "jsonata_exp": "$getPolarizationLoss(1)",
            "user_exp": "=$getPolarizationLoss(1)",
            "order": 11,
            "notes": "User Input or Assumption"
        },
        {
            "id": "90067400-c91d-41cc-bf36-f89dccae4be6",
            "group": "3. Space to Ground Link",
            "name": "atL",
            "title": "Atmospheric Loss (dB)",
            "value": 1,
            "jsonata_exp": "$getAtmosphericLoss(1)",
            "user_exp": "=$getAtmosphericLoss(1)",
            "order": 12,
            "notes": "ITU-RP 676-10 Calculated for 99%"
        },
        {
            "id": "bb1aab46-a9bd-44cf-abee-983b0a77bfc9",
            "group": "3. Space to Ground Link",
            "name": "ptL",
            "title": "Pointing Loss (dB)",
            "value": 0,
            "jsonata_exp": "$getPointingLoss(1)",
            "user_exp": "=$getPointingLoss(1)",
            "order": 13,
            "notes": "User Input or Assumption"
        },
        {
            "id": "8dfa5d2b-5b3e-4bf6-9a96-35aae20df801",
            "group": "3. Space to Ground Link",
            "name": "oL",
            "title": "Other Losses (dB)",
            "value": 1,
            "jsonata_exp": "$getOtherLoss(1)",
            "user_exp": "=$getOtherLoss(1)",
            "order": 14,
            "notes": "User Input or Assumption"
        },
        {
            "id": "e5e4fbb1-781b-45b7-be92-343d7485de29",
            "group": "3. Space to Ground Link",
            "name": "cL",
            "title": "Cloud Loss (dB)",
            "value": 3,
            "jsonata_exp": "$getCloudLoss(1)",
            "user_exp": "=$getCloudLoss(1)",
            "order": 15,
            "notes": "ITU-RP 676-10 Calculated for 99%"
        },
        {
            "id": "9f28b194-2e8e-4d8f-abe7-755b61090f54",
            "group": "3. Space to Ground Link",
            "name": "scL",
            "title": "Scintillation Loss (dB)",
            "value": 4,
            "jsonata_exp": "$getScintillationLoss(1)",
            "user_exp": "=$getScintillationLoss(1)",
            "order": 16,
            "notes": "ITU-RP 676-10 Calculated for 99%"
        },
        {
            "id": "1a589683-345b-403e-b99d-20ae6e340092",
            "group": "3. Space to Ground Link",
            "name": "rL",
            "title": "Rain Loss (dB)",
            "value": 2,
            "jsonata_exp": "$getRainLoss(1)",
            "user_exp": "=$getRainLoss(1)",
            "order": 17,
            "notes": "ITU-RP 676-10 Calculated for 99%"
        },
        {
            "id": "7d3a5542-6c35-4676-81d5-9d5aa989847b",
            "group": "3. Space to Ground Link",
            "name": "prec",
            "title": "Prec @ Ground",
            "value": -118.45372772216797,
            "jsonata_exp": "items[name=\"uEIRP\"].value-items[name=\"fsl\"].value-items[name=\"mL\"].value-items[name=\"pL\"].value-items[name=\"atL\"].value-items[name=\"cL\"].value-items[name=\"scL\"].value-items[name=\"rL\"].value-items[name=\"ptL\"].value-items[name=\"oL\"].value",
            "user_exp": "=uEIRP-fsl-mL-pL-atL-cL-scL-rL-ptL-oL",
            "order": 18,
            "notes": "6-8-9-10-11-12-13-14-15-16"
        },
        {
            "id": "54ecd724-6665-4fed-9b96-f08d92478d5c",
            "group": "3. Space to Ground Link",
            "name": "ggt",
            "title": "Gateway G/T (dB/K)",
            "value": 16,
            "jsonata_exp": "$getGT(1)",
            "user_exp": "=$getGT(1)",
            "order": 19,
            "notes": "Assumption"
        },
        {
            "id": "8868872b-dc2a-4726-bdc8-41e19863f7c8",
            "group": "3. Space to Ground Link",
            "name": "cno",
            "title": "C/No @ Ground (dB-Hz)",
            "value": 126.20627227783203,
            "jsonata_exp": "items[name=\"prec\"].value+items[name=\"ggt\"].value-items[name=\"bcon\"].value",
            "user_exp": "=prec+ggt-bcon",
            "order": 20,
            "notes": "17+18-1"
        },
        {
            "id": "f345c174-ddeb-4c2a-b4f7-725a3beb5ddf",
            "group": "4. Comms Link Performance",
            "name": "mdL",
            "title": "Modulation Loss (dB)",
            "value": 0,
            "jsonata_exp": "0",
            "user_exp": "=0",
            "order": 21,
            "notes": "Assumpiton"
        },
        {
            "id": "8787f770-d0e8-48e4-931e-aa7b0a62115f",
            "group": "4. Comms Link Performance",
            "name": "drbps",
            "title": "Data Rate (dB-BPS)",
            "value": 66.98970004336019,
            "jsonata_exp": "10*$log(10,items[name=\"dr\"].value*1000)",
            "user_exp": "=10*$log(10,dr*1000)",
            "order": 22,
            "notes": "Calculated"
        },
        {
            "id": "6669d347-2aaa-4ddf-86e5-039fa66fb369",
            "group": "4. Comms Link Performance",
            "name": "dedL",
            "title": "Differential Encoding/Decoding Loss (dB)",
            "value": 0,
            "jsonata_exp": "0",
            "user_exp": "=0",
            "order": 23,
            "notes": "Not Considered"
        },
        {
            "id": "9ad79893-b901-4fd1-9240-c03c3be7dc1f",
            "group": "4. Comms Link Performance",
            "name": "uscL",
            "title": "User Constraint Loss (dB)",
            "value": 0,
            "jsonata_exp": "0",
            "user_exp": "=0",
            "order": 24,
            "notes": "Not Considered"
        },
        {
            "id": "60e62c42-e404-43d4-a438-5f7235c10eb5",
            "group": "4. Comms Link Performance",
            "name": "rcebno",
            "title": "Received Eb/No (dB)",
            "value": 59.21657223447184,
            "jsonata_exp": "items[name=\"cno\"].value-items[name=\"mdL\"].value-items[name=\"drbps\"].value-items[name=\"dedL\"].value-items[name=\"uscL\"].value",
            "user_exp": "=cno-mdL-drbps-dedL-uscL",
            "order": 25,
            "notes": "19-20-21-22-23"
        },
        {
            "id": "47846d1a-35b3-4118-8089-8156c39b01bb",
            "group": "4. Comms Link Performance",
            "name": "iL",
            "title": "Implementation Loss (dB)",
            "value": 3,
            "jsonata_exp": "$getImplementationLoss(1)",
            "user_exp": "=$getImplementationLoss(1)",
            "order": 26,
            "notes": "Database"
        },
        {
            "id": "7a955214-85af-47c0-82f3-c566d02ce561",
            "group": "4. Comms Link Performance",
            "name": "rqebno",
            "title": "Required Eb/No (dB)",
            "value": 4.2,
            "jsonata_exp": "$getEbNo(1)",
            "user_exp": "=$getEbNo(1)",
            "order": 27,
            "notes": "Database: BER 10^-5"
        },
        {
            "id": "9ff9b1cd-f02b-4958-9522-5457aef5a8e0",
            "group": "4. Comms Link Performance",
            "name": "rqpm",
            "title": "Required Performance Margin (dB)",
            "value": 2,
            "jsonata_exp": "$getReqPerformanceMargin()",
            "user_exp": "=$getReqPerformanceMargin()",
            "order": 28,
            "notes": "User or Input"
        },
        {
            "id": "1c260813-5c86-4aa3-a3c2-fdb8bb0a81af",
            "group": "4. Comms Link Performance",
            "name": "M",
            "title": "Margin (dB)",
            "value": 50.01657223447184,
            "jsonata_exp": "items[name=\"rcebno\"].value-items[name=\"iL\"].value-items[name=\"rqebno\"].value-items[name=\"rqpm\"].value",
            "user_exp": "=rcebno-iL-rqebno-rqpm",
            "order": 29,
            "notes": "24-25-26-27"
        }
    ]

export const datasetName = { id: 13, name: 'Loading...' }
export const datasetNames =
    [
        {
            "id": 13,
            "_id": "a64bb75e-cc54-4851-8745-24a6598e1c79",
            "name": "DTE Downlink",
            "updatedAt": "2024-04-25T00:46:36.377Z"
        },
        {
            "id": 23,
            "_id": "88d16e67-1d96-4ad9-8527-56ac16378f73",
            "name": "Bent-Pipe Return",
            "updatedAt": "2023-05-17T17:59:03.793Z"
        },
        {
            "id": 24,
            "_id": "99e66f01-a973-42a4-9904-39d67018fd54",
            "name": "Regenerative Transponder Return",
            "updatedAt": "2023-05-11T15:32:29.393Z"
        },
        {
            "id": 50,
            "_id": "21a63b3e-ba6f-476d-8290-605afff10561",
            "name": "Bent-Pipe Forward",
            "updatedAt": "2023-05-17T17:38:56.360Z"
        },
        {
            "id": 54,
            "_id": "5fe6ce83-ddbb-4eb1-a2a8-c186105c09df",
            "name": "Regenerative Transponder Forward",
            "updatedAt": "2024-04-03T09:45:51.050Z"
        },
        {
            "id": 55,
            "_id": "8af31119-aac5-4213-8ce1-9aee971f872d",
            "name": "Regenerative Transponder Forward",
            "updatedAt": "2023-05-23T15:06:07.073Z"
        },
        {
            "id": 56,
            "_id": "88300542-bb8d-4caf-8d9d-40cd9cab59a4",
            "name": "Regenerative Transponder Forward",
            "updatedAt": "2023-05-17T16:24:22.160Z"
        },
        {
            "id": 79,
            "_id": "bfbaef99-4678-46b6-86db-88ccf614f5c2",
            "name": "DTE Downlink 1",
            "updatedAt": "2024-03-26T08:08:07.203Z"
        },
        {
            "id": 83,
            "_id": "f7ef4d3b-10f8-4f94-b665-54f609a0fe04",
            "name": "DTE Downlink",
            "updatedAt": "2024-04-02T13:05:40.863Z"
        },
        {
            "id": 87,
            "_id": "02f27f21-4eff-473b-b7f9-d7009277d99e",
            "name": "DTE Downlink",
            "updatedAt": "2024-04-04T12:25:06.497Z"
        }
    ]