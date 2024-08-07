export const ANALYTICS_MOCK_DATA: { performancePanel: any } = {
  performancePanel: {
    systemParams: {
      systemName: "Ohio",
      version: 1,
      networkType: "dte",
      antennaId: 83,
      antennaName: "OH1",
      elevationConstraint_deg: 5,
      gOverT: 16,
      implementationLoss: 3,
      polarizationLoss_dB: 1,
      otherLosses_dB: 1,
      atmosphericLoss_dB: 0.5022653741764895,
      rainAttenuation_dB: 0.03531989344334908,
      cloudAttenuation_dB: 0.29525587809490994,
      scintillationLoss_dB: 0.9982803205284734,
      totalPropagationLoss_dB: 1.5538565205268888,
      bandwidthMHz: 5,
      rtnLinkFreqMHz: 4000,
      lambda: 0.075,
      multipleAccess: "SA",
      modCodOptions: [],
      R_kbps: null,
    },
    linkParams: {
      modCodTable: {
        BPSK: {
          Uncoded: 1,
          "Rate 1/2": 0.5,
          "Rate 1/3": 0.333,
          "Rate 2/3": 0.666,
          "Rate 3/4": 0.75,
          "Rate 7/8": 0.875,
        },
        QPSK: {
          Uncoded: 2,
          "Rate 5/6": 1,
          "Rate 1/2": 1,
          "Rate 1/3": 0.666,
          "Rate 2/3": 1.332,
          "Rate 3/4": 1.5,
          "Rate 4/5": 1.6,
          "Rate 7/8": 1.75,
        },
        "8 PSK": {
          Uncoded: 3,
          "Rate 1/2": 1.5,
          "Rate 1/3": 0.999,
          "Rate 2/3": 1.998,
          "Rate 3/4": 2.25,
        },
        "16 PSK": {
          Uncoded: 4,
          "Rate 1/2": 2,
          "Rate 1/3": 1.332,
          "Rate 2/3": 2.664,
          "Rate 3/4": 3,
        },
        "4 QAM": {
          Uncoded: 2,
          "Rate 1/2": 1,
          "Rate 1/3": 0.666,
          "Rate 2/3": 1.332,
          "Rate 3/4": 1.5,
        },
        "16 QAM": {
          Uncoded: 4,
          "0.775": 2,
          "Rate 5/6": 2.9,
          "0.852": 3,
          "Rate 1/2": 2,
          "Rate 1/3": 1.332,
          "Rate 2/3": 2.664,
          "Rate 3/4": 3,
        },
        "32 PSK": {
          Uncoded: 5,
          "Rate 1/2": 2.5,
          "Rate 1/3": 1.665,
          "Rate 2/3": 3.33,
          "Rate 3/4": 3.75,
        },
        "32 QAM": {
          Uncoded: 6,
          "Rate 1/2": 2.5,
          "Rate 1/3": 1.665,
          "Rate 2/3": 3.33,
          "Rate 3/4": 3.75,
        },
      },
      ebNoTable: {
        BPSK: {
          Uncoded: 9.6,
          "Rate 1/2": 4.2,
          "Rate 1/4": 3.8,
          "Rate 1/3": 4,
          "Rate 2/3": 4.5,
          "Rate 3/4": 4.7,
          "Rate 7/8": 4.1,
        },
        QPSK: {
          Uncoded: 9.6,
          "Rate 1/2": 4.2,
          "Rate 5/6": 4.8,
          "Rate 4/5": 4.8,
          "Rate 1/4": 3.8,
          "Rate 1/3": 4,
          "Rate 2/3": 4.5,
          "Rate 3/4": 4.7,
          "Rate 7/8": 4.1,
        },
        "8 PSK": {
          "Rate 1/2": 9.4,
          "Rate 1/4": 7.3,
          "Rate 1/3": 8.2,
          "Rate 2/3": 10,
          "Rate 3/4": 10.4,
        },
        "16 PSK": {
          "Rate 1/2": 13.35,
          "Rate 1/4": 11.9,
          "Rate 1/3": 12.2,
          "Rate 2/3": 14,
          "Rate 3/4": 14.5,
        },
        "4 QAM": {
          "Rate 1/2": 6.5,
          "Rate 1/4": 3.8,
          "Rate 1/3": 4,
          "Rate 2/3": 7,
          "Rate 3/4": 7.5,
        },
        "16 QAM": {
          "Rate 1/2": 10,
          "0.775": 10.8,
          "Rate 5/6": 12.4,
          "0.852": 12.7,
          "Rate 1/4": 9.1,
          "Rate 1/3": 9.5,
          "Rate 2/3": 10.5,
          "Rate 3/4": 11,
        },
        "32 PSK": {
          "Rate 1/2": 11,
          "Rate 1/4": 10.4,
          "Rate 1/3": 10.7,
          "Rate 2/3": 11.8,
          "Rate 3/4": 12.3,
        },
        "32 QAM": {
          "Rate 1/2": 12.8,
          "Rate 1/4": 11.8,
          "Rate 1/3": 12.2,
          "Rate 2/3": 13.5,
          "Rate 3/4": 14,
        },
      },
      propagationLosses: {
        atmosphericLoss_dB: {},
        rainAttenuation_dB: {},
      },
    },
    modelData: {
      orbital: {
        coverageMinutes: {
          type: "coverageMinutes",
          label: "RF Coverage (minutes/day)",
          points: [
            {
              altitude: 300,
              inclination: 30,
              eccentricity: 0,
              value: 8.498524561708036,
            },
            {
              altitude: 300,
              inclination: 35,
              eccentricity: 0,
              value: 21.99618121853845,
            },
            {
              altitude: 300,
              inclination: 40,
              eccentricity: 0,
              value: 29.49487936122201,
            },
            {
              altitude: 350,
              inclination: 30,
              eccentricity: 0,
              value: 12.997743447318175,
            },
            {
              altitude: 350,
              inclination: 35,
              eccentricity: 0,
              value: 27.74518312792918,
            },
            {
              altitude: 350,
              inclination: 40,
              eccentricity: 0,
              value: 34.993924665856625,
            },
            {
              altitude: 400,
              inclination: 30,
              eccentricity: 0,
              value: 16.747092518659954,
            },
            {
              altitude: 400,
              inclination: 35,
              eccentricity: 0,
              value: 29.744835965978133,
            },
            {
              altitude: 400,
              inclination: 40,
              eccentricity: 0,
              value: 37.49349071341781,
            },
          ],
        },
        contactsPerDay: {
          type: "contactsPerDay",
          label: "Contacts Per Day",
          points: [
            {
              altitude: 300,
              inclination: 30,
              eccentricity: 0,
              value: 2.4995660475611876,
            },
            {
              altitude: 300,
              inclination: 35,
              eccentricity: 0,
              value: 3.9993056760979,
            },
            {
              altitude: 300,
              inclination: 40,
              eccentricity: 0,
              value: 4.999132095122375,
            },
            {
              altitude: 350,
              inclination: 30,
              eccentricity: 0,
              value: 2.999479257073425,
            },
            {
              altitude: 350,
              inclination: 35,
              eccentricity: 0,
              value: 4.999132095122375,
            },
            {
              altitude: 350,
              inclination: 40,
              eccentricity: 0,
              value: 4.999132095122375,
            },
            {
              altitude: 400,
              inclination: 30,
              eccentricity: 0,
              value: 3.4993924665856624,
            },
            {
              altitude: 400,
              inclination: 35,
              eccentricity: 0,
              value: 4.499218885610137,
            },
            {
              altitude: 400,
              inclination: 40,
              eccentricity: 0,
              value: 4.999132095122375,
            },
          ],
        },
        averageCoverageDuration: {
          type: "averageCoverageDuration",
          label: "Average Contact Duration (min)",
          points: [
            {
              altitude: 300,
              inclination: 30,
              eccentricity: 0,
              value: 3.4,
            },
            {
              altitude: 300,
              inclination: 35,
              eccentricity: 0,
              value: 5.5,
            },
            {
              altitude: 300,
              inclination: 40,
              eccentricity: 0,
              value: 5.9,
            },
            {
              altitude: 350,
              inclination: 30,
              eccentricity: 0,
              value: 4.333333333333333,
            },
            {
              altitude: 350,
              inclination: 35,
              eccentricity: 0,
              value: 5.55,
            },
            {
              altitude: 350,
              inclination: 40,
              eccentricity: 0,
              value: 7,
            },
            {
              altitude: 400,
              inclination: 30,
              eccentricity: 0,
              value: 4.7857142857142865,
            },
            {
              altitude: 400,
              inclination: 35,
              eccentricity: 0,
              value: 6.611111111111112,
            },
            {
              altitude: 400,
              inclination: 40,
              eccentricity: 0,
              value: 7.5,
            },
          ],
        },
        maxCoverageDuration: {
          type: "maxCoverageDuration",
          label: "Max Coverage Duration (min)",
          points: [
            {
              altitude: 300,
              inclination: 30,
              eccentricity: 0,
              value: 4,
            },
            {
              altitude: 300,
              inclination: 35,
              eccentricity: 0,
              value: 6.5,
            },
            {
              altitude: 300,
              inclination: 40,
              eccentricity: 0,
              value: 7,
            },
            {
              altitude: 350,
              inclination: 30,
              eccentricity: 0,
              value: 5,
            },
            {
              altitude: 350,
              inclination: 35,
              eccentricity: 0,
              value: 7,
            },
            {
              altitude: 350,
              inclination: 40,
              eccentricity: 0,
              value: 8,
            },
            {
              altitude: 400,
              inclination: 30,
              eccentricity: 0,
              value: 6,
            },
            {
              altitude: 400,
              inclination: 35,
              eccentricity: 0,
              value: 8,
            },
            {
              altitude: 400,
              inclination: 40,
              eccentricity: 0,
              value: 8.5,
            },
          ],
        },
        averageGapDuration: {
          type: "averageGapDuration",
          label: "Average Gap (min)",
          points: [
            {
              altitude: 300,
              inclination: 30,
              eccentricity: 0,
              value: 477.25,
            },
            {
              altitude: 300,
              inclination: 35,
              eccentricity: 0,
              value: 315.1666666666667,
            },
            {
              altitude: 300,
              inclination: 40,
              eccentricity: 0,
              value: 256.5,
            },
            {
              altitude: 350,
              inclination: 30,
              eccentricity: 0,
              value: 407.78571428571433,
            },
            {
              altitude: 350,
              inclination: 35,
              eccentricity: 0,
              value: 256.8181818181818,
            },
            {
              altitude: 350,
              inclination: 40,
              eccentricity: 0,
              value: 255.5,
            },
            {
              altitude: 400,
              inclination: 30,
              eccentricity: 0,
              value: 355.875,
            },
            {
              altitude: 400,
              inclination: 35,
              eccentricity: 0,
              value: 282.1,
            },
            {
              altitude: 400,
              inclination: 40,
              eccentricity: 0,
              value: 255.04545454545453,
            },
          ],
        },
        maxGapDuration: {
          type: "maxGapDuration",
          label: "Max Gap (min)",
          points: [
            {
              altitude: 300,
              inclination: 30,
              eccentricity: 0,
              value: 1346,
            },
            {
              altitude: 300,
              inclination: 35,
              eccentricity: 0,
              value: 1156.5,
            },
            {
              altitude: 300,
              inclination: 40,
              eccentricity: 0,
              value: 1063,
            },
            {
              altitude: 350,
              inclination: 30,
              eccentricity: 0,
              value: 1266,
            },
            {
              altitude: 350,
              inclination: 35,
              eccentricity: 0,
              value: 1075.5,
            },
            {
              altitude: 350,
              inclination: 40,
              eccentricity: 0,
              value: 1073.5,
            },
            {
              altitude: 400,
              inclination: 30,
              eccentricity: 0,
              value: 1185,
            },
            {
              altitude: 400,
              inclination: 35,
              eccentricity: 0,
              value: 1086.5,
            },
            {
              altitude: 400,
              inclination: 40,
              eccentricity: 0,
              value: 1084.5,
            },
          ],
        },
        meanResponseTime: {
          type: "meanResponseTime",
          label: "Mean Response Time (min)",
          points: [
            {
              altitude: 300,
              inclination: 30,
              eccentricity: 0,
              value: 590.3478128797084,
            },
            {
              altitude: 300,
              inclination: 35,
              eccentricity: 0,
              value: 471.6204218017705,
            },
            {
              altitude: 300,
              inclination: 40,
              eccentricity: 0,
              value: 401.8492883180004,
            },
            {
              altitude: 350,
              inclination: 30,
              eccentricity: 0,
              value: 560.7607620204825,
            },
            {
              altitude: 350,
              inclination: 35,
              eccentricity: 0,
              value: 411.3802291268877,
            },
            {
              altitude: 350,
              inclination: 40,
              eccentricity: 0,
              value: 409.597595903489,
            },
            {
              altitude: 400,
              inclination: 30,
              eccentricity: 0,
              value: 494.1211595209165,
            },
            {
              altitude: 400,
              inclination: 35,
              eccentricity: 0,
              value: 419.5809755250824,
            },
            {
              altitude: 400,
              inclination: 40,
              eccentricity: 0,
              value: 385.23507203610484,
            },
          ],
        },
        availability: {
          type: "availability_gap",
          label: "Effective Comms Time (%)",
          points: [],
        },
      },
      terrestrial: {},
    },
    predictedData: {
      coefficients: {
        coverageMinutes: [],
        contactsPerDay: [],
        averageCoverageDuration: [],
        maxCoverageDuration: [],
        averageGapDuration: [],
        maxGapDuration: [],
        meanResponseTime: [],
      },
      regressionDefaults: {
        qualityIndicators: {
          coverageMinutes: 1,
          contactsPerDay: 1,
          averageCoverageDuration: 1,
          maxCoverageDuration: 1,
          averageGapDuration: 1,
          maxGapDuration: 1,
          meanResponseTime: 1,
        },
        regressionTypes: {
          coverageMinutes: "",
          contactsPerDay: "",
          averageCoverageDuration: "",
          maxCoverageDuration: "",
          averageGapDuration: "",
          maxGapDuration: "",
          meanResponseTime: "",
        },
      },
      surfaces: {},
    },
    coveragePerStation: [
      {
        altitude: 300,
        inclination: 30,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 8.5,
          },
        ],
        stationCoverageData: [],
      },
      {
        altitude: 300,
        inclination: 35,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 22,
          },
        ],
        stationCoverageData: [],
      },
      {
        altitude: 300,
        inclination: 40,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 29.5,
          },
        ],
        stationCoverageData: [],
      },
      {
        altitude: 350,
        inclination: 30,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 13,
          },
        ],
        stationCoverageData: [],
      },
      {
        altitude: 350,
        inclination: 35,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 27.75,
          },
        ],
        stationCoverageData: [],
      },
      {
        altitude: 350,
        inclination: 40,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 35,
          },
        ],
        stationCoverageData: [],
      },
      {
        altitude: 400,
        inclination: 30,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 16.75,
          },
        ],
        stationCoverageData: [],
      },
      {
        altitude: 400,
        inclination: 35,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 29.75,
          },
        ],
        stationCoverageData: [],
      },
      {
        altitude: 400,
        inclination: 40,
        eccentricity: 0,
        coverageData: [
          {
            platformName: "Ohio",
            platformId: 67,
            coverageMinutes: 37.5,
          },
        ],
        stationCoverageData: [],
      },
    ],
    coverageEvents: [
      {
        altitude: 300,
        inclination: 30,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 150,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 210,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 240,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 240,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 180,
          },
        ],
      },
      {
        altitude: 300,
        inclination: 35,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 330,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 210,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 360,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 300,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 300,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 360,
          },
        ],
      },
      {
        altitude: 300,
        inclination: 40,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 270,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 360,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 120,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 420,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 420,
          },
        ],
      },
      {
        altitude: 350,
        inclination: 30,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 240,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 300,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 300,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 240,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 300,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 180,
          },
        ],
      },
      {
        altitude: 350,
        inclination: 35,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 90,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 330,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 420,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 420,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 300,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 180,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 420,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
        ],
      },
      {
        altitude: 350,
        inclination: 40,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 420,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 330,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 420,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 480,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 480,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 330,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
        ],
      },
      {
        altitude: 400,
        inclination: 30,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 300,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 240,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 360,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 330,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 60,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 360,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 360,
          },
        ],
      },
      {
        altitude: 400,
        inclination: 35,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 210,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 420,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 480,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 330,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 330,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
        ],
      },
      {
        altitude: 400,
        inclination: 40,
        eccentricity: 0,
        coverageEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 480,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 270,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 480,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 510,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 480,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 450,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 510,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 480,
          },
        ],
      },
    ],
    gapEvents: [
      {
        altitude: 300,
        inclination: 30,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1560,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 75150,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5460,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 80760,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5490,
          },
        ],
      },
      {
        altitude: 300,
        inclination: 35,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1470,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 69390,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5400,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 69360,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
        ],
      },
      {
        altitude: 300,
        inclination: 40,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1440,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 63690,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5280,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 63780,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5400,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5280,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5280,
          },
        ],
      },
      {
        altitude: 350,
        inclination: 30,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1530,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 75960,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5460,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 75930,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5490,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5520,
          },
        ],
      },
      {
        altitude: 350,
        inclination: 35,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1470,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5490,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 64530,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5370,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5400,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 64500,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5460,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5370,
          },
        ],
      },
      {
        altitude: 350,
        inclination: 40,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1440,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5370,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 64380,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5280,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 64410,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
        ],
      },
      {
        altitude: 400,
        inclination: 30,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1530,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 71010,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5520,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5490,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 71100,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5610,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5460,
          },
        ],
      },
      {
        altitude: 400,
        inclination: 35,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1440,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5490,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 65190,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5370,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5370,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5400,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 65190,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5430,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5370,
          },
        ],
      },
      {
        altitude: 400,
        inclination: 40,
        eccentricity: 0,
        gapEvents: [
          {
            name: "Ohio",
            id: 67,
            duration: 1440,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5370,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 59400,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5430,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5310,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 65070,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
          {
            name: "Ohio",
            id: 67,
            duration: 5340,
          },
        ],
      },
    ],
    simulationOutputDir: "b46ed93f-afac-4e35-88f5-784a2aecc052",
    realTime: true,
  },
};

export const MOCK_SCRIPTS: any[] = [
  {
    id: 55,
    name: "test2",
    ext: ".js",
    script:
      " /*\nCreate your own plotly graphs using this template. Please note that\nCoSMOS currently only supports .js file. Scripts are run\nin a sandbox environment in your browser and do not have access to databases.\n\nGraph Format Docs: https://plotly.com/javascript/\n\n// Interfaces for Graph Data Input:\n\nexport interface Traces {\n  avgTraces: number[];\n  title: string;\n  type: string; //'box' or 'line'\n  xTraces: number[];\n  yTraces: number[];\n}\n\n//Main data access variable: traces\nexport interface TracesDataObj {\n  coverage: Traces;\n  coverage_histogram: Traces;\n  xTraces: Traces;\n}\n\n//Main data access variable: performancePanelObj\nexport interface PointsDataObj {\n  coverageEvents: CoverageEventsDataObj[];\n  coveragePerStation: CoveragePerStationDataObj[];\n  gapEvents: GapEventDataObj[];\n  modelData: ModelDataDataObj;\n}\n\nexport interface Points {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  value: number;\n}\n\nexport interface MetricsDataObj{\n  label: string;\n  points: Points[];\n  type: string;\n}\n\nexport interface OrbitalDataObj {\n  availability: MetricsDataObj;\n  averageCoverageDuration: MetricsDataObj;\n  averageGapDuration: MetricsDataObj;\n  contactsPerDay: MetricsDataObj;\n  coverageMinutes: MetricsDataObj;\n  maxCoverageDuration: MetricsDataObj;\n  maxGapDuration: MetricsDataObj;\n  meanResponseTime: MetricsDataObj;\n}\n\nexport interface ModelDataDataObj = {\n  orbital: OrbitalDataObj[];\n  terrestrial: TerrestrialDataObj[]; //NO IDEA WHAT THIS IS \n}\n\nexport interface GapEventDataObj {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  gapEvents: GapEvent\n}\n\nexport interface GapEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\nexport interface CoveragePerStationDataObj {\n  altitude: number;\n  coverageData: CoverageData[];\n  eccentricity: number;\n  inclination: number;\n  stationCoverageData: ????[];\n}\n\nexport interface CoverageData {\n  platformName: string;\n  platformId: number;\n  coverageMinutes: number;\n}\n\nexport interface CoverageEventsDataObj {\n  altitude: number;\n  coverageEvents: CoverageEvent[];\n  eccentricity: number;\n  inclination: number;\n}\n\nexport interface CoverageEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\n*/\n\n//User creates function to manipulateData\nfunction createData (data) {\nif (!data) {\n  return [];\n}\n return data.map((num) => {\n      num *= 3;\n      return num;\n  });\n}\n\n/* \n* User edits this function to return graph data they want displayed in Plotly graph\n*/\nfunction createGraph (performancePanel, traces, bgColor, textColor) {\n\nlet newYData = createData(traces?.['coverage_histogram']?.xTraces);\nlet dataBox = {\n  y: newYData,\n  type: 'box', //\"box\"\n  name: '', //User can write any text here\n  marker: {\n    color: 'rgb(137, 207, 240)', //rgb(0,0,0)\n    outliercolor: 'rgb(31, 81, 255)', //rgba(0,0,0)\n    line: {\n      outliercolor: 'rgb(100, 149, 237)' //rgba(0,0,0)\n    }\n  },\n  boxpoints: 'all'//\"suspectedoutliers\", \"Outliers\", false, \"all\"\n}\n\n  //If you want more than one dataset on the graph, make a new object like returnData add it to \"data\" array\nlet config = {\n  displayModeBar: false\n}\n\nlet layout = {\n  showlegend: false,\n  width: 450, \n  height: 400,\n  title: 'Title Graph',\n  font: {\n    color: textColor\n  },\n  xaxis: {\n    autorange: true,\n    title:'Duration (min*3)',\n    titlefont: {\n      size: 12,\n      color: textColor\n    },\n   color: textColor\n  },\n  yaxis: {\n    autorange: true,\n    title: 'Occurences',\n    titlefont: {\n        size: 12,\n        color: textColor\n    },\n    color: textColor\n  },\n  paper_bgcolor: bgColor,\n  plot_bgcolor: bgColor,\n  color: textColor\n};\nlet plotlyInfo = {\n  name: 'Graph Info',\n  showGraph: true,\n  graphData: [dataBox], //User can edit.\n  layout: layout,\n  config: config\n}\n\nlet plotlyGraph = {\n  name: 'Coverage Distribution Multiplied By 3',\n  values: [plotlyInfo]\n}\n\nlet graphObj = {\n    title: \"Custom Plots\",\n    sections: [plotlyGraph]\n}\n\n  //Returns an array of the new placement order for each column\n  return graphObj;\n}\n ",
    plotObj: {
      title: "Custom Plots",
      sections: [
        {
          name: "Coverage Distribution Multiplied By 3",
          values: [
            {
              name: "Graph Info",
              showGraph: true,
              graphData: [
                {
                  y: [],
                  type: "box",
                  name: "",
                  marker: {
                    color: "rgb(137, 207, 240)",
                    outliercolor: "rgb(31, 81, 255)",
                    line: {
                      outliercolor: "rgb(100, 149, 237)",
                    },
                  },
                  boxpoints: "all",
                },
              ],
              layout: {
                showlegend: false,
                width: 450,
                height: 400,
                title: {
                  text: "Title Graph",
                },
                font: {
                  color: "#1a1a1a",
                },
                xaxis: {
                  autorange: true,
                  title: {
                    text: "Duration (min*3)",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  color: "#1a1a1a",
                  type: "category",
                  range: [-1, 6],
                },
                yaxis: {
                  autorange: true,
                  title: {
                    text: "Occurences",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  color: "#1a1a1a",
                  range: [-1, 4],
                },
                paper_bgcolor: "#ffffff",
                plot_bgcolor: "#ffffff",
                color: "#1a1a1a",
              },
              config: {
                displayModeBar: false,
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 57,
    name: "runningCoverageAverage",
    ext: ".js",
    script:
      " /*\nCreate your own plotly graphs using this template. Please note that\nCoSMOS currently only supports .js file. Scripts are run\nin a sandbox environment in your browser and do not have access to databases.\n\nGraph Format Docs: https://plotly.com/javascript/\n\n// Interfaces for Graph Data Input:\n\nexport interface Traces {\n  avgTraces: number[];\n  title: string;\n  type: string; //'box' or 'line'\n  xTraces: number[];\n  yTraces: number[];\n}\n\n//Main data access variable: traces\nexport interface TracesDataObj {\n  coverage: Traces;\n  coverage_histogram: Traces;\n  xTraces: Traces;\n}\n\n//Main data access variable: performancePanelObj\nexport interface PointsDataObj {\n  coverageEvents: CoverageEventsDataObj[];\n  coveragePerStation: CoveragePerStationDataObj[];\n  gapEvents: GapEventDataObj[];\n  modelData: ModelDataDataObj;\n}\n\nexport interface Points {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  value: number;\n}\n\nexport interface MetricsDataObj{\n  label: string;\n  points: Points[];\n  type: string;\n}\n\nexport interface OrbitalDataObj {\n  availability: MetricsDataObj;\n  averageCoverageDuration: MetricsDataObj;\n  averageGapDuration: MetricsDataObj;\n  contactsPerDay: MetricsDataObj;\n  coverageMinutes: MetricsDataObj;\n  maxCoverageDuration: MetricsDataObj;\n  maxGapDuration: MetricsDataObj;\n  meanResponseTime: MetricsDataObj;\n}\n\nexport interface ModelDataDataObj = {\n  orbital: OrbitalDataObj[];\n  terrestrial: TerrestrialDataObj[]; \n}\n\nexport interface GapEventDataObj {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  gapEvents: GapEvent\n}\n\nexport interface GapEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\nexport interface CoveragePerStationDataObj {\n  altitude: number;\n  coverageData: CoverageData[];\n  eccentricity: number;\n  inclination: number;\n  stationCoverageData: ????[];\n}\n\nexport interface CoverageData {\n  platformName: string;\n  platformId: number;\n  coverageMinutes: number;\n}\n\nexport interface CoverageEventsDataObj {\n  altitude: number;\n  coverageEvents: CoverageEvent[];\n  eccentricity: number;\n  inclination: number;\n}\n\nexport interface CoverageEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\n*/\n\n\n/* \n* User edits this function to return graph data they want displayed in Plotly graph\n* @params \n* @returns XYData[]\n*/\n\nfunction createGraph (performancePanel, traces, bgColor, textColor) {\n\nlet dataLine = {\n  x: traces?.coverage?.xTraces ?? [],\n  y: traces?.coverage?.yTraces ?? [],\n  mode: 'lines+markers', //\"lines\", \"lines+markers\", \"markers\"\n  type: 'scatter', //\"scatter\"\n  marker: {\n    color: 'rgb(255,0,0)',//rgb(0, 0, 0)\n    size: 8 //number\n  },\n  line: {\n    color: 'rgb(255,0,0)', //rgb(0, 0, 0)\n    width: 2 //number\n  }\n}\n\nlet dataLine2 = {\n  x: traces?.coverage?.xTraces ?? [],\n  y: traces?.coverage?.avgTraces?? [],\n  mode: 'lines+markers', //\"lines\", \"lines+markers\", \"markers\"\n  type: 'scatter', //\"scatter\"\n  marker: {\n    color: 'rgb(0,0,255)',//rgb(0, 0, 0)\n    size: 8 //number\n  },\n  line: {\n    color: 'rgb(0,0,255)', //rgb(0, 0, 0)\n    width: 2 //number\n  }\n}\n\n  //If you want more than one dataset on the graph, make a new object like returnData add it to \"data\" array\nlet config = {\n  displayModeBar: false\n}\n\nlet layout = {\n  showlegend: false,\n  width: 450, \n  height: 400,\n  title: 'Running Coverage Average',\n  font: {\n    color: textColor\n  },\n  xaxis: {\n    range: [-3, 15],\n    autorange: false,\n    title:'Coverage Event Number',\n    titlefont: {\n      size: 12,\n      color: textColor\n    },\n    showgrid: true,\n    zerolinecolor: '#969696',\n    zerolinewidth: 1,\n    color: textColor\n  },\n  yaxis: {\n    range: [-2, 14],\n    autorange: false,\n    title: 'Coverage Duration',\n    titlefont: {\n        size: 12,\n        color: textColor\n    },\n    showgrid: true,\n    zerolinecolor: '#969696',\n    zerolinewidth: 1,\n    color: textColor\n  },\n  paper_bgcolor: bgColor,\n  plot_bgcolor: bgColor,\n  showgrid: true,\n  zerolinecolor: '#969696',\n  zerolinewidth: 1,\n  color: textColor\n \n}\n\nlet plotlyInfo = {\n  name: 'Graph Info',\n  showGraph: true,\n  graphData: [dataLine, dataLine2], //User can edit.\n  layout: layout,\n  config: config\n}\n\nlet plotlyGraph = {\n  name: 'Running Coverage Average',\n  values: [plotlyInfo]\n}\n\nlet graphObj = {\n    title: \"Custom Plots\",\n    sections: [plotlyGraph]\n}\n\n  //Returns an array of the new placement order for each column\n  return graphObj;\n}\n ",
    plotObj: {
      title: "Custom Plots",
      sections: [
        {
          name: "Running Coverage Average",
          values: [
            {
              name: "Graph Info",
              showGraph: true,
              graphData: [
                {
                  x: [],
                  y: [],
                  mode: "lines+markers",
                  type: "scatter",
                  marker: {
                    color: "rgb(255,0,0)",
                    size: 8,
                  },
                  line: {
                    color: "rgb(255,0,0)",
                    width: 2,
                  },
                },
                {
                  x: [],
                  y: [],
                  mode: "lines+markers",
                  type: "scatter",
                  marker: {
                    color: "rgb(0,0,255)",
                    size: 8,
                  },
                  line: {
                    color: "rgb(0,0,255)",
                    width: 2,
                  },
                },
              ],
              layout: {
                showlegend: false,
                width: 450,
                height: 400,
                title: {
                  text: "Running Coverage Average",
                },
                font: {
                  color: "#1a1a1a",
                },
                xaxis: {
                  range: [-3, 15],
                  autorange: false,
                  title: {
                    text: "Coverage Event Number",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  showgrid: true,
                  zerolinecolor: "#969696",
                  zerolinewidth: 1,
                  color: "#1a1a1a",
                },
                yaxis: {
                  range: [-2, 14],
                  autorange: false,
                  title: {
                    text: "Coverage Duration",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  showgrid: true,
                  zerolinecolor: "#969696",
                  zerolinewidth: 1,
                  color: "#1a1a1a",
                },
                paper_bgcolor: "#ffffff",
                plot_bgcolor: "#ffffff",
                showgrid: true,
                zerolinecolor: "#969696",
                zerolinewidth: 1,
                color: "#1a1a1a",
              },
              config: {
                displayModeBar: false,
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 63,
    name: "coverageDistribution",
    ext: ".js",
    script:
      " /*\nCreate your own plotly graphs using this template. Please note that\nCoSMOS currently only supports .js file. Scripts are run\nin a sandbox environment in your browser and do not have access to databases.\n\nGraph Format Docs: https://plotly.com/javascript/\n\n// Interfaces for Graph Data Input:\n\nexport interface Traces {\n  avgTraces: number[];\n  title: string;\n  type: string; //'box' or 'line'\n  xTraces: number[];\n  yTraces: number[];\n}\n\n//Main data access variable: traces\nexport interface TracesDataObj {\n  coverage: Traces;\n  coverage_histogram: Traces;\n  xTraces: Traces;\n}\n\n//Main data access variable: performancePanelObj\nexport interface PointsDataObj {\n  coverageEvents: CoverageEventsDataObj[];\n  coveragePerStation: CoveragePerStationDataObj[];\n  gapEvents: GapEventDataObj[];\n  modelData: ModelDataDataObj;\n}\n\nexport interface Points {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  value: number;\n}\n\nexport interface MetricsDataObj{\n  label: string;\n  points: Points[];\n  type: string;\n}\n\nexport interface OrbitalDataObj {\n  availability: MetricsDataObj;\n  averageCoverageDuration: MetricsDataObj;\n  averageGapDuration: MetricsDataObj;\n  contactsPerDay: MetricsDataObj;\n  coverageMinutes: MetricsDataObj;\n  maxCoverageDuration: MetricsDataObj;\n  maxGapDuration: MetricsDataObj;\n  meanResponseTime: MetricsDataObj;\n}\n\nexport interface ModelDataDataObj = {\n  orbital: OrbitalDataObj[];\n  terrestrial: TerrestrialDataObj[]; //NO IDEA WHAT THIS IS \n}\n\nexport interface GapEventDataObj {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  gapEvents: GapEvent\n}\n\nexport interface GapEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\nexport interface CoveragePerStationDataObj {\n  altitude: number;\n  coverageData: CoverageData[];\n  eccentricity: number;\n  inclination: number;\n  stationCoverageData: ????[];\n}\n\nexport interface CoverageData {\n  platformName: string;\n  platformId: number;\n  coverageMinutes: number;\n}\n\nexport interface CoverageEventsDataObj {\n  altitude: number;\n  coverageEvents: CoverageEvent[];\n  eccentricity: number;\n  inclination: number;\n}\n\nexport interface CoverageEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\n*/\n\n\n/* \n* User edits this function to return graph data they want displayed in Plotly graph\n* @params \n* @returns XYData[]\n*/\nfunction createGraph (performancePanel, traces, bgColor, textColor) {\n\nlet dataBox = {\n  y: traces['coverage_histogram']?.xTraces ?? [],\n  type: 'box', //\"box\"\n  name: '', //User can write any text here\n  marker: {\n    color: 'rgb(137, 207, 240)', //rgb(0,0,0)\n    outliercolor: 'rgb(31, 81, 255)', //rgba(0,0,0)\n    line: {\n      outliercolor: 'rgb(100, 149, 237)' //rgba(0,0,0)\n    }\n  },\n  boxpoints: 'all'//\"suspectedoutliers\", \"Outliers\", false, \"all\"\n}\n\n  //If you want more than one dataset on the graph, make a new object like returnData add it to \"data\" array\nlet config = {\n  displayModeBar: false\n}\n\nlet layout = {\n  showlegend: false,\n  width: 450, \n  height: 400,\n  title: 'Title Graph',\n  font: {\n    color: textColor\n  },\n  xaxis: {\n    title:'Duration (min)',\n    titlefont: {\n      size: 12,\n      color: textColor\n    },\n   color: textColor\n  },\n  yaxis: {\n    title: 'Occurences',\n    titlefont: {\n        size: 12,\n        color: textColor\n    },\n    color: textColor\n  },\n  paper_bgcolor: bgColor,\n  plot_bgcolor: bgColor,\n  color: textColor\n};\nlet plotlyInfo = {\n  name: 'Graph Info',\n  showGraph: true,\n  graphData: [dataBox], //User can edit.\n  layout: layout,\n  config: config\n}\n\nlet plotlyGraph = {\n  name: 'Coverage Distribution',\n  values: [plotlyInfo]\n}\n\nlet graphObj = {\n    title: \"Custom Plots\",\n    sections: [plotlyGraph]\n}\n\n  //Returns an array of the new placement order for each column\n  return graphObj;\n}\n ",
    plotObj: {
      title: "Custom Plots",
      sections: [
        {
          name: "Coverage Distribution",
          values: [
            {
              name: "Graph Info",
              showGraph: true,
              graphData: [
                {
                  y: [],
                  type: "box",
                  name: "",
                  marker: {
                    color: "rgb(137, 207, 240)",
                    outliercolor: "rgb(31, 81, 255)",
                    line: {
                      outliercolor: "rgb(100, 149, 237)",
                    },
                  },
                  boxpoints: "all",
                },
              ],
              layout: {
                showlegend: false,
                width: 450,
                height: 400,
                title: {
                  text: "Title Graph",
                },
                font: {
                  color: "#1a1a1a",
                },
                xaxis: {
                  title: {
                    text: "Duration (min)",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  color: "#1a1a1a",
                  type: "category",
                  range: [-1, 6],
                  autorange: true,
                },
                yaxis: {
                  title: {
                    text: "Occurences",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  color: "#1a1a1a",
                  range: [-1, 4],
                  autorange: true,
                },
                paper_bgcolor: "#ffffff",
                plot_bgcolor: "#ffffff",
                color: "#1a1a1a",
              },
              config: {
                displayModeBar: false,
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 66,
    name: "getAltsIncs",
    ext: ".js",
    script:
      "\n  /*\n  /*\nCreate your own plotly graphs using this template. Please note that\nCoSMOS currently only supports .js file. Scripts are run\nin a sandbox environment in your browser and do not have access to databases.\n\nRequirements:\n   - Input\n       - Data Object array (state.results from redux)\n   - Output\n       - Plotly.Data[]\n\n\n//Interfaces for Graph Data Output: \nexport type AnalyticsStructure = {\n    title: string,\n    sections: GenericGraph[] | PlotlyGraph[];\n};\n\nexport type PlotlyGraph = {\n    name: string | null;\n    values: AnalyticsGraph[];\n};\n\nexport type AnalyticsGraph = {\n    name: string;\n    value: number;\n    showGraph: boolean;\n    graphType?: string;\n    config?: Partial<Config>;\n    graphData: Plotly.Data[];\n    layout: Partial<Layout>;\n}\n\n// Interfaces for Graph Data Input:\n\nexport interface Traces {\n  avgTraces: number[];\n  title: string;\n  type: string; //'box' or 'line'\n  xTraces: number[];\n  yTraces: number[];\n}\n\n//Main data access variable: traces\nexport interface TracesDataObj {\n  coverage: Traces;\n  coverage_histogram: Traces;\n  xTraces: Traces;\n}\n\n//Main data access variable: performancePanelObj\nexport interface PointsDataObj {\n  coverageEvents: CoverageEventsDataObj[];\n  coveragePerStation: CoveragePerStationDataObj[];\n  gapEvents: GapEventDataObj[];\n  modelData: ModelDataDataObj;\n}\n\nexport interface Points {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  value: number;\n}\n\nexport interface MetricsDataObj{\n  label: string;\n  points: Points[];\n  type: string;\n}\n\nexport interface OrbitalDataObj {\n  availability: MetricsDataObj;\n  averageCoverageDuration: MetricsDataObj;\n  averageGapDuration: MetricsDataObj;\n  contactsPerDay: MetricsDataObj;\n  coverageMinutes: MetricsDataObj;\n  maxCoverageDuration: MetricsDataObj;\n  maxGapDuration: MetricsDataObj;\n  meanResponseTime: MetricsDataObj;\n}\n\nexport interface ModelDataDataObj = {\n  orbital: OrbitalDataObj[];\n  terrestrial: TerrestrialDataObj[]; //NO IDEA WHAT THIS IS \n}\n\nexport interface GapEventDataObj {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  gapEvents: GapEvent\n}\n\nexport interface GapEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\nexport interface CoveragePerStationDataObj {\n  altitude: number;\n  coverageData: CoverageData[];\n  eccentricity: number;\n  inclination: number;\n  stationCoverageData: ????[];\n}\n\nexport interface CoverageData {\n  platformName: string;\n  platformId: number;\n  coverageMinutes: number;\n}\n\nexport interface CoverageEventsDataObj {\n  altitude: number;\n  coverageEvents: CoverageEvent[];\n  eccentricity: number;\n  inclination: number;\n}\n\nexport interface CoverageEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\n*/\n\nfunction unpackData (data) {\n\n  let altitudeArr = [];\n  let inclinationArr = [];\n\n  data.forEach((point) => {\n      altitudeArr .push(point.altitude);\n      inclinationArr.push(point.inclination);\n  })\n  \n  return { altitudes: altitudeArr, inclinations: inclinationArr };\n}\n\n/* \n* User edits this function to return graph data they want displayed in Plotly graph\n* @params \n* @returns XYData[]\n*/\ncreateGraph = function createGraph (performancePanel, traces, bgColor, textColor) {\n\nlet newXData, newYData = [];\n\n//Note: performancePanel and traces could be null, which would cause the script to output nothing so check before using it\nif (performancePanel?.modelData?.orbital['coverageMinutes']?.points) {\n  newXData = unpackData(performancePanel.modelData.orbital['coverageMinutes'].points).altitudes;\n  newYData = unpackData(performancePanel.modelData.orbital['coverageMinutes'].points).inclinations;\n}\n\nlet dataLine = {\n  x: newXData,\n  y: newYData,\n  mode: 'lines+markers', //\"lines\", \"lines+markers\", \"markers\"\n  type: 'scatter', //\"scatter\"\n  marker: {\n    color: 'rgb(220,208,255)',//rgb(0, 0, 0)\n    size: 8 //number\n  },\n  line: {\n    color: 'rgb(220,208,255)', //rgb(0, 0, 0)\n    width: 2 //number\n  }\n}\n\n  //If you want more than one dataset on the graph, make a new object like returnData add it to \"data\" array\nlet config = {\n  displayModeBar: false\n}\n\nlet layout = {\n  showlegend: false,\n  width: 450, \n  height: 400,\n  title: 'Coverage Data Alts + Incs',\n   font: {\n    color: textColor\n  },\n  xaxis: {\n    autorange: true,\n    title:'Altitudes',\n    titlefont: {\n      size: 12,\n      color: textColor\n    },\n    showgrid: true,\n    zerolinecolor: '#969696',\n    zerolinewidth: 1,\n    color: textColor\n  },\n  yaxis: {\n    autorange: true,\n    title: 'Inclinations',\n    titlefont: {\n        size: 12,\n        color: textColor\n    },\n    showgrid: true,\n    zerolinecolor: '#969696',\n    zerolinewidth: 1,\n    color: textColor\n  },\n  paper_bgcolor: bgColor,\n  plot_bgcolor: bgColor,\n  showgrid: true,\n  zerolinecolor: '#969696',\n  zerolinewidth: 1,\n  color: textColor\n \n}\n\nlet plotlyInfo = {\n  name: 'Graph Info',\n  showGraph: true,\n  graphData: [dataLine], //User can edit.\n  layout: layout,\n  config: config\n}\n\nlet plotlyGraph = {\n  name: 'Custom User-Created Data',\n  values: [plotlyInfo]\n}\n\nlet graphObj = {\n    title: \"Custom Plots\",\n    sections: [plotlyGraph]\n}\n\n  //Returns an array of the new placement order for each column\n  return graphObj;\n}\n  ",
    plotObj: {
      title: "Custom Plots",
      sections: [
        {
          name: "Custom User-Created Data",
          values: [
            {
              name: "Graph Info",
              showGraph: true,
              graphData: [
                {
                  y: [],
                  mode: "lines+markers",
                  type: "scatter",
                  marker: {
                    color: "rgb(220,208,255)",
                    size: 8,
                  },
                  line: {
                    color: "rgb(220,208,255)",
                    width: 2,
                  },
                },
              ],
              layout: {
                showlegend: false,
                width: 450,
                height: 400,
                title: {
                  text: "Coverage Data Alts + Incs",
                },
                font: {
                  color: "#1a1a1a",
                },
                xaxis: {
                  autorange: true,
                  title: {
                    text: "Altitudes",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  showgrid: true,
                  zerolinecolor: "#969696",
                  zerolinewidth: 1,
                  color: "#1a1a1a",
                  range: [-1, 6],
                },
                yaxis: {
                  autorange: true,
                  title: {
                    text: "Inclinations",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  showgrid: true,
                  zerolinecolor: "#969696",
                  zerolinewidth: 1,
                  color: "#1a1a1a",
                  range: [-1, 4],
                },
                paper_bgcolor: "#ffffff",
                plot_bgcolor: "#ffffff",
                showgrid: true,
                zerolinecolor: "#969696",
                zerolinewidth: 1,
                color: "#1a1a1a",
              },
              config: {
                displayModeBar: false,
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 67,
    name: "default_format",
    ext: ".js",
    script:
      " /*\nCreate your own plotly graphs using this template. Please note that\nCoSMOS currently only supports .js file. Scripts are run\nin a sandbox environment in your browser and do not have access to databases.\n\nGraph Format Docs: https://plotly.com/javascript/\n\n// Interfaces for Graph Data Input:\n\nexport interface Traces {\n  avgTraces: number[];\n  title: string;\n  type: string; //'box' or 'line'\n  xTraces: number[];\n  yTraces: number[];\n}\n\n//Main data access variable: traces\nexport interface TracesDataObj {\n  coverage: Traces;\n  coverage_histogram: Traces;\n  xTraces: Traces;\n}\n\n//Main data access variable: performancePanelObj\nexport interface PointsDataObj {\n  coverageEvents: CoverageEventsDataObj[];\n  coveragePerStation: CoveragePerStationDataObj[];\n  gapEvents: GapEventDataObj[];\n  modelData: ModelDataDataObj;\n}\n\nexport interface Points {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  value: number;\n}\n\nexport interface MetricsDataObj{\n  label: string;\n  points: Points[];\n  type: string;\n}\n\nexport interface OrbitalDataObj {\n  availability: MetricsDataObj;\n  averageCoverageDuration: MetricsDataObj;\n  averageGapDuration: MetricsDataObj;\n  contactsPerDay: MetricsDataObj;\n  coverageMinutes: MetricsDataObj;\n  maxCoverageDuration: MetricsDataObj;\n  maxGapDuration: MetricsDataObj;\n  meanResponseTime: MetricsDataObj;\n}\n\nexport interface ModelDataDataObj = {\n  orbital: OrbitalDataObj[];\n  terrestrial: TerrestrialDataObj[]; \n}\n\nexport interface GapEventDataObj {\n  altitude: number;\n  inclination: number;\n  eccentricity: number;\n  gapEvents: GapEvent\n}\n\nexport interface GapEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\nexport interface CoveragePerStationDataObj {\n  altitude: number;\n  coverageData: CoverageData[];\n  eccentricity: number;\n  inclination: number;\n  stationCoverageData: ????[];\n}\n\nexport interface CoverageData {\n  platformName: string;\n  platformId: number;\n  coverageMinutes: number;\n}\n\nexport interface CoverageEventsDataObj {\n  altitude: number;\n  coverageEvents: CoverageEvent[];\n  eccentricity: number;\n  inclination: number;\n}\n\nexport interface CoverageEvent {\n  name: string;\n  id: number;\n  duration: number;\n}\n\n*/\n\n\n/* \n* User edits this function to return graph data they want displayed in Plotly graph\n* @params \n* @returns XYData[]\n*/\n\nfunction createGraph (performancePanel, traces, bgColor, textColor) {\n\nlet dataLine = {\n  x: traces?.coverage?.xTraces ?? [],\n  y: traces?.coverage?.yTraces ?? [],\n  mode: 'lines+markers', //\"lines\", \"lines+markers\", \"markers\"\n  type: 'scatter', //\"scatter\"\n  marker: {\n    color: 'rgb(255,0,0)',//rgb(0, 0, 0)\n    size: 8 //number\n  },\n  line: {\n    color: 'rgb(255,0,0)', //rgb(0, 0, 0)\n    width: 2 //number\n  }\n}\nconsole.log(\"DATA LINE: \", dataLine);\n  //If you want more than one dataset on the graph, make a new object like returnData add it to \"data\" array\nlet config = {\n  displayModeBar: false\n}\n\nlet layout = {\n  showlegend: false,\n  width: 450, \n  height: 400,\n  title: 'Graph Title',\n  font: {\n    color: textColor\n  },\n  xaxis: {\n    autorange: true,\n    title:'X Axis Title',\n    titlefont: {\n      size: 12,\n      color: textColor\n    },\n    showgrid: true,\n    zerolinecolor: '#969696',\n    zerolinewidth: 1,\n    color: textColor\n  },\n  yaxis: {\n    autorange: true,\n    title: 'Y Axis Title',\n    titlefont: {\n        size: 12,\n        color: textColor\n    },\n    showgrid: true,\n    zerolinecolor: '#969696',\n    zerolinewidth: 1,\n    color: textColor\n  },\n  paper_bgcolor: bgColor,\n  plot_bgcolor: bgColor,\n  showgrid: true,\n  zerolinecolor: '#969696',\n  zerolinewidth: 1,\n  color: textColor\n \n}\n\nlet plotlyInfo = {\n  name: 'Graph Info',\n  showGraph: true,\n  graphData: [dataLine], //User can edit.\n  layout: layout,\n  config: config\n}\n\nlet plotlyGraph = {\n  name: 'Running Coverage Average',\n  values: [plotlyInfo]\n}\n\nlet graphObj = {\n    title: \"Custom Plots\",\n    sections: [plotlyGraph]\n}\n\nconsole.log(\"GRAPH OBJ: \", graphObj);\n  //Returns an array of the new placement order for each column\n  return graphObj;\n}\n ",
    plotObj: {
      title: "Custom Plots",
      sections: [
        {
          name: "Running Coverage Average",
          values: [
            {
              name: "Graph Info",
              showGraph: true,
              graphData: [
                {
                  x: [],
                  y: [],
                  mode: "lines+markers",
                  type: "scatter",
                  marker: {
                    color: "rgb(255,0,0)",
                    size: 8,
                  },
                  line: {
                    color: "rgb(255,0,0)",
                    width: 2,
                  },
                },
              ],
              layout: {
                showlegend: false,
                width: 450,
                height: 400,
                title: {
                  text: "Graph Title",
                },
                font: {
                  color: "#1a1a1a",
                },
                xaxis: {
                  autorange: true,
                  title: {
                    text: "X Axis Title",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  showgrid: true,
                  zerolinecolor: "#969696",
                  zerolinewidth: 1,
                  color: "#1a1a1a",
                  range: [-1, 6],
                },
                yaxis: {
                  autorange: true,
                  title: {
                    text: "Y Axis Title",
                    font: {
                      size: 12,
                      color: "#1a1a1a",
                    },
                  },
                  showgrid: true,
                  zerolinecolor: "#969696",
                  zerolinewidth: 1,
                  color: "#1a1a1a",
                  range: [-1, 4],
                },
                paper_bgcolor: "#ffffff",
                plot_bgcolor: "#ffffff",
                showgrid: true,
                zerolinecolor: "#969696",
                zerolinewidth: 1,
                color: "#1a1a1a",
              },
              config: {
                displayModeBar: false,
              },
            },
          ],
        },
      ],
    },
  },
];

export const SCRIPT_TEMPLATE_JS = `
    /*
    /*
  Create your own plotly graphs using this template. Please note that
  CoSMOS currently only supports .js file. Scripts are run
  in a sandbox environment in your browser and do not have access to databases.
  
  Requirements:
     - Input
         - Data Object array (state.results from redux)
     - Output
         - Plotly.Data[]
  
  
  //Interfaces for Graph Data Output: 
  export type AnalyticsStructure = {
      title: string,
      sections: GenericGraph[] | PlotlyGraph[];
  };
  
  export type PlotlyGraph = {
      name: string | null;
      values: AnalyticsGraph[];
  };
  
  export type AnalyticsGraph = {
      name: string;
      value: number;
      showGraph: boolean;
      graphType?: string;
      config?: Partial<Config>;
      graphData: Plotly.Data[];
      layout: Partial<Layout>;
  }
  
  // Interfaces for Graph Data Input:
  
  export interface Traces {
    avgTraces: number[];
    title: string;
    type: string; //'box' or 'line'
    xTraces: number[];
    yTraces: number[];
  }
  
  //Main data access variable: traces
  export interface TracesDataObj {
    coverage: Traces;
    coverage_histogram: Traces;
    xTraces: Traces;
  }
  
  //Main data access variable: performancePanelObj
  export interface PointsDataObj {
    coverageEvents: CoverageEventsDataObj[];
    coveragePerStation: CoveragePerStationDataObj[];
    gapEvents: GapEventDataObj[];
    modelData: ModelDataDataObj;
  }
  
  export interface Points {
    altitude: number;
    inclination: number;
    eccentricity: number;
    value: number;
  }
  
  export interface MetricsDataObj{
    label: string;
    points: Points[];
    type: string;
  }
  
  export interface OrbitalDataObj {
    availability: MetricsDataObj;
    averageCoverageDuration: MetricsDataObj;
    averageGapDuration: MetricsDataObj;
    contactsPerDay: MetricsDataObj;
    coverageMinutes: MetricsDataObj;
    maxCoverageDuration: MetricsDataObj;
    maxGapDuration: MetricsDataObj;
    meanResponseTime: MetricsDataObj;
  }
  
  export interface ModelDataDataObj = {
    orbital: OrbitalDataObj[];
    terrestrial: TerrestrialDataObj[]; //NO IDEA WHAT THIS IS 
  }
  
  export interface GapEventDataObj {
    altitude: number;
    inclination: number;
    eccentricity: number;
    gapEvents: GapEvent
  }
  
  export interface GapEvent {
    name: string;
    id: number;
    duration: number;
  }
  
  export interface CoveragePerStationDataObj {
    altitude: number;
    coverageData: CoverageData[];
    eccentricity: number;
    inclination: number;
    stationCoverageData: ????[];
  }
  
  export interface CoverageData {
    platformName: string;
    platformId: number;
    coverageMinutes: number;
  }
  
  export interface CoverageEventsDataObj {
    altitude: number;
    coverageEvents: CoverageEvent[];
    eccentricity: number;
    inclination: number;
  }
  
  export interface CoverageEvent {
    name: string;
    id: number;
    duration: number;
  }
  
  */
  
  
  /* 
  * User edits this function to return graph data they want displayed in Plotly graph
  * @params 
  * @returns XYData[]
  */
  createGraph = function createGraph (performancePanel, traces, bgColor, textColor) {
  
  let dataLine = {
    x: traces.coverage.xTraces,
    y: traces.coverage.yTraces,
    mode: 'lines+markers', //"lines", "lines+markers", "markers"
    type: 'scatter', //"scatter"
    marker: {
      color: 'rgb(255,0,0)',//rgb(0, 0, 0)
      size: 8 //number
    },
    line: {
      color: 'rgb(255,0,0)', //rgb(0, 0, 0)
      width: 2 //number
    }
  }
  
  let dataLine2 = {
    x: traces.coverage.xTraces,
    y: traces.coverage.avgTraces,
    mode: 'lines+markers', //"lines", "lines+markers", "markers"
    type: 'scatter', //"scatter"
    marker: {
      color: 'rgb(0,0,255)',//rgb(0, 0, 0)
      size: 8 //number
    },
    line: {
      color: 'rgb(0,0,255)', //rgb(0, 0, 0)
      width: 2 //number
    }
  }
  
    //If you want more than one dataset on the graph, make a new object like returnData add it to "data" array
  let config = {
    displayModeBar: false
  }
  
  let layout = {
    showlegend: false,
    width: 500, 
    height: 400,
    title: 'Running Coverage Average',
    xaxis: {
      range: [-3, 15],
      autorange: false,
      title:'Coverage Event Number',
      titlefont: {
        size: 12,
        color: textColor
      },
      showgrid: true,
      zerolinecolor: '#969696',
      zerolinewidth: 1,
      color: textColor
    },
    yaxis: {
      range: [-2, 14],
      autorange: false,
      title: 'Coverage Duration',
      titlefont: {
          size: 12,
          color: textColor
      },
      showgrid: true,
      zerolinecolor: '#969696',
      zerolinewidth: 1,
      color: textColor
    },
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
    showgrid: true,
    zerolinecolor: '#969696',
    zerolinewidth: 1,
    color: textColor
   
  }
  
  let plotlyInfo = {
    name: 'Graph Info',
    showGraph: true,
    graphData: [dataLine, dataLine2], //User can edit.
    layout: layout,
    config: config
  }
  
  let plotlyGraph = {
    name: 'Graph Data',
    values: [plotlyInfo]
  }
  
  let graphObj = {
      title: "Custom Plots",
      sections: [plotlyGraph]
  }
  
    //Returns an array of the new placement order for each column
    return graphObj;
  }
    `;

export const MANAGE_SCRIPT_TEMPLATE_JS = `
  /* 
  * This is the body of Plot function what user want
  * @params 
  * @returns graphs, slaveData
  * const modelData is included the masterData and the slaveData for displaying graphs
  * const graphTypes is the graph array displayed and it is included type, title and label. Notes: First node is master and the rest is salve. 
  */

  const modelData = {
    masterData: [
        {
          altitude: 300,
          inclination: 30,
          eccentricity: 0,
          value: 8.498524561708036,
        },
        {
          altitude: 300,
          inclination: 35,
          eccentricity: 0,
          value: 21.99618121853845,
        },
        {
          altitude: 300,
          inclination: 40,
          eccentricity: 0,
          value: 29.49487936122201,
        },
        {
          altitude: 350,
          inclination: 30,
          eccentricity: 0,
          value: 12.997743447318175,
        },
        {
          altitude: 350,
          inclination: 35,
          eccentricity: 0,
          value: 27.74518312792918,
        },
        {
          altitude: 350,
          inclination: 40,
          eccentricity: 0,
          value: 34.993924665856625,
        },
        {
          altitude: 400,
          inclination: 30,
          eccentricity: 0,
          value: 16.747092518659954,
        },
        {
          altitude: 400,
          inclination: 35,
          eccentricity: 0,
          value: 29.744835965978133,
        },
        {
          altitude: 400,
          inclination: 40,
          eccentricity: 0,
          value: 37.49349071341781,
        },
      ],
    slaveData: [
        {
          altitude: 300,
          inclination: 30,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1560,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 75150,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5460,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 80760,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5490,
            },
          ],
        },
        {
          altitude: 300,
          inclination: 35,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1470,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 69390,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5400,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 69360,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
          ],
        },
        {
          altitude: 300,
          inclination: 40,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1440,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 63690,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5280,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 63780,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5400,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5280,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5280,
            },
          ],
        },
        {
          altitude: 350,
          inclination: 30,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1530,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 75960,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5460,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 75930,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5490,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5520,
            },
          ],
        },
        {
          altitude: 350,
          inclination: 35,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1470,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5490,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 64530,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5370,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5400,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 64500,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5460,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5370,
            },
          ],
        },
        {
          altitude: 350,
          inclination: 40,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1440,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5370,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 64380,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5280,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 64410,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
          ],
        },
        {
          altitude: 400,
          inclination: 30,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1530,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 71010,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5520,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5490,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 71100,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5610,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5460,
            },
          ],
        },
        {
          altitude: 400,
          inclination: 35,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1440,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5490,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 65190,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5370,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5370,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5400,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 65190,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5430,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5370,
            },
          ],
        },
        {
          altitude: 400,
          inclination: 40,
          eccentricity: 0,
          gapEvents: [
            {
              name: "Ohio",
              id: 67,
              duration: 1440,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5370,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 59400,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5430,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5310,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 65070,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
            {
              name: "Ohio",
              id: 67,
              duration: 5340,
            },
          ],
        },
      ]
  }
  const graphTypes = [
    {
        type: "scatter3d",
        title: "Coverage 3D",
        xLabel: "Altitude",
        yLabel: "Inclination",
        zLabel: "Coverage"
    },
    {
        type: "scatter",
        title: "Running Coverage Average",
        xLabel: "Coverage Event Number",
        yLabel: "Coverage Duration (min)"
    },
    {
        type: "box",
        title: "Coverage Distribution",
        xLabel: "Duration (min)",
        yLabel: "Occurrences"
    },
    {
        type: "box",
        title: "Coverage Statistics",
        xLabel: "",
        yLabel: "Duration (min)"
    },
    {
        type: "bar",
        title: "Coverage Bar Chart",
        xLabel: "",
        yLabel: "Duration (min)"
    },
    {
        type: "pie",
        title: "Coverage Pie Chart",
        xLabel: "",
        yLabel: "Duration (min)"
    },
    {
        type: "bubble",
        title: "Coverage Bubble Chart",
        xLabel: "",
        yLabel: "Inclination"
    },
    {
        type: "error_bar",
        title: "Coverage Error Bar Chart",
        xLabel: "",
        yLabel: "Size"
    },
    {
        type: "histogram",
        title: "Coverage Histogram",
        xLabel: "Duration (min)",
        yLabel: ""
    }
  ]

  const graphs = [];
  const bgColor = "white";
  const textColor = "black";
  const master_markColor = "rgb(255,0,0)";
  const slave_markColor = "rgb(0,0,255)";

  for (const graphType of graphTypes) {
      const data = [];
      const layout = {
          width: 500,
          height: 400,
          paper_bgcolor: bgColor,
          plot_bgcolor: bgColor,
          font: { color: textColor },
          showlegend: false,
      };

      let name = "";
      let type = "";

      switch (graphType.type) {
        case 'scatter3d':
            data.push({
                x: modelData.masterData.map(e => e.altitude),
                y: modelData.masterData.map(e => e.inclination),
                z: modelData.masterData.map(e => e.value / 60), //DIVIDE BY 60 TO CONVERT SECONDS -> MINUTES
                type: 'scatter3d',
                mode: 'markers',
                marker: { color: master_markColor, size: 4 }
            });
            layout.scene = { xaxis: { title: graphType.xLabel }, yaxis: { title: graphType.yLabel }, zaxis: { title: graphType.zLabel } };
            name = graphType.title;
            type = graphType.type;
            break;
          case 'scatter':
              data.push({
                  x: modelData.slaveData[0].gapEvents.map((e, i) => i),
                  y: modelData.slaveData[0].gapEvents.map((e) => e.duration / 60),
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: slave_markColor, size: 8 },
                  line: { color: slave_markColor, width: 2 },
              });
              layout.xaxis = { title: graphType.xLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              layout.yaxis = { title: graphType.yLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              name = graphType.title;
              type = graphType.type;
              break;

          case 'box':
              data.push({
                  y: modelData.slaveData[0].gapEvents.map((e) => e.duration / 60),
                  type: 'box',
                  boxpoints: 'all',
                  marker: { color: slave_markColor }
              });
              layout.xaxis = { title: graphType.xLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              layout.yaxis = { title: graphType.yLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              name = graphType.title;
              type = graphType.type;
              break;
          case 'bar':
              data.push({
                  x: modelData.slaveData[0].gapEvents.map((e, i) => i),
                  y: modelData.slaveData[0].gapEvents.map((e) => e.duration / 60),
                  type: 'bar',
                  marker: { color: slave_markColor }
              });
              layout.xaxis = { title: graphType.xLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              layout.yaxis = { title: graphType.yLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              name = graphType.title;
              type = graphType.type;
              break;
          case 'pie':
              data.push({
                  values: modelData.slaveData[0].gapEvents.map((e) => e.duration / 60),
                  type: 'pie'
              });
              name = graphType.title;
              type = graphType.type;
              break;
          case 'bubble':
              data.push({
                  x: modelData.slaveData[0].gapEvents.map((e, i) => i),
                  y: modelData.slaveData[0].gapEvents.map((e) => e.duration / 60),
                  mode: 'markers',
                  marker: {
                      size: modelData.slaveData[0].gapEvents.map((e) => e.duration / 300),
                      color: slave_markColor,
                      opacity: 0.5
                  }
              });
              layout.xaxis = { title: graphType.xLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              layout.yaxis = { title: graphType.yLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              name = graphType.title;
              type = graphType.type;
              break;
          case 'error_bar':
              data.push({
                  x: modelData.slaveData[0].gapEvents.map((e, i) => i),
                  y: modelData.slaveData[0].gapEvents.map((e) => e.duration / 60),
                  type: 'scatter',
                  mode: 'lines+markers',
                  error_y: {
                      type: 'data',
                      array: modelData.slaveData[0].gapEvents.map((e) => e.duration / 300),
                      visible: true
                  },
                  marker: { color: slave_markColor, size: 8 },
                  line: { color: slave_markColor, width: 2 },
              });
              layout.xaxis = { title: graphType.xLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              layout.yaxis = { title: graphType.yLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              name = graphType.title;
              type = graphType.type;
              break;
          case 'histogram':
              data.push({
                  x: modelData.slaveData[0].gapEvents.map((e) => e.duration / 60),
                  type: 'histogram',
                  marker: { color: slave_markColor },
              });
              layout.xaxis = { title: graphType.xLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              layout.yaxis = { title: graphType.yLabel, titlefont: { size: 12, color: textColor }, showgrid: true, zerolinecolor: '#969696', zerolinewidth: 1, color: textColor };
              name = graphType.title;
              type = graphType.type;
              break;
      }

      graphs.push({
          name,
          type,
          data,
          layout,
          config: { displayModeBar: false }
      });
  }
  const returnData = {
    graphs: graphs,
    slaveData: modelData.slaveData
  };
  return returnData;
`;
