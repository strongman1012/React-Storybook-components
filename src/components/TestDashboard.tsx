import React from "react";
import { FC, ReactNode, useState } from "react";
import DashboardNavbar from "./Navbar";
import { styled } from '@mui/system';
import DashboardSidebar from "./Sidebar";
import LoadingScreen from "./LoadingScreen";
import ShellApi from "src/utills/shellApi";
import { setOutputJson, setTestStatus } from "src/store/reducers/testReducer";
import DashboardFooter from "./Footerbar";
import { useDispatch } from "src/store";
import ConnectAccountSetupGuide from "./connect-account-setup-guide/implements/ConnectAccountSetupGuide";
import DataViewer from "./data-viewer/implements/DataViewer";
import ScriptManager from "./script-manager/implements/ScriptManager";
import LinkBudgetComponent from "./link-budget/implements";
import RenderEbNo from "./rfAttribute/implements/RenderEbNo";
import HeatMapSlider from './heatmap-slider/implements/HeatMapSlider';

interface TestDashboardProps {
    children?: ReactNode;
    themeName: string;
    onChangeTheme: (name: string) => void;
}

const DashboardContainer = styled('div')(
    {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    }
)

const DashboardMainArea = styled('div')(
    {
        marginTop: '48px',
        paddingBottom: '12px',
        display: 'flex',
        flexGrow: 1
    }
)

const initOutput = {
    status: 200,
    data: {
        success: true,
        message: 'Success!'
    }
}

const components = [
    {
        key: 'connect-account-setup-guide',
        component: <ConnectAccountSetupGuide />
    },
    {
        key: 'data-viewer',
        component: <DataViewer />
    },
    {
        key: 'script-manager',
        component: <ScriptManager />
    },
    {
        key: 'rfAttribute',
        component: <RenderEbNo />
    },
    {
        key: 'link-budget',
        component: <LinkBudgetComponent themeName={'light'} onChangeTheme={() => { }} />
    },
    {
        key: 'heatmap-slider',
        component: <HeatMapSlider />
    }
];

const TestDashboard: FC<TestDashboardProps> = (props: TestDashboardProps) => {

    const dispatch = useDispatch();
    const apiObj = new ShellApi();
    // const inputJson = useSelector((root: RootState) => root.test.inputJson);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [consoleOutput, setConsoleOutput] = useState<string>('');
    const [activeComponent, setActiveComponent] = useState<any>(
        <LinkBudgetComponent themeName={props.themeName} onChangeTheme={props.onChangeTheme} />
        // <ConnectAccountSetupGuide />
    );

    const handleTestStart = async () => {
        setIsLoading(true);

        try {
            const response = await apiObj.excuteTestShell();
            console.log('response', response)
            dispatch(setTestStatus(JSON.stringify(response.data)));
        } catch (err) {
            console.log('error', err);
            dispatch(setTestStatus(JSON.stringify(err)));
        }

        dispatch(setOutputJson(JSON.stringify(initOutput)));

        setIsLoading(false);
    }

    const handleChangeComponent = (key: string) => {

        const selectedComponent = components.find((c) => c.key === key);
        setActiveComponent(selectedComponent?.component);
    }

    return (
        <>
            <LoadingScreen show={isLoading} />
            <DashboardContainer>
                <DashboardNavbar onStart={handleTestStart} onSelectComponent={handleChangeComponent} />
                <DashboardMainArea>
                    {activeComponent}
                    <DashboardSidebar />
                </DashboardMainArea>
                <DashboardFooter result={consoleOutput} />
            </DashboardContainer>
        </>
    )
}

export default TestDashboard;