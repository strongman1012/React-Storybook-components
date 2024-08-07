import { ColumnFilter } from "../implements/ColumnFilterModal";
import { Query } from "../types/dataViewer";

export const mockQueries: Query[] = [
	{ name: 'Query 1', url: 'data1', isExternal: false },
	{ name: 'Query 2', url: 'data2', isExternal: false },
	{ name: 'Query 3', url: 'data3', isExternal: true },
];

export const mockQueryData = {
	"users": [
		{
			"id": 1,
			"firstName": "Terry",
			"lastName": "Medhurst",
			"maidenName": "Smitham",
			"age": 50,
			"gender": "male",
			"email": "atuny0@sohu.com",
			"address": [
				{
					"address": "1745 T Street Southeast",
					"city": "Washington",
					"coordinates": [
						{
							"lat": 38.867033,
							"lng": -76.979235
						}
					],
					"postalCode": "20020",
					"state": "DC"
				}
			],
			"bank": {
				"cardExpire": "06/22",
				"cardNumber": "50380955204220685",
				"cardType": "maestro",
				"currency": "Peso",
				"iban": "NO17 0695 2754 967"
			},
			"company": {
				"address": {
					"address": "629 Debbie Drive",
					"city": "Nashville",
					"coordinates": {
						"lat": 36.208114,
						"lng": -86.58621199999999
					},
					"postalCode": "37076",
					"state": "TN"
				},
				"department": "Marketing",
				"name": "Blanda-O'Keefe",
				"title": "Help Desk Operator"
			}
		},
		{
			"id": 2,
			"firstName": "Sheldon",
			"lastName": "Quigley",
			"maidenName": "Cole",
			"age": 28,
			"gender": "male",
			"email": "hbingley1@plala.or.jp",
			"address": [
				{
					"address": "6007 Applegate Lane",
					"city": "Louisville",
					"coordinates": [
						{
							"lat": 38.1343013,
							"lng": -85.6498512
						}
					],
					"postalCode": "40219",
					"state": "KY"
				}
			],
			"bank": {
				"cardExpire": "10/23",
				"cardNumber": "5355920631952404",
				"cardType": "mastercard",
				"currency": "Ruble",
				"iban": "MD63 L6YC 8YH4 QVQB XHIK MTML"
			},
			"company": {
				"address": {
					"address": "8821 West Myrtle Avenue",
					"city": "Glendale",
					"coordinates": {
						"lat": 33.5404296,
						"lng": -112.2488391
					},
					"postalCode": "85305",
					"state": "AZ"
				},
				"department": "Services",
				"name": "Aufderhar-Cronin",
				"title": "Senior Cost Accountant"
			}
		},
		{
			"id": 3,
			"firstName": "Terrill",
			"lastName": "Hills",
			"maidenName": "Hoeger",
			"age": 38,
			"gender": "male",
			"email": "rshawe2@51.la",
			"address": [
				{
					"address": "560 Penstock Drive",
					"city": "Grass Valley",
					"coordinates": [
						{
							"lat": 39.213076,
							"lng": -121.077583
						}
					],
					"postalCode": "95945",
					"state": "CA"
				}
			],
			"bank": {
				"cardExpire": "10/23",
				"cardNumber": "3586082982526703",
				"cardType": "jcb",
				"currency": "Peso",
				"iban": "AT24 1095 9625 1434 9703"
			},
			"company": {
				"address": {
					"address": "18 Densmore Drive",
					"city": "Essex",
					"coordinates": {
						"lat": 44.492953,
						"lng": -73.101883
					},
					"postalCode": "05452",
					"state": "VT"
				},
				"department": "Marketing",
				"name": "Lindgren LLC",
				"title": "Mechanical Systems Engineer"
			}
		},
		{
			"id": 4,
			"firstName": "Miles",
			"lastName": "Cummerata",
			"maidenName": "Maggio",
			"age": 49,
			"gender": "male",
			"email": "yraigatt3@nature.com",
			"address": [
				{
					"address": "150 Carter Street",
					"city": "Manchester",
					"coordinates": [
						{
							"lat": 41.76556000000001,
							"lng": -72.473091
						}
					],
					"postalCode": "06040",
					"state": "CT"
				}
			],
			"bank": {
				"cardExpire": "07/24",
				"cardNumber": "3580047879369323",
				"cardType": "jcb",
				"currency": "Yuan Renminbi",
				"iban": "KZ43 658B M6VS TZOU OXSO"
			},
			"company": {
				"address": {
					"address": "210 Green Road",
					"city": "Manchester",
					"coordinates": {
						"lat": 41.7909099,
						"lng": -72.51195129999999
					},
					"postalCode": "06042",
					"state": "CT"
				},
				"department": "Business Development",
				"name": "Wolff and Sons",
				"title": "Paralegal"
			}
		}
	]
};

export const mockQueryData2 = [
	{
		"id": "0001",
		"type": "donut",
		"name": "Cake",
		"ppu": 0.55,
		"batters": {
			"batter": [
				{ "id": "1001", "type": "Regular" },
				{ "id": "1002", "type": "Chocolate" },
				{ "id": "1003", "type": "Blueberry" },
				{ "id": "1004", "type": "Devil's Food" }
			]
		},
		"topping": [
			{ "id": "5001", "type": "None" },
			{ "id": "5002", "type": "Glazed" },
			{ "id": "5005", "type": "Sugar" },
			{ "id": "5007", "type": "Powdered Sugar" },
			{ "id": "5006", "type": "Chocolate with Sprinkles" },
			{ "id": "5003", "type": "Chocolate" },
			{ "id": "5004", "type": "Maple" }
		]
	},
	{
		"id": "0002",
		"type": "donut",
		"name": "Raised",
		"ppu": 0.55,
		"batters": {
			"batter": [
				{ "id": "1001", "type": "Regular" }
			]
		},
		"topping": [
			{ "id": "5001", "type": "None" },
			{ "id": "5002", "type": "Glazed" },
			{ "id": "5005", "type": "Sugar" },
			{ "id": "5003", "type": "Chocolate" },
			{ "id": "5004", "type": "Maple" }
		]
	},
	{
		"id": "0003",
		"type": "donut",
		"name": "Old Fashioned",
		"ppu": 0.55,
		"batters": {
			"batter": [
				{ "id": "1001", "type": "Regular" },
				{ "id": "1002", "type": "Chocolate" }
			]
		},
		"topping": [
			{ "id": "5001", "type": "None" },
			{ "id": "5002", "type": "Glazed" },
			{ "id": "5003", "type": "Chocolate" },
			{ "id": "5004", "type": "Maple" }
		]
	}
];

export const mockColumns: ColumnFilter[] = [
	{ label: 'Column 1', selected: true },
	{ label: 'Column 2', selected: true },
	{ label: 'Column 3', selected: true },
];