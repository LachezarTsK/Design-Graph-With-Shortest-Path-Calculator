
#include <queue>
#include <memory>
#include <vector>
#include <climits>
using namespace std;

struct Node {
    int ID;
    int costOfEdge;
    Node(int ID, int costOfEdge): ID {ID}, costOfEdge {costOfEdge}{}
};

struct Step {
    int ID;
    int costFromStart;
    Step(int ID, int costFromStart): ID {ID}, costFromStart {costFromStart}{}
};

class Graph {
    
    const static int NO_PATH_EXISTS = -1;
    vector<vector<unique_ptr<Node>>> graph;
    int totalNodes;

public:
    Graph(int totalNodes, const vector<vector<int>>& edges): totalNodes{totalNodes} {
        graph.resize(totalNodes);
        for (const auto& edge : edges) {
            int from = edge[0];
            int to = edge[1];
            int cost = edge[2];
            graph[from].push_back(make_unique<Node>(to, cost));
        }
    }

    void addEdge(const vector<int>& edge) {
        int from = edge[0];
        int to = edge[1];
        int cost = edge[2];
        graph[from].push_back(make_unique<Node>(to, cost));
    }

    int shortestPath(int start, int goal) const {
        vector<int>distanceFromStart(totalNodes, INT_MAX);
        distanceFromStart[start] = 0;

        static auto comparator = [](const Step& first, const Step& second) 
        {return first.costFromStart > second.costFromStart;};
        
        priority_queue<Step, vector<Step>, decltype(comparator)> minHeap(comparator);
        minHeap.push(Step(start, 0));

        while (!minHeap.empty()) {

            Step current = minHeap.top();
            minHeap.pop();
            if (current.ID == goal) {
                break;
            }

            const vector<unique_ptr<Node>>& neighbours = graph[current.ID];
            for (const auto& next : neighbours) {
                if (distanceFromStart[next->ID] > current.costFromStart + next->costOfEdge) {
                    distanceFromStart[next->ID] = current.costFromStart + next->costOfEdge;
                    minHeap.push(Step(next->ID, distanceFromStart[next->ID]));
                }
            }
        }

        return distanceFromStart[goal] != INT_MAX ? distanceFromStart[goal] : NO_PATH_EXISTS;
    }
};
