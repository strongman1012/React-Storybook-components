/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import DataGrid, { LoadPanel, Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { Link } from './link';


interface ContactLinkInfoDisplayProps {
    selection: {simulationTime: number, links: Link[], x: number, y: number} | undefined
};

const xOffset: number = 5;
const yOffset: number = 5;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: '#cccccc',
        color: '#000000',
        position: 'absolute',
        zIndex: 10,
        border: '1px solid #ffffff',
        borderRadius: '2px',
        padding: '2px',
        backgroundColor: '#cccccc',
        overflow: 'auto',
        maxHeight: '400px',
        fontSize: '0.8em',
        fontFamily: 'Menlo,Monaco,Consolas,Courier New,monospace',
        webkitUserSelect: 'none', /* Safari */
        msUserSelect: 'none', /* IE 10 and IE 11 */
        userSelect: 'none', /* Standard syntax */
        '& hr': {
            padding: `1px`,
            margin: `1px`
        },

    },
    hide: {
        display: 'none'
    },
    title: {
        fontWeight: 'bold',
        paddingLeft: '4px',
        paddingTop: '5px',
        paddingBottom: '5px',
    },
    linkInfo: {
        backgroundColor: '#ffffff',
    },
    header: {
        fontWeight: 'bold',
        backgroundColor: '#ffffff',
        paddingLeft: '4px',
        marginTop: '1px',
        paddingBottom: '5px',
    },
    detailsButton: {
        fontWeight: 'bold',
        color: '#000000',
        paddingLeft: '4px',
        width: '100%',
        backgroundColor: '#cccccc',
        '& .dx-button-content': {
            justifyContent: 'left',
        },
    },
    table: {
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        '& .dx-datagrid': {
            width: '320px'
        },
        '& .dx-row': {
            border: `none`
        },
        '& .dx-datagrid .dx-row-lines>td': {
            borderBottom: 'none',
            paddingTop: '3px',
            paddingBottom: '3px'
        }
    },
}));

const formatDuration = (t_ms: number): string => {
    var t_s = t_ms / 1000;
    var hours  = Math.floor(t_s / 3600);
    var minutes = Math.floor((t_s % 3600) / 60);
    var seconds = Math.floor(t_s % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const ContactLinkInfoDisplay: FC<ContactLinkInfoDisplayProps> = ({
    selection
}) => {
    const classes = useStyles();
    const [contactLinks, setContactLinks] = useState<({source: string, destination: string, direction: string, properties: {col1: string, col2: string}[]})[]>();

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (selection) {
            var contactLinks: ({source: string, destination: string, direction: string, properties: {col1: string, col2: string}[]})[] = [];
            setContactLinks(undefined);
            for(let l=0;l<selection.links.length;l++) {
                let link: Link = selection.links[l];
                let sourceName = link.source[0] === '(' ? link.source.substring(link.source.indexOf(')')+1) : link.source
                let destinationName = link.destination[0] === '(' ? link.destination.substring(link.destination.indexOf(')')+1) : link.destination
                var contact = {
                    source: sourceName,
                    destination: destinationName,
                    direction: link.direction,
                    properties: [
                        {
                            col1: "Frequency: " + link.frequencyBand,
                            col2: "Data Rate: " + link.dataRate_kbps + ' kbps',
                        },
                        {
                            col1: "EIRP: " + link.eirp,
                            col2: "G/T:  " + link.gOverT,
                        },
                        {
                            col1: "Duration:  " + formatDuration(link.activeInterval[1] - link.activeInterval[0]),
                            col2: "Remaining: " + formatDuration(link.activeInterval[1] - selection.simulationTime)
                        }
                    ]
                }
                contactLinks.push(contact);
            }
            setContactLinks(contactLinks);
        } else {
            setContactLinks(undefined);
        }
    }, [selection, selection?.simulationTime, selection?.links]);


    return(
        <div>
            {selection &&
            <div className={classes.root} style={{left: selection.x + xOffset + 'px', top: selection.y+yOffset + 'px'}}>
                <div className={classes.title}>{"Contact links (" + (contactLinks ? contactLinks?.length : 0) + ")"}</div>
                {
                    contactLinks?.map((linkAttributes, i) => {
                        return (<div key={i} className={classes.linkInfo}>
                                <span className={classes.header}>{linkAttributes.source + " " + String.fromCharCode(8594) + " " + linkAttributes.destination + " " + linkAttributes.direction}</span>
                                <DataGrid
                                className={classes.table}
                                dataSource={linkAttributes.properties}
                                columnAutoWidth={false}
                                showColumnHeaders={false}
                                showBorders={false}
                                showRowLines={true}
                                hoverStateEnabled={false}
                                wordWrapEnabled={true}
                            >
                                <LoadPanel
                                    enabled={false}
                                />
                                <Column dataField="col1"></Column>
                                <Column dataField="col2"></Column>
                            </DataGrid>
                            <hr/>
                            </div>
                        );
                    })
                }
            </div>
            }
        </div>
    );
}

export default ContactLinkInfoDisplay;
