
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

public class Graph {

    private static final int NO_PATH_EXISTS = -1;

    private record Node(int ID, int costOfEdge) {}
    private record Step(int ID, int costFromStart) {}

    private final List<Node>[] graph;
    private final int totalNodes;

    public Graph(int totalNodes, int[][] edges) {
        this.totalNodes = totalNodes;
        graph = new List[totalNodes];
        for (int i = 0; i < totalNodes; ++i) {
            graph[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            int from = edge[0];
            int to = edge[1];
            int cost = edge[2];
            graph[from].add(new Node(to, cost));
        }
    }

    public void addEdge(int[] edge) {
        int from = edge[0];
        int to = edge[1];
        int cost = edge[2];
        graph[from].add(new Node(to, cost));
    }

    public int shortestPath(int start, int goal) {
        int[] distanceFromStart = new int[this.totalNodes];
        Arrays.fill(distanceFromStart, Integer.MAX_VALUE);
        distanceFromStart[start] = 0;

        PriorityQueue<Step> minHeap = new PriorityQueue<>((x, y) -> x.costFromStart - y.costFromStart);
        minHeap.add(new Step(start, 0));

        while (!minHeap.isEmpty()) {

            Step current = minHeap.poll();
            if (current.ID == goal) {
                break;
            }

            List<Node> neighbours = graph[current.ID];
            for (Node next : neighbours) {
                if (distanceFromStart[next.ID] > current.costFromStart + next.costOfEdge) {
                    distanceFromStart[next.ID] = current.costFromStart + next.costOfEdge;
                    minHeap.add(new Step(next.ID, distanceFromStart[next.ID]));
                }
            }
        }

        return distanceFromStart[goal] != Integer.MAX_VALUE ? distanceFromStart[goal] : NO_PATH_EXISTS;
    }
}
