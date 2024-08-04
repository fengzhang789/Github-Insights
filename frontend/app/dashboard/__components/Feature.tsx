import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { fetchBranchData } from './FetchData';

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
    const root: TreeNode = { id: 'root', message: 'Root', color: 'black', children: [] };
    const commitMap = new Map<string, TreeNode>();
  
    branches.forEach((branch, index) => {
      const branchColor = d3.schemeCategory10[index % 10]; // Use a color scale
      let currentNode = root;
      branch.commits.forEach(commit => {
        if (!commitMap.has(commit.id)) {
          const newNode: TreeNode = { id: commit.id, message: commit.message, color: branchColor, children: [] };
          commitMap.set(commit.id, newNode);
          currentNode.children.push(newNode);
          currentNode = newNode;
        } else {
          currentNode = commitMap.get(commit.id)!;
        }
      });
    });
  
    return root;
  }
  

  const GitTree: React.FC<{ branches: Branch[] }> = ({ branches }) => {
    const svgRef = useRef<SVGSVGElement>(null);
  
    useEffect(() => {
      if (!svgRef.current) return;
  
      const root = createGitTree(branches);
  
      const width = 800;
      const height = 600;
      const margin = { top: 20, right: 90, bottom: 30, left: 90 };
  
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);
  
      svg.selectAll('*').remove(); // Clear previous rendering
  
      // Add a background rectangle
      svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'white');
  
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      const tree = d3.tree<TreeNode>().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
  
      const hierarchy = d3.hierarchy(root);
      const treeData = tree(hierarchy);
  
      const link = g.selectAll('.link')
        .data(treeData.links())
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
          .x(d => d.y)
          .y(d => d.x))
        .style('fill', 'none')
        .style('stroke', d => d.source.data.color)  // Use color from source node
        .style('stroke-width', '2px');
  
      const node = g.selectAll('.node')
        .data(treeData.descendants())
        .enter().append('g')
        .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
        .attr('transform', d => `translate(${d.y},${d.x})`);
  
      node.append('circle')
        .attr('r', 10)
        .style('fill', d => d.data.color);  // Use color from node data
  
      node.append('text')
        .attr('dy', '.35em')
        .attr('x', d => d.children ? -13 : 13)
        .style('text-anchor', d => d.children ? 'end' : 'start')
        .style('fill', 'black')
        .text(d => `${d.data.id}: ${d.data.message}`);
  
    }, [branches]);
  
    return (
      <div>
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
        setBranches(data);
      };
  
      initializeData();
    }, [name, repo, cookie]);
  
    return (
      <div>
        <h1>Git Repository Tree</h1>
        <GitTree branches={branches} />
      </div>
    );
  };
  
  export default Feature;