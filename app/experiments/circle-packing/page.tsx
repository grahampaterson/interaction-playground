"use client";

import styles from "./page.module.css";
import React, { useState } from "react";
import * as d3 from "d3";
import { Swatches } from "@d3/color-legend";
import { data } from "./data";

export default function Page() {
  return (
    <main className={styles.main}>
      <PackCircles />
    </main>
  );
}

function PackCircles() {
  // Specify the dimensions of the chart.
  const width = 500;
  const height = width;
  const margin = 1; // to avoid clipping the root circle stroke
  const group = (d) => d.id.split(".")[1]; // "util" of "flare.util.Strings"

  // Create a categorical color scale.
  const color = d3.scaleOrdinal(d3.schemeTableau10);

  // Create the pack layout.
  const pack = d3
    .pack()
    .size([width - margin * 2, height - margin * 2])
    .padding(3);

  // Compute the hierarchy from the (flat) data; expose the values
  // for each node; lastly apply the pack layout.
  const root = pack(d3.hierarchy({ children: data }).sum((d) => d.value));

  let nodes = root.leaves().map((circ, i) => {
    return (
      <g key={i} transform={`translate(${circ.x},${circ.y})`}>
        <circle
          fillOpacity={0.7}
          fill={color(group(circ.data))}
          r={circ.r}
        ></circle>
      </g>
    );
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${-margin} ${-margin} ${width} ${height}`}
      style={{
        maxWidth: "100%",
        height: "auto",
        font: "10px sand-serif",
      }}
      textAnchor="middle"
    >
      {nodes}
    </svg>
  );
}

function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}) {
  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        d={line(data)}
      />
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
