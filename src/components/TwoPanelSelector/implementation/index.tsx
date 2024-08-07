import {
	Button,
	Grid,
	IconButton,
	makeStyles,
	Theme,
} from "@material-ui/core";
import { FC, useReducer } from "react";
import React from "react";
import { TwoPanelSelectorProps } from "../types/two-panel-types";
import { noNullables } from "../../utils/filters";

const useStyles = makeStyles((theme: Theme) => ({
	mainPanel: {
		justifyContent: 'space-between',
	},
	mainAction: {
		marginTop: '2rem',
	},
	linksComp: {
		border: `1px solid #E3E3E3`,
		backgroundColor: theme.palette.background.default,
		minHeight: 'calc(100% - 1.5rem)',
		overflowY: 'auto'
	},
	linkItem: {
		padding: theme.spacing(2),
		cursor: 'pointer',
		borderTop: `1px solid #E3E3E3`,
		borderRight: `1px solid #E3E3E3`,
		borderLeft: `1px solid #E3E3E3`,
		'&:last-child': {
			borderBottom: `1px solid #E3E3E3`
		}
	},
	activeLinkItem: {
		backgroundColor: '#e34747',
		color: 'white',
	},
	actionButton: {
		width: '100px',
		margin: '0.5rem',
	},
	submitButton: {
		width: '40%',
		margin: '0.5rem',
	},
	rotationRight: {
		'&:hover': {
			transform: 'scale(1.1)',
			opacity: 0.9
		}
	},
}));

type SelectionState<ID = string> = {
	/**
	 * Items in the right box. Items awaiting
	 * the submit button.
	 */
	stagedItems: ID[];
	/**
	 * Highlighted items
	 */
	selectedItems: ID[];
	/**
	 * Where to highlight items. Selecting
	 * an item in one area will unselect
	 * all items in another.
	 */
	selectedType: 'staged' | 'unstaged';
};

type StageSelectedItemsPayload = Record<never, never>;

type ResetSelectedItemsPayload = Record<never, never>;

type SelectItemsPayload<ID = string> = {
	/**
	 * Newly selected items to add to the list of selected items
	 */
	selectedItems: ID[];
	/**
	 * The location in which the items were selected
	 */
	type: SelectionState<ID>['selectedType'];
}

type DeselectItemsPayload<ID = string> = {
	/**
	 * Newly deselected items
	 */
	deselectedItems: ID[];
}

type MoveSelectedUpPayload = Record<never, never>;

type MoveSelectedDownPayload = Record<never, never>;

type ClearItemsPayload = Record<never, never>;

type Action<ID = string> =
	/**
	 * Move "selected" items to "staged" items
	 */
	| { type: 'stage', payload: StageSelectedItemsPayload }
	/**
	 * Move "selected" items from "staged" to "unstaged"
	 */
	| { type: 'reset', payload: ResetSelectedItemsPayload }
	/**
	 * Select an item
	 */
	| { type: 'select', payload: SelectItemsPayload<ID> }
	/**
	 * Deselect an item
	 */
	| { type: 'deselect', payload: DeselectItemsPayload<ID> }
	/**
	 * Deselect all and remove all from staging
	 */
	| { type: 'clear', payload: ClearItemsPayload }
	/**
	 * Move the selection up 1
	 */
	| { type: 'move-up', payload: MoveSelectedUpPayload }
	/**
	 * Move the selection down 1
	 */
	| { type: 'move-down', payload: MoveSelectedDownPayload }

/**
 * Reducer for the "selected" state.
 * @param state The current state
 * @param action The action to take
 * @returns The modified state
 */
function selectedStateReducer<T = string>(state: SelectionState<T>, action: Action<T>): SelectionState<T> {
	if (action.type === 'stage') {
		if (state.selectedType === 'unstaged') {
			const newStaged = Array.from(new Set([...state.stagedItems, ...state.selectedItems]));
			return {
				...state,
				selectedItems: [],
				stagedItems: newStaged
			}
		} else {
			return state;
		}
	} else if (action.type === 'reset') {
		if (state.selectedType === 'staged') {
			return {
				...state,
				selectedItems: [],
				stagedItems: state.stagedItems.filter(item => !state.selectedItems.includes(item))
			}
		} else {
			return state;
		}
	} else if (action.type === 'clear') {
		return {
			...state,
			selectedItems: [],
			stagedItems: []
		}
	} else if (action.type === 'select') {
		if (action.payload.type !== state.selectedType) {
			return {
				...state,
				selectedType: action.payload.type,
				selectedItems: action.payload.selectedItems
			}
		} else {
			const newSelected = Array.from(new Set([...state.selectedItems, ...action.payload.selectedItems]));
			return {
				...state,
				selectedItems: newSelected
			}
		}
	} else if (action.type === 'deselect') {
		return {
			...state,
			selectedItems: state.selectedItems.filter((item) => !action.payload.deselectedItems.includes(item))
		}
	} else if (action.type === 'move-up') {
		if (state.selectedType === 'staged' && state.selectedItems.length > 0 && state.stagedItems.length > 1) {
			const newOrderedArray = [...state.stagedItems];
			//Do not start at beginning of array bc item cannot move up
			for (let i = 1; i < newOrderedArray.length; i++) {
				if (state.selectedItems.includes(newOrderedArray[i])) {
					if (state.selectedItems.includes(newOrderedArray[i - 1])) {
						//If parent also selected, do nothing
						continue;
					} else {
						//else, swap
						const a = newOrderedArray[i - 1];
						newOrderedArray[i - 1] = newOrderedArray[i];
						newOrderedArray[i] = a;
					}
				}
			}
			return {
				...state,
				stagedItems: newOrderedArray
			}
		} else {
			return state;
		}
	} else if (action.type === 'move-down') {
		if (state.selectedType === 'staged' && state.selectedItems.length > 0 && state.stagedItems.length > 1) {
			const newOrderedArray = [...state.stagedItems];
			//Do not start at end of array bc item cannot move down
			for (let i = newOrderedArray.length - 2; i >= 0; i--) {
				if (state.selectedItems.includes(newOrderedArray[i])) {
					if (state.selectedItems.includes(newOrderedArray[i + 1])) {
						//If "reverse-"parent also selected, do nothing
						continue;
					} else {
						//else, swap
						const a = newOrderedArray[i + 1];
						newOrderedArray[i + 1] = newOrderedArray[i];
						newOrderedArray[i] = a;
					}
				}
			}
			return {
				...state,
				stagedItems: newOrderedArray
			}
		} else {
			return state;
		}
	} else {
		throw new Error(`Unknown action`);
	}
}

/**
 * List box component props
 */
type ItemDisplayProps = {
	items: {
		/**
		 * Text to show for element
		 */
		displayText: string,
		/**
		 * True, if element is selected
		 */
		selected: boolean,
		/**
		 * The id of this item
		 */
		id: string | number,
		/**
		 * Called on click
		 */
		onClick: () => void
	}[]
};

/**
 * List box component -- to display list of links 
 */
const ItemDisplay: FC<ItemDisplayProps> = (props) => {
	const classes = useStyles();

	return (
		<Grid className={classes.linksComp} style={{ height: '30vh' }}>
			{props.items.map((item) => (
				<div key={item.id} onClick={item.onClick} className={`${classes.linkItem} ${item.selected ? classes.activeLinkItem : ''}`}>{item.displayText}</div>
			))}
		</Grid>
	);
}

function getItemId<T extends string | number | { id: string | number }>(item: T): string | number {
	return typeof item === 'string' || typeof item === 'number' ? item : item.id;
}

/**
 * Two Panel Selector. Select items from the left panel and move them to the right. Click save
 * to get the list of "staged" items (items in the right panel).
 */
const TwoPanelSelector = <T extends string | number | { id: string | number }>(props: TwoPanelSelectorProps<T>) => {
	const { items, toDisplayValue, onConfirm, options } = props;

	const itemIdToItemOrNull = (itemId: string | number): T | undefined => items.find((og) => getItemId(og) === itemId);


	const [selectedItemsState, dispatch] = useReducer(selectedStateReducer<string | number>, { stagedItems: [], selectedItems: [], selectedType: 'unstaged' });

	const classes = useStyles();

	const onAddButtonClick = () => {
		dispatch({ type: 'stage', payload: {} });
	};

	const onRemoveButtonClick = () => {
		dispatch({ type: 'reset', payload: {} });
	}

	const onItemSelect = (type: SelectionState<string | number>['selectedType'], id: string | number) => () => {
		dispatch({
			type: 'select',
			payload: {
				type: type,
				selectedItems: [id]
			}
		});
	};

	const onItemDeselect = (id: string | number) => () => {
		dispatch({
			type: 'deselect',
			payload: {
				deselectedItems: [id]
			}
		});
	};

	const handleReset = () => {
		dispatch({
			type: 'clear',
			payload: {}
		})
	}

	const handleMoveUp = () => {
		dispatch({
			type: 'move-up', payload: {}
		});
	}

	const handleMoveDown = () => {
		dispatch({
			type: 'move-down', payload: {}
		});
	}

	const onSave = () => {
		const idToItemMap = new Map(items.map((item) => (
			[getItemId(item), item]
		)));

		const selected = selectedItemsState.stagedItems.map((id) => idToItemMap.get(id))
			.filter(noNullables);

		const confirmResult = onConfirm(selected);
		if (options?.awaitConfirmResponseBeforeClearing && confirmResult instanceof Promise) {
			//Only clear on success
			confirmResult
				.then((wasSuccess) => {
					if (wasSuccess) {
						handleReset();
					}
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			handleReset();
		}
	}


	const stagedItems: (ItemDisplayProps['items'][number] & { originalItem: (typeof items)[number] })[] = selectedItemsState.stagedItems
		.map(itemIdToItemOrNull)
		.filter(noNullables)
		.map((item) => {
			const itemId = getItemId(item);
			const selected = selectedItemsState.selectedType === 'unstaged' ? false
				: selectedItemsState.selectedItems.includes(itemId)
			return {
				displayText: toDisplayValue(item),
				selected: selected,
				id: itemId,
				onClick: selected ? onItemDeselect(itemId) : onItemSelect('staged', itemId),
				originalItem: item
			}
		});

	const filterAvailableSelection = options?.filterAvailableSelection
		? options.filterAvailableSelection(stagedItems.map((s) => s.originalItem)) : () => true;

	const unstagedItems: ItemDisplayProps['items'] = items
		.filter(filterAvailableSelection)
		.map((item) => {
			const itemId = getItemId(item);
			const selected = selectedItemsState.selectedType === 'staged' ? false
				: selectedItemsState.selectedItems.includes(itemId)
			return {
				displayText: props.toDisplayValue(item),
				selected: selected,
				id: itemId,
				onClick: selected ? onItemDeselect(itemId) : onItemSelect('unstaged', itemId),
				originalItem: item
			}
		})
		.filter((item) => !selectedItemsState.stagedItems.includes(item.id));



	return (
		<>
			<Grid container className={classes.mainPanel}>
				<Grid item xs={11}>
					<Grid container>
						<Grid item xs={12} sm={5}>
							<ItemDisplay items={unstagedItems} />
						</Grid>
						<Grid item xs={12} sm={2}>
							<Grid container style={{ height: '100%' }}>
								<Grid container justifyContent="center" alignItems="flex-end" style={{ paddingTop: "50px" }}>
									<Button
										className={classes.actionButton}
										onClick={onAddButtonClick}
										variant="contained"
										color="primary"
									>
										{'Add >'}
									</Button>
								</Grid>
								<Grid container justifyContent="center" alignItems="flex-start">
									<Button
										className={classes.actionButton}
										onClick={onRemoveButtonClick}
										variant="contained"
										color="primary"
									>
										{'< Remove'}
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={5}>
							<ItemDisplay items={stagedItems} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={1}>
					<Grid container style={{ height: '100%' }}>
						<Grid container justifyContent="center" alignItems="flex-end" style={{ paddingTop: "50px" }}>
							<IconButton
								className={`${classes.rotationRight}`}
								onClick={handleMoveUp}
								color="primary"
								disabled={
									selectedItemsState.selectedItems.length === 0
								}
							>
								<svg width="34" height="34" viewBox="0 0 34 34" fill="none">
									<path d="M16.9997 23.6667C17.4719 23.6667 17.868 23.5067 18.188 23.1867C18.5069 22.8678 18.6663 22.4722 18.6663 22V16.6667L20.1663 18.1667C20.4719 18.4722 20.8608 18.625 21.333 18.625C21.8052 18.625 22.1941 18.4722 22.4997 18.1667C22.8052 17.8611 22.958 17.4722 22.958 17C22.958 16.5278 22.8052 16.1389 22.4997 15.8333L18.1663 11.5C17.9997 11.3333 17.8191 11.215 17.6247 11.145C17.4302 11.0761 17.2219 11.0417 16.9997 11.0417C16.7775 11.0417 16.5691 11.0761 16.3747 11.145C16.1802 11.215 15.9997 11.3333 15.833 11.5L11.4997 15.8333C11.1941 16.1389 11.0413 16.5278 11.0413 17C11.0413 17.4722 11.1941 17.8611 11.4997 18.1667C11.8052 18.4722 12.1941 18.625 12.6663 18.625C13.1386 18.625 13.5275 18.4722 13.833 18.1667L15.333 16.6667V22C15.333 22.4722 15.493 22.8678 15.813 23.1867C16.1319 23.5067 16.5275 23.6667 16.9997 23.6667ZM16.9997 33.6667C14.6941 33.6667 12.5275 33.2289 10.4997 32.3533C8.4719 31.4789 6.70801 30.2917 5.20801 28.7917C3.70801 27.2917 2.52079 25.5278 1.64634 23.5C0.770786 21.4722 0.333008 19.3056 0.333008 17C0.333008 14.6944 0.770786 12.5278 1.64634 10.5C2.52079 8.47223 3.70801 6.70834 5.20801 5.20834C6.70801 3.70834 8.4719 2.52056 10.4997 1.645C12.5275 0.770558 14.6941 0.333336 16.9997 0.333336C19.3052 0.333336 21.4719 0.770558 23.4997 1.645C25.5275 2.52056 27.2913 3.70834 28.7913 5.20834C30.2913 6.70834 31.4786 8.47223 32.353 10.5C33.2286 12.5278 33.6663 14.6944 33.6663 17C33.6663 19.3056 33.2286 21.4722 32.353 23.5C31.4786 25.5278 30.2913 27.2917 28.7913 28.7917C27.2913 30.2917 25.5275 31.4789 23.4997 32.3533C21.4719 33.2289 19.3052 33.6667 16.9997 33.6667Z" fill="#E34747" />
								</svg>
							</IconButton>
						</Grid>
						<Grid container justifyContent="center" alignItems="flex-start">
							<IconButton
								className={`${classes.rotationRight}`}
								onClick={handleMoveDown}
								color="primary"
								disabled={
									selectedItemsState.selectedItems.length === 0
								}
							>
								<svg width="34" height="34" viewBox="0 0 34 34" fill="none">
									<path d="M17.0003 10.3333C16.5281 10.3333 16.132 10.4933 15.812 10.8133C15.4931 11.1322 15.3337 11.5278 15.3337 12L15.3337 17.3333L13.8337 15.8333C13.5281 15.5278 13.1392 15.375 12.667 15.375C12.1948 15.375 11.8059 15.5278 11.5003 15.8333C11.1948 16.1389 11.042 16.5278 11.042 17C11.042 17.4722 11.1948 17.8611 11.5003 18.1667L15.8337 22.5C16.0003 22.6667 16.1809 22.785 16.3753 22.855C16.5698 22.9239 16.7781 22.9583 17.0003 22.9583C17.2225 22.9583 17.4309 22.9239 17.6253 22.855C17.8198 22.785 18.0003 22.6667 18.167 22.5L22.5003 18.1667C22.8059 17.8611 22.9587 17.4722 22.9587 17C22.9587 16.5278 22.8059 16.1389 22.5003 15.8333C22.1948 15.5278 21.8059 15.375 21.3337 15.375C20.8614 15.375 20.4725 15.5278 20.167 15.8333L18.667 17.3333L18.667 12C18.667 11.5278 18.507 11.1322 18.187 10.8133C17.8681 10.4933 17.4725 10.3333 17.0003 10.3333ZM17.0003 0.333333C19.3059 0.333333 21.4726 0.771112 23.5003 1.64667C25.5281 2.52111 27.292 3.70833 28.792 5.20833C30.292 6.70833 31.4792 8.47222 32.3537 10.5C33.2292 12.5278 33.667 14.6944 33.667 17C33.667 19.3056 33.2292 21.4722 32.3537 23.5C31.4792 25.5278 30.292 27.2917 28.792 28.7917C27.292 30.2917 25.5281 31.4794 23.5003 32.355C21.4725 33.2294 19.3059 33.6667 17.0003 33.6667C14.6948 33.6667 12.5281 33.2294 10.5003 32.355C8.47255 31.4794 6.70866 30.2917 5.20866 28.7917C3.70866 27.2917 2.52144 25.5278 1.64699 23.5C0.77144 21.4722 0.333661 19.3056 0.333662 17C0.333662 14.6944 0.77144 12.5278 1.64699 10.5C2.52144 8.47222 3.70866 6.70833 5.20866 5.20833C6.70866 3.70833 8.47255 2.52111 10.5003 1.64666C12.5281 0.771111 14.6948 0.333333 17.0003 0.333333Z" fill="#E34747" />
								</svg>
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				container
				justifyContent="flex-end"
				className={classes.mainAction}
				spacing={4}
			>
				<Grid item style={{ width: '15vw', paddingTop: '5vh' }}>
					<Button
						className={classes.submitButton}
						onClick={handleReset}
						variant="outlined"
						color="primary"
					>
						{'Reset'}
					</Button>
					<Button
						className={classes.submitButton}
						onClick={onSave}
						variant="contained"
						color="primary"
						disabled={selectedItemsState.stagedItems.length === 0}
					>
						{'OK'}
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default TwoPanelSelector;