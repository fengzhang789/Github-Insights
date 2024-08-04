import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { fetchBranchData } from "./FetchData";
import ScrollbarCardNew from "@/app/dashboard/__components/ScrollbarCardNew"; // Adjust the import path as necessary

interface Commit {
  id: string;
  message: string;
  author: string;
  avatar: string; // New property for avatar
}

interface Branch {
  name: string;
  commits: Commit[];
}

interface TreeNode {
  id: string;
  message: string;
  author: string;
  avatar: string; // New property for avatar
  color: string;
  children: TreeNode[];
}

function createGitTree(branches: Branch[]): TreeNode[] {
  const root: TreeNode = {
    id: "root",
    message: "Root",
    author: "root",
    avatar: "",
    color: "black",
    children: [],
  };
  const commitMap = new Map<string, TreeNode>();

  branches.forEach((branch, index) => {
    const branchColor = d3.schemeCategory10[index % 10];
    let currentNode = root;
    branch.commits.forEach((commit) => {
      if (!commitMap.has(commit.id)) {
        const newNode: TreeNode = {
          id: commit.id,
          message: commit.message,
          author: commit.author,
          avatar: commit.avatar,
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

  console.log("Tree root children:", root.children);
  return root.children;
}

const GitTree: React.FC<{ branches: Branch[]; showAvatars: boolean }> = ({
  branches,
  showAvatars,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<TreeNode | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current) return;

    const rootChildren = createGitTree(branches);
    console.log("Tree root children:", rootChildren);

    const margin = { top: 130, right: 90, bottom: 150, left: 90 };

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("fill", "black");

    const g = svg.append("g");

    const tree = d3.tree<TreeNode>().nodeSize([100, 400]);

    const hierarchy = d3.hierarchy({ children: rootChildren } as any);
    const treeData = tree(hierarchy);
    console.log("Tree data:", treeData);

    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    treeData.each((d) => {
      minX = Math.min(minX, d.x);
      maxX = Math.max(maxX, d.x);
      maxY = Math.max(maxY, d.y);
    });

    const height = maxX - minX + margin.top + margin.bottom;
    const width = maxY + margin.left + margin.right;

    svg.attr("width", width).attr("height", height);

    g.attr("transform", `translate(${margin.left},${-minX + margin.top})`);

    const link = g
      .selectAll<SVGPathElement, d3.HierarchyLink<TreeNode>>(".link")
      .data(treeData.links().filter((d) => d.source.depth > 0))
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
      .style("stroke", (d) => (d.source as any).data.color)
      .style("stroke-width", "2px");

    const node = g
      .selectAll<SVGGElement, d3.HierarchyPointNode<TreeNode>>(".node")
      .data(treeData.descendants().filter((d) => d.depth > 0))
      .enter()
      .append("g")
      .attr(
        "class",
        (d) => "node" + (d.children ? " node--internal" : " node--leaf"),
      )
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .on("mouseover", (event, d) => {
        setHoveredNode(d.data);
        setMousePosition({ x: event.pageX, y: event.pageY });
      })
      .on("mousemove", (event) => {
        setMousePosition({ x: event.pageX, y: event.pageY });
      })
      .on("mouseout", () => setHoveredNode(null));

    if (showAvatars) {
      node
        .append("image")
        .attr("xlink:href", (d) => d.data.avatar)
        .attr("x", -15)
        .attr("y", -15)
        .attr("width", 30)
        .attr("height", 30)
        .attr("clip-path", "circle(15px at 15px 15px)");
    } else {
      node
        .append("circle")
        .attr("r", 10)
        .style("fill", (d) => d.data.color);
    }

    node
      .append("text")
      .attr("dy", (d, i) => (i % 2 === 0 ? -30 : 40)) // Alternate between above and below
      .attr("x", 0)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text((d) => `${d.data.id}: ${d.data.message}`);
  }, [branches, showAvatars]);

  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        overflowX: "auto",
        overflowY: "hidden",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <svg ref={svgRef} style={{ display: "block" }}></svg>
      {hoveredNode && (
        <div
          style={{
            position: "fixed",
            top: `90vh`,
            left: `50vw`,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            transform: "translate(-50%, -50%)", // Center the hover card
          }}
        >
          <ScrollbarCardNew
            commit={{
              sha: hoveredNode.id,
              message: hoveredNode.message,
              name: hoveredNode.author,
              avatar: hoveredNode.avatar,
              email: "", // Add email if available in TreeNode
              date: "", // Add date if available in TreeNode
            }}
          />
        </div>
      )}
    </div>
  );
};

interface FeatureProps {
  name: string | null;
  repo: string | null;
  cookie: string | null;
  selectedUser: string | null;
}

const Feature: React.FC<FeatureProps> = ({
  name,
  repo,
  cookie,
  selectedUser,
}) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [showAvatars, setShowAvatars] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      const data = await fetchBranchData(name, repo, cookie);

      console.log("Fetched branch data:", data);

      if (selectedUser) {
        const filteredData = data.map((branch) => ({
          ...branch,
          commits: branch.commits.filter(
            (commit) => commit.author === selectedUser,
          ),
        }));
        setBranches(filteredData);
      } else {
        setBranches(data);
      }
    };

    initializeData();
  }, [name, repo, cookie, selectedUser]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "4rem",
          paddingTop: "30px",
        }}
      >
        Project Timeline
      </h1>
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "black",
            borderRadius: "5px",
            border: "1px solid white",
            color: "white",
          }}
        >
          <input
            type="checkbox"
            checked={showAvatars}
            onChange={() => setShowAvatars(!showAvatars)}
            style={{ marginRight: "10px" }}
          />
          Show Avatars
        </label>
      </div>
      <GitTree branches={branches} showAvatars={showAvatars} />
    </div>
  );
};

export default Feature;
