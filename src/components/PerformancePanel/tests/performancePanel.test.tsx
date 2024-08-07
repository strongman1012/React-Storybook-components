import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent, within } from '@testing-library/react';
import PerformancePanel from "../implementation/PerformancePanel";
import { performanceContent } from "./performancePanelData";
import { PerformancePanelProps } from '../types/types';

const RenderPerformancePanel = () => (<PerformancePanel sections={performanceContent.map((item): PerformancePanelProps['sections'][number] => ({
	sectionId: item.category,
	sectionName: item.category,
	sectionData: item.performanceData.map((data) => ({
		name: data.name,
		value: data.value,
		...(data.accordionContent ? { dropdownContent: data.accordionContent } : data.clickableContent ? { dialogContent: data.clickableContent.content, dialogTitle: data.clickableContent.title } : {})
	}))
}))} />)

describe('PerformancePanel', () => {

	// There should be 7 performance data which have an accordion
	it('should render 7 performance data which have an accordion', () => {
		render(<RenderPerformancePanel />);
		const performanceDatWithAcoorion = screen.getAllByTestId('accordion');
		expect(performanceDatWithAcoorion.length).toBe(7);
	});

	it('Check RF Coverage (min/day) performance data', () => {
		render(<RenderPerformancePanel />);
		const rfCoveragePerformance = screen.getAllByTestId('accordion')[0];
		expect(rfCoveragePerformance).toHaveTextContent('RF Coverage (min/day)');
		expect(rfCoveragePerformance).toHaveTextContent('0');
	});

	it('Check Contacts Per Day performance data', () => {
		render(<RenderPerformancePanel />);
		const contactsPerDay = screen.getAllByTestId('accordion')[1];
		expect(contactsPerDay).toHaveTextContent('Contacts Per Day');
		expect(contactsPerDay).toHaveTextContent('0');
	});

	it('Check Average Contact Duration (minutes) performance data', () => {
		render(<RenderPerformancePanel />);
		const averageContactDuration = screen.getAllByTestId('accordion')[2];
		expect(averageContactDuration).toHaveTextContent('Average Contact Duration (minutes)');
		expect(averageContactDuration).toHaveTextContent('0');
	});

	it('Check Max Coverage Duration (minutes) performance data', () => {
		render(<RenderPerformancePanel />);
		const maxCoverageDuration = screen.getAllByTestId('accordion')[3];
		expect(maxCoverageDuration).toHaveTextContent('Max Coverage Duration (minutes)');
		expect(maxCoverageDuration).toHaveTextContent('0');
	});

	it('Check Average Gap (minutes) performance data', () => {
		render(<RenderPerformancePanel />);
		const averageGap = screen.getAllByTestId('accordion')[4];
		expect(averageGap).toHaveTextContent('Average Gap (minutes)');
		expect(averageGap).toHaveTextContent('5760.5');
	});

	it('Check Max Gap (minutes) performance data', () => {
		render(<RenderPerformancePanel />);
		const maxGap = screen.getAllByTestId('accordion')[5];
		expect(maxGap).toHaveTextContent('Max Gap (minutes)');
		expect(maxGap).toHaveTextContent('5760.5');
	});

	it('Check Mean Response Time (minutes) performance data', () => {
		render(<RenderPerformancePanel />);
		const meanResponseTime = screen.getAllByTestId('accordion')[6];
		expect(meanResponseTime).toHaveTextContent('Mean Response Time (minutes)');
		expect(meanResponseTime).toHaveTextContent('2880.25');
	});

	// There should be 8 performance text data
	it('should render 8 performance text data', () => {
		render(<RenderPerformancePanel />);
		const performanceTexData = screen.getAllByTestId('performanceText');
		expect(performanceTexData.length).toBe(8);
	});

	it('Check Data Rate (Mbps) performance text data', () => {
		render(<RenderPerformancePanel />);
		const dataRate = screen.getAllByTestId('performanceText')[0];
		expect(dataRate).toHaveTextContent('Data Rate (Mbps)');
		expect(dataRate).toHaveTextContent('64');
	});

	it('Check Throughput (Gb/day) performance text data', () => {
		render(<RenderPerformancePanel />);
		const throughput = screen.getAllByTestId('performanceText')[1];
		expect(throughput).toHaveTextContent('Throughput (Gb/day)');
		expect(throughput).toHaveTextContent('0.13');
	});

	it('Check Parabolic Antenna Diameter (m) performance text data', () => {
		render(<RenderPerformancePanel />);
		const parabolicAntennaDiameter = screen.getAllByTestId('performanceText')[2];
		expect(parabolicAntennaDiameter).toHaveTextContent('Parabolic Antenna Diameter (m)');
		expect(parabolicAntennaDiameter).toHaveTextContent('0.03');
	});

	it('Check Parabolic Antenna Mass (kg) performance text data', () => {
		render(<RenderPerformancePanel />);
		const parabolicAntennaMass = screen.getAllByTestId('performanceText')[3];
		expect(parabolicAntennaMass).toHaveTextContent('Parabolic Antenna Mass (kg)');
		expect(parabolicAntennaMass).toHaveTextContent('0');
	});

	it('Check Helical Antenna Height (m) performance text data', () => {
		render(<RenderPerformancePanel />);
		const helicalAntennaHeight = screen.getAllByTestId('performanceText')[4];
		expect(helicalAntennaHeight).toHaveTextContent('Helical Antenna Height (m)');
		expect(helicalAntennaHeight).toHaveTextContent('0.01');
	});

	it('Check Dipole Antenna Size (m) performance text data', () => {
		render(<RenderPerformancePanel />);
		const dipoleAntennaSize = screen.getAllByTestId('performanceText')[5];
		expect(dipoleAntennaSize).toHaveTextContent('Dipole Antenna Size (m)');
		expect(dipoleAntennaSize).toHaveTextContent('0.04');
	});

	it('Check Tracking Accuracy (m) performance text data', () => {
		render(<RenderPerformancePanel />);
		const trackingAccuracy = screen.getAllByTestId('performanceText')[6];
		expect(trackingAccuracy).toHaveTextContent('Tracking Accuracy (m)');
		expect(trackingAccuracy).toHaveTextContent('N/A');
	});

	it('Check GNSS Availability performance text data', () => {
		render(<RenderPerformancePanel />);
		const gnssAvailability = screen.getAllByTestId('performanceText')[7];
		expect(gnssAvailability).toHaveTextContent('GNSS Availability');
		expect(gnssAvailability).toHaveTextContent('Yes');
	});

	// There should be 3 performance link data
	it('should render 3 performance link data', () => {
		render(<RenderPerformancePanel />);
		const performanceLinkData = screen.getAllByTestId('performanceLink');
		expect(performanceLinkData.length).toBe(3);
	});

	it('Check EIRP (dBW) performance link data', () => {
		render(<RenderPerformancePanel />);
		const eirp = screen.getAllByTestId('performanceLink')[0];
		expect(eirp).toHaveTextContent('EIRP (dBW)');
		const eirpValue = within(eirp).getByText('0');
		expect(eirpValue).toBeInTheDocument();
		fireEvent.click(eirpValue);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveTextContent('Insert some component here...');
	});

	it('Check Electronically Steerable Antenna Size (m²) performance link data', () => {
		render(<RenderPerformancePanel />);
		const electronicallySteerableAntennaSize = screen.getAllByTestId('performanceLink')[1];
		expect(electronicallySteerableAntennaSize).toHaveTextContent('Electronically Steerable Antenna Size (m²)');
		const electronicallySteerableAntennaSizeValue = within(electronicallySteerableAntennaSize).getByText('0.01');
		expect(electronicallySteerableAntennaSizeValue).toBeInTheDocument();
		fireEvent.click(electronicallySteerableAntennaSizeValue);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveTextContent('Insert some component here...');
	});

	it('Check Patch Antenna Size (m²) performance link data', () => {
		render(<RenderPerformancePanel />);
		const patchAntennaSize = screen.getAllByTestId('performanceLink')[2];
		expect(patchAntennaSize).toHaveTextContent('Patch Antenna Size (m²)');
		const patchAntennaSizeValue = within(patchAntennaSize).getByText('1.75');
		expect(patchAntennaSizeValue).toBeInTheDocument();
		fireEvent.click(patchAntennaSizeValue);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveTextContent('Insert some component here...');
	});
});