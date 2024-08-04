import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { fetchBranchData } from "./FetchData";

interface Commit {
  id: string;
  message: string;
}

interface Branch {
  name: string;
  commits: Commit[];
}

interface TreeNode {
  id: string;
  message: string;
  color: string; // New property for branch color
  children: TreeNode[];
}

function createGitTree(branches: Branch[]): TreeNode {
  const root: TreeNode = {
    id: "root",
    message: "Root",
    color: "black",
    children: [],
  };
  const commitMap = new Map<string, TreeNode>();

  branches.forEach((branch, index) => {
    const branchColor = d3.schemeCategory10[index % 10]; // Use a color scale
    let currentNode = root;
    branch.commits.forEach((commit) => {
      if (!commitMap.has(commit.id)) {
        const newNode: TreeNode = {
          id: commit.id,
          message: commit.message,
          color: branchColor,
          children: [],
        };
        commitMap.set(commit.id, newNode);
        currentNode.children.push(newNode);
        currentNode = newNode;
      } else {
        currentNode = commitMap.get(commit.id)!;
      }
    });
  });

  console.log("Tree root:", root); // Debugging log
  return root;
}

const GitTree: React.FC<{ branches: Branch[] }> = ({ branches }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const root = createGitTree(branches);
    console.log("Tree root:", root); // Debugging log

    const height = 1200; // Increase the overall height
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };

    const svg = d3.select(svgRef.current).attr("height", height);

    svg.selectAll("*").remove(); // Clear previous rendering

    // Add a background rectangle
    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", height)
      .style("fill", "black"); // Set background to black

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const tree = d3.tree<TreeNode>().nodeSize([100, 400]); // Increase the minimum distance between nodes

    const hierarchy = d3.hierarchy(root);
    const treeData = tree(hierarchy);
    console.log("Tree data:", treeData); // Debugging log

    const link = g
      .selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal<
            d3.HierarchyPointLink<TreeNode>,
            d3.HierarchyPointNode<TreeNode>
          >()
          .x((d) => d.y)
          .y((d) => d.x),
      )
      .style("fill", "none")
      .style("stroke", (d) => d.source.data.color) // Use color from source node
      .style("stroke-width", "2px");

    const node = g
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr(
        "class",
        (d) => "node" + (d.children ? " node--internal" : " node--leaf"),
      )
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("r", 10)
      .style("fill", (d) => d.data.color); // Use color from node data

    node
      .append("text")
      .attr("dy", (d) => (d.children ? -15 : 15)) // Position text above for internal nodes and below for leaf nodes
      .attr("x", 0)
      .style("text-anchor", "middle")
      .style("fill", "white") // Set text color to white
      .text((d) => `${d.data.id}: ${d.data.message}`);

    // Adjust the width of the SVG based on the tree layout
    const svgWidth =
      treeData.leaves().reduce((max, leaf) => Math.max(max, leaf.y), 0) +
      margin.left +
      margin.right;
    svg.attr("width", svgWidth);
  }, [branches]);

  return (
    <div style={{ overflowX: "scroll", overflowY: "hidden", height: "100vh" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

interface FeatureProps {
  name: string | null;
  repo: string | null;
  cookie: string | null;
}

const Feature: React.FC<FeatureProps> = ({ name, repo, cookie }) => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      const data = await fetchBranchData(name, repo, cookie);
      console.log("Fetched branch data:", data); // Debugging log
      setBranches(data);
    };

    initializeData();
  }, [name, repo, cookie]);

  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      <GitTree branches={branches} />
    </div>
  );
};

export default Feature;
