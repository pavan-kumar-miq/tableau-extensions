import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";
import { Link } from "react-router-dom";

export const VennDiagram = (props) => {
  const [sets, setSets] = useState([
    { sets: ["Display"], size: 1, dataItems: [1] },
    { sets: ["Video"], size: 1, dataItems: [2] },
    { sets: ["Audio"], size: 1, dataItems: [3] },
    { sets: ["Display", "Video"], size: 2, dataItems: [4] },
    { sets: ["Display", "Audio"], size: 2, dataItems: [5] },
    { sets: ["Video", "Audio"], size: 2, dataItems: [0] },
    {
      sets: ["Display", "Video", "Audio"],
      size: 3,
      dataItems: [7],
    },
  ]);
  let tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "venntooltip")
    .style("opacity", 0)
    .style("color", "white")
    .style("font-size", "16px")
    .style("background-color", "rgba(0, 0, 0, 0.5)")
    .style("border-radius", "10px")
    .style("padding", "10px");
  useEffect(() => {
    const maxSize = Math.max(...sets.map((set) => set.size));
    // Scale the sizes based on the scaleFactor
    const scaledSets = sets.map((set) => ({
      ...set,
      size: (maxSize / set.size) * Math.sqrt(set.dataItems.length),
    }));
    let chart = venn.VennDiagram();
    d3.select("#venn").datum(scaledSets).call(chart);

    d3.select("#venn")
      .selectAll("g")
      .on("mouseover", function (d, i) {
        d3.select("#venn")
          .selectAll("g")
          .each(function (d) {
            d3.select(this)
              .select("path")
              .style("stroke-width", 0)
              .style("fill-opacity", d.sets.length == 1 ? 0.25 : 0.0)
              .style("stroke-opacity", 0);
          });
        tooltip.transition().duration(400).style("opacity", 0.9);
        d3.select(this)
          .select("path")
          .style("stroke-width", 3)
          .style("fill-opacity", i.sets.length == 1 ? 0.4 : 0.1)
          .style("stroke-opacity", 0.3)
          .style("stroke", "black");
      })
      .on("mousemove", function (d, i) {
        console.log(d.pageX, d.pageY);
        tooltip
          .text(i.sets.join(" ∩ ") + ": " + i.dataItems.join(", "))
          .style("position", "absolute")
          .style("left", d.pageX + "px")
          .style("top", d.pageY + 28 + "px");
      })
      .on("mouseout", function (d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        d3.select(this)
          .select("path")
          .style("stroke-width", 0)
          .style("fill-opacity", i.sets.length == 1 ? 0.25 : 0.0)
          .style("stroke-opacity", 0);
      });
  }, [sets]);
  return (
    <>
      <div id="venn" style={{ textAlign: "center" }}></div>
      <table
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
          marginTop: "20px",
          textAlign: "left",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "10px", border: "1px solid  #ddd " }}>
              Label
            </th>
            <th style={{ padding: "10px", border: "1px solid  #ddd " }}>
              Sets
            </th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set, index) => (
            <tr
              key={set.dataItems.join(", ")}
              style={{ backgroundColor: index % 2 ? "#f2f2f2" : "white" }}
            >
              <td
                style={{
                  padding: "10px",
                  border: "1px solid  #ddd ",
                  cursor: "pointer",
                }}
                onClick={() => {
                  d3.select("#venn")
                    .selectAll("g")
                    .each(function (d) {
                      d3.select(this)
                        .select("path")
                        .style("stroke-width", 0)
                        .style("fill-opacity", d.sets.length == 1 ? 0.25 : 0.0)
                        .style("stroke-opacity", 0);
                    });
                  d3.select("#venn")
                    .selectAll("g")
                    .filter((d) => {
                      return (
                        d && d.sets && d.sets.join("") === set.sets.join("")
                      );
                    })
                    .each(function (d) {
                      console.log(this);
                      d3.select(this)
                        .select("path")
                        .style("stroke-width", 3)
                        .style("fill-opacity", d.sets.length == 1 ? 0.4 : 0.1)
                        .style("stroke-opacity", 0.3)
                        .style("stroke", "black");

                      let rect = d3
                        .select(this)
                        .select("path")
                        .node()
                        .getBoundingClientRect();
                      let centerX = rect.left + rect.width / 4;
                      let centerY = rect.top + rect.height / 3;

                      console.log(centerX, centerY);
                      tooltip
                        .text(
                          d.sets.join(" ∩ ") + ": " + d.dataItems.join(", ")
                        )
                        .style("position", "absolute")
                        .style("left", centerX + "px")
                        .style("top", centerY + "px")
                        .transition()
                        .duration(400)
                        .style("opacity", 0.9);
                    });
                }}
              >
                {set.dataItems.join(", ")}
              </td>
              <td style={{ padding: "10px", border: "1px solid  #ddd " }}>
                {set.sets.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </>
  );
};
