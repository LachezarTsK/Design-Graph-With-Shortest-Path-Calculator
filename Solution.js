
class Graph {

    static NO_PATH_EXISTS = -1;

    /**
     * @param {number} totalNodes
     * @param {number[][]} edges
     */
    constructor(totalNodes, edges) {
        this.graph = new Array(totalNodes);//Array<Node>
        this.totalNodes = totalNodes;
        for (let i = 0; i < totalNodes; ++i) {
            this.graph[i] = new Array();
        }

        for (let [from, to, cost] of edges) {
            this.graph[from].push(new Node(to, cost));
        }
    }

    /** 
     * @param {number[]} edge
     * @return {void}
     */
    addEdge(edge) {
        let from = edge[0];
        let to = edge[1];
        let cost = edge[2];
        this.graph[from].push(new Node(to, cost));
    }

    /** 
     * @param {number} start 
     * @param {number} goal
     * @return {number}
     */
    shortestPath(start, goal) {
        const distanceFromStart = new Array(this.totalNodes).fill(Number.MAX_SAFE_INTEGER);
        distanceFromStart[start] = 0;

        //const {MinPriorityQueue} = require('@datastructures-js/priority-queue');
        //MinPriorityQueue<Step>
        const minHeap = new MinPriorityQueue({compare: (x, y) => x.costFromStart - y.costFromStart});
        minHeap.enqueue(new Step(start, 0));

        while (!minHeap.isEmpty()) {

            let current = minHeap.dequeue();
            if (current.ID === goal) {
                break;
            }

            const neighbours = this.graph[current.ID];
            for (let next of neighbours) {
                if (distanceFromStart[next.ID] > current.costFromStart + next.costOfEdge) {
                    distanceFromStart[next.ID] = current.costFromStart + next.costOfEdge;
                    minHeap.enqueue(new Step(next.ID, distanceFromStart[next.ID]));
                }
            }
        }

        return distanceFromStart[goal] !== Number.MAX_SAFE_INTEGER ? distanceFromStart[goal] : Graph.NO_PATH_EXISTS;
    }
}

/** 
 * @param {number} ID 
 * @param {number} costOfEdge
 */
function Node(ID, costOfEdge) {
    this.ID = ID;
    this.costOfEdge = costOfEdge;
}

/** 
 * @param {number} ID 
 * @param {number} costFromStart
 */
function Step(ID, costFromStart) {
    this.ID = ID;
    this.costFromStart = costFromStart;
}
