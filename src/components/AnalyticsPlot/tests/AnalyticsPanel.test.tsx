import './mockjsDom'
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import AnalyticsPanel from '../implementation/AnalyticsPlot';
import { ANALYTICS_MOCK_DATA } from './sampleData';

test('Test for Analytics Panel Rendering Wihtout Crashing', () => {
    render(<AnalyticsPanel data={ANALYTICS_MOCK_DATA} />);
});

test('Test for Analytics Panel Rendering Wihtout Crashing Without Data', () => {
    render(<AnalyticsPanel data={
        {
            title: 'nothing',
            sections: []
        }
    } />);
});

test('Test for the Analytics Panel title showing up', () => {
    render(<AnalyticsPanel data={ANALYTICS_MOCK_DATA} />);
    expect(screen.getByText('RF Coverage')).toBeVisible();
})

test('Test for subtitles to properly render in the Analytics Panel', () => {
    render(<AnalyticsPanel data={ANALYTICS_MOCK_DATA} />);

    const subtitle1 = screen.getAllByText('RF Coverage');
    subtitle1.forEach((element: HTMLElement) => {
        expect(element).toBeVisible();
    })

    const subtitle2 = screen.getAllByText('Running Coverage Average');
    subtitle2.forEach((element: HTMLElement) => {
        expect(element).toBeVisible();
    })
})