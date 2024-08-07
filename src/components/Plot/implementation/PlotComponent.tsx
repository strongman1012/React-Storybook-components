import React, { FC } from "react";
import Plot from 'react-plotly.js';

interface PlotProps {
  data: Plotly.Data[] | undefined;
  layout: Partial<Plotly.Layout>;
  divId?: string | undefined;
  config?: Partial<Plotly.Config> | undefined;
}

const PlotComponent: FC<PlotProps> = ({
  data,
  layout,
  divId,
  config,
}) => {

  return (
    <>
      {
        data &&
        <Plot
          data={data}
          layout={layout}
          divId={divId}
          config={config}
        >
        </Plot>
      }


    </>
  );
};

export default PlotComponent;