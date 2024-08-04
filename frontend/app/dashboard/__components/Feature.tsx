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

    const margin = { top: 50, right: 90, bottom: 30, left: 90 };

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove(); // Clear previous rendering

    // Add a background rectangle
    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("fill", "black");

    const g = svg.append("g");

    const tree = d3.tree<TreeNode>().nodeSize([100, 400]);

    const hierarchy = d3.hierarchy(root);
    const treeData = tree(hierarchy);
    console.log("Tree data:", treeData); // Debugging log

    // Calculate the dimensions of the tree
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    treeData.each(d => {
      minX = Math.min(minX, d.x);
      maxX = Math.max(maxX, d.x);
      maxY = Math.max(maxY, d.y);
    });

    const height = maxX - minX + margin.top + margin.bottom;
    const width = maxY + margin.left + margin.right;

    // Set the SVG dimensions
    svg.attr("width", width).attr("height", height);

    // Adjust the initial transformation
    g.attr("transform", `translate(${margin.left},${-minX + margin.top})`);

    // The rest of the code remains the same
    const link = g
      .selectAll<SVGPathElement, d3.HierarchyLink<TreeNode>>(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3.linkHorizontal<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
          .x((d) => d.y)
          .y((d) => d.x)
      )
      .style("fill", "none")
      .style("stroke", (d) => (d.source as any).data.color)
      .style("stroke-width", "2px");

    const node = g
      .selectAll<SVGGElement, d3.HierarchyPointNode<TreeNode>>(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr(
        "class",
        (d) => "node" + (d.children ? " node--internal" : " node--leaf")
      )
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("r", 10)
      .style("fill", (d) => d.data.color);

    node
      .append("text")
      .attr("dy", (d) => (d.children ? -15 : 15))
      .attr("x", 0)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text((d) => `${d.data.id}: ${d.data.message}`);
  }, [branches]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflowX: "auto",
        overflowY: "auto",
        backgroundColor: "black",
      }}
    >
      <svg ref={svgRef} style={{ display: "block" }}></svg>
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
